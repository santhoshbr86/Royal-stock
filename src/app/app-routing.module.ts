import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGaurdService } from './gaurds/auth-gaurd.service';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'home', component:LandingPageComponent },
  {path:'contact', component:ContactUsComponent},
  {path:'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule), canActivate:[AuthGaurdService]},
  {path:'login', loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
