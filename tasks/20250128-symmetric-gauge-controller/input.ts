import { Task, TaskMode } from '@src';

export type GaugeSystemDeployment = {
  VotingEscrow: string;
  AuthorizerAdaptor: string;
};

const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
const VotingEscrow = new Task('20250128-symmetric-voting-escrow', TaskMode.READ_ONLY);

export default {
  AuthorizerAdaptor,
  VotingEscrow,
};
