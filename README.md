# angular-file [![npm version](https://badge.fury.io/js/angular-file.svg)](http://badge.fury.io/js/angular-file) [![npm downloads](https://img.shields.io/npm/dm/angular-file.svg)](https://npmjs.org/angular-file)[![slack](https://ngx-slack.herokuapp.com/badge.svg)](https://ngx-slack.herokuapp.com)
Easy to use Angular2 directives for files upload ([demo](http://valor-software.github.io/angular-file/))

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/valor-software/angular-file.svg?branch=development)](https://travis-ci.org/valor-software/angular-file)
[![Dependency Status](https://david-dm.org/valor-software/angular-file.svg)](https://david-dm.org/valor-software/angular-file)

## Quick start

1. A recommended way to install ***angular-file*** is through [npm](https://www.npmjs.com/search?q=angular-file) package manager using the following command:

  `npm i angular-file --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/valor-software/angular-file/archive/master.zip).

2. Currently `angular-file` contains two directives: `ng2-file-select` and `ng2-file-drop`. `ng2-file-select` is used for 'file-input' field of form and
  `ng2-file-drop` is used for area that will be used for dropping of file or files.

3. More information regarding using of ***angular-file*** is located in
  [demo](http://valor-software.github.io/angular-file/) and [demo sources](https://github.com/valor-software/angular-file/tree/master/demo).

## API for `ngfSelect`

### Properties

  - `uploader` - (`FileUploader`) - uploader object. See using in [demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts)

## API for `ngfDrop`

### Properties

  - `uploader` - (`FileUploader`) - uploader object. See using in [demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts)

  Parameters supported by this object:

  1. `url` - URL of File Uploader's route
  2. `authToken` - Auth token that will be applied as 'Authorization' header during file send.
  3. `disableMultipart` - If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.
  4. `itemAlias` - item alias (form name redefenition)

### Events

  - `fileOver` - it fires during 'over' and 'out' events for Drop Area; returns `boolean`: `true` if file is over Drop Area, `false` in case of out.
  See using in [ts demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts) and
  [html demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.html)

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/valor-software/angular-file/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/valor-software/angular-file/blob/master/LICENSE) file for the full text)
