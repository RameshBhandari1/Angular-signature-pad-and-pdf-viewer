import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignaturePadAndPdfViewerComponent} from "./signature-pad-and-pdf-viewer/signature-pad-and-pdf-viewer.component";
import {ExtendedPdfViewerComponent} from "./extended-pdf-viewer/extended-pdf-viewer.component";

const routes: Routes = [
  {path: '',pathMatch: 'full', redirectTo: 'extended-pdf-viewer'},
  {
    path: 'extended-pdf-viewer',
    component: ExtendedPdfViewerComponent
  },
  {
    path: 'signature-pad-nad-pdf-viewer',
    component: SignaturePadAndPdfViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
