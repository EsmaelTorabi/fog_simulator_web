import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorComponent } from './sensor.component';

describe('LotComponent', () => {
  let component: SensorComponent;
  let fixture: ComponentFixture<SensorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
