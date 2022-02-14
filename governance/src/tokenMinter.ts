import { TokenMinterDistribution } from "../generated/schema";
import { Minted } from "../generated/TokenMinter/TokenMinter";

export function handleMinted(event: Minted): void {
  let gaugeAddress = event.params.gauge.toHexString();
  let mintedAmount = event.params.minted
  let newMinted = new TokenMinterDistribution(gaugeAddress)
  newMinted.amount = newMinted.amount ? newMinted.amount!.plus(mintedAmount) : mintedAmount
  newMinted.save()
}