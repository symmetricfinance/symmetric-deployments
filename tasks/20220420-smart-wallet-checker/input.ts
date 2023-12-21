import { Task, TaskMode } from '@src';

export type SmartWalletCheckerDeployment = {
  Vault: string;
  InitialAllowedAddresses: string[];
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

export default {
  Vault,
  mainnet: {
    // TribeDAO's contract, from https://vote.balancer.fi/#/proposal/0xece898cf86f930dd150f622a4ccb1fa41900e67b3cebeb4fc7c5a4acbb0e0148
    InitialAllowedAddresses: ['0xc4EAc760C2C631eE0b064E39888b89158ff808B2'],
  },
  goerli: {
    InitialAllowedAddresses: [],
  },
  sepolia: {
    InitialAllowedAddresses: [],
  },
  telosTestnet: {
    InitialAllowedAddresses: [],
  },
  telos: {
    InitialAllowedAddresses: [
      '0xBd8911e8477a7279f085F473f46A6b9AB54385E7',
      '0xa29F1CA1957c164877F6A277C9791ACA3Ad4BD6D',
      '0x42613DDb353730cf2404BcFf2034c9007f968192',
    ],
  },
};
