import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { string as template } from "./simple-demo.template"
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http'

@Component({
  selector: 'simple-demo',
  //templateUrl: './simple-demo.html'
  template:template
})
export class SimpleDemoComponent {
  url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  hasBaseDropZoneOver:boolean = false
  hasAnotherDropZoneOver:boolean = false
  httpEmitter:Observable<HttpEvent<HttpRequest<FormData>>>

  constructor(public HttpClient:HttpClient){}

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

  uploadFiles(files:File[]):Observable<HttpEvent<HttpRequest<FormData>>>{
    const formData:FormData = new FormData();
    for (let file of files) {
      formData.append('file', file, file.name)//input-name, file-contents, filename
    }

    const req = new HttpRequest<FormData>('POST', this.url, formData, {
      reportProgress: true//, responseType: 'text'
    })
    
    return this.httpEmitter = this.HttpClient.request<HttpRequest<FormData>>(req)
  }
}
