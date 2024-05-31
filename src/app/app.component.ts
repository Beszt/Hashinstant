import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './image-box/image-box.component';
import { Image } from './shared/models/Image';
import { Select, Store } from '@ngxs/store';
import { GenerateHashtags, SetImage } from './shared/actions/image.actions';
import { Observable, Subscription } from 'rxjs';
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
  image$!: Observable<string | undefined>;

  private subscriptions: Subscription = new Subscription();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.image$.subscribe((image) => {
        if (image != undefined) {
          this.store.dispatch(new GenerateHashtags());
        }
      })
    );
  }

  onUploadInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.store.dispatch(new SetImage(file));
    }
  }

  onCopyHashtagsButtonClick(): void {
    const hashtagsText = this.store.selectSnapshot(ImageState.getHashtags) as string;

    navigator.clipboard.writeText(hashtagsText as string).then(
      (): void => {
        alert('Hashtags coppied to clipboard!');
      },
      (err: string): void => {
        alert('Error on copying hashtags: ' + err);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
