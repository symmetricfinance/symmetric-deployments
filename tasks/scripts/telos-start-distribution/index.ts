import { Task } from '@src';
import { DistributeRewards } from './input';
import { ethers } from 'hardhat';

export default async (task: Task): Promise<void> => {
  const input = task.input() as DistributeRewards;

  const signer = await ethers.getSigner(input.signer);

  const DistributionSchadulerABI = ['function startDistributions(address gauge)'];
  const FeeDistributionSchadulerABI = ['function startDistributionForToken(address feeDistributor, address token)'];

  for (const gauge of input.gauges) {
    const DistributionScheduler = new ethers.Contract(input.DistributionScheduler, DistributionSchadulerABI, signer);
    await (await DistributionScheduler.startDistributions(gauge.gauge)).wait();
    console.log('Started distributions for gauge', gauge.symbol);
  }

  for (const fdb of input.feeDistributorTokens) {
    const FeeDistributionScheduler = new ethers.Contract(
      input.FeeDistributionScheduler,
      FeeDistributionSchadulerABI,
      signer
    );
    await (await FeeDistributionScheduler.startDistributionForToken(fdb.feeDistributor, fdb.token)).wait();
    console.log('Started distribution for token', fdb.token, 'feeDistributor', fdb.feeDistributor);
  }
};
