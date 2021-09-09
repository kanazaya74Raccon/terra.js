import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Denom } from '../../Denom';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgSwapSend as MsgSwapSend_pb } from '@terra-money/terra.proto/src/terra/market/v1beta1/tx_pb';

/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
export class MsgSwapSend extends JSONSerializable<MsgSwapSend.Data> {
  /**
   * @param from_address sender's account address
   * @param to_address receiver's account address
   * @param offer_coin coin to be swapped (from)
   * @param ask_denom desired denomination (to)
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    public offer_coin: Coin,
    public ask_denom: Denom
  ) {
    super();
  }

  public static fromData(data: MsgSwapSend.Data): MsgSwapSend {
    const {
      value: { from_address, to_address, offer_coin, ask_denom },
    } = data;
    return new MsgSwapSend(
      from_address,
      to_address,
      Coin.fromData(offer_coin),
      ask_denom
    );
  }

  public toData(): MsgSwapSend.Data {
    const { from_address, to_address, offer_coin, ask_denom } = this;
    return {
      type: 'market/MsgSwapSend',
      value: {
        from_address,
        to_address,
        offer_coin: offer_coin.toData(),
        ask_denom,
      },
    };
  }

  public static fromProto(proto: MsgSwapSend.Proto): MsgSwapSend {
    return new MsgSwapSend(
      proto.getFromAddress(),
      proto.getToAddress(),
      Coin.fromProto(proto.getOfferCoin() as Coin.Proto),
      proto.getAskDenom()
    );
  }

  public toProto(): MsgSwapSend.Proto {
    const { from_address, to_address, offer_coin, ask_denom } = this;
    const msgSwapSendProto = new MsgSwapSend_pb();
    msgSwapSendProto.setFromAddress(from_address);
    msgSwapSendProto.setToAddress(to_address);
    msgSwapSendProto.setOfferCoin(offer_coin.toProto());
    msgSwapSendProto.setAskDenom(ask_denom);
    return msgSwapSendProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/terra.market.v1beta1.MsgSwapSend');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgSwapSend {
    return MsgSwapSend.fromProto(
      MsgSwapSend_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgSwapSend {
  export interface Data {
    type: 'market/MsgSwapSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      offer_coin: Coin.Data;
      ask_denom: Denom;
    };
  }

  export type Proto = MsgSwapSend_pb;
}
