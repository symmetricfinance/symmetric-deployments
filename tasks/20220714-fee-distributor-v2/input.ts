import { Task, TaskMode } from '@src';

export type FeeDistributorDeployment = {
  VotingEscrow: string;
  startTime: number;
};

const VotingEscrow = new Task('20220325-gauge-controller', TaskMode.READ_ONLY);

export default {
  VotingEscrow,
  mainnet: {
    startTime: 1657756800, // Thursday, July 14 2022 00:00:00 UTC
  },
  sepolia: {
    startTime: 1683763200, // Thursday, May 11 2023 00:00:00 UTC
  },
  telosTestnet: {
    startTime: 261831000,
  },
  telos: {
    startTime: 1701907200, // Thursday, December 7 2023 00:00:00 UTC
  },
  meter: {
    startTime: 1713398400, // Thursday, April 18 2024 00:00:00 UTC
  },
};
