import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

constructor(private http: HttpClient) { }

getSliderImages() {
  return this.http.get<any>(environment.apiUrl + 'api/home/slider');
}

deleteSliderImages(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/home/slider', {
    params: {sliderId: id}
  });
}

// addSliderImages(model) {
//   return this.http.post<any>(environment.apiUrl + 'api/slider', model);
// }


}
