// import { BigNumber } from "ethers";
import { BigInt } from "@graphprotocol/graph-ts";

// export interface SellOrder {
//     sellAmount: BigNumber
//     buyAmount: BigNumber
//   }
  
//   export interface Order {
//     sellAmount: BigNumber
//     buyAmount: BigNumber
//     userId: BigNumber
//   }

// export function decodeOrder(bytes: string): Order {
//     return {
//       userId: BigNumber.from('0x' + bytes.substring(2, 18)),
//       buyAmount: BigNumber.from('0x' + bytes.substring(19, 42)),
//       sellAmount: BigNumber.from('0x' + bytes.substring(43, 66)),
//     }
  // }
  
export function encodeOrder(userId: BigInt, buyAmount: BigInt, sellAmount: BigInt): string {
  return (
    '0x' +
    userId.toHexString().slice(2).padStart(16, '0') +
    buyAmount.toHexString().slice(2).padStart(24, '0') +
    sellAmount.toHexString().slice(2).padStart(24, '0')
  )
}