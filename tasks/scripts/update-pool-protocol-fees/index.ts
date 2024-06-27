import { Task } from '@src';
import { UpdateProtocolFeePercentageCache } from './input';
import { ethers } from 'hardhat';

export default async (task: Task): Promise<void> => {
  const input = task.input() as UpdateProtocolFeePercentageCache;

  const signer = await ethers.getSigner(input.signer);

  const poolABI = ['function updateProtocolFeePercentageCache()'];

  const pools = input.pools.map((pool) => pool.substring(0, 42));

  for (const pool of pools) {
    const poolContract = new ethers.Contract(pool, poolABI, signer);
    await (await poolContract.updateProtocolFeePercentageCache()).wait();
    console.log('Protocol fee percentage cache updated for pool', pool);
  }
};
