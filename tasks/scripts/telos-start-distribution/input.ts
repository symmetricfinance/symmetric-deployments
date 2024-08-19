import { Task, TaskMode } from '@src';

export type DistributeRewards = {
  signer: string;
  pools: string[];
  DistributionScheduler: string;
  FeeDistributionScheduler: string;
  gauges: { symbol: string; gauge: string }[];
  feeDistributorTokens: { symbol: string; token: string; feeDistributor: string }[];
};

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const DistributionScheduler = new Task('20220707-distribution-scheduler', TaskMode.READ_ONLY);
const FeeDistributionScheduler = new Task('20240529-fee-distribution-scheduler', TaskMode.READ_ONLY);

const gauges = [
  {
    symbol: 'WTLOS-USDT',
    gauge: '0xa9d436ab58989354a5c3705f24a5130779055e47',
  },
  {
    symbol: 'USDC-USDT',
    gauge: '0xe4c412962fab7f2d406c43a8da95c68f9d60f24e',
  },
  {
    symbol: 'STLOS-WTLOS',
    gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
  },
];

const feeDistributorTokens = [
  {
    symbol: 'WTLOS',
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    feeDistributor: '0x75d71288F0181a5c1C9f8c81755846954C37433A',
  },
  {
    symbol: 'USDM',
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    feeDistributor: '0x75d71288F0181a5c1C9f8c81755846954C37433A',
  },
];

export default {
  signer,
  FeeDistributionScheduler,
  DistributionScheduler,
  gauges,
  feeDistributorTokens,
};
