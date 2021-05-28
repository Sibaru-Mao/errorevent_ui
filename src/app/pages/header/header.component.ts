import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as config from '../../../assets/configs/config.json'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  url=config.url
  constructor(private router: Router, private http: ServiceService) { }

  async ngOnInit() {
    // console.log(await this.http.get('sortByEvents/errorsort?plant=wks'),1111)
  }
}
