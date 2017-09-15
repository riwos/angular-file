# angular-file
Easy to use Angular directives for files upload ([demo](http://ackerapple.github.io/angular-file/))

[![npm version](https://badge.fury.io/js/angular-file.svg)](http://badge.fury.io/js/angular-file)
[![npm downloads](https://img.shields.io/npm/dm/angular-file.svg)](https://npmjs.org/angular-file)
[![Build status](https://ci.appveyor.com/api/projects/status/sq815bogrtky29b8/branch/development?svg=true)](https://ci.appveyor.com/project/AckerApple/angular-file/branch/development)
[![Build Status](https://travis-ci.org/AckerApple/angular-file.svg?branch=development)](https://travis-ci.org/AckerApple/angular-file)
[![Dependency Status](https://david-dm.org/ackerapple/angular-file.svg)](https://david-dm.org/ackerapple/angular-file)

> ! UNDER CONSTRUCTION !
>> Forked from outdated package: [ng2-file-upload](https://www.npmjs.com/package/ng2-file-upload)
>> This package works. Just needs more documentation, bells, and whistles
  
<details>
  <summary>Table of Contents</summary>

- [Quick Start](#quick-start)
- [Examples](#examples)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [License](#license)

</details>

## Quick Start

1. A recommended way to install ***angular-file*** is through [npm](https://www.npmjs.com/search?q=angular-file) package manager using the following command:

  `npm i angular-file --save-dev`

  Alternatively, you can [download it in a ZIP file](https://github.com/ackerapple/angular-file/archive/master.zip).

2. Currently `angular-file` contains two directives: `ngfSelect` and `ngFileDrop`. `ngfSelect` is used for 'file-input' field of form and
  `ngfDrop` is used for area that will be used for dropping of file or files.

3. More information regarding using of ***angular-file*** is located in
  [demo](http://ackerapple.github.io/angular-file/) and [demo sources](https://github.com/ackerapple/angular-file/tree/master/demo).

## Examples

### Select Files
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

### Drop Files
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
[(fileUrl)]:string//last file uploaded url
[(file)]:File//last file uploaded
[(files)]:File[]
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

## License
The MIT License (see the [LICENSE](https://github.com/ackerapple/angular-file/blob/master/LICENSE) file for the full text)
