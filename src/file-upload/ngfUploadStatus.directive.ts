import { Directive, EventEmitter, Output, Input } from '@angular/core';

import { FileUploaderOptions, FileUploader } from "./FileUploader.class"
import { FileItem } from './FileItem.class';

@Directive({selector: 'ngfUploadStatus'})
export class ngfUploadStatus {
  @Input() percent:number
  @Output() percentChange:EventEmitter<number> = new EventEmitter()
  @Input() httpEvent:Event

  ngOnChanges( changes ){
    if( changes.httpEvent && changes.httpEvent.currentValue ){
      const event = changes.httpEvent.currentValue
      if (event.loaded && event.total) {
        setTimeout(()=>{
          this.percent = Math.round(100 * event.loaded / event.total);
          this.percentChange.emit( this.percent )
        }, 0)
      }
    }
  }
}