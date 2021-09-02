import { HttpClient } from '@angular/common/http';
import { DataSourceService } from './services/config';
import { ServiceService } from 'src/app/services/service.service';
import { Component } from '@angular/core';

// import * as config from '../assets/configs/config.json'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plantStr = {}; levelStr = { "str": "L4', 'L3', 'L2', 'L1" }; statusStr = { "str": "0','3','4" };
  plantList = [];
  levelList = ['L4', 'L3', 'L2', 'L1'];
  statusList = ['0', '3', '4'];
  list = [];
  listR = [];
  temporaryListR = [];
  evtvalue = []
  username
  pic
  array
  temproary
  system
  config
  durationTime = 0;
  cumulativeEvent = 0;
  eventObj
  levelObj
  plantName = [];
  levelN
  statusN
  plant
  logo
  logor
  loading = false;

  constructor(
    private http: ServiceService,
    private configservice: DataSourceService,
    private http2: HttpClient
  ) { }

  async ngOnInit() {
    this.config = this.configservice.getSpecificConfigure('datasources');
    this.eventObj = [this.config.menu.event];
    this.levelObj = [this.config.menu.level];
    this.levelN = this.config.menu.levelN;
    this.statusN = this.config.menu.status;
    this.plant = this.config.menu.plant;
    this.logo = this.config.menu.logo;
    this.logor = this.config.menu.logor

    this.plant.forEach(e => {
      e['status'] = true
      this.plantList.push(e["data"])
      this.plantStr['str'] = this.plantList.join("','");
    })
    this.levelN.forEach(element => {
      element['status'] = true
    });
    this.showLeftList(this.plant[0], this.plantList, this.plant, this.plantStr);
    console.log(await this.load(), 11111);
  }


  refresh(list) {
    list.forEach((e, i) => {
      e['id'] = i + 1;
      e['status'] = false
    });


  }

  async showLeftList(value, list, item, str) {
    this.change(value, list, item, str)
    this.loading = true;
    this.array = await this.http.get('sortByEvents/errorsort?plant=' + this.plantStr['str'] + '&status=' + this.statusStr['str'] + '&level=' + this.levelStr['str'])
    this.loading = false;
    this.list = []
    this.durationTime = 0
    this.cumulativeEvent = 0
    this.array['res'].forEach(element => {
      this.list.push(element)
      this.durationTime += element.QTYTIME
      this.cumulativeEvent += element.QTYEVENTS
    });

    this.refresh(this.list)
    this.showMaintain(this.list[0])
  }

  showRightList() {
    this.listR = []
    this.array['res'].forEach(element => {
      this.listR.push(element)
    });
    this.refresh(this.listR)
    this.array = {}
  }

  // async showChangeLevel(value){
  //   this.change(value,this.levelList,this.levelN,this.levelStr)
  //   this.array = await this.http.get('sortByEvents/eventstatus?pic='+this.pic+'&plant='+this.plantStr['str']+'&status='+this.statusStr['str']+'&level='+this.levelStr['str'])
  //   this.showRightList()
  // }

  // async showChangeStatus(value){
  //   this.change(value,this.statusList,this.statusN,this.statusStr)
  //   this.array = await this.http.get('sortByEvents/eventstatus?pic='+this.pic+'&plant='+this.plantStr['str']+'&status='+this.statusStr['str']+'&level='+this.levelStr['str'])
  //   this.showRightList()
  // }

  change(value, list, item, str) {
    if (value.name === 'ALL') {
      list.splice(0)
      item.forEach(e => {
        e['status'] = true
        if (e["data"] != '') {
          list.push(e["data"])
        }

      })
    } else {
      let result = item.filter(e => {
        return e['status'] == true
      })
      if (result['length'] > 2 || value.status == false) {
        value.status = !value.status
        if (value.status != true) {
          list.forEach((e, i) => {
            if (e == value.data) {
              list.splice(i, 1)
            }
          })
        } else {
          list.push(value.data)
        }
      }
    }
    str['str'] = list.join("','");

  }
  compare(prop) {
    return function (a, b) {
      return b[prop] - a[prop]
    }
  }

  eventSort(list, value) {
    if (arguments[arguments.length - 1] == this.config.menu.event.bool) {
      this.config.menu.event.bool = !this.config.menu.event.bool
      let light = this.config.menu.event.on;
      this.config.menu.event.on = this.config.menu.event.off;
      this.config.menu.event.off = light;
      list.sort(this.compare(value))
      this.refresh(list)
      this.showMaintain(this.list[0])
    }
  }

  async showLogo(item) {

    if (item.status == false) {
      let statusTem
      this.statusN.forEach(element => {
        if (element.name == item.eventstatus) {
          statusTem = element.data
        }
      });
      this.loading = true;
      this.array = await this.http.get('sortByEvents/eventtype?type=' + item.eventtime + '&pic=' + this.pic + '&plant=' + item.situation + '&status=' + statusTem + '&level=' + item.level)
      this.logo = []
      this.logo = [
        { "name": "事件編號:", "image": "assets/images/copy.svg", "value": null },
        { "name": "報警類型:" },
        { "name": "事件地點:" },
        { "name": "發生時間:" },
        { "name": "處理時間:" },
        { "name": "解除時間:" },
        { "name": "結案時間:" },
        { "name": "PIC:" },
        { "name": "主管:" },
        { "name": "主管電話:" },
        { "name": "報警系統:" }
      ]
      this.logor = [
        { "name": "回復日期:" },
        { "name": "處理方法:" },
        { "name": "處理描述:" },
        { "name": "原因分析:" },
        { "name": "原因描述:" }
      ]

      this.loading = false;
      this.logo[0]['value'] = this.array['res'][0]['uId']
      this.logo[1]['value'] = this.array['res'][0]['eventtype']
      this.logo[2]['value'] = this.array['res'][0]['PLANT']
      this.logo[3]['value'] = this.array['res'][0]['STIME']
      this.logo[4]['value'] = this.array['res'][0]['ETIME']
      this.logo[5]['value'] = this.array['res'][0]['PTime']
      this.logo[6]['value'] = this.array['res'][0]['ENDINGTIME']
      this.logo[7]['value'] = this.array['res'][0]['PIC']
      this.logo[8]['value'] = this.array['res'][0]['MPIC']
      this.logo[9]['value'] = this.array['res'][0]['mPicPhone']
      this.logo[10]['value'] = this.array['res'][0]['eventName']
      if (this.array['res'][0]['reply'] == '()') {
        this.username = ''
      } else {
        this.username = this.array['res'][0]['reply']
      }
      this.logor[0]['value'] = this.array['res'][0]['replyDate']
      this.logor[1]['value'] = this.array['res'][0]['actionname']
      this.logor[2]['value'] = this.array['res'][0]['comment']
      this.logor[3]['value'] = this.array['res'][0]['reasonName']
      this.logor[4]['value'] = this.array['res'][0]['reason']
      this.listR.forEach(element => {
        element.status = false
      });
      for (let i = 1; i <= 3; i++) {
        if (this.array['res'][0]['L' + i + 'Time'] != null) {
          this.logo.push({
            'name': "L" + i + "報警於_E:",
            'value': this.array['res'][0]['L' + i + 'Time']
          })
        }
      }
      this.evtvalue = []
      for (let i = 1; i <= 15; i++) {
        if (this.array['res'][0]['evtvalue' + i] != "" && this.array['res'][0]['evtvalue' + i] != "null" && this.array['res'][0]['evtvalue' + i] != null) {
          this.evtvalue.push({
            'name': "evtvalue" + i + ":",
            'value': this.array['res'][0]['evtvalue' + i]
          })
        }
      }

    }
    item.status = !item.status
  }

  async load() {
    return await this.http2.get('assets/configs/config.json').toPromise()
      .then(res => res)
      .catch(ex => {
        return ex
      })
  }

  //拉取异常信息数据
  async showMaintain(item) {
    if (item == undefined) {
      this.listR = []
    }
    this.list.forEach(element => {
      element.status = false
    });
    item.status = true
    this.loading = true;
    this.array = await this.http.get('sortByEvents/eventstatus?pic=' + item.BYPIC + '&plant=' + item.plant + '&status=' + this.statusStr['str'] + '&level=' + this.levelStr['str'])
    this.loading = false;
    this.pic = item.BYPIC
    this.showRightList()

    this.temproary = await this.http.post('', '')
    // this.system = 
    this.temproary.data.forEach(element => {
      for(let elem of this.listR){
        if(element.eventId == elem.eventId && element.plant == item.plant){
          elem.system=element.eventName
        }
      }
      // return element.eventId == this.listR[0].eventId && element.plant == item.plant
    });
    // this.system = this.system[0].eventName;
    // this.system = this.system.replace(new RegExp(".*_"), "")

  }
}
