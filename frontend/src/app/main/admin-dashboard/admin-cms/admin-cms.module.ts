import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { TableModule } from 'ngx-easy-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxGalleryModule } from 'ngx-gallery';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
// import { IconPickerModule } from 'ngx-icon-picker';

import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { MakeCheckPageComponent } from './make-check-page/make-check-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { PolicyPageComponent } from './policy-page/policy-page.component';
import { TermPageComponent } from './term-page/term-page.component';
import { IconPageComponent } from './icon-page/icon-page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxSmartModalModule.forChild(),
        TableModule, // for data table
        NgbModule,
        NgxPaginationModule,
        FilterPipeModule,
        DropzoneModule,
        NgxGalleryModule,
        RichTextEditorAllModule,
    ],
    declarations: [
      HomePageComponent,
        AboutPageComponent,
        ContactPageComponent,
        FaqPageComponent,
        MakeCheckPageComponent,
        FooterPageComponent,
        PolicyPageComponent,
        TermPageComponent,
        IconPageComponent
    ],

})
export class AdminCmsModule { }
