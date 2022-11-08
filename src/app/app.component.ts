import {ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, ViewChild,
  ViewContainerRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { DynamicComponent } from './dynamic/dynamic.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from './login/login/login.component';
import { LoginContainerComponent } from './login-container/login-container.component';
import { Router } from '@angular/router';
import { AuthService } from './servicies/auth.service';
import { User } from './model/user';
import { TranslateService  } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Royal-stock';
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  mobileQuery: MediaQueryList;
  langSelect!:any;
  private _mobileQueryListener: () => void;
  @ViewChild('container', { read: ViewContainerRef, static:true })  
  container!: ViewContainerRef; 
  loggedIn = false;
  currentUser!:User;
  constructor(changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    public dialog: MatDialog, 
    private router: Router,
    private authService: AuthService,
    public translate: TranslateService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    translate.addLangs(['en', 'fr', 'ka']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/)?browserLang:'en');
  }
  ngOnInit(){
    const currUser = this.authService.currentUserValue;
    this.authService.currentUser.subscribe(user => {
        if(Object.keys(user).length){
          this.loggedIn=true;
        } else {
          this.loggedIn=false;
        }
      });
  }
  
  addComponent():void{
    this.container.clear();
   this.container.createComponent(DynamicComponent);
  }
  close(reason: string) {
    this.sidenav.close();
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['login/signin']);
   }
   
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
