// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable()
// export class ConfigHarry {
//   private static _data: any = {};
//   constructor(
//     private http: HttpClient
//   ) { }

//   ngOnInit(): void {
//     //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
//     //Add 'implements OnInit' to the class.

//   }

//   public load(): Promise<any> {
//     let configFile = './config.json?nocache=' + (new Date()).getTime();
//     return this.http.get(configFile).toPromise().then(async (data: any) => {
//       ConfigHarry._data = data.menu;
//       return ConfigHarry._data
//     })
//   }

//   public static get configData() {
//     return ConfigHarry._data;
//   }

// }
