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
    name: 'Meridian Yield Accelerated USDC Pool',
    symbol: 'myaUSDC',
    tokens: ['0x8d97cea50351fb4329d591682b148d43a0c3611b', '0x953808eF6BE397925f71Ec0e8892e246882e4804'], //USDC-woUSDC
    rateProviders: [ZERO_ADDRESS, '0xff4cda0e94eb73a0c77eb490688db5ba792874ec'],
  },
  {
    name: 'Meridian Yield Accelerated USDT Pool',
    symbol: 'myaUSDT',
    tokens: ['0x181F14262E2EFD4DF781079437eBa1AeD3343898', '0x975ed13fa16857e83e7c493c7741d556eaad4a3f'], //woUSDT-USDT
    rateProviders: ['0xea6ef7767f63648d5064ee8ddb2c30f79163c8e1', ZERO_ADDRESS],
  },
  {
    name: 'Meridian Yield Accelerated USDM Pool',
    symbol: 'myaUSDM',
    tokens: ['0x8eDc3bDd08980d5F6672F243CEbC58c6C117956A', '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9'], //woUSDM - USDM
    rateProviders: ['0x77B00f59B2C4eAEc3339FBDF5e4b10b13f172C45', ZERO_ADDRESS],
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
