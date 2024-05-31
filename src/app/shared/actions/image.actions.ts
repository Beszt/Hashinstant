export class SetImage {
  static readonly type = '[Image] Set Image';
  constructor(public payload: File) {}
}

export class GenerateHashtags {
  static readonly type = '[Image] Generate Hashtags';
  constructor() {}
}
