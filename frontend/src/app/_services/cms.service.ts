import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

cmsData: Observable<any>;
constructor(private http: HttpClient, private auth: UserAuthService) { }



save(model, target) {
  return this.http.post<any>(`${environment.apiUrl}api/cms/${target}`, model);
}

delete(id, target) {
  return this.http.delete<any>(`${environment.apiUrl}api/cms/${target}`, {
    params: {id: id}
  });
}

edit(model, target) {
  return this.http.put<any>(`${environment.apiUrl}api/cms/${target}`, model);
}

getAll() {
  if (!this.cmsData) {
  this.cmsData =   this.http.get<any>(`${environment.apiUrl}api/cms/getAll`);
  }
  return  this.cmsData;
}



}
