import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Page, EventData } from 'tns-core-modules/ui/page';
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { Router } from '@angular/router';
import {screen, isIOS, isAndroid} from "tns-core-modules/platform/platform"

registerElement("VideoPlayer", () => Video);

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private page: Page, private router: Router) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  navigate(path: string) {
    
  }
}
