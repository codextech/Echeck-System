import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient, private auth: UserAuthService) { }


getAllUsers() {
  return this.http.get<any>(environment.apiUrl + 'api/user/getall');
}



getUserProfile() {
  return this.http.get<any>(environment.apiUrl + 'api/account/profile', {
     params: {Id: this.auth.decodedtoken.Id}
   });

 }

 updateProfile(model) {
   model.Id = this.auth.decodedtoken.Id;
   return this.http.post<any>(environment.apiUrl + 'api/account/update-profile', model);
 }

 // KYC Document


 uploadKycDoc(model) {
   model.append('userId', this.auth.decodedtoken.Id);
   return this.http.post<any>(environment.apiUrl + 'api/account/kyc',
    model);
 }


 getKycTypes() {
   return this.http.get<any>(environment.apiUrl + 'api/account/kyc-types');
 }

 addKycType(model) {
  return this.http.post<any>(environment.apiUrl + 'api/account/kyc-types', model);
 }

 deleteKycType(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/account/kyc-types',{
      params: {kycTypeId: id}
    });
 }

 deleteKycDocument(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/account/kyc-document', {
    params: {kycId: id}
  });
}



 getKycDocs(userId) {
  return this.http.get<any>(environment.apiUrl + 'api/account/kyc-docs',{
    params: {userId: userId}
  });
}



updateUserKycStatus(id) {
  return this.http.get<any>(environment.apiUrl + 'api/account/update-kycStatus', {
    params: {userId: id}
  });
}

// Delete

deleteDocument(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/account/document', {
    params: {documentId: id}
  });
}


deleteUser(id) {
  return this.http.delete<any>(environment.apiUrl + 'api/user/delete',{
      params: {userId: id}
    });
 }

 suspendUser(id) {
  return this.http.get<any>(environment.apiUrl + 'api/user/suspend',{
      params: {userId: id}
    });
 }

}
