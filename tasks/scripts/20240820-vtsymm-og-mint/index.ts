import { Task } from '@src';
import { UpdateProtocolFeePercentageCache } from './input';
import { ethers } from 'hardhat';

export default async (task: Task): Promise<void> => {
  const input = task.input() as UpdateProtocolFeePercentageCache;

  const signer = await ethers.getSigner(input.signer);

  const nftABI = ['function safeMint(address to)'];

  for (const wallet of input.wallets) {
    // console.log('Minting NFT for', wallet);
    const nftContract = new ethers.Contract(input.nftContract, nftABI, signer);
    await (await nftContract.safeMint(wallet)).wait();
    console.log('Minted NFT for', wallet);
  }
};
