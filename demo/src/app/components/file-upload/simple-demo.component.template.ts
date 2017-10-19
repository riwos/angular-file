export const string = "import { Component } from '@angular/core'"+
"\nimport { Observable, Subscription } from 'rxjs'"+
"\nimport { string as template } from \"./simple-demo.template\""+
"\nimport { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'"+
"\n"+
"\n@Component({"+
"\n  selector: 'simple-demo',"+
"\n  //templateUrl: './simple-demo.html'"+
"\n  template:template"+
"\n})"+
"\nexport class SimpleDemoComponent {"+
"\n  files:File[] = []"+
"\n  progress:number"+
"\n  url = 'https://evening-anchorage-3159.herokuapp.com/api/'"+
"\n  hasBaseDropZoneOver:boolean = false"+
"\n  "+
"\n  httpEmitter:Subscription"+
"\n  httpEvent:HttpEvent<any>"+
"\n"+
"\n  constructor(public HttpClient:HttpClient){}"+
"\n"+
"\n  cancel(){"+
"\n    this.progress = 0"+
"\n    if( this.httpEmitter ){"+
"\n      console.log('cancelled')"+
"\n      this.httpEmitter.unsubscribe()"+
"\n    }"+
"\n  }"+
"\n"+
"\n  uploadFiles(files:File[]):Subscription{"+
"\n    const formData:FormData = new FormData();"+
"\n    for (let file of files) {"+
"\n      formData.append('file', file, file.name)//input-name, file-contents, filename"+
"\n    }"+
"\n"+
"\n    const req = new HttpRequest<FormData>('POST', this.url, formData, {"+
"\n      reportProgress: true//, responseType: 'text'"+
"\n    })"+
"\n    "+
"\n    return this.httpEmitter = this.HttpClient.request(req).subscribe(event=>{"+
"\n      this.httpEvent = event"+
"\n      "+
"\n      if (event instanceof HttpResponse) {"+
"\n        delete this.httpEmitter"+
"\n        console.log('request done', event)"+
"\n      }"+
"\n    })"+
"\n  }"+
"\n}"+
"\n"