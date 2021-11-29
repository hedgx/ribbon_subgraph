import { Address, BigInt } from "@graphprotocol/graph-ts";
import { RibbonThetaVault } from "../generated/RibbonETHCoveredCall/RibbonThetaVault";
import {
  Vault,
  VaultPerformanceUpdate,
  VaultPerformanceUpdateHistory
} from "../generated/schema";
import { isExceptionForNewUpdate } from "./data/constant";

export function updateVaultPerformance(
  vaultAddress: string,
  timestamp: number
): void {
  let vault = Vault.load(vaultAddress);
  let round = vault.round;
  let vaultContract = RibbonThetaVault.bind(Address.fromString(vaultAddress));
  let vaultPerformanceUpdateId = vault.id + "-" + round.toString();

  let performanceUpdate = VaultPerformanceUpdate.load(vaultPerformanceUpdateId);
  let newPricePerShare = vaultContract.pricePerShare();

  if (isExceptionForNewUpdate(vaultAddress, timestamp)) {
    let prevRound = round - 1;
    let prevPerformanceUpdate = VaultPerformanceUpdate.load(
      vault.id + "-" + prevRound.toString()
    );
    newPricePerShare = prevPerformanceUpdate.pricePerShare;
  }

  let vaultPerformanceUpdateHistoryId = vaultPerformanceUpdateId;

  if (performanceUpdate == null) {
    /**
     * On auction cleared, record performance update of the week
     */
    performanceUpdate = new VaultPerformanceUpdate(vaultPerformanceUpdateId);
    performanceUpdate.vault = vault.id;
    performanceUpdate.pricePerShare = newPricePerShare;
    performanceUpdate.round = vault.round;

    vaultPerformanceUpdateHistoryId = vaultPerformanceUpdateHistoryId + "-0";
  } else {
    /**
     * On close short, we update pricePerShare with registered round price per share from contract
     */
    performanceUpdate.pricePerShare = vaultContract.roundPricePerShare(
      BigInt.fromI32(round)
    );

    vaultPerformanceUpdateHistoryId = vaultPerformanceUpdateHistoryId + "-1";
  }

  performanceUpdate.timestamp = i32(timestamp);
  performanceUpdate.save();

  let history = new VaultPerformanceUpdateHistory(
    vaultPerformanceUpdateHistoryId
  );
  history.vault = vault.id;
  history.pricePerShare = performanceUpdate.pricePerShare;
  history.timestamp = performanceUpdate.timestamp;
  history.round = performanceUpdate.round;
  history.save();
}
