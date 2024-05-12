import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadAndPdfViewerComponent } from './signature-pad-and-pdf-viewer.component';

describe('SignaturePadAndPdfViewerComponent', () => {
  let component: SignaturePadAndPdfViewerComponent;
  let fixture: ComponentFixture<SignaturePadAndPdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaturePadAndPdfViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturePadAndPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
