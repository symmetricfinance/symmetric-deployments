import fetch, { Response } from 'node-fetch';
import { BuildInfo, CompilerInput, Network } from 'hardhat/types';

import { getLongVersion } from '@nomiclabs/hardhat-etherscan/dist/src/solc/version';
import { encodeArguments } from '@nomiclabs/hardhat-etherscan/dist/src/ABIEncoder';
import { getLibraryLinks, Libraries } from '@nomiclabs/hardhat-etherscan/dist/src/solc/libraries';
import { chainConfig } from '@nomiclabs/hardhat-etherscan/dist/src/ChainConfig';

import hardhatConfig from '../hardhat.config';

import {
  Bytecode,
  ContractInformation,
  extractMatchingContractInformation,
} from '@nomiclabs/hardhat-etherscan/dist/src/solc/bytecode';

import { getEtherscanEndpoints, retrieveContractBytecode } from '@nomiclabs/hardhat-etherscan/dist/src/network/prober';

import {
  toVerifyRequest,
  toCheckStatusRequest,
  EtherscanVerifyRequest,
} from '@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanVerifyContractRequest';

import {
  delay,
  EtherscanResponse,
  getVerificationStatus,
} from '@nomiclabs/hardhat-etherscan/dist/src/etherscan/EtherscanService';

import { EtherscanNetworkEntry } from '@nomiclabs/hardhat-etherscan/dist/src/types';

import * as parser from '@solidity-parser/parser';

import Task from './task';
import logger from './logger';
import { findContractSourceName, getAllFullyQualifiedNames } from './buildinfo';
import { getContractDeploymentTransactionHash } from 'network';

const MAX_VERIFICATION_INTENTS = 3;

export default class SourcifyVerifier {
  network: Network;

  constructor(_network: Network) {
    this.network = _network;
  }

  async call(task: Task, name: string, address: string, libraries: Libraries = {}): Promise<string> {
    const response = await this.verify(task, name, address, libraries);

    if (response.status == 200) {
      const contractURL = new URL(address, 'https://sourcify.dev/#/lookup/');
      return contractURL.toString();
    } else {
      throw new Error(`The contract verification failed. Reason: ${response.message}`);
    }
  }

  private async verify(task: Task, name: string, address: string, libraries: Libraries = {}): Promise<any> {
    const deployedBytecodeHex = await retrieveContractBytecode(address, this.network.provider, this.network.name);
    const deployedBytecode = new Bytecode(deployedBytecodeHex);
    const buildInfos = await task.buildInfos();
    const buildInfo = this.findBuildInfoWithContract(buildInfos, name);
    buildInfo.input = this.trimmedBuildInfoInput(name, buildInfo.input);

    const sourceName = findContractSourceName(buildInfo, name);
    const contractInformation = await extractMatchingContractInformation(sourceName, name, buildInfo, deployedBytecode);
    if (!contractInformation) throw Error('Could not find a bytecode matching the requested contract');

    const { libraryLinks } = await getLibraryLinks(contractInformation, libraries);
    contractInformation.libraryLinks = libraryLinks;

    const solcFullVersion = await getLongVersion(contractInformation.solcVersion);
    const chainId = parseInt(await this.network.provider.send('eth_chainId'), 16);
    const txHash = getContractDeploymentTransactionHash(address, this.network.name);

    const verificationStatus = await this.attemptVerification(
      chainId,
      contractInformation,
      address,
      buildInfo.input,
      solcFullVersion,
      txHash
    );

    if (verificationStatus.status == 200) return verificationStatus;
    throw new Error(`The contract verification failed. Reason: ${verificationStatus.message}`);
  }

  private async attemptVerification(
    chainId: number,
    contractInformation: ContractInformation,
    contractAddress: string,
    compilerInput: CompilerInput,
    solcFullVersion: string,
    txHash: string
  ): Promise<any> {
    compilerInput.settings.libraries = contractInformation.libraryLinks;

    const r = {
      address: contractAddress,
      chain: chainId.toString(),
      files: {
        value: JSON.stringify(compilerInput),
      },
      compilerVersion: solcFullVersion,
      contractName: contractInformation.contractName,
      creatorTxHash: txHash,
    };

    const response = await this.verifyContract(r);
    // const pollRequest = toCheckStatusRequest({ apiKey: etherscanAPIKey, guid: response.message });

    return response;

    // await delay(700);
    // const verificationStatus = await getVerificationStatus(etherscanEndpoints.urls.apiURL, pollRequest);

    // if (verificationStatus.isVerificationFailure() || verificationStatus.isVerificationSuccess()) {
    //   return verificationStatus;
    // }

    // throw new Error(`The API responded with an unexpected message: ${verificationStatus.message}`);
  }

  private async verifyContract(req: any): Promise<any> {
    // const parameters = new URLSearchParams({ ...req });
    const requestDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    };

    let response: Response;
    try {
      response = await fetch('https://sourcify.dev/server/verify/solc-json', requestDetails);
    } catch (error: unknown) {
      throw Error(`Failed to send verification request. Reason: ${(error as Error).message}`);
    }
    console.log(response);
    if (response.status !== 200) {
      const responseText = await response.text();
      throw Error(`Failed to send verification request.\nHTTP code: ${response.status}.\nResponse: ${responseText}`);
    }
    return response;
    // const etherscanResponse = new EtherscanResponse(await response.json());
    // if (!etherscanResponse.isOk()) throw Error(etherscanResponse.message);
    // return etherscanResponse;
  }

  private findBuildInfoWithContract(buildInfos: BuildInfo[], contractName: string): BuildInfo {
    const found = buildInfos.find((buildInfo) =>
      getAllFullyQualifiedNames(buildInfo).some((name) => name.contractName === contractName)
    );

    if (found === undefined) {
      throw Error(`Could not find a build info for contract ${contractName}`);
    } else {
      return found;
    }
  }

  // Trims the inputs of the build info to only keep imported files, avoiding submitting unnecessary source files for
  // verification (e.g. mocks). This is required because Hardhat compiles entire projects at once, resulting in a single
  // huge build info.
  private trimmedBuildInfoInput(contractName: string, input: CompilerInput): CompilerInput {
    // First we find all sources imported from our contract
    const sourceName = this.getContractSourceName(contractName, input);
    const importedSourceNames = this.getContractImportedSourceNames(
      sourceName,
      input,
      new Set<string>().add(sourceName)
    );

    // Then, we keep only those inputs. This method also preserves the order of the files, which may be important in
    // some versions of solc.
    return {
      ...input,
      sources: Object.keys(input.sources)
        .filter((source) => importedSourceNames.has(source))
        .map((source) => ({ [source]: input.sources[source] }))
        .reduce((previous, current) => Object.assign(previous, current), {}),
    };
  }

  private getAbsoluteSourcePath(relativeSourcePath: string, input: CompilerInput): string {
    // We're not actually converting from relative to absolute but rather guessing: we'll extract the filename from the
    // relative path, and then look for a source name in the inputs that matches it.
    const contractName = (relativeSourcePath.match(/.*\/(\w*)\.sol/) as RegExpMatchArray)[1];
    return this.getContractSourceName(contractName, input);
  }

  private getContractSourceName(contractName: string, input: CompilerInput): string {
    const absoluteSourcePath = Object.keys(input.sources).find((absoluteSourcePath) =>
      absoluteSourcePath.includes(`/${contractName}.sol`)
    );

    if (absoluteSourcePath === undefined) {
      throw new Error(`Could not find source name for ${contractName}`);
    }

    return absoluteSourcePath;
  }

  private getContractImportedSourceNames(
    sourceName: string,
    input: CompilerInput,
    previousSourceNames: Set<string>
  ): Set<string> {
    const ast = parser.parse(input.sources[sourceName].content);
    parser.visit(ast, {
      ImportDirective: (node) => {
        // Imported paths might be relative, so we convert them to absolute
        const importedSourceName = this.getAbsoluteSourcePath(node.path, input);

        if (!previousSourceNames.has(importedSourceName)) {
          // New source!
          previousSourceNames = this.getContractImportedSourceNames(
            importedSourceName,
            input,
            new Set(previousSourceNames).add(importedSourceName)
          );
        }
      },
    });

    return previousSourceNames;
  }
}
