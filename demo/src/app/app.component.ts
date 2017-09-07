import { Component } from '@angular/core';

//let gettingStarted = require('html-loader!markdown-loader!../getting-started.md');
//let gettingStarted = 'hello world'
import { string as gettingStarted } from "./components/getting-started.template"
import { string as template } from "./components/app.template"

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  public gettingStarted:string = gettingStarted;
  
  ngAfterViewInit(){
    setTimeout(()=>{
      if (typeof PR !== 'undefined') {
        // google code-prettify
        PR.prettyPrint();
      }
    }, 150);
  }
}
