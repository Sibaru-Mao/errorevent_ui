import { Component } from '@angular/core';
const config= require('../assets/configs/config.json')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'errorEvent';
  list = [];

  constructor(
  ) { }

  eventObj=[config.menu.event];
  levelObj=[config.menu.level];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.levelObj);
    for (let index = 1; index < 90; index++) {
      this.list.push({
        pic: 'XXX',
        administrator: 'XXX',
        event: 9,
        duration: 8
      })
    }
    this.list.forEach((e, i) => {
      e['id'] = i + 1;
      e['status'] = false
    });

  }



  exchangelogo() {
    console.log('world');
  }

  showMaintain() {
    console.log('hello');
  }

}
