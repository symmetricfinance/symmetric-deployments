import { Task } from '@src';
import { DistributeRewards } from './input';
import { ethers } from 'hardhat';

export default async (task: Task): Promise<void> => {
  const input = task.input() as DistributeRewards;

  const signer = await ethers.getSigner(input.signer);

  const approveABI = ['function approve(address spender, uint256 amount)'];
  const DistributionSchadulerABI = [
    'function scheduleDistribution(address gauge, address token, uint256 amount, uint256 starTime)',
  ];
  const FeeDistributionSchadulerABI = [
    'function scheduleDistribution(address feeDistributor, address token, uint256 amount, uint256 starTime)',
  ];

  for (const approval of input.approvals) {
    const tokenContract = new ethers.Contract(approval.token, approveABI, signer);
    await (await tokenContract.approve(input.DistributionScheduler, approval.amount)).wait();
    console.log('Approved', approval.amount, 'of', approval.token, 'for', input.DistributionScheduler);
  }

  for (const approval of input.veApprovals) {
    const tokenContract = new ethers.Contract(approval.token, approveABI, signer);
    await (await tokenContract.approve(input.FeeDistributionScheduler, approval.amount)).wait();
    console.log('Approved', approval.amount, 'of', approval.token, 'for', input.FeeDistributionScheduler);
  }

  for (const reward of input.rewards) {
    for (const r of reward) {
      const DistributionScheduler = new ethers.Contract(input.DistributionScheduler, DistributionSchadulerABI, signer);
      await (await DistributionScheduler.scheduleDistribution(r.gauge, r.token, r.rate, input.timestamp)).wait();
      console.log('Scheduled distribution of', r.rate.toString(), r.tokenSymbol, 'for', r.symbol, 'gauge', r.gauge);
    }
  }

  for (const r of input.veRewards) {
    const FeeDistributionScheduler = new ethers.Contract(
      input.FeeDistributionScheduler,
      FeeDistributionSchadulerABI,
      signer
    );
    await (
      await FeeDistributionScheduler.scheduleDistribution(r.feeDistributor, r.token, r.rate, input.timestamp)
    ).wait();

    console.log(
      'Scheduled distribution of',
      r.rate.toString(),
      r.tokenSymbol,
      'for',
      r.symbol,
      'feeDistributor',
      r.feeDistributor
    );
  }
};
