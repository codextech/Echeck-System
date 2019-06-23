import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserAuthService } from './user-auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

constructor(private http: HttpClient, private auth: UserAuthService) { }





  // Live APi that Gives Bank Details, with creating proxy server check conf.json filr
  getBankByRoutingId(id) {
    return this.http.get<any>(`${environment.apiUrl}apiroutenumber`, {
      params: {rn : id}
    });
    }

  findBankByRoutingId(id) {
    return this.http.get<any>(environment.apiUrl + 'api/bank/', {
      params: { rn: id }
    });
  }

  getBankLogos() {
    return this.http.get<any>(environment.apiUrl + 'api/bank/logos');
  }

      // add bank if Not Exist
  addBank(model) {
    return this.http.post<any>(environment.apiUrl + 'api/bank/', model,
    {params: {userId: this.auth.decodedtoken.Id}});
  }

  updateBank(model) {
    return this.http.put<any>(environment.apiUrl + 'api/bank/', model);
  }



  addBankAccountSignature(model) {
    model.append('userId', this.auth.decodedtoken.Id);
  return this.http.post<any>(environment.apiUrl + 'api/bank/bank-account/sign', model);

  }

  getBanks() {
    return this.http.get<any>(environment.apiUrl + 'api/bank/allbanks');
  }


  getBankAccountTypes() {
    return this.http.get<any>(environment.apiUrl + 'api/bank/bank-account/account-types');
  }

  addBankAccountType(model) {
    return this.http.post<any>(environment.apiUrl + 'api/bank/bank-account/account-types', model);
  }


  deleteBankAccountType(id) {
    return this.http.delete<any>(environment.apiUrl + 'api/bank/bank-account/account-types',{
      params: {bankAccountTypeId: id}
    });
  }


  getBankByUserId() {
    return this.http.get<any>(environment.apiUrl + 'api/bank', {
      params: {userId : this.auth.decodedtoken.Id}
    });
  }

  addBankAccount(model) {
    model.userId = this.auth.decodedtoken.Id;
    // model.append('userId', this.auth.decodedtoken.Id);
    return this.http.post<any>(environment.apiUrl + 'api/bank/bank-account', model);

  }

  // get Bank account by id

  getBankAccountById(id) {
    return this.http.get<any>(environment.apiUrl + 'api/bank/bank-account', {
      params: {bankAccountId : id}
    });
  }

  // get Signature


  getSignatures() {
    return this.http.get<any>(environment.apiUrl + 'api/bank/bank-account/signatures', {
      params: {userId : this.auth.decodedtoken.Id}
    });
  }

  // Bank Accounts


  getBankAccounts() {
    return this.http.get<any>(environment.apiUrl + 'api/bank/bank-account/getall', {
      params: {userId : this.auth.decodedtoken.Id}
    });
  }

  // Edit bank account
  updateBankAccount(model) {
    return this.http.put<any>(environment.apiUrl + 'api/bank/bank-account', model);
  }


  // delete bank account

  deleteBankAccount(id) {
    return this.http.delete<any>(environment.apiUrl + 'api/bank/bank-account', {
      params: {bankAccountId : id}
    });
  }







}
