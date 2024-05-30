import { Component, Input } from '@angular/core';
import { ImageBox } from '../shared/models/ImageBox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-box.component.html',
  styleUrl: './image-box.component.css'
})
export class ImgBoxComponent {
  @Input() imageBox?: ImageBox;
}