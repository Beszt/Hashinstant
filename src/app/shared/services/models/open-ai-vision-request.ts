export interface OpenAiVisionRequest {
  model: string;
  messages: Array<{
    role: 'user';
    content: Array<{
      type: 'text';
      text: string;
    } | {
      type: 'image_url';
      image_url: {
        url: string;
      };
    }>;
  }>;
  max_tokens: number;
}