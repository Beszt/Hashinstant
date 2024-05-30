import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgBoxComponent } from './image-box.component';

describe('ImgBoxComponent', () => {
  let component: ImgBoxComponent;
  let fixture: ComponentFixture<ImgBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
