import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class ImageConverter {
  private static readonly maxLongSide = environment.PictureLongerSideSize;

  public static convertFileToBase64Image(
    file: File,
    maxLongSide: number = this.maxLongSide
  ): Observable<string> {
    {
      return new Observable<string>((subscriber) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();

          img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxLongSide || height > maxLongSide) {
              if (width > height) {
                height *= maxLongSide / width;
                width = maxLongSide;
              } else {
                width *= maxLongSide / height;
                height = maxLongSide;
              }
            }

            const canvas: HTMLCanvasElement = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx: CanvasRenderingContext2D | null =
              canvas.getContext('2d');
            if (ctx == null) {
              return;
            }
            ctx.drawImage(img, 0, 0, width, height);

            subscriber.next(canvas.toDataURL('image/png'));
            subscriber.complete();
          };

          img.onerror = (error) => subscriber.error(error);
          img.src = reader.result as string;
        };

        reader.onerror = (error) => subscriber.error(error);
        reader.readAsDataURL(file);
      });
    }
  }
}
