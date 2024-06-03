export class SetImage {
  static readonly type = '[Image] Set Image';
  constructor(public payload: {File: File}) {}
}

export class GenerateHashtags {
  static readonly type = '[Image] Generate hashtags';
  constructor() {}
}

export class SetHashtagsLanguage {
  static readonly type = '[Image] Set hashtags language';
  constructor(public payload: {Language: string}) {}
}