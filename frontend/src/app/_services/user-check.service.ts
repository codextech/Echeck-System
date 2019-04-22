import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserCheckService {

constructor(private http: HttpClient, private auth: UserAuthService) { }




getIssuedNumber() {
  return this.http.get<any>(environment.apiUrl + 'api/check/check-number', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}

getBackgrounds() {
  return this.http.get<any>(environment.apiUrl + 'api/check/check-background', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}

saveCheck(model) {
  model.append('userId', this.auth.decodedtoken.Id);
  return this.http.post<any>(environment.apiUrl + 'api/check/save-check', model);
}


getUnreadRecieveChecks() {
  return this.http.get<any>(environment.apiUrl + 'api/check/all-unread-recieve', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}

getUnreadRecieveCheck(id) {
  return this.http.get<any>(environment.apiUrl + 'api/check/unread-recieve', {
    params: {checkId: id}
  });
}


getCheckSignatureRequests() {
  return this.http.get<any>(environment.apiUrl + 'api/check/sender/all-signature-request', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}

getCheckSignatureRequest(id) {
  return this.http.get<any>(environment.apiUrl + 'api/check/sender/signature-request', {
    params: {checkId: id}
  });
}


getRecieverCheckSignatureRequests() {
  return this.http.get<any>(environment.apiUrl + 'api/check/reciever/all-signature-request', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}

getRecieverCheckSignatureRequest(id) {
  return this.http.get<any>(environment.apiUrl + 'api/check/reciever/signature-request', {
    params: {checkId: id}
  });
}


// Back Image of the Check From Reciever.
addCheckBack(model) {
  model.append('userId', this.auth.decodedtoken.Id);

  return this.http.post<any>(environment.apiUrl + 'api/check/save-checkBack', model);
}




// Check Image of the Check From Sender Partner.
addCheckFrontSecondSign(model) {
  model.append('userId', this.auth.decodedtoken.Id);

  return this.http.post<any>(environment.apiUrl + 'api/check/sender/save-secondPartnerSign', model);
}

// Check Image of the Check From Reciever Partner.
addCheckBackSecondSign(model) {
  model.append('userId', this.auth.decodedtoken.Id);

  return this.http.post<any>(environment.apiUrl + 'api/check/reciever/save-secondPartnerSign', model);
}



// Check History

getAllRecievedChecks() {
  return this.http.get<any>(environment.apiUrl + 'api/check/reciever/all-checks', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}


getAllSentChecks() {
  return this.http.get<any>(environment.apiUrl + 'api/check/sender/all-checks', {
    params: {userId: this.auth.decodedtoken.Id}
  });
}


}
