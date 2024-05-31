import { Component, Input } from '@angular/core';
import { Image } from '../shared/models/Image';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
import { ImageState } from '../shared/state/image.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-box.component.html',
  styleUrl: './image-box.component.css',
})
export class ImgBoxComponent {
  @Select(ImageState.getImage)
  image$!: Observable<String | undefined>;

  @Select(ImageState.getHashtags)
  hashtags$!: Observable<String | undefined>;
}
