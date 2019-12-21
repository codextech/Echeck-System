import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CmsService {

cmsData: Observable<any>;

private data = new BehaviorSubject('');
currentCmsData = this.data.asObservable();

constructor(private http: HttpClient, private auth: UserAuthService) {

 }


 footerLinks(links) {
  this.data.next(links);
}




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
    console.log('.....');
  const data$ = this.http.get<any>(`${environment.apiUrl}api/cms/getAll`);
  data$.subscribe(res => this.footerLinks(res.data.footerLinks));


  return data$;
  } else {
    return of({data: this.cmsData});
  }
}



}
