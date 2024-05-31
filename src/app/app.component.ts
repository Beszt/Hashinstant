import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './image-box/image-box.component';
import { Image } from './shared/models/Image';
import { Select, Store } from '@ngxs/store';
import { GenerateHashtags, SetImage } from './shared/actions/image.actions';
import { Observable, delay } from 'rxjs';
import { ImageState } from './shared/state/image.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImgBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @Select(ImageState.getImage)
  image$!: Observable<Image | undefined>;

  constructor(private readonly store: Store) {}

  onUploadInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.store
        .dispatch(new SetImage(file))
        .pipe(delay(2000))
        .subscribe(() => {
          this.store.dispatch(new GenerateHashtags());
        });
    }
  }

  onCopyHashtagsButtonClick(): void {
    const hashtagsText = this.store.selectSnapshot(ImageState.getImage)
      .Hashtags as string;

    navigator.clipboard.writeText(hashtagsText as string).then(
      (): void => {
        alert('Hashtags coppied to clipboard!');
      },
      (err: string): void => {
        alert('Error on copying hashtags: ' + err);
      }
    );
  }
}
