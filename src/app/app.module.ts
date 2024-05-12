import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PdfViewerModule } from "ng2-pdf-viewer";
import { HttpClientModule } from '@angular/common/http';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SignaturePadAndPdfViewerComponent } from './signature-pad-and-pdf-viewer/signature-pad-and-pdf-viewer.component';
import { ExtendedPdfViewerComponent } from './extended-pdf-viewer/extended-pdf-viewer.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SignaturePadAndPdfViewerComponent,
    ExtendedPdfViewerComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SignaturePadModule,
        PdfViewerModule,
        HttpClientModule,
        NgxExtendedPdfViewerModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
