import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { MerkleTree } from './lib/merkleTree';

function encodeElement(address: string, balance: BigNumber): string {
  return ethers.utils.solidityKeccak256(['address', 'uint'], [address, balance]);
}

const claims: any[] = [{ address: '', tsymmBalance: 0, wtlosBalance: 0 }];

const tsymmClaims = claims.map((c) => encodeElement(c.address, c.tsymmBalance));
const merkleTree = new MerkleTree(tsymmClaims);
const root = merkleTree.getHexRoot();
console.log(root);
