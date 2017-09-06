### Usage
```typescript
import { ngfSelect, ngfDrop, FileUploader } from "angular-file";
```

### Annotations
```typescript
// class FileSelectDirective
@Directive({ selector: '[ngfSelect]' })
```

```typescript
// class FileDropDirective
@Directive({ selector: '[ngfDrop]' })
```

## FileSelect API

### Properties

  - `uploader` - (`FileUploader`) - uploader object. See using in [demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts)

  Parameters supported by this object:

  1. `url` - URL of File Uploader's route
  2. `authToken` - auth token that will be applied as 'Authorization' header during file send.
  3. `disableMultipart` - If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.

## FileDrop API

### Properties

  - `uploader` - (`FileUploader`) - uploader object. See using in [demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts)

### Events

  - `fileOver` - it fires during 'over' and 'out' events for Drop Area; returns `boolean`: `true` if file is over Drop Area, `false` in case of out.
  See using in [ts demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.ts) and
  [html demo](https://github.com/valor-software/angular-file/blob/master/demo/components/file-upload/simple-demo.html)
