import { Task } from '@src';
import { CollectProtocolFees } from './input';
import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';

export default async (task: Task): Promise<void> => {
  const input = task.input() as CollectProtocolFees;

  const signer = await ethers.getSigner(input.signer);

  const pools = input.pools;

  const ProtocolFeesCollectorABI = [
    'function getCollectedFeeAmounts(address[] memory tokens) view returns (uint256[])',
    'function withdrawCollectedFees(address[] calldata tokens, uint256[] calldata amounts, address recipient)',
  ];

  console.log('ProtocolFeesCollector:', input.ProtocolFeesCollector);
  const ProtocolFeesCollector = new ethers.Contract(input.ProtocolFeesCollector, ProtocolFeesCollectorABI, signer);

  const tokens = pools.map((pool) => pool.substring(0, 42));
  console.log('Tokens:', tokens);

  const collectedFees = (await ProtocolFeesCollector.getCollectedFeeAmounts(tokens)) as BigNumber[];

  console.log('Collected fees:', collectedFees);

  // //Send to Governance
  // const teamReceipt = await (
  //   await ProtocolFeesCollector.withdrawCollectedFees(tokens, collectedFees, input.Governance)
  // ).wait();
  // console.log('Sent to Governance at tx:', teamReceipt.transactionHash);
};
