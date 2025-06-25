import { Task, TaskRunOptions } from '@src';
import { BribeMarketDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as BribeMarketDeployment;

  const rewardDistributor = await task.deployAndVerify('RewardDistributor', [], from, force);

  const vaultArgs = [input.Fee, input.MaxFee, input.FeeRecipient, rewardDistributor.address];
  const bribeVault = await task.deployAndVerify('BribeVault', vaultArgs, from, force);

  const bribeMarketImplementation = await task.deployAndVerify('BribeMarket', [], from, force);

  const bribeFactoryArgs = [bribeMarketImplementation.address, bribeVault.address];
  await task.deployAndVerify('BribeFactory', bribeFactoryArgs, from, force);
};
