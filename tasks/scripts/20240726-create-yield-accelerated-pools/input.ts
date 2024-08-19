import { Task, TaskMode } from '@src';
import { ZERO_ADDRESS } from '@helpers/constants';

export type ComposableStablePoolDeployment = {
  Vault: string;
  ProtocolFeePercentagesProvider: string;
  FactoryVersion: string;
  PoolVersion: string;
  ComposableStablePoolFactory: string;
  signer: string;
  WETH: string;
  BAL: string;
  pools: { name: string; symbol: string; tokens: string[]; rateProviders: string[] }[];
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);
const ProtocolFeePercentagesProvider = new Task('20220725-protocol-fee-percentages-provider', TaskMode.READ_ONLY);
const ComposableStablePoolFactory = new Task('20230711-composable-stable-pool-v5', TaskMode.READ_ONLY);
const WETH = new Task('00000000-tokens', TaskMode.READ_ONLY);
const BAL = new Task('00000000-tokens', TaskMode.READ_ONLY);

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const BaseVersion = { version: 5, deployment: '20230711-composable-stable-pool-v5' };

const pools = [
  {
    name: 'Meridian Yield Accelerated USD',
    symbol: 'myaUSD',
    tokens: [
      '0xC8994727BF84B432A9955403e4335A874c1aE919',
      '0x542A31176829f9DdA137942C7CABbb4533523aD3',
      '0x71fd3b5e53E444eD1E8309B578cFfd7D33294C59',
    ],
    rateProviders: [ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS],
  },
];

export default {
  Vault,
  ProtocolFeePercentagesProvider,
  ComposableStablePoolFactory,
  signer,
  WETH,
  BAL,
  FactoryVersion: JSON.stringify({ name: 'ComposableStablePoolFactory', ...BaseVersion }),
  PoolVersion: JSON.stringify({ name: 'ComposableStablePool', ...BaseVersion }),
  pools,
};
