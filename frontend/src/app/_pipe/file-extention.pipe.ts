import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extention'
})
export class FileExtentionPipe implements PipeTransform {

  transform(url: any, args?: any): any {

const extension = url.split('.').pop();
// tslint:disable-next-line:max-line-length
if  (extension === 'BMP' || extension === 'jpeg' || extension === 'JPEG' || extension === 'PNG' || extension === 'png' || extension === 'JPG' || extension === 'jpg') {
    return true;
}
return false;  // if not an image

}

}
