import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './image-box/image-box.component';
import { Select, Store } from '@ngxs/store';
import { GenerateHashtags, SetImage } from './shared/actions/image.actions';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { ImageState } from './shared/state/image.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImgBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(ImageState.getImage)
  imageSrc$!: Observable<string | undefined>;

  get imageHashtagsIsValid$(): BehaviorSubject<boolean> {
    return this._imageHashtagsIsValid;
  }

  @Select(ImageState.getHashtags)
  private readonly imageHashtags$!: Observable<string | undefined>;

  private _imageHashtagsIsValid: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription = new Subscription();

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.imageSrc$.subscribe((src) => {
        if (src != undefined) {
          this.store.dispatch(new GenerateHashtags());
        }
      })
    );

    this.subscriptions.add(
      this.imageHashtags$
        .pipe(map((hashtags) => this.validateHashtags(hashtags)))
        .subscribe((isValid) => {
          this._imageHashtagsIsValid.next(isValid);
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
    const hashtagsText = this.store.selectSnapshot(
      ImageState.getHashtags
    ) as string;

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

  private validateHashtags(hashtags: string | undefined): boolean {
    return !!hashtags && !hashtags.toLocaleLowerCase().includes('error');
  }
}
