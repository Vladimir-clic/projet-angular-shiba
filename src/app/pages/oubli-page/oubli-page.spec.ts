import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OubliPage } from './oubli-page';

describe('OubliPage', () => {
  let component: OubliPage;
  let fixture: ComponentFixture<OubliPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OubliPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OubliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
