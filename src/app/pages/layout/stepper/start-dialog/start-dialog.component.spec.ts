import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartDialogComponent } from './start-dialog.component';

describe('SaveDialogComponent', () => {
  let component: StartDialogComponent;
  let fixture: ComponentFixture<StartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
