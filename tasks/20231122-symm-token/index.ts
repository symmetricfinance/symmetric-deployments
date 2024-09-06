import { Task, TaskRunOptions } from '@src';
import { SymmTokenDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as SymmTokenDeployment;

  const args = [input.name, input.symbol];
  const symmToken = await task.deployAndVerify('SymmToken', args, from, force);

  await symmToken.grantRole('0x0000000000000000000000000000000000000000000000000000000000000000', input.Admin);

  // await symmToken.grantRole(utils.keccak256(utils.toUtf8Bytes('MINTER_ROLE')), input.Admin);
  // await symmToken.grantRole(utils.keccak256(utils.toUtf8Bytes('SNAPSHOT_ROLE')), input.Admin);

  // await symmToken.renounceRole(
  //   '0x0000000000000000000000000000000000000000000000000000000000000000',
  //   '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31'
  // );
  // await symmToken.renounceRole(
  //   utils.keccak256(utils.toUtf8Bytes('MINTER_ROLE')),
  //   '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31'
  // );
  // await symmToken.renounceRole(
  //   utils.keccak256(utils.toUtf8Bytes('SNAPSHOT_ROLE')),
  //   '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31'
  // );
  // await task.sourcifyVerify('VestingWallet', '0xC18BE40C262dE6aF6127764C3d3424c1e8b0623C');
};
