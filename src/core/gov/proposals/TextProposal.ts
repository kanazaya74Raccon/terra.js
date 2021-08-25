import { JSONSerializable } from '../../../util/json';

/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export class TextProposal extends JSONSerializable<TextProposal.Data> {
  /**
   * @param title proposal's title
   * @param description proposal's description
   */
  constructor(public title: string, public description: string) {
    super();
  }

  public static fromData(data: TextProposal.Data): TextProposal {
    const {
      value: { title, description },
    } = data;
    return new TextProposal(title, description);
  }

  public toData(): TextProposal.Data {
    const { title, description } = this;
    return {
      type: 'gov/TextProposal',
      value: {
        title,
        description,
      },
    };
  }

  public static fromProto(proto: TextProposal.Proto): TextProposal {
    const { title, description } = proto;
    return new TextProposal(title, description);
  }

  public toProto(): TextProposal.Proto {
    const { title, description } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.TextProposal',
      title,
      description,
    };
  }
}

export namespace TextProposal {
  export interface Data {
    type: 'gov/TextProposal';
    value: {
      title: string;
      description: string;
    };
  }

  export interface Proto {
    '@type': '/cosmos.gov.v1beta1.TextProposal';
    title: string;
    description: string;
  }
}
