import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IconToastComponent } from './icon-toast.component';

describe('IconToastComponent', () => {
  let component: IconToastComponent;
  let fixture: ComponentFixture<IconToastComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconToastComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
