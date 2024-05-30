import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hashinstant';

  constructor(
    @Inject(DOCUMENT) private document: Document)
  {

  }

  ngOnInit(): void {
    this.document.addEventListener('DOMContentLoaded', function(): void {
			const uploadButton: HTMLElement | null = document.getElementById('uploadButton');
			const copyButton: HTMLElement | null = document.getElementById('copyButton');
			const imageInput: HTMLInputElement | null = document.getElementById('imageInput') as HTMLInputElement | null;;
			const imagePreview: HTMLElement | null = document.getElementById('imagePreview');
			const uploadedImage: HTMLImageElement | null = document.getElementById('uploadedImage') as HTMLImageElement | null;;
			const loader: HTMLElement | null = document.getElementById('loader');
			const hashtags: HTMLElement | null = document.getElementById('hashtags');

			if (uploadButton == null
				|| copyButton == null
				|| imageInput == null
				|| imagePreview == null
				|| uploadedImage == null
				|| loader == null
				|| hashtags == null)
			{
				return;
			}
			
			uploadButton.addEventListener('click', function(): void {
				imageInput.click();
			});

			imageInput.addEventListener('change', function(event: Event): void {
				const target = event.target as HTMLInputElement;
                const file = target.files?.[0];
				if (file) {
					const reader = new FileReader();
					reader.onload = function(e: ProgressEvent<FileReader>) {
						if (e?.target == null)
						{
							return;
						}
						
						uploadedImage.src = e.target.result as string;
						loader.classList.remove('hidden');
						imagePreview.classList.add('hidden');
						hashtags.classList.add('hidden');
						copyButton.classList.add('hidden');

						setTimeout(function(): void {
							loader.classList.add('hidden');
							imagePreview.classList.remove('hidden');
							hashtags.classList.remove('hidden');
							copyButton.classList.remove('hidden');
							generateHashtags();
						}, 2000);
					};
					reader.readAsDataURL(file);
				}
			});

			copyButton.addEventListener('click', function(): void {
				const hashtagsText = hashtags.textContent;
				navigator.clipboard.writeText(hashtagsText as string).then(function() {
					alert('Hashtags coppied to clipboard!');
				}, function(err) {
					alert('Error on copying hashtags: ' + err);
				});
			});

			function generateHashtags() {
				const exampleHashtags = ['#nature', '#photo', '#instagood', '#picoftheday', '#love', '#beautiful', '#happy', '#followme', '#art', '#selfie'];
				if (hashtags == null)
				{
					return;
				}
				
				hashtags.innerHTML = exampleHashtags.join(' ');
			}
		});
  }
}