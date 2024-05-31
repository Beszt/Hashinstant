import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GenerateHashtags, SetImage } from '../actions/image.actions';
import { Image } from '../models/Image';
import { Injectable } from '@angular/core';
import { ImageConverter } from '../../Helpers/image-converter.helper';
import { OpenAiService } from '../services/open-ai.service';

@State<Image | undefined>({
  name: 'image',
  defaults: {
    Src: undefined,
    Hashtags: undefined,
  },
})
@Injectable()
export class ImageState {
  constructor(private readonly openAiService: OpenAiService) {}
  @Selector()
  static getImage(state: Image) {
    return state.Src;
  }

  @Selector()
  static getHashtags(state: Image) {
    return state.Hashtags;
  }

  @Action(SetImage)
  setImage(ctx: StateContext<Image>, action: SetImage) {
    ImageConverter.convertFileToBase64Image(action.payload).subscribe((img) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        Src: img,
        Hashtags: undefined
      });
    });
  }

  @Action(GenerateHashtags)
  generateHashtags(ctx: StateContext<Image>, action: GenerateHashtags) {
    const state = ctx.getState();

    if (state.Src == undefined) {
      return;
    }

    this.openAiService
      .PostImageAndGetMessage(state.Src)
      .subscribe((hashtags) => {
        ctx.setState({
          ...state,
          Hashtags: hashtags,
        });
      });
  }
}
