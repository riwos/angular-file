import { FileLikeObject } from './FileLikeObject.class';
import { FileItem } from './FileItem.class';
import { FileType } from './FileType.class';

import { Injectable } from '@angular/core';

function getWindow():any{return window}

function isFile(value:any):boolean {
  return (File && value instanceof File);
}
// function isFileLikeObject(value:any) {
export interface Headers {
  name:string;
  value:string;
}

export type ParsedResponseHeaders = {[headerFieldName:string]:string};

export type FilterFunction = {
  name:string,
  fn:(item?:FileLikeObject, options?:FileUploaderOptions)=>boolean
};

export interface FileUploaderOptions {
  forceFilename?:string;//override that all files will have defined name
  forcePostname?:string//override all FormData post names
  accept?:string;//acts like file input accept
  allowedMimeType?:Array<string>;
  allowedFileType?:Array<string>;
  autoUpload?:boolean;
  isHTML5?:boolean;
  filters?:Array<FilterFunction>;
  headers?:Array<Headers>;
  method?:string;
  authToken?:string;
  maxFileSize?:number;
  queueLimit?:number;
  removeAfterUpload?:boolean;
  url?:string;
  disableMultipart?:boolean;
  itemAlias?: string;
  authTokenHeader?: string;
  additionalParameter?:{[key: string]: any};
}

export class FileUploader {
  authToken:string;
  isUploading:boolean = false;
  queue:Array<FileItem> = [];
  progress:number = 0;
  _nextIndex:number = 0;
  autoUpload:any;
  authTokenHeader: string;

  options:FileUploaderOptions = {
    autoUpload: false,
    isHTML5: true,
    filters: [],
    removeAfterUpload: false,
    disableMultipart: false
  };

  constructor(options:FileUploaderOptions={}) {
    this.setOptions(options);
  }

  setOptions(options:FileUploaderOptions):void {
    this.options = Object.assign(this.options, options);

    this.authToken = options.authToken;
    this.authTokenHeader = options.authTokenHeader || 'Authorization';
    this.autoUpload = options.autoUpload;
    
    //options.queueLimit
    this.options.filters.unshift({name: 'queueLimit', fn: this._queueLimitFilter});
    
    //options.maxFileSize
    this.options.filters.unshift({name: 'fileSize', fn: this._fileSizeFilter});
    
    //options.allowedFileType
    this.options.filters.unshift({name: 'fileType', fn: this._fileTypeFilter});
    
    //options.allowedMimeType
    this.options.filters.unshift({name: 'mimeType', fn: this._mimeTypeFilter});
    
    //options.accept
    this.options.filters.unshift({name: 'accept', fn: this._acceptFilter});

    for(let i = 0; i < this.queue.length; i++) {
      this.queue[i].url = this.options.url;
    }
  }

  isFileValid(file:File){
    let temp = new FileLikeObject(file);
    return this._isValidFile(temp, this.options.filters, this.options)
  }

  isFilesValid(files:File[]){
    for(let x=files.length-1; x >= 0; --x){
      if( !this.isFileValid(files[x]) ){
        return false
      }
    }
    return true
  }

  getValidFiles(files:File[]):File[]{
    const rtn = []
    for(let x=files.length-1; x >= 0; --x){
      if( this.isFileValid(files[x]) ){
        rtn.push(files[x])
      }
    }
    return rtn
  }

  getInvalidFiles(files:File[]):{file:File,type:string}[]{
    const rtn = []
    for(let x=files.length-1; x >= 0; --x){
      let failReason = this.getFileFilterFailName(files[x])
      if( failReason ){
        rtn.push({file:files[x], type:failReason})
      }
    }
    return rtn
  }

  addToQueue(
    files:File[],
    options?:FileUploaderOptions,
    filters?:FilterFunction[]|string
  ):void {
    let list:File[] = [];
    for (let file of files) {
      list.push(file);
    }
    let arrayOfFilters = this._getFilters(filters);
    let count = this.queue.length;
    let addedFileItems:FileItem[] = [];
    list.map((some:File,index:number) => {
      if (!options) {
        options = this.options;
      }

      let temp = new FileLikeObject(some);
      this._isValidFile(temp, arrayOfFilters, options)
      if(this.isFileValid(some)){
        let fileItem = new FileItem(this, some, options);
        addedFileItems.push(fileItem);
        this.queue.push(fileItem);
        this._onAfterAddingFile(fileItem);
      } else {
        let filter = arrayOfFilters[index];
        this._onWhenAddingFileFailed(temp, filter, options);
      }
    });
    
    if (this.queue.length !== count) {
      this._onAfterAddingAll(addedFileItems);
      this.progress = this._getTotalProgress();
    }
    this._render();
    if (this.options.autoUpload) {
      this.uploadAll();
    }
  }

  removeFromQueue(value:FileItem):void {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    if (item.isUploading) {
      item.cancel();
    }
    this.queue.splice(index, 1);
    this.progress = this._getTotalProgress();
  }

  clearQueue():void {
    while (this.queue.length) {
      this.queue[0].remove();
    }
    this.progress = 0;
  }

  uploadItem(value:FileItem):void {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    let transport = this.options.isHTML5 ? '_xhrTransport' : '_iframeTransport';
    item._prepareToUploading();
    if (this.isUploading) {
      return;
    }
    this.isUploading = true;
    (this as any)[transport](item);
  }

  cancelItem(value:FileItem):void {
    let index = this.getIndexOfItem(value);
    let item = this.queue[index];
    let prop = this.options.isHTML5 ? item._xhr : item._form;
    if (item && item.isUploading) {
      prop.abort();
    }
  }

  uploadAll():void {
    let items = this.getNotUploadedItems().filter((item:FileItem) => !item.isUploading);
    if (!items.length) {
      return;
    }
    items.map((item:FileItem) => item._prepareToUploading());
    items[0].upload();
  }

  cancelAll():void {
    let items = this.getNotUploadedItems();
    items.map((item:FileItem) => item.cancel());
  }

  isFile(value:any):boolean {
    return isFile(value);
  }

  isFileLikeObject(value:any):boolean {
    return value instanceof FileLikeObject;
  }

  getIndexOfItem(value:any):number {
    return typeof value === 'number' ? value : this.queue.indexOf(value);
  }

  getNotUploadedItems():Array<any> {
    return this.queue.filter((item:FileItem) => !item.isUploaded);
  }

  getReadyItems():Array<any> {
    return this.queue
      .filter((item:FileItem) => (item.isReady && !item.isUploading))
      .sort((item1:any, item2:any) => item1.index - item2.index);
  }

  destroy():void {
    return void 0;
    /*forEach(this._directives, (key) => {
     forEach(this._directives[key], (object) => {
     object.destroy();
     });
     });*/
  }

  onAfterAddingAll(fileItems:any):any {
    return {fileItems};
  }

  onBuildItemForm(fileItem:FileItem, form:any):any {
    return {fileItem, form};
  }

  onAfterAddingFile(fileItem:FileItem):any {
    return {fileItem};
  }

  onWhenAddingFileFailed(item:FileLikeObject, filter:any, options:any):any {
    return {item, filter, options};
  }

  onBeforeUploadItem(fileItem:FileItem):any {
    return {fileItem};
  }

  onProgressItem(fileItem:FileItem, progress:any):any {
    return {fileItem, progress};
  }

  onProgressAll(progress:any):any {
    return {progress};
  }

  onSuccessItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onErrorItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCancelItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCompleteItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):any {
    return {item, response, status, headers};
  }

  onCompleteAll():any {
    return void 0;
  }

  _acceptFilter(item:FileLikeObject):boolean {
    let acceptReg = '^((' + this.options.accept.replace(/\*/g,'.*')
    acceptReg = acceptReg.replace(/,/g,')|(') + '))$'
    const regx = new RegExp(acceptReg, 'gi')
    return !(this.options.accept && item.type.search(regx)===-1)
  }

  _mimeTypeFilter(item:FileLikeObject):boolean {
    return !(this.options.allowedMimeType && this.options.allowedMimeType.indexOf(item.type) === -1);
  }

  _fileSizeFilter(item:FileLikeObject):boolean {
    return !(this.options.maxFileSize && item.size > this.options.maxFileSize);
  }

  _fileTypeFilter(item:FileLikeObject):boolean {
    return !(this.options.allowedFileType &&
    this.options.allowedFileType.indexOf(FileType.getMimeClass(item)) === -1);
  }

  _onErrorItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onError(response, status, headers);
    this.onErrorItem(item, response, status, headers);
  }

  _onCompleteItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onComplete(response, status, headers);
    this.onCompleteItem(item, response, status, headers);
    let nextItem = this.getReadyItems()[0];
    this.isUploading = false;
    if (nextItem) {
      nextItem.upload();
      return;
    }
    this.onCompleteAll();
    this.progress = this._getTotalProgress();
    this._render();
  }

  protected _headersGetter(parsedHeaders:ParsedResponseHeaders):any {
    return (name:any):any => {
      if (name) {
        return parsedHeaders[name.toLowerCase()] || void 0;
      }
      return parsedHeaders;
    };
  }

  getQuedFiles():File[]{
    const rtn = []
    for(let x=0; x < this.queue.length; ++x){
      rtn.push( this.queue[x]._file )
    }
    return rtn
  }

  getFormData(files?:File[]){
    files = files || this.getQuedFiles()
    const formData = new FormData()
    
    for(let x=0; x < files.length; ++x){
      let filename = this.options.forceFilename || files[x].name
      let alias = this.options.forcePostname || 'file'
      formData.append(alias, files[x], filename);
    }

    return formData
  }

  protected _xhrTransport(item:FileItem):any {
    let xhr = item._xhr = new XMLHttpRequest();
    let sendable:any;
    this._onBeforeUploadItem(item);
    // todo
    /*item.formData.map(obj => {
     obj.map((value, key) => {
     form.append(key, value);
     });
     });*/
    if (typeof item._file.size !== 'number') {
      throw new TypeError('The file specified is no longer valid');
    }
    if (!this.options.disableMultipart) {
      sendable = new FormData();
      this._onBuildItemForm(item, sendable);

      sendable.append(item.alias, item._file, item.file.name);

      if (this.options.additionalParameter !== undefined) {
        Object.keys(this.options.additionalParameter).forEach((key:string) => {
          sendable.append(key, this.options.additionalParameter[key]);
        });
      }
    } else {
      sendable = item._file;
    }

    xhr.upload.onprogress = (event:any) => {
      let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
      this._onProgressItem(item, progress);
    };
    xhr.onload = () => {
      let headers = this._parseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformResponse(xhr.response, headers);
      let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
      let method = '_on' + gist + 'Item';
      (this as any)[method](item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onerror = () => {
      let headers = this._parseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformResponse(xhr.response, headers);
      this._onErrorItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.onabort = () => {
      let headers = this._parseHeaders(xhr.getAllResponseHeaders());
      let response = this._transformResponse(xhr.response, headers);
      this._onCancelItem(item, response, xhr.status, headers);
      this._onCompleteItem(item, response, xhr.status, headers);
    };
    xhr.open(item.method, item.url, true);
    xhr.withCredentials = item.withCredentials;
    if (this.options.headers) {
      for (let header of this.options.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (item.headers.length) {
      for (let header of item.headers) {
        xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (this.authToken) {
      xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }
    xhr.send(sendable);
    this._render();
  }

  protected _getTotalProgress(value:number = 0):number {
    if (this.options.removeAfterUpload) {
      return value;
    }
    let notUploaded = this.getNotUploadedItems().length;
    let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
    let ratio = 100 / this.queue.length;
    let current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }

  protected _getFilters(filters?:FilterFunction[]|string):FilterFunction[] {
    if (!filters) {
      return this.options.filters;
    }
    if (Array.isArray(filters)) {
      return filters;
    }
    if (typeof filters === 'string') {
      let names = filters.match(/[^\s,]+/g);
      return this.options.filters
        .filter((filter:any) => names.indexOf(filter.name) !== -1);
    }
    return this.options.filters;
  }

  protected _render():any {
    return void 0;
    // todo: ?
  }

  protected _queueLimitFilter():boolean {
    return this.options.queueLimit === undefined || this.queue.length < this.options.queueLimit;
  }

  getFileFilterFailName(file:File|FileLikeObject):string{
    for(let x=this.options.filters.length-1; x >= 0; --x){
      if( !this.options.filters[x].fn.call(this, file, this.options) ){
        return this.options.filters[x].name
      }
    }
    return
  }

  _isValidFile(
    file:FileLikeObject,
    filters:FilterFunction[],
    options:FileUploaderOptions
  ):boolean {
    if(!filters.length)return true
    return this.getFileFilterFailName(file) ? false : true
  }

  _isSuccessCode(status:number):boolean {
    return (status >= 200 && status < 300) || status === 304;
  }

  /* tslint:disable */
  protected _transformResponse(response:string, headers:ParsedResponseHeaders):string {
    // todo: ?
    /*var headersGetter = this._headersGetter(headers);
     forEach($http.defaults.transformResponse, (transformFn) => {
     response = transformFn(response, headersGetter);
     });*/
    return response;
  }

  /* tslint:enable */
  protected _parseHeaders(headers:string):ParsedResponseHeaders {
    let parsed:any = {};
    let key:any;
    let val:any;
    let i:any;
    if (!headers) {
      return parsed;
    }
    headers.split('\n').map((line:any) => {
      i = line.indexOf(':');
      key = line.slice(0, i).trim().toLowerCase();
      val = line.slice(i + 1).trim();
      if (key) {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
    return parsed;
  }

  /*protected _iframeTransport(item:FileItem) {
   // todo: implement it later
   }*/

  protected _onWhenAddingFileFailed(item:FileLikeObject, filter:any, options:any):void {
    this.onWhenAddingFileFailed(item, filter, options);
  }

  protected _onAfterAddingFile(item:FileItem):void {
    this.onAfterAddingFile(item);
  }

  protected _onAfterAddingAll(items:any):void {
    this.onAfterAddingAll(items);
  }

  protected _onBeforeUploadItem(item:FileItem):void {
    item._onBeforeUpload();
    this.onBeforeUploadItem(item);
  }

  protected _onBuildItemForm(item:FileItem, form:any):void {
    item._onBuildForm(form);
    this.onBuildItemForm(item, form);
  }

  protected _onProgressItem(item:FileItem, progress:any):void {
    let total = this._getTotalProgress(progress);
    this.progress = total;
    item._onProgress(progress);
    this.onProgressItem(item, progress);
    this.onProgressAll(total);
    this._render();
  }

  /* tslint:disable */
  protected _onSuccessItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onSuccess(response, status, headers);
    this.onSuccessItem(item, response, status, headers);
  }

  /* tslint:enable */
  protected _onCancelItem(item:FileItem, response:string, status:number, headers:ParsedResponseHeaders):void {
    item._onCancel(response, status, headers);
    this.onCancelItem(item, response, status, headers);
  }

  /** converts file-input file into base64 dataUri */
  dataUrl(file:any, disallowObjectUrl?:any):Promise<string>{
    if (!file) return Promise.resolve(file)
    
    if ((disallowObjectUrl && file.$ngfDataUrl != null) || (!disallowObjectUrl && file.$ngfBlobUrl != null)) {
      return Promise.resolve( disallowObjectUrl ? file.$ngfDataUrl : file.$ngfBlobUrl )
    }

    var p = disallowObjectUrl ? file.$$ngfDataUrlPromise : file.$$ngfBlobUrlPromise;
    if (p) return p;

    const win = getWindow()
    let deferred:Promise<any> = Promise.resolve()
    if (win.FileReader && file &&
      (!win.FileAPI || navigator.userAgent.indexOf('MSIE 8') === -1 || file.size < 20000) &&
      (!win.FileAPI || navigator.userAgent.indexOf('MSIE 9') === -1 || file.size < 4000000)) {
      //prefer URL.createObjectURL for handling refrences to files of all sizes
      //since it doesn´t build a large string in memory
      var URL = win.URL || win.webkitURL;
      if (FileReader) {
        deferred = new Promise((res,rej)=>{
          var fileReader = new FileReader();
          fileReader.onload = function (event:any) {
            file.$ngfDataUrl = event.target.result;
            delete file.$ngfDataUrl;
            res( event.target.result )
          };
          fileReader.onerror = function (e) {
            file.$ngfDataUrl = '';
            rej(e)
          };
          fileReader.readAsDataURL(file);
        })
      } else {
        var url:any;
        try {
          url = URL.createObjectURL(file);
        } catch (e) {
          return Promise.reject(e);
        }
        
        deferred = deferred.then( ()=>url );
        file.$ngfBlobUrl = url;
      }
    } else {
      file[disallowObjectUrl ? '$ngfDataUrl' : '$ngfBlobUrl'] = '';
      return Promise.reject( new Error('Browser does not support window.FileReader, window.FileReader, or window.FileAPI') )//deferred.reject();
    }

    if (disallowObjectUrl) {
      p = file.$$ngfDataUrlPromise = deferred;
    } else {
      p = file.$$ngfBlobUrlPromise = deferred;
    }

    p = p.then((x:any)=>{
      delete file[disallowObjectUrl ? '$$ngfDataUrlPromise' : '$$ngfBlobUrlPromise'];
      return x
    })

    return p;
  }
}
