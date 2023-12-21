import { Task, TaskRunOptions } from '@src';
import { AuthorizerDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as AuthorizerDeployment;
  const args = [input.admin];
  const authorizer = await task.deployAndVerify('Authorizer', args, from, force);
  const role = await authorizer.grantRole(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0xa29F1CA1957c164877F6A277C9791ACA3Ad4BD6D'
  );
  console.log(role);
};
