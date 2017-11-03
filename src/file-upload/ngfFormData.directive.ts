import {
  IterableDiffer,
  IterableDiffers,
  Directive, EventEmitter,
  Output, Input
} from '@angular/core';

import { FileUploaderOptions, FileUploader } from "./FileUploader.class"
import { FileItem } from './FileItem.class';

@Directive({selector: 'ngfFormData'})
export class ngfFormData {
  @Input() files:File[]
  @Input() postName:string = "file"
  @Input() fileName:string//force file name

  @Input() FormData:FormData
  @Output() FormDataChange:EventEmitter<FormData> = new EventEmitter()

  differ:IterableDiffer<{}>

  constructor(IterableDiffers:IterableDiffers){
    this.differ = IterableDiffers.find([]).create(null)
  }

  ngDoCheck(){
    var changes = this.differ.diff(this.files);

    if (changes) {
      setTimeout(()=>this.buildFormData(), 0)
    }
  }

  buildFormData(){
    const isArray = typeof(this.files)==='object' && this.files.constructor===Array

    if( isArray ){
      this.FormData = new FormData()
      this.files.forEach(file=>this.FormData.append(this.postName, file, this.fileName||file.name))
      this.FormDataChange.emit( this.FormData )
    }else{
      delete this.FormData
    }
  }
}