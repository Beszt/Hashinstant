export const environment = {
  AppName: 'Hashinstant',
  PictureLongerSideSize: 500,
  Api: {
    Token: '',
    Uri: 'https://api.openai.com/v1/chat/completions',
    Model: 'gpt-4o',
    MaxTokens: 300,
  },
  Prompt: {
    TargetSocialMedia: 'Instagram',
    DefaultLanguage: 'English',
    MaximumHashtagsCount: 20,
    HashtagsDelimiter: ' ',
  }
};
