import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecieverService {
  constructor(private http: HttpClient, private auth: UserAuthService) { }

  getRecievers() {
    return this.http.get<any>(environment.apiUrl + 'api/reciever/getall', {
      params: {Id: this.auth.decodedtoken.Id}
    });
  }

  addReciever(model) {
    return this.http.post<any>(environment.apiUrl + 'api/reciever/addReciever', model, {
      params: {Id: this.auth.decodedtoken.Id}
    });
  }

  getRecieverById(id) {
    return this.http.get<any>(environment.apiUrl + 'api/reciever', {
      params: {recieverId: id}
    });
  }

  updateReciever(model) {
    return this.http.put<any>(environment.apiUrl + 'api/reciever', model);
  }

  deleteReciever(id) {
    return this.http.delete<any>(environment.apiUrl + 'api/reciever', {
      params: {recieverId: id}
    });
  }

}
