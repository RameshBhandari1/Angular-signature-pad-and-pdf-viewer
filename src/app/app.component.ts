import {Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import SignaturePad from 'signature_pad';
import {PDFDocumentProxy} from 'ng2-pdf-viewer';
import {PDFDocument} from 'pdf-lib';
import {HttpClient} from "@angular/common/http";
import {IPDFViewerApplication, NgxExtendedPdfViewerComponent, PdfDownloadedEvent} from "ngx-extended-pdf-viewer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  signatureNeeded!: boolean;
  signaturePad!: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;
  // pdf document
  pdfSrc = '../assets/pdf-sample.pdf';
  pdfDoc?: PDFDocumentProxy;
  pdfDownloaded: any;

  @ViewChild('pdfViewer') pdfViewer!: NgxExtendedPdfViewerComponent;
  constructor(private http: HttpClient, private ngZone: NgZone) {
  }

  pdfLoaded(pdf: PDFDocumentProxy) {
    this.pdfDoc = pdf;
    console.log(this.pdfDoc);
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: any) {
    console.log('begin drawing');
  }

  moved(event: any) {
    // works in device not in browser
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.signatureNeeded = this.signaturePad.isEmpty();
    if (!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    const inputFilePath = '../assets/pdf-sample.pdf';

    this.signPdf(inputFilePath, this.signatureImg);
  }

  clearPad() {
    this.signaturePad.clear();
    this.signatureImg = '';
  }

  ngOnInit(): void {
    console.log('dfsd');
  }

  async signPdf(pdfPath: any, signatureImage: any) {

    // Fetch the PDF file as array buffer
    const pdfArrayBuffer = await this.http.get(pdfPath, {responseType: 'arraybuffer'}).toPromise();

    // Load the PDF file into pdf-lib
    // @ts-ignore
    const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

    // Convert the Base64-encoded image to a Uint8Array
    const base64Response = await fetch(signatureImage);
    const arrayBuffer = await base64Response.arrayBuffer();
    const imageUint8Array = new Uint8Array(arrayBuffer);

    // Embed the signature image in the PDF
    const signatureImages = await pdfDoc.embedPng(imageUint8Array);

    // Get the first page of the PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define position and size for the signature
    const {width, height} = firstPage.getSize();
    const signatureWidth = 200; // Adjust as needed
    const signatureHeight = 100; // Adjust as needed
    const x = width - signatureWidth - 15;
    const y = 15;

    // Add the signature image to the first page
    firstPage.drawImage(signatureImages, {
      x,
      y,
      width: signatureWidth,
      height: signatureHeight,
    });

    // Save the modified PDF as a Blob
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], {type: 'application/pdf'});

    // Create a download link and click it to save the file
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = 'signed.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  // downloadPdf() {
  //   // Get the PDF data from the PDF viewer
  //   // @ts-ignore
  //   const editedPdfData = this.pdfViewer?.getPdfJsPath();

  //   // Create a Blob URL for the edited PDF data
  //   const blob = new Blob([editedPdfData], { type: 'application/pdf' });
  //   const url = URL.createObjectURL(blob);

  //   // Create a download link
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'edited-file.pdf'; // Specify the desired filename

  //   // Append the link to the document, trigger the download, and then remove the link
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  //   // Revoke the Blob URL to free up memory
  //   URL.revokeObjectURL(url);
  // }
}
