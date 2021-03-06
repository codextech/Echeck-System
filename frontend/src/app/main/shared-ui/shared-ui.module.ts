import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../../../../ECheck-App/Echeck-App/frontend/src/app/main/shared-ui/header/header.component';
import { FooterComponent } from '../../../../../../../ECheck-App/Echeck-App/frontend/src/app/main/shared-ui/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent
    ],
    exports: [
        CommonModule,
        FooterComponent,
        HeaderComponent,
        SidebarComponent
    ],

})
export class SharedUIModule { }
