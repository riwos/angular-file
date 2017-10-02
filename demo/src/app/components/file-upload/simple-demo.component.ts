import { Component } from '@angular/core';
import { FileUploader } from '../../../../../src';
import { string as template } from "./simple-demo.template"



@Component({
  selector: 'simple-demo',
  //templateUrl: './simple-demo.html'
  template:template
})
export class SimpleDemoComponent {
  url = 'https://evening-anchorage-3159.herokuapp.com/api/';
  hasBaseDropZoneOver:boolean = false;
  hasAnotherDropZoneOver:boolean = false;

  //deprecated
  //uploader:FileUploader = new FileUploader({url: URL});

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  done($event){
    console.log('done uploading', $event)
  }
  
  success($event){
    console.log('successful upload', $event)
  }
  
  catcher($event){
    console.log('caught something', $event)
  }
}
