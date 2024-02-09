import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '', redirectTo:'login', pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:"layout",
    component: LayoutComponent
  }


  // {
  //   path:'',
  //   component:LoginComponent,
  //   children:[
  //     {
  //       path:'dashboard',
  //       component:LayoutComponent
  //     }
  //   ]
  // }
];
