import { BigInt } from "@graphprotocol/graph-ts";
import {
  CancellationSellOrder,
  EasyAuction,
  NewAuction,
  NewSellOrder
} from "../generated/GnosisEasyAuction/EasyAuction";
import { Auction, AuctionSellOrder } from "../generated/schema";
import { getVaultFromUserId } from "./data/constant";

export function handleNewAuction(event: NewAuction): void {
  let vault = getVaultFromUserId(event.params.userId);

  /**
   * We only index auction related to ribbon
   */
  if (!vault) {
    return;
  }

  /**
   * Create new auction
   */
  let auction = new Auction(event.params.auctionId.toString());
  let contract = EasyAuction.bind(event.address);

  let auctionData = contract.auctionData(event.params.auctionId);

  auction.auctionToken = auctionData.value0;
  auction.biddingToken = auctionData.value1;
  auction.orderCancellationEndDate = auctionData.value2;
  auction.auctionEndDate = auctionData.value3;
  auction.auctionedSellAmount = event.params._auctionedSellAmount;
  auction.vault = vault;
  auction.orderCounter = 0;

  auction.save();
}

export function handleNewSellOrder(event: NewSellOrder): void {
  let auction = Auction.load(event.params.auctionId.toString());

  /**
   * We ignore sell order that is not related to Ribbon
   */
  if (!auction) {
    return;
  }

  auction.orderCounter = auction.orderCounter + 1;
  auction.save();

  let sellOrderId =
    auction.id + "-" + BigInt.fromI32(auction.orderCounter).toString();

  /**
   * Create sell order
   */
  let sellOrder = new AuctionSellOrder(sellOrderId);
  sellOrder.auction = auction.id;
  sellOrder.buyAmount = event.params.buyAmount;
  sellOrder.sellAmount = event.params.sellAmount;
  sellOrder.bidderAddress = event.transaction.from;
  sellOrder.active = true;

  sellOrder.save();
}

export function handleCancellationSellOrder(
  event: CancellationSellOrder
): void {
  let auction = Auction.load(event.params.auctionId.toString());

  /**
   * We ignore sell order that is not related to Ribbon
   */
  if (!auction) {
    return;
  }

  for (let i = 1; i <= auction.orderCounter; i++) {
    let sellOrderId = auction.id + "-" + BigInt.fromI32(i).toString();
    let sellOrder = AuctionSellOrder.load(sellOrderId);

    if (
      sellOrder.sellAmount.equals(event.params.sellAmount) &&
      sellOrder.buyAmount.equals(event.params.buyAmount)
    ) {
      sellOrder.active = false;
      sellOrder.save();
    }
  }
}
