import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { signal, state } from 'cerebral/tags'
import { connect, ControllerService, CerebralComponent } from '@cerebral/angular'
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@connect({
  // For AOT to work you will have to use the array version of template
  // tags
  myName: state(['foo']),
  title: state(['title']),
  onClick: signal(['clicked'])
})
export class HomePage extends CerebralComponent {
  _controller;

  constructor(public navCtrl: NavController,  _cdr: ChangeDetectorRef, _controller: ControllerService) {
    super(_cdr, _controller)
    this._controller.getSignal('clicked')()
  }

}
