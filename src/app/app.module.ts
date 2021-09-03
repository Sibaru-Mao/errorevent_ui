import { DataSourceService } from './services/config';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import zh from '@angular/common/locales/zh';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { HeaderComponent } from './pages/header/header.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(zh);

export function configureProvider(loader: DataSourceService): () => Promise<void> {
  return async () => {
    await loader.loadConfigure([
      { path: 'assets/configs/config.json', type: 'datasources' }
    ]);
  };
}

export function HttpLoaderFactory(httpClient: HttpClient){
  return new TranslateHttpLoader(httpClient);
}

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NgxLoadingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: APP_INITIALIZER,
      useFactory: configureProvider,
      deps: [DataSourceService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
