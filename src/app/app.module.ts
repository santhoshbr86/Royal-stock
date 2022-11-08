import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialFeatureModule } from './material-feature.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardActions, MatCardModule} from '@angular/material/card';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DynamicComponent } from './dynamic/dynamic.component';
import { MenuComponent } from './menu/menu.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChangeColorDirective } from './directives/change-color.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { ErrorHandlerService } from './servicies/error-handler.service';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';

export function httpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    MenuComponent,
    ContactUsComponent,
    LandingPageComponent,
    ChangeColorDirective,
    LoginContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialFeatureModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    ProductsModule,
    MatDialogModule,
    MatSelectModule,
    // LoginModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [
    {provide:ErrorHandler, useClass:ErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[DynamicComponent]
})
export class AppModule { }
