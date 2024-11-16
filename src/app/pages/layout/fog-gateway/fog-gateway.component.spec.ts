import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogGatewayComponent } from './fog-gateway.component';

describe('FogGatewayComponent', () => {
  let component: FogGatewayComponent;
  let fixture: ComponentFixture<FogGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FogGatewayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FogGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
