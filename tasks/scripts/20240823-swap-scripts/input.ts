import { Task, TaskMode } from '@src';

export type UpdateProtocolFeePercentageCache = {
  signer: string;
  Vault: string;
  poolId: string;
  token1: string;
  token2: string;
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

const signer = '0xFb4D6288D1c51292dC9899f5F876A2Cf1f9fef43';

const poolId = '0x058d4893efa235d86cceed5a7eef0809b76c8c66000000000000000000000004';

const token2 = '0x975Ed13fa16857E83e7C493C7741D556eaaD4A3f';
const token1 = '0x8D97Cea50351Fb4329d591682b148D43a0C3611b';

export default {
  Vault,
  signer,
  poolId,
  token1,
  token2,
};
