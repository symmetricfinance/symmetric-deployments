import { Task, TaskMode } from '@src';

export type BalancerTokenAdminDeployment = {
  BAL: string;
  contract: string;
  Vault: string;
};

const TestBALTask = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);
const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

export default {
  Vault,
  mainnet: {
    BAL: '0xba100000625a3754423978a60c9317c58a424e3D',
    contract: 'BalancerTokenAdmin',
  },
  kovan: {
    BAL: TestBALTask.output({ network: 'kovan' }).TestBalancerToken,
    contract: 'BalancerTokenAdmin',
  },
  goerli: {
    BAL: TestBALTask.output({ network: 'goerli' }).TestBalancerToken,
    contract: 'BalancerTokenAdmin',
  },
  sepolia: {
    BAL: TestBALTask.output({ network: 'sepolia' }).TestBalancerToken,
    contract: 'BalancerTokenAdmin',
  },
  telosTestnet: {
    BAL: '0xD34E5cB68F493D0B446d0b5a34E42272BdEBdEBB',
    contract: 'BalancerTokenAdmin',
  },
  telos: {
    BAL: '0xd5f2a24199C3DFc44C1Bf8B1C01aB147809434Ca',
    contract: 'TSYMMTokenAdmin',
  },
  meter: {
    BAL: '0x663345e09f4f4437f3d5df39ba5c2b5690532206',
    contract: 'MSYMMTokenAdmin',
  },
  meterTestnet: {
    BAL: '0x7E552a5965F7B13EFC4A6D3173304eFC175d7fBc',
    contract: 'BalancerTokenAdmin',
  },
};
