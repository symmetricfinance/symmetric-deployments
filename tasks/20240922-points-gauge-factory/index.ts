import { Task, TaskRunOptions } from '@src';
import { ChildChainLiquidityGaugeFactoryDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ChildChainLiquidityGaugeFactoryDeployment;

  const gaugeArgs = [input.POINTS, input.Vault, input.AuthorizerAdaptor];
  const gaugeImplementation = await task.deploy('RewardsOnlyGauge', gaugeArgs, from, force);

  const streamerArgs = [input.POINTS, input.AuthorizerAdaptor];
  const streamerImplementation = await task.deploy('ChildChainStreamer', streamerArgs, from, force);

  const factoryArgs = [gaugeImplementation.address, streamerImplementation.address];
  await task.deployAndVerify('ChildChainLiquidityGaugeFactory', factoryArgs, from, force);
};
