import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigService } from 'src/app/_services/config-datatable';
import { RecieverService } from 'src/app/_services/reciever.service';

@Component({
  selector: 'app-get-biller',
  templateUrl: './get-biller.component.html',
  styleUrls: ['./get-biller.component.css']
})
export class GetBillerComponent implements OnInit {
  recievers: any[] = [];
  recieverModel: any = {};
  configuration = ConfigService.config;
  columns = [
    {
      key: 'recieverName',
      title: 'Payee Name',
    },

    {
      key: 'recieverEmail',
      title: 'Email'
    },
    {
      key: 'telephone',
      title: 'TelePhone'
    },

    {
      key: 'address',
      title: 'Address'
    },

    {
      key: 'actions', title: 'Actions'
    }
  ];

  constructor(
    private recieverService: RecieverService,
    private toastr: ToastrService,
    private ngxModalService: NgxSmartModalService
  ) {}

  ngOnInit() {
        this.getBillers();
  }

  getBillers() {
    this.recieverService.getRecievers().subscribe(
      result => {
        this.recievers = result.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  addBiller() {

    this.recieverService.addReciever(this.recieverModel).subscribe(
      result => {
        this.toastr.success(result.message);
        this.recieverModel.recieverId = result.data.recieverId;
        this.recievers.push(this.recieverModel);
        this.recievers = [...this.recievers]; // copy of array
        this.recieverModel = {};
      },
      err => {
        console.log(err);
      }
    );
  }


  /* @param companyId- get details of single company */
  onBillerEdit(id) {
    this.recieverService.getRecieverById(id).subscribe(
      result => {
        this.recieverModel = result.data;
      this.ngxModalService.open('updateModal');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateBiller() {
    this.recieverService.updateReciever(this.recieverModel).subscribe(
      result => {
      // Find Index and update the object to that index
        const updatedItem = this.recievers
          .find(item => item.recieverId === this.recieverModel.recieverId);
        const index = this.recievers.indexOf(updatedItem);
        this.recievers[index] = this.recieverModel;
      // Show Notification
        this.toastr.success('Succefully Edit !');
        this.ngxModalService.close('updateModal');
        this.recievers = [...this.recievers]; // copy of array
        this.recieverModel = {};
      },
      err => {
        console.log(err);
      }
    );
  }





  /* @param companyId- delete company By Id */
  onBillerDelete(id) {
    this.recieverService.deleteReciever(id).subscribe(
      result => {
      this.recievers =  this.recievers.filter(item => item.recieverId !== id);
        this.toastr.success('Succefully Deleted !');
      },
      err => {
        console.log(err);
      }
    );
  }
}
