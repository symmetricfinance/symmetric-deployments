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
  meter: {
    InitialAllowedAddresses: [
      '0x51db3Cc6431fe6297270360dE47345B0149E1F51', //gov
      '0x37F5a2c467f6326E0a81A28ad0f016Fc7c2a1278', //Treasury
      '0xc512f6E3D970B08b86Ae8326f3E62919e01B6011', //Team
    ],
  },
};
