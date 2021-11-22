// import { BigInt } from "@graphprotocol/graph-ts"
// import {
//   EasyAuction,
//   AuctionCleared,
//   CancellationSellOrder,
//   ClaimedFromOrder,
//   NewAuction,
//   NewSellOrder,
//   NewUser,
//   OwnershipTransferred,
//   UserRegistration
// } from "../generated/EasyAuction/EasyAuction"
// import { ExampleEntity } from "../generated/schema"

// export function handleAuctionCleared(event: AuctionCleared): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (entity == null) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.auctionId = event.params.auctionId
//   entity.soldAuctioningTokens = event.params.soldAuctioningTokens

//   // Entities can be written to the store with `.save()`
//   entity.save()

//   // Note: If a handler doesn't require existing field values, it is faster
//   // _not_ to load the entity from the store. Instead, create it fresh with
//   // `new Entity(...)`, set the fields that should be updated and save the
//   // entity back to the store. Fields that were not set or unset remain
//   // unchanged, allowing for partial updates to be applied.

//   // It is also possible to access smart contracts from mappings. For
//   // example, the contract that has emitted the event can be connected to
//   // with:
//   //
//   // let contract = Contract.bind(event.address)
//   //
//   // The following functions can then be called on this contract to access
//   // state variables and other data:
//   //
//   // - contract.FEE_DENOMINATOR(...)
//   // - contract.auctionAccessData(...)
//   // - contract.auctionAccessManager(...)
//   // - contract.auctionCounter(...)
//   // - contract.auctionData(...)
//   // - contract.claimFromParticipantOrder(...)
//   // - contract.containsOrder(...)
//   // - contract.feeNumerator(...)
//   // - contract.feeReceiverUserId(...)
//   // - contract.getSecondsRemainingInBatch(...)
//   // - contract.getUserId(...)
//   // - contract.initiateAuction(...)
//   // - contract.numUsers(...)
//   // - contract.owner(...)
//   // - contract.placeSellOrders(...)
//   // - contract.placeSellOrdersOnBehalf(...)
//   // - contract.registerUser(...)
//   // - contract.settleAuction(...)
// }

// export function handleCancellationSellOrder(
//   event: CancellationSellOrder
// ): void {}

// export function handleClaimedFromOrder(event: ClaimedFromOrder): void {}

// export function handleNewAuction(event: NewAuction): void {

// }

// export function handleNewSellOrder(event: NewSellOrder): void {}

// export function handleNewUser(event: NewUser): void {}

// export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

// export function handleUserRegistration(event: UserRegistration): void {}

// eventHandlers:
//   - event: AuctionCleared(indexed uint256,uint96,uint96,bytes32)
//     handler: handleAuctionCleared
//   - event: CancellationSellOrder(indexed uint256,indexed uint64,uint96,uint96)
//     handler: handleCancellationSellOrder
//   - event: ClaimedFromOrder(indexed uint256,indexed uint64,uint96,uint96)
//     handler: handleClaimedFromOrder
//   - event: NewAuction(indexed uint256,indexed address,indexed address,uint256,uint256,uint64,uint96,uint96,uint256,uint256,address,bytes)
//     handler: handleNewAuction
//   - event: NewSellOrder(indexed uint256,indexed uint64,uint96,uint96)
//     handler: handleNewSellOrder
