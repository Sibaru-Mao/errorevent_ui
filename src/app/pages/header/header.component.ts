import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import * as config from '../../../assets/configs/config.json'
// import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  url=config.url
  project=config.project
  constructor(
    private router: Router, 
    private http: ServiceService,
    private app:AppComponent
    // public translateService: TranslateService
    ) {}

  async ngOnInit() {
    // console.log(await this.http.get('sortByEvents/errorsort?plant=wks'),1111)
  }

  language(lan){
    this.app.changeLanguage(lan.target.value)
    // this.translateService.use(lan); // 设置使用的语言类型
  }
}
