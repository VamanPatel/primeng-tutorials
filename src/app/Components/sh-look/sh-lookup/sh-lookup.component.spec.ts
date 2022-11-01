import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShLookupComponent } from './sh-lookup.component';

describe('ShLookupComponent', () => {
  let component: ShLookupComponent;
  let fixture: ComponentFixture<ShLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
