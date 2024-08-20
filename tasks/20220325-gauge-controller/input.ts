import { Task, TaskMode } from '@src';

export type GaugeSystemDeployment = {
  BPT: string;
  MSYMMTokenAdmin: string;
  AuthorizerAdaptor: string;
};

const AuthorizerAdaptor = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY);
const MSYMMTokenAdmin = new Task('20220325-balancer-token-admin', TaskMode.READ_ONLY);

export default {
  AuthorizerAdaptor,
  MSYMMTokenAdmin,
  mainnet: {
    BPT: '0x5c6Ee304399DBdB9C8Ef030aB642B10820DB8F56', // BPT of the canonical 80-20 BAL-WETH Pool
  },
  sepolia: {
    BPT: '0x650C15c9CFc6063e5046813f079774f56946dF21', // BPT of an 80-20 BAL-WETH Pool using test BAL
  },
  telos: {
    BPT: '0xbf0FA44e5611C31429188B7dcc59ffe794D1980e',
  },
  meter: {
    BPT: '0xabbcd1249510a6afb5d1e6d055bf86637e7dad63',
  },
  telosTestnet: {
    BPT: '0x037D0B5511eFF40fF31dA11A9A0619efC3B87EC9', // SPT of an 80-20 SYMM-TLOS Pool using test SYMM
  },
};
