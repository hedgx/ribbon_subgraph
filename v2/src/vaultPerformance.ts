import { Address } from "@graphprotocol/graph-ts";
import { RibbonThetaVault } from "../generated/RibbonETHCoveredCall/RibbonThetaVault";
import { Vault, VaultPerformanceUpdate } from "../generated/schema";

export function updateVaultPerformance(
  vaultAddress: string,
  timestamp: number
): void {
  let vault = Vault.load(vaultAddress);
  let newCounter = vault.performanceUpdateCounter + 1;
  let updateID = vault.id + "-" + newCounter.toString();

  vault.performanceUpdateCounter = vault.performanceUpdateCounter + 1;
  vault.save();

  let vaultContract = RibbonThetaVault.bind(Address.fromString(vaultAddress));

  let performanceUpdate = new VaultPerformanceUpdate(updateID);
  performanceUpdate.vault = vault.id;
  performanceUpdate.pricePerShare = vaultContract.pricePerShare();
  performanceUpdate.timestamp = i32(timestamp);
  performanceUpdate.save();
}
