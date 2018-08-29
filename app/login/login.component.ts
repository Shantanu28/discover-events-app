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
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild("video_player") videoPlayer: ElementRef;
  // height: any;

  public height = Math.floor(screen.mainScreen.widthPixels*9/16)/2;

  constructor(private page: Page, private router: Router) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.height = screen.mainScreen.heightPixels;
    let time = this.videoPlayer.nativeElement.getCurrentTime();
    
    // Video.
  }

  ngAfterViewInit() {
    this.videoPlayer.nativeElement._playerController.entersFullScreenWhenPlaybackBegins = true;
  }


  navigate(path: string) {
    
  }

  public onSeekToTimeComplete(evt: EventData){
    console.log("seek to time done");
    this.videoPlayer.nativeElement._playerController.entersFullScreenWhenPlaybackBegins = true;
  }

}
