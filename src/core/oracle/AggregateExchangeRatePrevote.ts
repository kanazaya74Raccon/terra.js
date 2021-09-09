import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../bech32';
import { AggregateExchangeRatePrevote as AggregateExchangeRatePrevote_pb } from '@terra-money/terra.proto/src/terra/oracle/v1beta1/oracle_pb';

/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
export class AggregateExchangeRatePrevote extends JSONSerializable<AggregateExchangeRatePrevote.Data> {
  /**
   * @param hash aggregate vote hash
   * @param voter validator
   * @param submit_block block during which aggregate prevote was submitted
   */
  constructor(
    public hash: string,
    public voter: ValAddress,
    public submit_block: number
  ) {
    super();
  }

  public static fromData(
    data: AggregateExchangeRatePrevote.Data
  ): AggregateExchangeRatePrevote {
    const { hash, voter, submit_block } = data;
    return new AggregateExchangeRatePrevote(
      hash,
      voter,
      Number.parseInt(submit_block)
    );
  }

  public toData(): AggregateExchangeRatePrevote.Data {
    const { hash, voter, submit_block } = this;
    return {
      hash,
      voter,
      submit_block: submit_block.toFixed(),
    };
  }

  public static fromProto(
    data: AggregateExchangeRatePrevote.Proto
  ): AggregateExchangeRatePrevote {
    return new AggregateExchangeRatePrevote(
      data.getHash(),
      data.getVoter(),
      data.getSubmitBlock()
    );
  }

  public toProto(): AggregateExchangeRatePrevote.Proto {
    const { hash, voter, submit_block } = this;
    const aggregateExchangeRatePrevoteProto =
      new AggregateExchangeRatePrevote_pb();
    aggregateExchangeRatePrevoteProto.setHash(hash);
    aggregateExchangeRatePrevoteProto.setVoter(voter);
    aggregateExchangeRatePrevoteProto.setSubmitBlock(submit_block);
    return aggregateExchangeRatePrevoteProto;
  }
}

export namespace AggregateExchangeRatePrevote {
  export interface Data {
    hash: string;
    voter: ValAddress;
    submit_block: string;
  }

  export type Proto = AggregateExchangeRatePrevote_pb;
}
