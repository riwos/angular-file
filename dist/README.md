# angular-file
Easy to use Angular directives for file uploading ([demo](http://ackerapple.github.io/angular-file/))

[![npm version](https://badge.fury.io/js/angular-file.svg)](http://badge.fury.io/js/angular-file)
[![npm downloads](https://img.shields.io/npm/dm/angular-file.svg)](https://npmjs.org/angular-file)
[![Build status](https://ci.appveyor.com/api/projects/status/sq815bogrtky29b8/branch/development?svg=true)](https://ci.appveyor.com/project/AckerApple/angular-file/branch/development)
[![Build Status](https://travis-ci.org/AckerApple/angular-file.svg?branch=development)](https://travis-ci.org/AckerApple/angular-file)
[![Dependency Status](https://david-dm.org/ackerapple/angular-file.svg)](https://david-dm.org/ackerapple/angular-file)
  
<details>
  <summary>Table of Contents</summary>

- [Forked](#forked)
- [Compare](#compare)
- [Quick Start](#quick-start)
- [Examples](#examples)
- [API](#api)
  - [ngf Directive](#ngf-directive)
  - [ngfDrop Directive](#ngfdrop-directive)
  - [ngfBackground Directive](#ngfbackground-directive)
  - [ngfSelect Directive](#ngfselect-directive)
  - [ngfUploadStatus Directive](#ngfuploadstatus-directive)
- [Upgrading from ng2-file-upload](#upgrading-from-ng2-file-upload)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)

</details>

## Forked
PLEASE NOTE

This code is made up of several packages that came before this one. Not all code is intended to be used and old code often remains only to support others that are converting over to this package.

## Compare
Before even getting started, gage this package against others

> Currently, September of 2017, [ng2-file-upload](https://www.npmjs.com/package/ng2-file-upload) is the most trending Angular file upload package. This package, **angular-file**, is a much improved fork of ng2-file-upload. Use angular-file **NOT** the outdated ng2-file-upload

[TAP here for npmtrends of Angular file uploaders](http://www.npmtrends.com/angular2-http-file-upload-vs-angular2-file-uploader-vs-ng2-file-upload-vs-angular-file)


## Quick Start

1. A recommended way to install ***angular-file*** is through [npm](https://www.npmjs.com/search?q=angular-file) package manager using the following command:

  `npm install angular-file --save-dev`

  Alternatively, you can [download it in a ZIP file](https://github.com/ackerapple/angular-file/archive/master.zip).

2. Currently `angular-file` contains three directives: `ngf`, `ngfSelect`, and `ngfDrop`. `ngf` and `ngfSelect` are quite the same with just different defaults and they both utilize `<input type="file" />` functionality. `ngfDrop` is used to designate an area that will be used for dropping of file(s).

3. More information regarding using of ***angular-file*** is located in
  [demo](http://ackerapple.github.io/angular-file/) and [demo sources](https://github.com/ackerapple/angular-file/tree/master/demo).

## Examples

### Practical Example
An example intended to have every line needed to run an app with angular-file

```typescript
import { ngfModule, ngf } from "angular-file"
import { Component, NgModule } from "@angular/core"
import { HttpClient, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { BrowserModule } from '@angular/platform-browser'
import { Subscription } from 'rxjs'

//two ways to upload files
const template = `
<input
  ngf
  multiple
  type      = "file"
  accept    = "image/*"
  [(files)] = "files"
  maxSize   = "1024"
/>
<button *ngIf="files" (click)="uploadFiles(files)">send files</button>

<ngfFormData
  [files]      = "files"
  [(FormData)] = "myFormData"
  postName     = "file"
></ngfFormData>

<ngfUploadStatus
  [(percent)] = "uploadPercent"
  [httpEvent] = "httpEvent"
></ngfUploadStatus>

<div *ngIf="uploadPercent">
  Upload Progress: {{ uploadPercent }}%
</div>
`

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  postUrl = '...'
  myFormData:FormData//populated by ngfFormData directive
  httpEvent:HttpEvent<Event>

  constructor(public HttpClient:HttpClient){}

  uploadFiles(files:File[]) : Subscription {
    const config = new HttpRequest('POST', this.postUrl, this.myFormData), {
      reportProgress: true
    })
    
    return this.HttpClient.request( config )
    .subscribe(event=>{
      this.httpEvent = event
      
      if (event instanceof HttpResponse) {
        alert('upload complete, old school alert used')
      }
    },
    error=>{
      alert('!failure beyond compare cause:' + error.toString())
    })
  }
}

@NgModule({
  imports: [
    BrowserModule,
    ngfModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```


### Select Files Examples
Examples of how to allow file selection

Multiple
```html
<input type="file" ngf [(files)]="files" multiple  />
```

Single
```html
<input type="file" ngf [(file)]="file" />
```

Element
```html
<div ngfSelect multiple="1" [(files)]="files">
  Tap to Select
</div>
```

Images Only
```html
<button ngfSelect [(file)]="userFile" accept="image/*" multiple="1">
  Tap to Select
</button>
<div [ngfBackground]="userFile"
  style="background-size:cover;background-repeat:no-repeat;width:50px;height:50px"
></div>
```

### Drop Files Examples
Examples of how to allow file drag/drop

Basic
```html
<div ngfDrop
  [(files)]="files"
  [(file)]="file"
  ([validDrag])="validDrag"
  ([invalidDrag])="invalidDrag"
  [ngClass]="{'myHoverClass': validDrag, 'myAntiHoverClass': validDrag}"
>
  Drop Files Here
</div>
```
Combo Drop Select
```html
<div ngfDrop selectable="1" multiple="1"
  [(files)]="files"
  [(validDrag)]="validComboDrag"
  [(invalidDrag)]="invalidComboDrag"
  [ngClass]="{'goodDragClass':validComboDrag, 'badDragClass':invalidComboDrag}"
>
  Combo drop/select zone
</div>
```

## API

- [ngf Directive](#ngf-directive)
- [ngfDrop Directive](#ngfdrop-directive)
- [ngfBackground Directive](#ngfbackground-directive)
- [ngfSelect Directive](#ngfselect-directive)
- [ngfUploadStatus Directive](#ngfuploadstatus-directive)

### ngf Directive
```typescript
[(ngf)]             : ngf//reference to directive class
[multiple]          : string
[accept]            : string
[maxSize]           : number//bytes . 1024 = 1k . 1048576 = 1mb
[forceFilename]     : string
[forcePostname]     : string//when FormData object created, sets name of POST input
[ngfFixOrientation] : boolean = true
[fileDropDisabled]  : any = false
[selectable]        : any = false
[(lastInvalids)]    : {file:File,type:string}[] = []
[(lastBaseUrl)]     : string//Base64 od last file uploaded url
[(file)]            : File//last file uploaded
[(files)]           : File[]
(init)              : EventEmitter<ngf>

//deprecated
[uploader]:FileUploader = new FileUploader({})
```

### ngfDrop Directive
This directive **extends** `ngf`
```javascript
(fileOver)      :EventEmitter<any> = new EventEmitter()
[(validDrag)]   :any = false
[(invalidDrag)] :any = false
```

> Supporting Internet Explorer 11 or less?
>> Only (fileOver) works accurately
>> [(validDrag)] & [(invalidDrag)] should NOT be used as IE11 does not indicate the number of files NOR the types of files being dragged like other modern web browsers

### ngfSelect Directive
This directive **extends** `ngf`
```javascript
[selectable]:any = true
```

### ngfBackground Directive
```javascript
[ngfBackground]:File
```

### ngfUploadStatus Directive
Does calculations of an upload event and provideds percent of upload completed
```typescript
[(percent)]:number
[httpEvent]:Event
```

### ngfFormData Directive
Converts files to FormData
```typescript
[files]:File[]
[postName]:string = "file"
[fileName]:string//force file name
[(FormData)]:FormData
```

### ngfUploader Directive

> DEPRECATED: DO NOT USE. Will be removed in next version

```typescript
[(ref)]     : ngfUploader//reference to directive class
[useNgHttp] : any = false//use Angular Http to transmit (beta)
[options]   : {
  forceFilename?       : string//override that all files will have defined name
  forcePostname?       : string//override all FormData post names
  accept?              : string;//acts like file input accept
  allowedMimeType?     : Array<string>
  allowedFileType?     : Array<string>
  autoUpload?          : boolean
  isHTML5?             : boolean
  filters?             : Array<FilterFunction>
  headers?             : Array<Headers>
  method?              : string
  authToken?           : string
  maxFileSize?         : number
  queueLimit?          : number
  removeAfterUpload?   : boolean
  url?                 : string
  disableMultipart?    : boolean
  itemAlias?           : string
  authTokenHeader?     : string
  additionalParameter? : {[key: string]: any}  
}
```

### FileUploader Class
```typescript
import { FileUploader } from "angular-file";
```

#### Properties
- `url` - URL of File Uploader's route
- `authToken` - Auth token that will be applied as 'Authorization' header during file send.
- `disableMultipart` - If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.
- `itemAlias` - item alias (form name redefenition)
- `options`
  - forceFilename?       : string//override that all files will have defined name
  - forcePostname?       : string//override all FormData post names
  - accept?              : string;//acts like file input accept
  - allowedMimeType?     : Array<string>
  - allowedFileType?     : Array<string>
  - autoUpload?          : boolean
  - isHTML5?             : boolean
  - filters?             : Array<FilterFunction>
  - headers?             : Array<Headers>
  - method?              : string
  - authToken?           : string
  - maxFileSize?         : number
  - queueLimit?          : number
  - removeAfterUpload?   : boolean
  - url?                 : string
  - disableMultipart?    : boolean
  - itemAlias?           :  string
  - authTokenHeader?     :  string
  - additionalParameter? : {[key: string]: any}

## Upgrading from ng2-file-upload
This package is a fork with a complete overhaul of [ng2-file-upload](https://www.npmjs.com/package/ng2-file-upload)

- Breaking Changes
  - ng2FileSelect becomes ngfSelect
  - ng2FileDrop becomes ngfDrop
  - Import Module
    - Deprecated `import { FileUploadModule } from "ng2-file-upload"`
    - **Update** `import { ngfModule } from "angular-file"`

> More breaking changes may exist in upgrading including file naming conventions. This list is to be updated

- Recommended Changes
  - Use `ngf` selectable="1" instead of `ngfSelect`
  - [uploader] was not to my liking
    - I think this was a poor design
    - replace `A` with `B.1` and `B.2`
      - A. `<div ng2FileDrop [uploader]="uploader">`
      - B.1 `<input ngfDrop (filesChange)="uploader.uploadFiles($event)" />`
      - B.2 `<ngfUploader [(ref)]="uploader" ></ngfUploader>`
    - Use `[(file)]` and `[(files)]` as models and then wrap them in HTML5 FormData for transmission
      - Tools included to help do this
  - `(fileOver)` is better suited as:
    - `[(validDrag)]="validDragVar"`
    - `[(invalidDrag)]="invalidDragVar"`

## Troubleshooting
Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/ackerapple/angular-file/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

## Credits
- Current Author: Acker Apple
- Forked from outdated package: [ng2-file-upload](https://www.npmjs.com/package/ng2-file-upload)

## License
The MIT License (see the [LICENSE](https://github.com/ackerapple/angular-file/blob/master/LICENSE) file for the full text)
