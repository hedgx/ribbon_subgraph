// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class InstrumentPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save InstrumentPosition entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save InstrumentPosition entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("InstrumentPosition", id.toString(), this);
  }

  static load(id: string): InstrumentPosition | null {
    return store.get("InstrumentPosition", id) as InstrumentPosition | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get instrumentAddress(): Bytes {
    let value = this.get("instrumentAddress");
    return value.toBytes();
  }

  set instrumentAddress(value: Bytes) {
    this.set("instrumentAddress", Value.fromBytes(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }

  get cost(): BigInt {
    let value = this.get("cost");
    return value.toBigInt();
  }

  set cost(value: BigInt) {
    this.set("cost", Value.fromBigInt(value));
  }

  get exercised(): boolean {
    let value = this.get("exercised");
    return value.toBoolean();
  }

  set exercised(value: boolean) {
    this.set("exercised", Value.fromBoolean(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get optionTypes(): Array<i32> {
    let value = this.get("optionTypes");
    return value.toI32Array();
  }

  set optionTypes(value: Array<i32>) {
    this.set("optionTypes", Value.fromI32Array(value));
  }

  get strikePrices(): Array<BigInt> {
    let value = this.get("strikePrices");
    return value.toBigIntArray();
  }

  set strikePrices(value: Array<BigInt>) {
    this.set("strikePrices", Value.fromBigIntArray(value));
  }

  get venues(): Array<string> {
    let value = this.get("venues");
    return value.toStringArray();
  }

  set venues(value: Array<string>) {
    this.set("venues", Value.fromStringArray(value));
  }

  get expiry(): BigInt {
    let value = this.get("expiry");
    return value.toBigInt();
  }

  set expiry(value: BigInt) {
    this.set("expiry", Value.fromBigInt(value));
  }

  get exerciseProfit(): BigInt | null {
    let value = this.get("exerciseProfit");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set exerciseProfit(value: BigInt | null) {
    if (value === null) {
      this.unset("exerciseProfit");
    } else {
      this.set("exerciseProfit", Value.fromBigInt(value as BigInt));
    }
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vault entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vault entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vault", id.toString(), this);
  }

  static load(id: string): Vault | null {
    return store.get("Vault", id) as Vault | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get numDepositors(): i32 {
    let value = this.get("numDepositors");
    return value.toI32();
  }

  set numDepositors(value: i32) {
    this.set("numDepositors", Value.fromI32(value));
  }

  get totalPremiumEarned(): BigInt {
    let value = this.get("totalPremiumEarned");
    return value.toBigInt();
  }

  set totalPremiumEarned(value: BigInt) {
    this.set("totalPremiumEarned", Value.fromBigInt(value));
  }

  get totalWithdrawalFee(): BigInt {
    let value = this.get("totalWithdrawalFee");
    return value.toBigInt();
  }

  set totalWithdrawalFee(value: BigInt) {
    this.set("totalWithdrawalFee", Value.fromBigInt(value));
  }

  get depositors(): Array<Bytes> {
    let value = this.get("depositors");
    return value.toBytesArray();
  }

  set depositors(value: Array<Bytes>) {
    this.set("depositors", Value.fromBytesArray(value));
  }
}

export class VaultShortPosition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultShortPosition entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultShortPosition entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultShortPosition", id.toString(), this);
  }

  static load(id: string): VaultShortPosition | null {
    return store.get("VaultShortPosition", id) as VaultShortPosition | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get option(): Bytes {
    let value = this.get("option");
    return value.toBytes();
  }

  set option(value: Bytes) {
    this.set("option", Value.fromBytes(value));
  }

  get depositAmount(): BigInt {
    let value = this.get("depositAmount");
    return value.toBigInt();
  }

  set depositAmount(value: BigInt) {
    this.set("depositAmount", Value.fromBigInt(value));
  }

  get initiatedBy(): Bytes {
    let value = this.get("initiatedBy");
    return value.toBytes();
  }

  set initiatedBy(value: Bytes) {
    this.set("initiatedBy", Value.fromBytes(value));
  }

  get strikePrice(): BigInt {
    let value = this.get("strikePrice");
    return value.toBigInt();
  }

  set strikePrice(value: BigInt) {
    this.set("strikePrice", Value.fromBigInt(value));
  }

  get expiry(): BigInt {
    let value = this.get("expiry");
    return value.toBigInt();
  }

  set expiry(value: BigInt) {
    this.set("expiry", Value.fromBigInt(value));
  }

  get openedAt(): BigInt {
    let value = this.get("openedAt");
    return value.toBigInt();
  }

  set openedAt(value: BigInt) {
    this.set("openedAt", Value.fromBigInt(value));
  }

  get closedAt(): BigInt | null {
    let value = this.get("closedAt");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set closedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("closedAt");
    } else {
      this.set("closedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get premiumEarned(): BigInt {
    let value = this.get("premiumEarned");
    return value.toBigInt();
  }

  set premiumEarned(value: BigInt) {
    this.set("premiumEarned", Value.fromBigInt(value));
  }

  get trades(): Array<string> {
    let value = this.get("trades");
    return value.toStringArray();
  }

  set trades(value: Array<string>) {
    this.set("trades", Value.fromStringArray(value));
  }
}

export class VaultOptionTrade extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultOptionTrade entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultOptionTrade entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultOptionTrade", id.toString(), this);
  }

  static load(id: string): VaultOptionTrade | null {
    return store.get("VaultOptionTrade", id) as VaultOptionTrade | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get vaultShortPosition(): string {
    let value = this.get("vaultShortPosition");
    return value.toString();
  }

  set vaultShortPosition(value: string) {
    this.set("vaultShortPosition", Value.fromString(value));
  }

  get buyer(): Bytes {
    let value = this.get("buyer");
    return value.toBytes();
  }

  set buyer(value: Bytes) {
    this.set("buyer", Value.fromBytes(value));
  }

  get sellAmount(): BigInt {
    let value = this.get("sellAmount");
    return value.toBigInt();
  }

  set sellAmount(value: BigInt) {
    this.set("sellAmount", Value.fromBigInt(value));
  }

  get premium(): BigInt {
    let value = this.get("premium");
    return value.toBigInt();
  }

  set premium(value: BigInt) {
    this.set("premium", Value.fromBigInt(value));
  }

  get optionToken(): Bytes {
    let value = this.get("optionToken");
    return value.toBytes();
  }

  set optionToken(value: Bytes) {
    this.set("optionToken", Value.fromBytes(value));
  }

  get premiumToken(): Bytes {
    let value = this.get("premiumToken");
    return value.toBytes();
  }

  set premiumToken(value: Bytes) {
    this.set("premiumToken", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get txhash(): Bytes {
    let value = this.get("txhash");
    return value.toBytes();
  }

  set txhash(value: Bytes) {
    this.set("txhash", Value.fromBytes(value));
  }
}

export class VaultTransaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save VaultTransaction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save VaultTransaction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("VaultTransaction", id.toString(), this);
  }

  static load(id: string): VaultTransaction | null {
    return store.get("VaultTransaction", id) as VaultTransaction | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get vault(): string {
    let value = this.get("vault");
    return value.toString();
  }

  set vault(value: string) {
    this.set("vault", Value.fromString(value));
  }

  get type(): string {
    let value = this.get("type");
    return value.toString();
  }

  set type(value: string) {
    this.set("type", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get txhash(): Bytes {
    let value = this.get("txhash");
    return value.toBytes();
  }

  set txhash(value: Bytes) {
    this.set("txhash", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get fee(): BigInt {
    let value = this.get("fee");
    return value.toBigInt();
  }

  set fee(value: BigInt) {
    this.set("fee", Value.fromBigInt(value));
  }
}
