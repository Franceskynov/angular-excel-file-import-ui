import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReaderComponent } from './components/reader/reader.component';
import { UploadComponent } from './components/upload/upload.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ReaderComponent,
    UploadComponent
  ],
  imports: [
      BrowserModule,
      NgbModule.forRoot(),
      ToastrModule.forRoot(),
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      HttpModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
