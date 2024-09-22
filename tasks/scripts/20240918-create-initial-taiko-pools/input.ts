import { Task, TaskMode } from '@src';
import { ZERO_ADDRESS } from '@helpers/constants';
import { BigNumber, bn } from '@helpers/numbers';

export type ComposableStablePoolDeployment = {
  Vault: string;
  PoolCreationHelper: string;
  ProtocolFeePercentagesProvider: string;
  FactoryVersion: string;
  PoolVersion: string;
  ComposableStablePoolFactory: string;
  signer: string;
  WETH: string;
  BAL: string;
  pools: {
    name: string;
    symbol: string;
    tokens: string[];
    rateProviders: string[];
    weiAmountsPerToken: BigNumber[];
    swapFeePercentage: BigNumber;
    amplificationParameter: BigNumber;
    exemptFees: boolean;
  }[];
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);
const ProtocolFeePercentagesProvider = new Task('20220725-protocol-fee-percentages-provider', TaskMode.READ_ONLY);
const ComposableStablePoolFactory = new Task('20240223-composable-stable-pool-v6', TaskMode.READ_ONLY);
// const WeightedPoolFactory = new Task('20230320-weighted-pool-v4', TaskMode.READ_ONLY);
const WETH = new Task('00000000-tokens', TaskMode.READ_ONLY);
const BAL = new Task('00000000-tokens', TaskMode.READ_ONLY);

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const BaseVersion = { version: 5, deployment: '20230711-composable-stable-pool-v5' };

const PoolCreationHelper = '0x4eD870363d69F0f2c565332342eFC68ca82b544b';

const tokens = {
  'USDC.e': {
    address: '0x19e26b0638bf63aa9fa4d14c6baf8d52ebe86c5c',
    symbol: 'USDC.e',
    decimals: 6,
  },
  USDC: {
    address: '0x07d83526730c7438048d55a4fc0b850e2aab6f0b',
    symbol: 'USDC',
    decimals: 6,
  },
  USDT: {
    address: '0x9c2dc7377717603eb92b2655c5f2e7997a4945bd',
    symbol: 'USDT',
    decimals: 6,
  },
  WETH: {
    address: '0xa51894664a773981c6c112c43ce576f315d5b1b6',
    symbol: 'WETH',
    decimals: 18,
  },
  TAIKO: {
    address: '0xa9d23408b9ba935c230493c40c73824df71a0975',
    symbol: 'TAIKO',
    decimals: 18,
  },
};

const pools = [
  {
    name: 'USDC-USDC.e',
    symbol: 'USDC-USDC.e',
    tokens: [tokens.USDC.address, tokens['USDC.e'].address], //USDC-USDC.e
    rateProviders: [ZERO_ADDRESS, ZERO_ADDRESS],
    weiAmountsPerToken: [bn(1e6), bn(1e6)],
    swapFeePercentage: bn(10),
    amplificationParameter: bn(500),
    exemptFees: false,
  },
];

export default {
  Vault,
  ProtocolFeePercentagesProvider,
  ComposableStablePoolFactory,
  PoolCreationHelper,
  signer,
  WETH,
  BAL,
  FactoryVersion: JSON.stringify({ name: 'ComposableStablePoolFactory', ...BaseVersion }),
  PoolVersion: JSON.stringify({ name: 'ComposableStablePool', ...BaseVersion }),
  pools,
};
