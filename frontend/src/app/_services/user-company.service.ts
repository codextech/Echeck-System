import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {

constructor(private http: HttpClient, private auth: UserAuthService) { }

getUserCompany() {
  return this.http.get<any>(environment.apiUrl + 'api/company/getall', {
    params: {Id: this.auth.decodedtoken.Id}
  });
}

addUserCompany(model) {
  return this.http.post<any>(environment.apiUrl + 'api/company/postCompany', model, {
    params: {Id: this.auth.decodedtoken.Id}
  });
}

getUserCompanyById(id) {
  return this.http.get<any>(environment.apiUrl + 'api/company', {
    params: {companyId: id}
  });
}

updateCompany(model) {
  return this.http.put<any>(environment.apiUrl + 'api/company', model);
}

deleteCompany(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/company', {
    params: {companyId: id}
  });
}

}
