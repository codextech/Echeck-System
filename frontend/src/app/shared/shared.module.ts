import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExtentionPipe } from '../_pipe/file-extention.pipe';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
      FileExtentionPipe
    ],
    exports: [
      FileExtentionPipe
    ],
    providers: [

      ]
})
export class SharedModule { }
