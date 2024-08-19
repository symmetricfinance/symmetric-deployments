import { Task, TaskMode, TaskRunOptions } from '@src';
import { ComposableStablePoolDeployment } from './input';

import { ZERO_BYTES32 } from '@helpers/constants';
import { bn } from '@helpers/numbers';
import * as expectEvent from '@helpers/expectEvent';
import { saveContractDeploymentTransactionHash } from '@src';
import { ethers } from 'hardhat';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ComposableStablePoolDeployment;

  const poolFactoryABI = [
    {
      inputs: [
        {
          internalType: 'contract IVault',
          name: 'vault',
          type: 'address',
        },
        {
          internalType: 'contract IProtocolFeePercentagesProvider',
          name: 'protocolFeeProvider',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'factoryVersion',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'poolVersion',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [],
      name: 'FactoryDisabled',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'PoolCreated',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'symbol',
          type: 'string',
        },
        {
          internalType: 'contract IERC20[]',
          name: 'tokens',
          type: 'address[]',
        },
        {
          internalType: 'uint256',
          name: 'amplificationParameter',
          type: 'uint256',
        },
        {
          internalType: 'contract IRateProvider[]',
          name: 'rateProviders',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'tokenRateCacheDurations',
          type: 'uint256[]',
        },
        {
          internalType: 'bool',
          name: 'exemptFromYieldProtocolFeeFlag',
          type: 'bool',
        },
        {
          internalType: 'uint256',
          name: 'swapFeePercentage',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'salt',
          type: 'bytes32',
        },
      ],
      name: 'create',
      outputs: [
        {
          internalType: 'contract ComposableStablePool',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'disable',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes4',
          name: 'selector',
          type: 'bytes4',
        },
      ],
      name: 'getActionId',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAuthorizer',
      outputs: [
        {
          internalType: 'contract IAuthorizer',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCreationCode',
      outputs: [
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCreationCodeContracts',
      outputs: [
        {
          internalType: 'address',
          name: 'contractA',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'contractB',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getPauseConfiguration',
      outputs: [
        {
          internalType: 'uint256',
          name: 'pauseWindowDuration',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'bufferPeriodDuration',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getPoolVersion',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getProtocolFeePercentagesProvider',
      outputs: [
        {
          internalType: 'contract IProtocolFeePercentagesProvider',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVault',
      outputs: [
        {
          internalType: 'contract IVault',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isDisabled',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'pool',
          type: 'address',
        },
      ],
      name: 'isPoolFromFactory',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'version',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];
  const factory = new ethers.Contract(
    input.ComposableStablePoolFactory,
    poolFactoryABI,
    await ethers.getSigner(input.signer)
  );

  for (const pool of input.pools) {
    const poolArgs = {
      vault: input.Vault,
      protocolFeeProvider: input.ProtocolFeePercentagesProvider,
      name: pool.name,
      symbol: pool.symbol,
      tokens: pool.tokens.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      }),
      rateProviders: pool.rateProviders,
      tokenRateCacheDurations: [21600, 21600],
      exemptFromYieldProtocolFeeFlag: false,
      amplificationParameter: bn(5000),
      swapFeePercentage: bn(1e12),
      pauseWindowDuration: undefined,
      bufferPeriodDuration: undefined,
      owner: '0xa29f1ca1957c164877f6a277c9791aca3ad4bd6d',
      version: input.PoolVersion,
    };

    const poolCreationReceipt = await (
      await factory.create(
        poolArgs.name,
        poolArgs.symbol,
        poolArgs.tokens,
        poolArgs.amplificationParameter,
        poolArgs.rateProviders,
        poolArgs.tokenRateCacheDurations,
        poolArgs.exemptFromYieldProtocolFeeFlag,
        poolArgs.swapFeePercentage,
        poolArgs.owner,
        ZERO_BYTES32
      )
    ).wait();
    const event = expectEvent.inReceipt(poolCreationReceipt, 'PoolCreated');
    const poolAddress = event.args.pool;

    await saveContractDeploymentTransactionHash(poolAddress, poolCreationReceipt.transactionHash, task.network);
    await task.save({ [pool.symbol]: poolAddress });

    console.log('Pool created for', pool.name, 'at', poolAddress);
  }
};
