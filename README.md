# angular-file
Easy to use Angular directives for file uploading ([demo](http://ackerapple.github.io/angular-file/))

[![npm version](https://badge.fury.io/js/angular-file.svg)](http://badge.fury.io/js/angular-file)
[![npm downloads](https://img.shields.io/npm/dm/angular-file.svg)](https://npmjs.org/angular-file)
[![Build status](https://ci.appveyor.com/api/projects/status/sq815bogrtky29b8/branch/development?svg=true)](https://ci.appveyor.com/project/AckerApple/angular-file/branch/development)
[![Build Status](https://travis-ci.org/AckerApple/angular-file.svg?branch=development)](https://travis-ci.org/AckerApple/angular-file)
[![Dependency Status](https://david-dm.org/ackerapple/angular-file.svg)](https://david-dm.org/ackerapple/angular-file)
  
<details>
  <summary>Table of Contents</summary>

- [Compare](#compare)
- [Quick Start](#quick-start)
- [Examples](#examples)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)

</details>

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

### Quickest Dirty Example
```html
<input
  type="file"
  multiple
  accept="image/*"
  ngf
  (init)="$event.uploader.options={url:'...', autoUpload:1}"
  maxSize="1024"
/>
```

### Practical Example
```typescript
import { ngfModule, FileUploader, ngf } from "angular-file"
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from "@angular/core"
import { Http, Response, Request } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const template = `
<input
  type="file"
  multiple
  accept="image/*"
  [(ngf)]="ngfVar"
  (filesChange)="uploadFiles($event)"
  maxSize="1024"
/>
`

@Component({
  selector: 'app',
  template: template
})
export class AppComponent {
  ngfVar:ngf

  constructor(public Http:Http){}

  // takes array of HTML5 Files and uploads
  uploadFiles(files:File[]):Promise<number>{
    const uploader:FileUploader = ngfVar.uploader

    //to HTML5 FormData for transmission
    const formData:FormData = uploader.getFormData(files)
    
    const config = new Request({
      url:'...',
      method:'POST',
      body:formData
    })

    return this.Http.request( config )
    .toPromise()
    .then( ()=>alert('upload complete, old school alert used') )
    .catch( e=>alert('!failure beyond compare cause:' + e.toString()) )
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

### ngf Directive
```javascript
[multiple]:string
[accept]:string
[maxSize]:number
[forceFilename]:string
[forcePostname]:string
[ngfFixOrientation]:boolean = true
[fileDropDisabled] = false
[selectable] = false
[(ngf)]:ngf
[uploader]:FileUploader = new FileUploader({})
[(lastInvalids)]:{file:File,type:string}[] = []
[(lastBaseUrl)]:string//Base64 od last file uploaded url
[(file)]:File//last file uploaded
[(files)]:File[]
(init):EventEmitter<ngf>
```

### ngfDrop Directive
This directive **extends** `ngf`
```javascript
(fileOver):EventEmitter<any> = new EventEmitter()
[(validDrag)] = false
[(invalidDrag)] = false
```

### ngfSelect Directive
This directive **extends** `ngf`
```javascript
[selectable] = true
```

### ngfBackground Directive
```javascript
[ngfBackground]:File
```

### FileUploader
```typescript
import { FileUploader } from "angular-file";
```

#### Properties
- `url` - URL of File Uploader's route
- `authToken` - Auth token that will be applied as 'Authorization' header during file send.
- `disableMultipart` - If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.
- `itemAlias` - item alias (form name redefenition)

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
