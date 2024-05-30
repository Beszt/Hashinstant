import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImgBoxComponent } from './image-box/image-box.component';
import { ImageBox } from './shared/models/ImageBox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImgBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  uploadedImage: ImageBox | undefined;

  onUploadInputChange(event: Event): void {
    const loader: HTMLElement | null = document.getElementById('loader');

    if (loader == null) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        loader.classList.remove('hidden');

        setTimeout((): void => {
          if (e?.target == null) {
            return;
          }

          this.uploadedImage = {
            ImagePath: e.target.result as string,
            Hashtags: this.generateHashtags(),
          };
          loader.classList.add('hidden');
        }, 2000);
      };

      reader.readAsDataURL(file);
    }
  }

  onCopyHashtagsButtonClick(): void {
    const hashtagsText = this.uploadedImage?.Hashtags;
    
    navigator.clipboard.writeText(hashtagsText as string).then(
      (): void => {
        alert('Hashtags coppied to clipboard!');
      },
      (err: string): void => {
        alert('Error on copying hashtags: ' + err);
      }
    );
  }

  private generateHashtags(): string {
    const exampleHashtags = [
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
    ];

    return exampleHashtags.join(' ');
  }
}
