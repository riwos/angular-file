### Module Usage
```typescript
import { NgModule } from '@angular/core';
import { ngfModule } from "angular-file";

@NgModule({imports: [ ngfModule ]})
export class AppModule {}
```

### Annotations
```typescript
@Directive({ selector: '[ngf]' })
@Directive({ selector: '[ngfSelect]' })
@Directive({ selector: '[ngfDrop]' })
```

## FileUploader API
```typescript
import { FileUploader } from "angular-file";
```

### Properties
- `url` - URL of File Uploader's route
- `authToken` - auth token that will be applied as 'Authorization' header during file send.
- `disableMultipart` - If 'true', disable using a multipart form for file upload and instead stream the file. Some APIs (e.g. Amazon S3) may expect the file to be streamed rather than sent via a form. Defaults to false.
