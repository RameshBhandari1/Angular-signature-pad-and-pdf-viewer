import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxExtendedPdfViewerComponent, NgxExtendedPdfViewerService} from "ngx-extended-pdf-viewer";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-extended-pdf-viewer',
  templateUrl: './extended-pdf-viewer.component.html',
  styleUrls: ['./extended-pdf-viewer.component.scss']
})
export class ExtendedPdfViewerComponent implements OnInit {
  pdfSrc = '../assets/pdf-sample.pdf';
  base64PdfData: any;
  uploadedBase64File: any;

  @ViewChild('pdfViewer') pdfViewer!: NgxExtendedPdfViewerComponent;

  constructor(private pdfViewerService: NgxExtendedPdfViewerService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getPdfBase64().then(r => this.uploadedBase64File = r);
  }

  getPdfBase64(): Promise<string> {
    const pdfSrc = '../assets/pdf-sample.pdf';
    return new Promise<string>((resolve, reject) => {
      this.http.get(pdfSrc, {responseType: 'blob'})
        .subscribe((blob: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
              console.error('Error: Unable to convert to base64.');
              return;
            }
            const convertedFile = reader?.result?.toString().split(',')[1];
            // @ts-ignore
            resolve(convertedFile);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(blob);
        }, (error) => {
          reject(error);
        });
    });
  }

  async downloadPdf(): Promise<void> {
    // Get the PDF data from the PDF viewer
    const editedPdfData = await this.pdfViewerService?.getCurrentDocumentAsBlob();
    // Convert Blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(editedPdfData);
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        console.error('Error: Unable to convert Blob to base64.');
        return;
      }
      // Converted the PDF data in base64 format
      this.base64PdfData = reader?.result?.split(',')[1];

      // Create a link with the base64 data
      const link = document.createElement('a');
      link.href = `data:application/pdf;base64,${this.base64PdfData}`;
      link.download = 'edited_pdf.pdf';

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }

  uploadPdf(doc: any) {
    const uploadFile = doc?.target?.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        console.error('Error: Unable to convert Blob to base64.');
        return;
      }
      this.uploadedBase64File = reader?.result?.split(',')[1];
    }
  }
}
