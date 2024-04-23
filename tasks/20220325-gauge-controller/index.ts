import { Task, TaskRunOptions } from '@src';
import { GaugeSystemDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as GaugeSystemDeployment;

  const veBALArgs = [input.BPT, 'Vote Escrowed Symmetric SPT', 'vmSYMM', input.AuthorizerAdaptor];
  const veBAL = await task.deploy('VotingEscrow', veBALArgs, from, force);

  const gaugeControllerArgs = [veBAL.address, input.AuthorizerAdaptor];
  const gaugeController = await task.deploy('GaugeController', gaugeControllerArgs, from, force);

  // const minterArgs = [input.MSYMMTokenAdmin, gaugeController.address];
  // console.log(minterArgs);
  // await task.deployAndVerify('BalancerMinter', minterArgs, from, force);

  const weight = await gaugeController.gauge_relative_weight('0x2b61c7B6b0bd087043d822C35d8F7d28d6Ce0b4b');

  console.log(weight);
};
