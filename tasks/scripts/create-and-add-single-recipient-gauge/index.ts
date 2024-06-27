import { Task, TaskRunOptions } from '@src';
import { CreateAndAddGauge } from './input';
import { ethers } from 'hardhat';

export default async (task: Task, { from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as CreateAndAddGauge;

  const signer = await ethers.getSigner(input.signer);

  const gaugeFactoryABI = ['function create(address addr, uint256 weight, bool feeDistributorRecipient)'];
  const gaugeFactory = new ethers.Contract(input.SingleRecipientGaugeFactory, gaugeFactoryABI, signer);

  const authorizerAdaptorABI = ['function performAction(address target, bytes data)'];
  const aae = new ethers.Contract(input.AuthorizerAdaptorEntrypoint, authorizerAdaptorABI, signer);

  const gaugeControllerABI = ['function add_gauge(address addr, int128 gauge_type)'];
  const gaugeController = new ethers.Contract(input.GaugeController, gaugeControllerABI, signer);

  for (const pool of input.pools) {
    let gaugeAddress = pool.gauge;

    if (!pool.gauge) {
      const receipt = await (
        await gaugeFactory.create(pool.recipient, pool.weight, pool.feeDistributorRecipient)
      ).wait();

      gaugeAddress = receipt.events[1].address;

      console.log('Gauge created for recipient', pool.recipient, 'at', gaugeAddress);
    }

    const addGaugeData = gaugeController.interface.encodeFunctionData('add_gauge', [gaugeAddress, 0]);

    const controllerReceipt = await (await aae.performAction(input.GaugeController, addGaugeData)).wait();

    console.log(controllerReceipt);
    console.log('Gauge', gaugeAddress, 'added to controller');
  }
};
