import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'saveUrl'
})
export class SaveUrlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(html: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(html);

    // return this.sanitizer.bypassSecurityTrustStyle(style);
    // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
  }

}
