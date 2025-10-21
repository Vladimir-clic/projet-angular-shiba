import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArticle } from './modify-article';

describe('ModifyArticle', () => {
  let component: ModifyArticle;
  let fixture: ComponentFixture<ModifyArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
