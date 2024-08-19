import { Task, TaskMode } from '@src';
import { BigNumber } from 'ethers';

export type DistributeRewards = {
  signer: string;
  pools: string[];
  DistributionScheduler: string;
  FeeDistributionScheduler: string;
  approvals: { token: string; amount: string }[];
  veApprovals: { token: string; amount: string }[];
  rewards: {
    symbol: string;
    token: string;
    tokenSymbol: string;
    gauge: string;
    rate: BigNumber;
    period_finish: number;
    decimals: number;
  }[][];
  veRewards: {
    symbol: string;
    token: string;
    tokenSymbol: string;
    feeDistributor: string;
    rate: BigNumber;
    period_finish: number;
    decimals: number;
  }[];
  timestamp: BigNumber;
};

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const DistributionScheduler = new Task('20220707-distribution-scheduler', TaskMode.READ_ONLY);
const FeeDistributionScheduler = new Task('20240529-fee-distribution-scheduler', TaskMode.READ_ONLY);
const timestamp = BigNumber.from('1723075200');

const approvals = [
  {
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    amount: BigNumber.from('6450000000000000000000'),
  },
  {
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    amount: BigNumber.from('400000000000000000000'),
  },
];

const veApprovals = [
  {
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    amount: BigNumber.from('2000000000000000000000'),
  },
  {
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    amount: BigNumber.from('850000000000000000000'),
  },
];

const rewards = [
  [
    {
      symbol: 'WTLOS-USDT',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0xa9d436ab58989354a5c3705f24a5130779055e47',
      rate: BigNumber.from('1750000000000000000000'),
      period_finish: 0,
      decimals: 18,
    },
  ],
  [
    {
      symbol: 'USDC-USDT',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0xe4c412962fab7f2d406c43a8da95c68f9d60f24e',
      rate: BigNumber.from('2700000000000000000000'),
      period_finish: 0,
      decimals: 18,
    },
  ],
  [
    {
      symbol: 'STLOS-WTLOS',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
      rate: BigNumber.from('2000000000000000000000'),
      period_finish: 0,
      decimals: 18,
    },
    {
      symbol: 'STLOS-WTLOS',
      token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
      tokenSymbol: 'USDM',
      gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
      rate: BigNumber.from('400000000000000000000'),
      period_finish: 0,
      decimals: 18,
    },
  ],
];

const veRewards = [
  {
    symbol: 'tSYMM-WTLOS',
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    tokenSymbol: 'WTLOS',
    feeDistributor: '0x75d71288F0181a5c1C9f8c81755846954C37433A',
    rate: BigNumber.from('2000000000000000000000'),
    period_finish: 0,
    decimals: 18,
  },
  {
    symbol: 'tSYMM-WTLOS',
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    tokenSymbol: 'USDM',
    feeDistributor: '0x75d71288F0181a5c1C9f8c81755846954C37433A',
    rate: BigNumber.from('850000000000000000000'),
    period_finish: 0,
    decimals: 18,
  },
];

export default {
  signer,
  FeeDistributionScheduler,
  DistributionScheduler,
  timestamp,
  rewards,
  veRewards,
  approvals,
  veApprovals,
};
