import { Task, TaskMode } from '@src';

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
    rate: bigint;
    period_finish: number;
    decimals: number;
  }[][];
};

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const DistributionSchaduler = new Task('20230731-distribution-scheduler', TaskMode.READ_ONLY);
const FeeDistributionScheduler = new Task('20240529-fee-distribution-scheduler', TaskMode.READ_ONLY);
const timestamp = 1718841600;

const approvals = [
  {
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    amount: '14014933333333300000000',
  },
  {
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    amount: '280000000000000000000',
  },
];

const veApprovals = [
  {
    token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
    amount: '2038400000000000000000',
  },
  {
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    amount: '653333333333333000000',
  },
];

const rewards = [
  [
    {
      symbol: 'WTLOS-USDT',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0xa9d436ab58989354a5c3705f24a5130779055e47',
      rate: BigInt('1019200000000000000000') / BigInt('604800'),
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
      rate: BigInt('764400000000000000000') / BigInt('604800'),
      period_finish: 0,
      decimals: 18,
    },
    {
      symbol: 'USDC-USDT',
      token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
      tokenSymbol: 'USDM',
      gauge: '0xe4c412962fab7f2d406c43a8da95c68f9d60f24e',
      rate: BigInt('93333333333333300000') / BigInt('604800'),
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
      rate: BigInt('2548000000000000000000') / BigInt('604800'),
      period_finish: 0,
      decimals: 18,
    },
    {
      symbol: 'STLOS-WTLOS',
      token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
      tokenSymbol: 'USDM',
      gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
      rate: BigInt('186666666666667000000') / BigInt('604800'),
      period_finish: 0,
      decimals: 18,
    },
  ],
  [
    {
      symbol: 'wUSK-USDC',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0xe4c412962fab7f2d406c43a8da95c68f9d60f24e',
      rate: BigInt('6778333333333330000000') / BigInt('604800'),
      period_finish: 0,
      decimals: 18,
    },
  ],
  [
    {
      symbol: 'wUSK-STLOS',
      token: '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E',
      tokenSymbol: 'WTLOS',
      gauge: '0x30d9158f413937afa5693cb444174ca55f9e6b6c',
      rate: BigInt('2905000000000000000000') / BigInt('604800'),
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
    gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
    rate: BigInt('2548000000000000000000') / BigInt('604800'),
    period_finish: 0,
    decimals: 18,
  },
  {
    symbol: 'tSYMM-WTLOS',
    token: '0x8f7D64ea96D729EF24a0F30b4526D47b80d877B9',
    tokenSymbol: 'USDM',
    gauge: '0xec678e92afe25bc5ba4bc2e1ff386c775270e49e',
    rate: BigInt('186666666666667000000') / BigInt('604800'),
    period_finish: 0,
    decimals: 18,
  },
];

export default {
  signer,
  FeeDistributionScheduler,
  DistributionSchaduler,
  timestamp,
  rewards,
  approvals,
  veApprovals,
};
