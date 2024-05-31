import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GenerateHashtags, SetImage } from '../actions/image.actions';
import { Image } from '../models/Image';
import { Injectable } from '@angular/core';
import { ImageConverter } from '../../Helpers/image-converter.helper';

@State<Image | undefined>({
  name: 'image',
  defaults: {
    Path: undefined,
    Hashtags: undefined,
  },
})
@Injectable()
export class ImageState {
  @Selector()
  static getImage(state: Image) {
    return state;
  }

  @Action(SetImage)
  setImage(ctx: StateContext<Image>, action: SetImage) {
    ImageConverter.convertFileToBase64Image(action.payload).subscribe((img) => {
      const state = ctx.getState();
      ctx.setState({
        ...state,
        Path: img,
      });
    });
  }

  @Action(GenerateHashtags)
  generateHashtags(ctx: StateContext<Image>, action: GenerateHashtags) {
    const result = [
      '#nature',
      '#photo',
      '#instagood',
      '#picoftheday',
      '#love',
      '#beautiful',
      '#happy',
      '#followme',
      '#art',
      '#selfie',
    ].join(' ');

    const state = ctx.getState();
    ctx.setState({
      ...state,
      Hashtags: result,
    });
  }
}
