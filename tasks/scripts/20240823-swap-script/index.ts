import { Task } from '@src';
import { UpdateProtocolFeePercentageCache } from './input';
import { ethers } from 'hardhat';
import VaultABI from './VaultABI.json';

const MAX_UINT256 = '0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export default async (task: Task): Promise<void> => {
  const input = task.input() as UpdateProtocolFeePercentageCache;

  const signer = await ethers.getSigner(input.signer);

  const vaultAbi = VaultABI;

  const vaultContract = new ethers.Contract(input.Vault, vaultAbi, signer);

  const funds = {
    sender: input.signer,
    recipient: input.signer,
    fromInternalBalance: false,
    toInternalBalance: false,
  };

  const swaps = [];
  const limits = Array(2).fill(MAX_UINT256);
  // for (let i = 0; i < 4; i++) {
  for (let i = 0; i < 10; i++) {
    swaps.push({
      poolId: input.poolId,
      amount: '90000000000000000000',
      assetInIndex: 0,
      assetOutIndex: 1,
      userData: '0x',
    });
  }
  for (let i = 0; i < 10; i++) {
    swaps.push({
      poolId: input.poolId,
      amount: '245000000000000000000',
      assetInIndex: 1,
      assetOutIndex: 0,
      userData: '0x',
    });
  }
  await (
    await vaultContract.batchSwap(0, swaps, [input.token1, input.token2], funds, limits, MAX_UINT256, { value: 0 })
  ).wait();
  console.log('Swapped', swaps.length, 'times');
};
