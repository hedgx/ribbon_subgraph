import { BigInt, Address } from "@graphprotocol/graph-ts";
import { GnosisAuction } from "../generated/GnosisAuction/GnosisAuction";
import {
  Account,
} from "../generated/schema";

export function createAccount(
  newAccount: Address
): Account {
  let account = new Account(newAccount.toHexString());
  account.account = newAccount;
  account.save()

  return account as Account;
}
