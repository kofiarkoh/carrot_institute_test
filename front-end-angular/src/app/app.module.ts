import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TextFieldComponent } from './form/text-field/text-field.component';
import { ButtonComponent } from './button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TextFieldComponent,
    ButtonComponent,
    CreateTaskComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
