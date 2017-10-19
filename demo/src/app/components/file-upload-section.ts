import { Component } from '@angular/core';
import { string as template } from "./file-upload-section.template"

//let doc = require('html-loader!markdown-loader!../../doc.md');
//let doc = 'hello doc world'
import { string as doc } from "./doc.template"
import { string as tsString } from "./file-upload/simple-demo.component.template"
//import { string as jsString } from "./file-upload/file-catcher.component.template"
import { string as htmlString } from "./file-upload/simple-demo.template"

let tabDesc:Array<any> = [
  {
    heading: 'Simple',
    //ts: require('!!raw-loader?lang=typescript!./file-upload/simple-demo.ts'),
    //html: require('!!raw-loader?lang=markup!./file-upload/simple-demo.html'),
    //js: require('!!raw-loader?lang=javascript!./file-upload/file-catcher.js')

    //ts: 'hello ts world',
    //html: 'hello html world',
    //js: 'hello js world'

    ts: tsString,
    html: htmlString
    //,js: jsString
  }
];

@Component({
  selector: 'file-upload-section',
  //templateUrl: './file-upload-section.html'
  template:template
})
export class FileUploadSectionComponent {
  public name:string = 'File Upload';
  public currentHeading:string = 'Simple';
  public doc:string = doc;
  public tabs:any = tabDesc;

  public select(e:any):void {
    if (e.heading) {
      this.currentHeading = e.heading;
    }
  }
}
