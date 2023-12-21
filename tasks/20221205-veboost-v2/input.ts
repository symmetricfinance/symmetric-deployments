import { Task, TaskMode } from '@src';

export type VeBoostV2Deployment = {
  PreseededVotingEscrowDelegation: string;
  VotingEscrow: string;
};

const VotingEscrow = new Task('20220325-gauge-controller', TaskMode.READ_ONLY);
const VotingEscrowDelegation = new Task('20220325-ve-delegation', TaskMode.READ_ONLY);

export default {
  VotingEscrow,
  VotingEscrowDelegation,
};
