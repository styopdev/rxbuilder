import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FlowService } from '../services/flow.service';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { HttpClientModule } from '@angular/common/http'; 


import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    CodemirrorModule
  ],
  providers: [FlowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
