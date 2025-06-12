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

const PoolCreationHelper = '0xF2340b9b03CF979d74206E77f00b44E8006B783E';

const tokens = {
  USDC: {
    address: '0xB39a50B5806039C82932bB96CEFbcbc61231045C',
    symbol: 'USDC',
    decimals: 6,
  },
  USDT: {
    address: '0x01079C78199e05D44bBFF9E50Dbdf765489F16E1',
    symbol: 'USDT',
    decimals: 6,
  },
};

const pools = [
  {
    name: 'USDC-USDC.e',
    symbol: 'USDC-USDC.e',
    tokens: [tokens.USDT.address, tokens.USDC.address], //USDC-USDC.e
    rateProviders: [ZERO_ADDRESS, ZERO_ADDRESS],
    weiAmountsPerToken: [bn(1000e6), bn(1000e6)],
    swapFeePercentage: bn(10),
    amplificationParameter: bn(1999),
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
