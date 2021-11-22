import { BigInt } from "@graphprotocol/graph-ts";

export function getVaultFromUserId(userId: BigInt): string | null {
  // Yearn USDC Vault Strategy
  if (userId.equals(BigInt.fromI32(8586))) {
    return "rETH-THETA";
  } else if (userId.equals(BigInt.fromI32(8577))) {
    return "rBTC-THETA";
  }

  return null;
}
