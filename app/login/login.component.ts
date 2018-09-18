import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Page, EventData } from 'tns-core-modules/ui/page';
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';
import { Router } from '@angular/router';
import { screen, isIOS, isAndroid } from "tns-core-modules/platform/platform"

registerElement("VideoPlayer", () => Video);
const firebase = require("nativescript-plugin-firebase");
const applicationSettings = require("application-settings");
const http = require("http");

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  viewModel: any;

  constructor(private page: Page, private router: Router) { }

  ngOnInit() {
    this.page.actionBarHidden = true;

    firebase.init({
      persist: true,
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.

      onAuthStateChanged: data => {
        if (data.loggedIn) { // is a user logged in?
          setTimeout(() => {
            // update UI to show the current user
            console.log(data);
            console.log(data.user.profileImageURL);
            console.log(data.user.name);

            // next: add code for getting friends list

          }, 5000);
        }
      }
    }).then(
      instance => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }

  doLoginByFacebook() {
    firebase.login({
      type: firebase.LoginType.FACEBOOK,
      facebookOptions: {
        scope: ['public_profile', 'email', 'user_friends']
      }
    }).then(
      fb_result => {
        var fb_access_token = fb_result.providers[1].token;
        // next: add code for checking if user is new or not

        firebase.query(
          firebase_result => {

            if (!firebase_result.error) {
              if (firebase_result.value == null) { //user doesn't exist yet

                //next: add code for saving the data for new user

                var user_data = {
                  'uid': fb_result.uid,
                  'user_name': fb_result.name,
                  'profile_photo': fb_result.profileImageURL
                };

                http.getJSON('https://graph.facebook.com/me?access_token=' + fb_access_token)
                  .then(function (r) {

                    user_data.uid = r.id; // facebook user ID for this specific app

                    // create new user
                    firebase.push(
                      '/users',
                      user_data
                    ).then(
                      function (result) {

                        var user = {};
                        user[result.key] = user_data; // the key is the property containing the user's data
                        // store user's data locally
                        applicationSettings.setString('user_key', result.key);
                        applicationSettings.setString('user', JSON.stringify(user));
                        applicationSettings.setString('fb_token', fb_access_token);
                      }
                    );

                  });

              } else {
                // user already exists
                for (var user_key in firebase_result.value) {
                  // save user's data locally
                  applicationSettings.setString('user_key', user_key);
                  applicationSettings.setString('user', JSON.stringify(firebase_result.value));
                  applicationSettings.setString('fb_token', fb_access_token);
                }
              }
            }

          },
          '/users',
          {
            singleEvent: true, // for checking if the value exists (return the whole data)
            orderBy: { // the property in each of the objects in which to perform the query 
              type: firebase.QueryOrderByType.CHILD,
              value: 'uid'
            },
            range: { // the comparison operator
              type: firebase.QueryRangeType.EQUAL_TO,
              value: fb_result.uid
            },
            limit: { // limit to only return the first result
              type: firebase.QueryLimitType.FIRST,
              value: 1
            }
          }
        );
      },
      err => {
        console.log('error logging in to facebook: ', err);
      }
    );

  }


}
