import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgBoxComponent {
  @Select(ImageState.Image)
  imageSrc$!: Observable<String | undefined>;

  @Select(ImageState.Hashtags)
  Imagehashtags$!: Observable<String | undefined>;
}
