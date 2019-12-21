import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExtentionPipe } from '../_pipe/file-extention.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
      FileExtentionPipe
    ],
    exports: [
      FileExtentionPipe,
      NgbModule
    ],
    providers: [

      ]
})
export class SharedModule { }
