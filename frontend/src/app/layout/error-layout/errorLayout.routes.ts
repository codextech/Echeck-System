import { Routes } from '@angular/router';
import { Page505Component } from 'src/app/error/page505/page505.component';
import { Page404Component } from 'src/app/error/page404/page404.component';





export const ERROR_LAYOUTS_ROUTES: Routes = [
  { path: 'error-505', component: Page505Component },
    // { path: '**', component: Page404Component },
    { path: '**', redirectTo: '' }
  ];
