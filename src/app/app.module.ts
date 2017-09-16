import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { provide } from 'cerebral'
import { ControllerService } from '@cerebral/angular'
import Devtools from 'cerebral/devtools'

import {set} from 'cerebral/operators'
import {state} from 'cerebral/tags'

import { SomeServiceProvider } from '../providers/some-service/some-service';

// Create a factory to instantiate Cerebral. It can receive
// dependencies which you can "provide" to Cerebral to be used
// within signals
export function configureController(someService : SomeServiceProvider) {
  return new ControllerService({
    state: {
      title: 'Cerebral Tutorial',
      foo: 'Momo',
    },
    signals: {
      clicked: [set(state`foo`, 'bar')]
    },
    devtools: Devtools({
      // If running standalone debugger. Some environments
      // might require 127.0.0.1 or computer IP address
      host: 'localhost:8585',

      // By default the devtools tries to reconnect
      // to debugger when it can not be reached, but
      // you can turn it off
      reconnect: true
    }),
    // We use the "provide" function to an angular service to the signals
    // of Cerebral
    providers: [
      provide('someService', someService)
    ]
  })
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: ControllerService,
      useFactory: configureController,
      deps: [SomeServiceProvider]
    },
    SomeServiceProvider // angular service provider
  ]
})
export class AppModule {}
