import { Task, TaskRunOptions } from '@src';
import { ComposableStablePoolDeployment } from './input';

import { ZERO_BYTES32 } from '@helpers/constants';
import * as expectEvent from '@helpers/expectEvent';
import { saveContractDeploymentTransactionHash } from '@src';
import { ethers } from 'hardhat';
import PoolCreationHelperABI from './PoolCreationHelper.json';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ComposableStablePoolDeployment;

  const factory = new ethers.Contract(
    input.PoolCreationHelper,
    PoolCreationHelperABI,
    await ethers.getSigner(input.signer)
  );

  const ERC20ABI = ['function approve(address spender, uint256 amount) returns (bool)'];

  for (const pool of input.pools) {
    // for (let i = 0; i < pool.tokens.length; i++) {
    //   const tokenContract = new ethers.Contract(pool.tokens[i], ERC20ABI, await ethers.getSigner(input.signer));
    //   await (await tokenContract.approve(input.PoolCreationHelper, pool.weiAmountsPerToken[i])).wait();
    //   console.log('Approved', pool.tokens[i], 'for', input.PoolCreationHelper);
    // }

    const poolCreationReceipt = await (
      await factory.createAndJoinStableSwap(
        pool.name,
        pool.symbol,
        pool.tokens,
        pool.amplificationParameter,
        pool.rateProviders,
        pool.exemptFees,
        pool.weiAmountsPerToken,
        pool.swapFeePercentage,
        ZERO_BYTES32
      )
    ).wait();
    const event = expectEvent.inReceipt(poolCreationReceipt, 'PoolCreated');
    const poolAddress = event.args.pool;

    saveContractDeploymentTransactionHash(poolAddress, poolCreationReceipt.transactionHash, task.network);
    task.save({ [pool.symbol]: poolAddress });

    console.log('Pool created for', pool.name, 'at', poolAddress);
  }
};
