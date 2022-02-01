import { BigInt } from "@graphprotocol/graph-ts";
import {
  AuctionCleared,
  NewAuction,
  NewSellOrder,
  CancellationSellOrder,
  ClaimedFromOrder,
} from "../generated/GnosisAuction/GnosisAuction";
import {
  Auction,
  Bid,
  Account,
} from "../generated/schema";
import { auroraKeeper, avaxKeeper, kovanKeeper, kovanOtherKeeper, mainnetKeeper } from "./data/constant";
import { createOption, createToken } from "./token"
import { encodeOrder } from "./utils";

export function handleSellOrder(event: NewSellOrder): void {
  let auction = Auction.load(event.params.auctionId.toString())

  let bid = new Bid(
    event.params.auctionId.toString() 
    + "-" + event.params.userId.toString()
    + "-" + event.params.buyAmount.toString()
    + "-" + event.params.sellAmount.toString()
  )

  let account = Account.load(event.transaction.from.toHexString())
  if (!account) {
    account = new Account(event.transaction.from.toHexString())
    account.address = event.transaction.from
    account.userid = event.params.userId.toString()

    account.save()
  }
  
  if (auction) {
    bid.index = event.block.timestamp
    bid.auction = event.params.auctionId.toI32()
    bid.account = account.id.toString()
    bid.size = event.params.buyAmount
    bid.payable = event.params.sellAmount
    bid.createtx = event.transaction.hash
    bid.bytes = encodeOrder(
      event.params.userId,
      event.params.buyAmount,
      event.params.sellAmount
    )
    
    bid.save()
  }
}

export function handleCancellation(event: CancellationSellOrder): void {
  let bid = Bid.load(
    event.params.auctionId.toString() 
    + "-" + event.params.userId.toString()
    + "-" + event.params.buyAmount.toString()
    + "-" + event.params.sellAmount.toString()
  )

  if (bid) {
    bid.canceltx = event.transaction.hash
    bid.save()
  }
}

export function handleClaim(event: ClaimedFromOrder): void {
  let bid = Bid.load(
    event.params.auctionId.toString() 
    + "-" + event.params.userId.toString()
    + "-" + event.params.buyAmount.toString()
    + "-" + event.params.sellAmount.toString()
  )

  if (bid) {
    bid.claimtx = event.transaction.hash
    bid.save()
  }
}

export function handleAuctionCleared(event: AuctionCleared): void {
  let auction = Auction.load(event.params.auctionId.toString())

  if (auction) {
    auction.filled = event.params.soldAuctioningTokens
    auction.clearing = event.params.clearingPriceOrder
    auction.live = false

    auction.save()
  }
}

export function handleNewAuction(event: NewAuction): void {
  let sender = event.transaction.from.toHexString()
  if (sender == mainnetKeeper || sender == avaxKeeper || sender == kovanKeeper || sender == kovanOtherKeeper || sender == auroraKeeper) {
    let auction = new Auction(event.params.auctionId.toString())
    let option = createOption(event.params._auctioningToken)
    let token = createToken(event.params._biddingToken)
    
    auction.option = option.address.toHexString()
    auction.bidding = token.address.toHexString()
    auction.minimum = event.params._minBuyAmount
    auction.size = event.params._auctionedSellAmount
    auction.start = event.block.timestamp
    auction.end = event.params.auctionEndDate
    auction.bids = 0
    auction.filled = BigInt.fromI32(0)
    auction.clearing = event.params.allowListData
    auction.spot = 0
    auction.live = true

    auction.save()
  }
}