import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogDeviceComponent } from './fog-device.component';

describe('FogNodeComponent', () => {
  let component: FogDeviceComponent;
  let fixture: ComponentFixture<FogDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FogDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
