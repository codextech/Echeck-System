import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extention'
})
export class FileExtentionPipe implements PipeTransform {

  transform(url: any, args?: any): any {

let extension = url.split('.').pop();
if (extension === 'PNG' || extension === 'png' || extension === 'JPG' || extension === 'jpg') {
    return true;
}
return false;  // if not an image

}

}
