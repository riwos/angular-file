import { Directive, EventEmitter, Output, Input } from '@angular/core';
//import { Http, Response, Request } from '@angular/http';
//import 'rxjs/add/operator/toPromise';

import { FileUploaderOptions, FileUploader } from "./FileUploader.class"
import { FileItem } from './FileItem.class';

@Directive({selector: 'ngfUploader'})
export class ngfUploader extends FileUploader {
  //@Output('init') directiveInit:EventEmitter<ngf> = new EventEmitter()

  @Input() ref:ngfUploader
  @Output() refChange:EventEmitter<ngfUploader> = new EventEmitter()  

  @Input() options:FileUploaderOptions = {
    autoUpload: false,
    isHTML5: true,
    filters: [],
    removeAfterUpload: false,
    disableMultipart: false
  }

  //@Input() useNgHttp:any = false

  constructor(){
    super()
  }

  ngOnInit(){
    //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=>{
      this.refChange.emit(this)
      //this.directiveInit.emit(this)
    }, 0)
  }

  ngOnChanges(changes){
    if(changes.options){
      this.setOptions(changes.options.currentValue)
    }
  }

  uploadFiles(files:File[]):Promise<any>{
    const valids:File[] = []

    files.map(file=>{
      if( this.isFileValid(file) ){
        valids.push(file)
      }
    })

    //const promise:Promise<any> = this.useNgHttp ? this.ngHttpFiles( this.getFormData(valids) ) : this.xhrOneByOne(valids)
    const promise:Promise<any> = this.xhrOneByOne(valids)

    return promise.then( response=>this.success.emit(response) )
    .catch( e=>{
      this.catcher.emit(e);
      this.done.emit(e);
      return Promise.reject(e)
    })
  }

  //old school way to send files. Still pretty handy
  xhrOneByOne(files:File[]):Promise<any[]>{
    const promises = files.map(file=>{
      const fileItem = new FileItem(this, file, this.options)
      return this._xhrTransport( fileItem )
    })
    return Promise.all(promises)
  }

  /*ngHttpFiles( formData:FormData ){
    const config:any = Object.assign({}, this.options)
    config.body = formData
    const request = new Request(config)
    return this.postRequest(config)
  }*/

  postRequest( config:Request ):Promise<Response>{
    return this.Http.request( config ).toPromise()
  }
}