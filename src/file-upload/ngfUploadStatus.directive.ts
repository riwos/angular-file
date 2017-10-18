import { Directive, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { FileUploaderOptions, FileUploader } from "./FileUploader.class"
import { FileItem } from './FileItem.class';

@Directive({selector: 'ngfUploadStatus'})
export class ngfUploadStatus {
  subscription:Observable<any>
  @Input() percent:number
  @Output() percentChange:EventEmitter<number> = new EventEmitter()
  @Input() httpEmitter:EventEmitter

  ngOnChanges( changes ){
    if( changes.httpEmitter && changes.httpEmitter.currentValue ){
      /*if( changes.httpEmitter.previousValue ){
        changes.httpEmitter.previousValue.unsubscribe()
      }*/
      this.subscription = changes.httpEmitter.currentValue.subscribe( this.getSubscriber() )
    }
  }

  /*ngOnDelete(){
    this.subscription.unsubscribe()
  }*/

  getSubscriber():(event)=>void{
    return event=>{
console.log('event')
      if (event.loaded && event.total) {
        this.percent = Math.round(100 * event.loaded / event.total);
        this.percentChange.emit( this.percent )
console.log('event of load', this.percent)
      }
    }
  }
}