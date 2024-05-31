export interface OpenAiVisionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      index: number;
      message: {
        role: 'assistant';
        content: string;
      };
      logprobs: null | any;
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
    system_fingerprint: string;
  }