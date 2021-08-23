import { BigInt, Address, log } from "@graphprotocol/graph-ts";
import { RibbonThetaVault } from "../generated/RibbonETHCoveredCall/RibbonThetaVault";
import {
  BalanceUpdate,
  ERC20Token,
  ERC20TokenAccount,
  Vault,
  VaultAccount,
} from "../generated/schema";

export function refreshAllAccountBalances(
  vaultAddress: Address,
  timestamp: i32
): void {
  let vault = Vault.load(vaultAddress.toHexString());
  let vaultContract = RibbonThetaVault.bind(vaultAddress);
  let totalBalance = vaultContract.totalBalance();
  let totalSupply = vaultContract.totalSupply();
  vault.totalBalance = totalBalance;
  vault.save();

  if (vault != null) {
    for (let i = 0; i < vault.numDepositors; i++) {
      let depositors = vault.depositors;
      let depositorAddress = depositors[i];
      if (depositorAddress != null) {
        _triggerBalanceUpdate(
          vaultAddress,
          depositorAddress as Address,
          timestamp,
          true,
          false,
          false,
          totalBalance,
          totalSupply
        );
      }
    }
  }
}

export function triggerBalanceUpdate(
  vaultAddress: Address,
  accountAddress: Address,
  timestamp: i32,
  accruesYield: bool,
  isWithdraw: bool
): void {
  let vault = Vault.load(vaultAddress.toHexString());
  let vaultContract = RibbonThetaVault.bind(vaultAddress);
  let totalBalance = vaultContract.totalBalance();
  let totalSupply = vaultContract.totalSupply();
  vault.totalBalance = totalBalance;
  vault.save();

  _triggerBalanceUpdate(
    vaultAddress,
    accountAddress,
    timestamp,
    accruesYield,
    isWithdraw,
    true,
    totalBalance,
    totalSupply
  );
}

export function _triggerBalanceUpdate(
  vaultAddress: Address,
  accountAddress: Address,
  timestamp: i32,
  accruesYield: bool,
  isWithdraw: bool,
  isRefresh: bool,
  totalBalance: BigInt,
  totalSupply: BigInt
): void {
  let vaultID = vaultAddress.toHexString();
  let vaultContract = RibbonThetaVault.bind(vaultAddress);
  let vaultAccount = VaultAccount.load(
    vaultAddress.toHexString() + "-" + accountAddress.toHexString()
  );

  if (vaultAccount == null) {
    return;
  }

  let prevUpdateCounter = vaultAccount.updateCounter;
  let updateCounter = prevUpdateCounter + 1;
  let updateID =
    vaultAddress.toHexString() +
    "-" +
    accountAddress.toHexString() +
    "-" +
    updateCounter.toString();

  let shares: BigInt;

  /**
   * If isRefresh, we proceed with getting new share amount from contract
   * Otherwise, in the case where there is no movement in shares, we will merely get back the sahres from vaultAccount
   */
  if (isRefresh) {
    let balanceCallResult = vaultContract.try_balanceOf(accountAddress);
    if (balanceCallResult.reverted) {
      log.error("calling balanceOf({}) on vault {}", [
        accountAddress.toHexString(),
        vaultAddress.toHexString()
      ]);
      return;
    }
    shares = balanceCallResult.value;
  } else {
    shares = vaultAccount.shares;
  }

  /**
   * Calculate new account balance based on shares
   */
  let accountBalance = (shares * totalBalance) / totalSupply;
  let stakeBalance =
    (vaultAccount.totalStakedShares * totalBalance) / totalSupply;
  let balance = accountBalance + stakeBalance;

  let update = new BalanceUpdate(updateID);
  update.vault = vaultID;
  update.account = accountAddress;
  update.timestamp = timestamp;
  update.balance = balance;
  update.yieldEarned = BigInt.fromI32(0);
  update.isWithdraw = isWithdraw;
  update.stakedBalance = stakeBalance;

  if (accruesYield) {
    let prevUpdateID =
      vaultAddress.toHexString() +
      "-" +
      accountAddress.toHexString() +
      "-" +
      prevUpdateCounter.toString();

    let prevUpdate = BalanceUpdate.load(prevUpdateID);
    if (prevUpdate != null) {
      let yieldEarned = balance.minus(prevUpdate.balance);

      if (yieldEarned.gt(BigInt.fromI32(0))) {
        update.yieldEarned = yieldEarned;
        vaultAccount.totalYieldEarned = vaultAccount.totalYieldEarned.plus(
          yieldEarned
        );
      }
    }
  }

  update.save();

  vaultAccount.updateCounter = updateCounter;
  vaultAccount.totalStakedBalance = stakeBalance;
  vaultAccount.totalBalance = balance;
  vaultAccount.shares = shares;
  vaultAccount.save();
}

export function createVaultAccount(
  vaultAddress: Address,
  accountAddress: Address
): VaultAccount {
  let vault = Vault.load(vaultAddress.toHexString());
  let vaultAccountID =
    vaultAddress.toHexString() + "-" + accountAddress.toHexString();

  let vaultAccount = VaultAccount.load(vaultAccountID);
  if (vaultAccount == null) {
    let depositors = vault.depositors;
    depositors.push(accountAddress);
    vault.depositors = depositors;

    vault.numDepositors = vault.numDepositors + 1;
    vault.save();

    vaultAccount = new VaultAccount(vaultAccountID);
    vaultAccount.vault = vaultAddress.toHexString();
    vaultAccount.account = accountAddress;
    vaultAccount.shares = BigInt.fromI32(0);
    vaultAccount.totalDeposits = BigInt.fromI32(0);
    vaultAccount.totalBalance = BigInt.fromI32(0);
    vaultAccount.totalYieldEarned = BigInt.fromI32(0);
    vaultAccount.updateCounter = 0;
    vaultAccount.totalStakedShares = BigInt.fromI32(0);
    vaultAccount.totalStakedBalance = BigInt.fromI32(0);
    vaultAccount.save();
  }
  return vaultAccount as VaultAccount;
}

export function getOrCreateTokenAccount(
  tokenAddress: Address,
  accountAddress: Address,
  token: ERC20Token
): ERC20TokenAccount {
  let tokenAccountID =
    tokenAddress.toHexString() + "-" + accountAddress.toHexString();

  let tokenAccount = ERC20TokenAccount.load(tokenAccountID);
  if (tokenAccount == null) {
    let holders = token.holders;
    holders.push(accountAddress);
    token.holders = holders;

    token.numHolders = token.numHolders + 1;
    token.save();

    tokenAccount = new ERC20TokenAccount(tokenAccountID);
    tokenAccount.token = tokenAddress.toHexString();
    tokenAccount.account = accountAddress;
    tokenAccount.balance = BigInt.fromI32(0);
    tokenAccount.save();
  }
  return tokenAccount as ERC20TokenAccount;
}
