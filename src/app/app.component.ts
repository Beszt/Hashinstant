import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './image-box/image-box.component';
import { Select, Store } from '@ngxs/store';
import {
  GenerateHashtags,
  SetHashtagsLanguage,
  SetImage,
} from './shared/actions/image.actions';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { ImageState } from './shared/state/image.state';
import { environment } from '../environments/environment';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImgBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(ImageState.Image)
  readonly imageSrc$!: Observable<string | undefined>;

  @Select(ImageState.hashtagsLanguage)
  readonly hashtagsLanguage$!: Observable<string | undefined>;

  @Select(ImageState.Hashtags)
  private readonly imageHashtags$!: Observable<string | undefined>;

  get imageHashtagsIsValid$(): BehaviorSubject<boolean> {
    return this._imageHashtagsIsValid;
  }

  private _imageHashtagsIsValid: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private readonly subscriptions: Subscription = new Subscription();

  get browserLanguage(): string {
    return this.languageService.getBrowserLanguage();
  }

  constructor(
    private readonly store: Store,
    private readonly languageService: LanguageService
  ) {}

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
      this.store.dispatch(new SetImage({ File: file }));
    }
  }

  onCopyHashtagsButtonClick(): void {
    const hashtagsText = this.store.selectSnapshot(
      ImageState.Hashtags
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

  onLanguageInputClick(event: Event) {
    const target = event.target as HTMLInputElement;
    const isDefaultLanguage = !target.checked;

    this.store.dispatch(
      new SetHashtagsLanguage({
        Language: isDefaultLanguage
          ? environment.Prompt.DefaultLanguage
          : this.languageService.getBrowserLanguage(),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private validateHashtags(hashtags: string | undefined): boolean {
    return !!hashtags && !hashtags.toLowerCase().startsWith('error');
  }
}
