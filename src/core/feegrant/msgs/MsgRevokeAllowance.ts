import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRevokeAllowance as MsgRevokeAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx';

/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
export class MsgRevokeAllowance extends JSONSerializable<MsgRevokeAllowance.Data> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   */
  constructor(public granter: AccAddress, public grantee: AccAddress) {
    super();
  }

  public static fromData(data: MsgRevokeAllowance.Data): MsgRevokeAllowance {
    const {
      value: { granter, grantee },
    } = data;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toData(): MsgRevokeAllowance.Data {
    const { granter, grantee } = this;
    return {
      type: 'feegrant/MsgRevokeAllowance',
      value: {
        granter,
        grantee,
      },
    };
  }

  public static fromProto(proto: MsgRevokeAllowance.Proto): MsgRevokeAllowance {
    return new MsgRevokeAllowance(proto.granter, proto.grantee);
  }

  public toProto(): MsgRevokeAllowance.Proto {
    const { granter, grantee } = this;
    return MsgRevokeAllowance_pb.fromPartial({
      grantee,
      granter,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      value: MsgRevokeAllowance_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgRevokeAllowance {
    return MsgRevokeAllowance.fromProto(
      MsgRevokeAllowance_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgRevokeAllowance {
  export interface Data {
    type: 'feegrant/MsgRevokeAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
    };
  }

  export type Proto = MsgRevokeAllowance_pb;
}
