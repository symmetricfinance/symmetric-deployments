import { Task, TaskRunOptions } from '@src';
import { AuthorizerDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as AuthorizerDeployment;
  const args = [input.admin];
  const authorizer = await task.deployAndVerify('Authorizer', args, from, force);
  const role = await authorizer.grantRole(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0x51db3Cc6431fe6297270360dE47345B0149E1F51'
  );
  console.log(role);
};
