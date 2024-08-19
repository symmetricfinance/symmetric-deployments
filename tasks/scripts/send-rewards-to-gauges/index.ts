import { Task } from '@src';
import { DistributeRewards } from './input';
import { ethers } from 'hardhat';
import LiquidityGaugeABI from './liquidityGaugeABI.json';

export default async (task: Task): Promise<void> => {
  const input = task.input() as DistributeRewards;

  const signer = await ethers.getSigner(input.signer);

  const approveABI = ['function approve(address spender, uint256 amount)'];
  // const LiquidityGaugeABI = [
  //   'function scheduleDistribution(address gauge, address token, uint256 amount, uint256 starTime)',
  //];
  const FeeDistributorABI = ['function depositToken(address token, uint256 amount)'];

  // for (const gauge of input.veRewards) {
  //   // const tokenContract = new ethers.Contract(gauge.token, approveABI, signer);
  //   // await (await tokenContract.approve(input.FeeDistributor, gauge.rate)).wait();
  //   // console.log('Approved', gauge.rate, 'of', gauge.token, 'for', input.FeeDistributor);

  //   const FeeDistributor = new ethers.Contract(input.FeeDistributor, FeeDistributorABI, signer);
  //   await (await FeeDistributor.depositToken(gauge.token, gauge.rate)).wait();
  //   console.log('Deposited', gauge.rate, gauge.tokenSymbol, 'to', input.FeeDistributor);
  // }

  for (const gauge of input.rewards) {
    for (const r of gauge) {
      const tokenContract = new ethers.Contract(r.token, approveABI, signer);
      await (await tokenContract.approve(r.gauge, r.rate)).wait();
      console.log('Approved', r.rate, 'of', r.token, 'for', r.gauge);

      const Gauge = new ethers.Contract(r.gauge, LiquidityGaugeABI, signer);

      // await (await Gauge.set_reward_distributor(r.token, input.signer)).wait();
      // console.log('Set reward distributor of', input.signer, 'for token', r.token, 'gauge', r.gauge);

      await (await Gauge.deposit_reward_token(r.token, r.rate)).wait();
      console.log('Send rewards of', r.rate.toString(), r.tokenSymbol, 'for', r.symbol, 'gauge', r.gauge);

      // await (await Gauge.set_reward_distributor(r.token, input.DistributionScheduler)).wait();
      // console.log('Set reward distributor of', input.DistributionScheduler, 'for token', r.token, 'gauge', r.gauge);
    }
  }
};
