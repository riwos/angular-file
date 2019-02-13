import { Component } from '@angular/core';

//import { string as gettingStarted } from "./components/getting-started.template"
import { string as template } from "./components/app.template"
import * as pJson from "../../../package.json"

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  version:string = pJson.version
  //gettingStarted:string = gettingStarted;
  
  ngAfterViewInit(){
    setTimeout(()=>{
      if (typeof PR !== 'undefined') {
        // google code-prettify
        PR.prettyPrint();
      }
    }, 150);
  }
}
