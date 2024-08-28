import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoflixComponent } from './videoflix.component';

describe('VideoflixComponent', () => {
  let component: VideoflixComponent;
  let fixture: ComponentFixture<VideoflixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoflixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoflixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
