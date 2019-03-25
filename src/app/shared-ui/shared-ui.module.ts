import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        RouterModule

    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent
    ],
    exports: [
        CommonModule,
        FooterComponent,
        SidebarComponent,
        HeaderComponent,
    ],

})
export class SharedUIModule { }
