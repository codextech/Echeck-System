import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { SharedUIModule } from '../shared-ui/shared-ui.module';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        SharedUIModule,
        RouterModule
    ],
    declarations: [
        MainComponent
    ],

})
export class MainModule { }
