export const string = "<style>"+"\r"+
"\n  .my-drop-zone { border: dotted 3px lightgray; }"+"\r"+
"\n  /* Default class applied to drop zones on over */"+"\r"+
"\n  .nv-file-over { border: dotted 3px red; }"+"\r"+
"\n  .another-file-over-class { border: dotted 3px green; }"+"\r"+
"\n  html, body { height: 100%; }"+"\r"+
"\n  .previewIcon{"+"\r"+
"\n    width:100px;height:100px;"+"\r"+
"\n    background-size:cover;"+"\r"+
"\n    background-repeat:no-repeat;"+"\r"+
"\n  }"+"\r"+
"\n"+"\r"+
"\n  .inline-block{"+"\r"+
"\n    display:inline-block;"+"\r"+
"\n    margin:.2em;"+"\r"+
"\n  }"+"\r"+
"\n</style>"+"\r"+
"\n"+"\r"+
"\n<ngfUploadStatus [(percent)]=\"progress\" [httpEvent]=\"httpEvent\"></ngfUploadStatus>"+"\r"+
"\n"+"\r"+
"\n<div class=\"inline-block\">"+"\r"+
"\n    <h3>Select Files</h3>"+"\r"+
"\n"+"\r"+
"\n    <div class=\"inline-block\">"+"\r"+
"\n      Multiple"+"\r"+
"\n      <input type=\"file\" ngfSelect [(files)]=\"files\" multiple  />"+"\r"+
"\n    </div>"+"\r"+
"\n"+"\r"+
"\n    <div class=\"inline-block\">"+"\r"+
"\n      Single"+"\r"+
"\n      <input type=\"file\" ngfSelect [(files)]=\"files\" />"+"\r"+
"\n    </div>"+"\r"+
"\n"+"\r"+
"\n    <div class=\"inline-block\">"+"\r"+
"\n      Element"+"\r"+
"\n      <div ngfSelect multiple=\"1\""+"\r"+
"\n        [(files)]=\"files\""+"\r"+
"\n        class=\"well my-drop-zone\""+"\r"+
"\n        style=\"border-style:groove;padding:0.5em;text-align:center;\""+"\r"+
"\n      >"+"\r"+
"\n        Tap to Select"+"\r"+
"\n      </div>"+"\r"+
"\n    </div>"+"\r"+
"\n"+"\r"+
"\n    <div class=\"inline-block\">"+"\r"+
"\n      Images Only"+"\r"+
"\n      <div ngfSelect accept=\"image/*\" multiple=\"1\""+"\r"+
"\n        [(files)]=\"files\""+"\r"+
"\n        class=\"well my-drop-zone\""+"\r"+
"\n        style=\"border-style:groove;padding:0.5em;text-align:center;\""+"\r"+
"\n      >"+"\r"+
"\n        Tap to Select"+"\r"+
"\n      </div>"+"\r"+
"\n    </div>"+"\r"+
"\n</div>"+"\r"+
"\n"+"\r"+
"\n<div class=\"inline-block\">"+"\r"+
"\n  <h3>Drop Files</h3>"+"\r"+
"\n"+"\r"+
"\n  <div class=\"inline-block\">"+"\r"+
"\n    <div ngfDrop"+"\r"+
"\n      [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\""+"\r"+
"\n      (fileOver)=\"hasBaseDropZoneOver=$event\""+"\r"+
"\n      [(files)]=\"files\""+"\r"+
"\n      class=\"well my-drop-zone\""+"\r"+
"\n    >"+"\r"+
"\n      Base drop zone"+"\r"+
"\n    </div>"+"\r"+
"\n  </div>"+"\r"+
"\n"+"\r"+
"\n  <div class=\"inline-block\">"+"\r"+
"\n    <div ngfDrop multiple=\"1\" selectable=\"1\" accept=\"image/*\""+"\r"+
"\n      [ngClass]=\"{'another-file-over-class': validComboDrag}\""+"\r"+
"\n      [(validDrag)]=\"validComboDrag\""+"\r"+
"\n      [(files)]=\"files\""+"\r"+
"\n      class=\"well my-drop-zone\""+"\r"+
"\n    >"+"\r"+
"\n      Combo drop/select image only zone"+"\r"+
"\n    </div>"+"\r"+
"\n  </div>"+"\r"+
"\n</div>"+"\r"+
"\n"+"\r"+
"\n<div style=\"margin-bottom: 40px\">"+"\r"+
"\n  <h3>Upload Queue</h3>"+"\r"+
"\n  "+"\r"+
"\n  <p>Queue length: {{ files.length }}</p>"+"\r"+
"\n  <table class=\"table\">"+"\r"+
"\n    <thead>"+"\r"+
"\n      <tr>"+"\r"+
"\n        <th>Name</th>"+"\r"+
"\n        <th>Type</th>"+"\r"+
"\n        <th>Size</th>"+"\r"+
"\n        <th>Actions</th>"+"\r"+
"\n      </tr>"+"\r"+
"\n    </thead>"+"\r"+
"\n    <tbody>"+"\r"+
"\n      <tr *ngFor=\"let item of files;let i=index\">"+"\r"+
"\n        <td>"+"\r"+
"\n          <div *ngIf=\"['image/png','image/jpeg'].indexOf(item.type)>=0\">"+"\r"+
"\n            <div class=\"previewIcon\" [ngfBackground]=\"item\"></div>"+"\r"+
"\n          </div>"+"\r"+
"\n          <strong>{{ item.name }}</strong>"+"\r"+
"\n        </td>"+"\r"+
"\n        <td nowrap>"+"\r"+
"\n          {{ item.type }}"+"\r"+
"\n        </td>"+"\r"+
"\n        <td nowrap>"+"\r"+
"\n          {{ item.size/1024/1024 | number:'.2' }} MB"+"\r"+
"\n        </td>"+"\r"+
"\n        <td nowrap>"+"\r"+
"\n          <button type=\"button\""+"\r"+
"\n            class=\"btn btn-danger btn-xs\""+"\r"+
"\n            (click)=\"files.splice(i,1)\""+"\r"+
"\n          >"+"\r"+
"\n            <span class=\"glyphicon glyphicon-trash\"></span>"+"\r"+
"\n          </button>"+"\r"+
"\n        </td>"+"\r"+
"\n      </tr>"+"\r"+
"\n    </tbody>"+"\r"+
"\n  </table>"+"\r"+
"\n"+"\r"+
"\n  <div>"+"\r"+
"\n    <div>"+"\r"+
"\n      Queue progress:"+"\r"+
"\n      <div class=\"progress\" style=\"\">"+"\r"+
"\n        <div class=\"progress-bar\""+"\r"+
"\n          role=\"progressbar\""+"\r"+
"\n          [ngStyle]=\"{ 'width': progress + '%' }\""+"\r"+
"\n        ></div>"+"\r"+
"\n      </div>"+"\r"+
"\n    </div>"+"\r"+
"\n"+"\r"+
"\n    <i *ngIf=\"progress==100\" class=\"glyphicon glyphicon-ok\"></i>"+"\r"+
"\n"+"\r"+
"\n    <button type=\"button\""+"\r"+
"\n      class=\"btn btn-success btn-s\""+"\r"+
"\n      (click)=\"uploadFiles(files)\""+"\r"+
"\n      [disabled]=\"!files\""+"\r"+
"\n    >"+"\r"+
"\n      <span class=\"glyphicon glyphicon-upload\"></span> Upload all"+"\r"+
"\n    </button>"+"\r"+
"\n"+"\r"+
"\n    <button type=\"button\""+"\r"+
"\n      class=\"btn btn-warning btn-s\""+"\r"+
"\n      (click)=\"cancel()\""+"\r"+
"\n      [disabled]=\"!httpEmitter\""+"\r"+
"\n    >"+"\r"+
"\n      <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all"+"\r"+
"\n    </button>"+"\r"+
"\n    <button type=\"button\""+"\r"+
"\n      class=\"btn btn-danger btn-s\""+"\r"+
"\n      (click)=\"files.length=0\""+"\r"+
"\n      [disabled]=\"!files\""+"\r"+
"\n    >"+"\r"+
"\n      <span class=\"glyphicon glyphicon-trash\"></span> Remove all"+"\r"+
"\n    </button>"+"\r"+
"\n  </div>"+"\r"+
"\n</div>"