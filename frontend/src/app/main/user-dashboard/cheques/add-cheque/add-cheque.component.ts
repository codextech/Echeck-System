import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-cheque',
  templateUrl: './add-cheque.component.html',
  styleUrls: ['./add-cheque.component.css']
})
export class AddChequeComponent implements OnInit {

  chequeModel: any = {};
  chequeBackground = 'https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-026.jpg';
  constructor() { }

  ngOnInit() {

  }


  onClickBackgroundImage(path) {
    this.chequeBackground = path;
  }

}
