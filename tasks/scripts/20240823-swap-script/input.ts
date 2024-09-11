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

const poolId = '0x03b038d9ad0a69339c9af310ac0f205e2670f9b200020000000000000000001b';

const token1 = '0xfdfF55a36f3dd3942A4Ac5Aebe68972d57296925';
const token2 = '0xB4B01216a5Bc8F1C8A33CD990A1239030E60C905';

export default {
  Vault,
  signer,
  poolId,
  token1,
  token2,
};
