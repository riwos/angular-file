export const string = "<style>"+
"\n  .my-drop-zone { border: dotted 3px lightgray; }"+
"\n  /* Default class applied to drop zones on over */"+
"\n  .nv-file-over { border: dotted 3px red; }"+
"\n  .another-file-over-class { border: dotted 3px green; }"+
"\n  html, body { height: 100%; }"+
"\n  .previewIcon{"+
"\n    width:100px;height:100px;"+
"\n    background-size:cover;"+
"\n    background-repeat:no-repeat;"+
"\n  }"+
"\n</style>"+
"\n"+
"\n<ngfUploadStatus [(percent)]=\"progress\" [httpEvent]=\"httpEvent\"></ngfUploadStatus>"+
"\n"+
"\n<div class=\"container\">"+
"\n  <div class=\"row\">"+
"\n    <div class=\"col-md-3\">"+
"\n"+
"\n      <h3>Select Files</h3>"+
"\n"+
"\n      Multiple"+
"\n      <input type=\"file\" ngfSelect [(files)]=\"files\" multiple  />"+
"\n"+
"\n      <br/>"+
"\n"+
"\n      Single"+
"\n      <input type=\"file\" ngfSelect [(files)]=\"files\" />"+
"\n"+
"\n      <br/>"+
"\n"+
"\n      Element"+
"\n      <div ngfSelect multiple=\"1\""+
"\n        [(files)]=\"files\""+
"\n        class=\"well my-drop-zone\""+
"\n        style=\"border-style:groove;padding:0.5em;text-align:center;\""+
"\n      >"+
"\n        Tap to Select"+
"\n      </div>"+
"\n"+
"\n      Images Only"+
"\n      <div ngfSelect accept=\"image/*\" multiple=\"1\""+
"\n        [(files)]=\"files\""+
"\n        class=\"well my-drop-zone\""+
"\n        style=\"border-style:groove;padding:0.5em;text-align:center;\""+
"\n      >"+
"\n        Tap to Select"+
"\n      </div>"+
"\n"+
"\n      <h3>Drop Files</h3>"+
"\n"+
"\n      <div ngfDrop"+
"\n        [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\""+
"\n        (fileOver)=\"hasBaseDropZoneOver=$event\""+
"\n        [(files)]=\"files\""+
"\n        class=\"well my-drop-zone\""+
"\n      >"+
"\n        Base drop zone"+
"\n      </div>"+
"\n"+
"\n      <div ngfDrop multiple=\"1\" selectable=\"1\""+
"\n        [ngClass]=\"{'another-file-over-class': validComboDrag}\""+
"\n        [(validDrag)]=\"validComboDrag\""+
"\n        [(files)]=\"files\""+
"\n        class=\"well my-drop-zone\""+
"\n      >"+
"\n        Combo drop/select zone"+
"\n      </div>"+
"\n    </div>"+
"\n"+
"\n    <div class=\"col-md-9\" style=\"margin-bottom: 40px\">"+
"\n      "+
"\n      <h3>Upload Queue</h3>"+
"\n      "+
"\n      <p>Queue length: {{ files.length }}</p>"+
"\n      <table class=\"table\">"+
"\n        <thead>"+
"\n          <tr>"+
"\n            <th>Name</th>"+
"\n            <th>Type</th>"+
"\n            <th>Size</th>"+
"\n            <th>Actions</th>"+
"\n          </tr>"+
"\n        </thead>"+
"\n        <tbody>"+
"\n          <tr *ngFor=\"let item of files;let i=index\">"+
"\n            <td>"+
"\n              <div *ngIf=\"['image/png','image/jpeg'].indexOf(item.type)>=0\">"+
"\n                <div class=\"previewIcon\" [ngfBackground]=\"item\"></div>"+
"\n              </div>"+
"\n              <strong>{{ item.name }}</strong>"+
"\n            </td>"+
"\n            <td nowrap>"+
"\n              {{ item.type }}"+
"\n            </td>"+
"\n            <td nowrap>"+
"\n              {{ item.size/1024/1024 | number:'.2' }} MB"+
"\n            </td>"+
"\n            <td nowrap>"+
"\n              <button type=\"button\""+
"\n                class=\"btn btn-danger btn-xs\""+
"\n                (click)=\"files.splice(i,1)\""+
"\n              >"+
"\n                <span class=\"glyphicon glyphicon-trash\"></span>"+
"\n              </button>"+
"\n            </td>"+
"\n          </tr>"+
"\n        </tbody>"+
"\n      </table>"+
"\n"+
"\n      <div>"+
"\n        <div>"+
"\n          Queue progress:"+
"\n          <div class=\"progress\" style=\"\">"+
"\n            <div class=\"progress-bar\""+
"\n              role=\"progressbar\""+
"\n              [ngStyle]=\"{ 'width': progress + '%' }\""+
"\n            ></div>"+
"\n          </div>"+
"\n        </div>"+
"\n"+
"\n        <i *ngIf=\"progress==100\" class=\"glyphicon glyphicon-ok\"></i>"+
"\n"+
"\n        <button type=\"button\""+
"\n          class=\"btn btn-success btn-s\""+
"\n          (click)=\"uploadFiles(files)\""+
"\n          [disabled]=\"!files\""+
"\n        >"+
"\n          <span class=\"glyphicon glyphicon-upload\"></span> Upload all"+
"\n        </button>"+
"\n"+
"\n        <button type=\"button\""+
"\n          class=\"btn btn-warning btn-s\""+
"\n          (click)=\"cancel()\""+
"\n          [disabled]=\"!httpEmitter\""+
"\n        >"+
"\n          <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all"+
"\n        </button>"+
"\n        <button type=\"button\""+
"\n          class=\"btn btn-danger btn-s\""+
"\n          (click)=\"files.length=0\""+
"\n          [disabled]=\"!files\""+
"\n        >"+
"\n          <span class=\"glyphicon glyphicon-trash\"></span> Remove all"+
"\n        </button>"+
"\n      </div>"+
"\n    </div>"+
"\n  </div>"+
"\n</div>"