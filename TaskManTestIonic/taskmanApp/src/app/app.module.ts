import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedVModule } from './shared-v/shared-v.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Para peticiones HTTP

    AppRoutingModule, // El enrutamiento de la aplicación
    SharedVModule      // Nuestro módulo compartido
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
