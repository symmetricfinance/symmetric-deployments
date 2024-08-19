import { BigNumber, bn } from '@helpers/numbers';
import { Task, TaskMode } from '@src';

export type CreateAndAddGauge = {
  AuthorizerAdaptorEntrypoint: string;
  SingleRecipientGaugeFactory: string;
  GaugeController: string;
  signer: string;
  pools: { recipient: string; weight: BigNumber; feeDistributorRecipient: boolean; gauge?: string }[];
};

const AuthorizerAdaptorEntrypoint = new Task('20221124-authorizer-adaptor-entrypoint', TaskMode.READ_ONLY);
const SingleRecipientGaugeFactory = new Task('20230215-single-recipient-gauge-factory-v2', TaskMode.READ_ONLY);
const GaugeController = new Task('20220325-gauge-controller', TaskMode.READ_ONLY);

const signer = '0x7255Db0d1C1B93Fb756157074fa0613Aa6878F31';

const pools = [
  {
    recipient: '0xaEB23704BeCa8180FCB8Fa1194651b957C1dD5b2',
    weight: bn(100e16),
    feeDistributorRecipient: true,
    gauge: '0x306F5A0b2976A1c6a526cbBfD0d33C8232a467c2',
  },
];

export default {
  AuthorizerAdaptorEntrypoint,
  SingleRecipientGaugeFactory,
  GaugeController,
  signer,
  pools,
};
