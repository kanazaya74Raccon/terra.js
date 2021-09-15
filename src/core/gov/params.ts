import { Coins } from '../Coins';
import { ParamChange } from '../params/ParamChange';
import { Dec } from '../numeric';

export interface DepositParams {
  /** Minimum deposit to enter voting. */
  min_deposit: Coins;

  /** Amount of time (in seconds) a proposal can take to acquire the necessary deposits to enter voting stage, after being submitted. */
  max_deposit_period: number;
}

export namespace DepositParams {
  export interface Data {
    min_deposit: Coins.Data;
    max_deposit_period: string;
  }
}

export interface VotingParams {
  /** Amount of time (in seconds) a proposal can take to get votes once voting has begun. */
  voting_period: number;
}

export namespace VotingParams {
  export interface Data {
    voting_period: string;
  }
}

export interface TallyParams {
  /** Ratio of total staked tokens that need to have participated in the vote. */
  quorum: Dec;

  /** Ratio of participating tokens that have voted in favor of the proposal. */
  threshold: Dec;

  /** Ratio of participating votes with `NoWithVeto` (after excluding `Abstain` votes) to veto the proposal. */
  veto_threshold: Dec;
}

export namespace TallyParams {
  export interface Data {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  }
}

type DepositParamsParamChange = ParamChange.Type<
  'gov',
  'depositparams',
  DepositParams
>;

type VotingParamsParamChange = ParamChange.Type<
  'gov',
  'votingparams',
  VotingParams
>;

type TallyParamsParamChange = ParamChange.Type<
  'gov',
  'tallyparams',
  TallyParams
>;

export type GovParamChange =
  | DepositParamsParamChange
  | VotingParamsParamChange
  | TallyParamsParamChange;

export namespace GovParamChange {
  export type Data =
    | ParamChange.Data.Type<DepositParamsParamChange>
    | ParamChange.Data.Type<VotingParamsParamChange>
    | ParamChange.Data.Type<TallyParamsParamChange>;
}

export interface GovParamChanges {
  gov?: {
    depositparams?: DepositParams;
    votingparams?: VotingParams;
    tallyparams?: TallyParams;
  };
}
