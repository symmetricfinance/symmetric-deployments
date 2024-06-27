import { BigNumber, bn } from '@helpers/numbers';
import { Task, TaskMode } from '@src';

export type CreateAndAddGauge = {
  AuthorizerAdaptorEntrypoint: string;
  LiquidityGaugeFactory: string;
  GaugeController: string;
  signer: string;
  pools: { address: string; weight: BigNumber; gauge?: string }[];
};

const AuthorizerAdaptorEntrypoint = new Task('20221124-authorizer-adaptor-entrypoint', TaskMode.READ_ONLY);
const LiquidityGaugeFactory = new Task('20220822-mainnet-gauge-factory-v2', TaskMode.READ_ONLY);
const GaugeController = new Task('20220325-gauge-controller', TaskMode.READ_ONLY);

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const pools = [
  {
    address: '0xceb2728bf37332291fa44891414a53b1d6685782',
    weight: bn(5e16),
  },
];

export default {
  AuthorizerAdaptorEntrypoint,
  LiquidityGaugeFactory,
  GaugeController,
  signer,
  pools,
};
