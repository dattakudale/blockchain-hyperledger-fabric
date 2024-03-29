import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,
  MatRadioModule, MatCardModule, MatMenuModule, MatToolbarModule, MatCheckboxModule,
  MatExpansionModule, MatListModule, MatTableModule, MatDialogModule, MatPaginatorModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlltradesComponent } from './components/alltrades/alltrades.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddtradeComponent } from './components/addtrade/addtrade.component';
import { EdittradeComponent } from './components/edittrade/edittrade.component';
import { LoadingscreenComponent } from './components/loadingscreen/loadingscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    AlltradesComponent,
    HeaderComponent,
    FooterComponent,
    AddtradeComponent,
    EdittradeComponent,
    LoadingscreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    FlexLayoutModule,
    ScrollingModule,
    MatPaginatorModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
