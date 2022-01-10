import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import { oToken } from "../generated/GnosisAuction/oToken";
import { ERC20 } from "../generated/GnosisAuction/ERC20";
import {
  Token,
  Option
} from "../generated/schema";

export function createToken(
  newToken: Address
): Token {
  let tokenContract = ERC20.bind(newToken)
  let token = new Token(newToken.toHexString());
  token.address = newToken;
  token.name = tokenContract.name()
  token.symbol = tokenContract.symbol()
  token.decimals = tokenContract.decimals()
  token.save()

  return token as Token;
}

export function createOption(
  newOption: Address
): Option {
  let oTokenContract = oToken.bind(newOption)
  let oToken = new Option(newOption.toHexString());
  oToken.address = newOption;
  oToken.name = oTokenContract.name()
  oToken.symbol = oTokenContract.symbol()
  oToken.decimals = oTokenContract.decimals()
  oToken.expiry = oTokenContract.expiryTimestamp()
  oToken.strike = oTokenContract.strikePrice()
  oToken.underlying = oTokenContract.underlyingAsset().toHexString()
  oToken.put = oTokenContract.isPut()
  oToken.save()
  
  return oToken as Option;
}
