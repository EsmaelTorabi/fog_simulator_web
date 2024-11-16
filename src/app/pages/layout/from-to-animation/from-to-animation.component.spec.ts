import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromToAnimationComponent } from './from-to-animation.component';

describe('FromToAnimationComponent', () => {
  let component: FromToAnimationComponent;
  let fixture: ComponentFixture<FromToAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromToAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromToAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
