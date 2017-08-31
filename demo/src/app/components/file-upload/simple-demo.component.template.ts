export const string = "import { Component } from '@angular/core';"+
"\nimport { FileUploader } from '../../../../../src';"+
"\nimport { string as template } from \"./simple-demo.template\""+
"\n"+
"\n// const URL = '/api/';"+
"\nconst URL = 'https://evening-anchorage-3159.herokuapp.com/api/';"+
"\n"+
"\n@Component({"+
"\n  selector: 'simple-demo',"+
"\n  //templateUrl: './simple-demo.html'"+
"\n  template:template"+
"\n})"+
"\nexport class SimpleDemoComponent {"+
"\n  public uploader:FileUploader = new FileUploader({url: URL});"+
"\n  public hasBaseDropZoneOver:boolean = false;"+
"\n  public hasAnotherDropZoneOver:boolean = false;"+
"\n"+
"\n  public fileOverBase(e:any):void {"+
"\n    this.hasBaseDropZoneOver = e;"+
"\n  }"+
"\n"+
"\n  public fileOverAnother(e:any):void {"+
"\n    this.hasAnotherDropZoneOver = e;"+
"\n  }"+
"\n}"+
"\n"