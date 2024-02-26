import { Task, TaskMode } from '@src';

export type BalancerTokenAdminDeployment = {
  BAL: string;
  Vault: string;
};

const TestBALTask = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);
const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

export default {
  Vault,
  mainnet: {
    BAL: '0xba100000625a3754423978a60c9317c58a424e3D',
  },
  kovan: {
    BAL: TestBALTask.output({ network: 'kovan' }).TestBalancerToken,
  },
  goerli: {
    BAL: TestBALTask.output({ network: 'goerli' }).TestBalancerToken,
  },
  sepolia: {
    BAL: TestBALTask.output({ network: 'sepolia' }).TestBalancerToken,
  },
  telosTestnet: {
    BAL: '0xD34E5cB68F493D0B446d0b5a34E42272BdEBdEBB',
  },
  telos: {
    BAL: '0xd5f2a24199C3DFc44C1Bf8B1C01aB147809434Ca',
  },
  meterTestnet: {
    BAL: '0x7E552a5965F7B13EFC4A6D3173304eFC175d7fBc',
  },
};
