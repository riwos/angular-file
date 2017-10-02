import { FileLikeObject } from './FileLikeObject.class';
import { FileUploader, ParsedResponseHeaders, FileUploaderOptions } from './FileUploader.class';

export class FileItem {
  file:FileLikeObject;
  _file:File;
  alias:string;
  url:string = '/';
  method:string;
  headers:any = [];
  withCredentials:boolean = true;
  formData:any = [];
  isReady:boolean = false;
  isUploading:boolean = false;
  isUploaded:boolean = false;
  isSuccess:boolean = false;
  isCancel:boolean = false;
  isError:boolean = false;
  progress:number = 0;
  index:number = void 0;
  _xhr:XMLHttpRequest;
  _form:any;

  uploader:FileUploader;
  some:File;
  options:FileUploaderOptions;

  constructor(uploader:FileUploader, some:File, options:FileUploaderOptions) {
    this.uploader = uploader;
    this.some = some;
    this.options = options;
    this.file = new FileLikeObject(some);
    this._file = some;
    if (uploader.options) {
      this.method = uploader.options.method || 'POST';
      this.alias = uploader.options.itemAlias || 'file';
    }
    this.url = uploader.options.url;
  }

  upload():Promise<any> {
    return new Promise((res,rej)=>{
      try {
        return this.uploader.uploadItem(this).then(res).catch(rej)
      } catch (e) {
        this.uploader._onCompleteItem(this, '', 0, {});
        this.uploader._onErrorItem(this, '', 0, {});
        rej(e)
      }
    })
  }

  cancel():void {
    this.uploader.cancelItem(this);
  }

  remove():void {
    this.uploader.removeFromQueue(this);
  }

  onBeforeUpload():void {
    return void 0;
  }

  onBuildForm(form:any):any {
    return {form};
  }

  onProgress(progress:number):any {
    return {progress};
  }

  onSuccess(response:string, status:number, headers:ParsedResponseHeaders):any {
    return {response, status, headers};
  }

  onError(response:string, status:number, headers:ParsedResponseHeaders):any {
    return {response, status, headers};
  }

  onCancel(response:string, status:number, headers:ParsedResponseHeaders):any {
    return {response, status, headers};
  }

  onComplete(response:string, status:number, headers:ParsedResponseHeaders):any {
    return {response, status, headers};
  }

  _onBeforeUpload():void {
    this.isReady = true;
    this.isUploading = true;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = false;
    this.progress = 0;
    this.onBeforeUpload();
  }

  _onBuildForm(form:any):void {
    this.onBuildForm(form);
  }

  _onProgress(progress:number):void {
    this.progress = progress;
    this.onProgress(progress);
  }

  _onSuccess(response:string, status:number, headers:ParsedResponseHeaders):void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = true;
    this.isCancel = false;
    this.isError = false;
    this.progress = 100;
    this.index = void 0;
    this.onSuccess(response, status, headers);
  }

  _onError(response:string, status:number, headers:ParsedResponseHeaders):void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = true;
    this.isSuccess = false;
    this.isCancel = false;
    this.isError = true;
    this.progress = 0;
    this.index = void 0;
    this.onError(response, status, headers);
  }

  _onCancel(response:string, status:number, headers:ParsedResponseHeaders):void {
    this.isReady = false;
    this.isUploading = false;
    this.isUploaded = false;
    this.isSuccess = false;
    this.isCancel = true;
    this.isError = false;
    this.progress = 0;
    this.index = void 0;
    this.onCancel(response, status, headers);
  }

  _onComplete(response:string, status:number, headers:ParsedResponseHeaders):void {
    this.onComplete(response, status, headers);

    if (this.uploader.options.removeAfterUpload) {
      this.remove();
    }
  }

  _prepareToUploading():void {
    this.index = this.index || ++this.uploader._nextIndex;
    this.isReady = true;
  }
}
