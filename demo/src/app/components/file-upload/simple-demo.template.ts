export const string = "<style>"+
"\n    .my-drop-zone { border: dotted 3px lightgray; }"+
"\n    /* Default class applied to drop zones on over */"+
"\n    .nv-file-over { border: dotted 3px red; }"+
"\n    .another-file-over-class { border: dotted 3px green; }"+
"\n    html, body { height: 100%; }"+
"\n    .previewIcon{"+
"\n      width:100px;height:100px;"+
"\n      background-size:cover;"+
"\n      background-repeat:no-repeat;"+
"\n    }"+
"\n</style>"+
"\n<div class=\"container\">"+
"\n    <div class=\"row\">"+
"\n        <div class=\"col-md-3\">"+
"\n            <h3>Select Files</h3>"+
"\n"+
"\n            Multiple"+
"\n            <input type=\"file\" ngfSelect [uploader]=\"uploader\" multiple  />"+
"\n            <br/>"+
"\n            Single"+
"\n            <input type=\"file\" ngfSelect [uploader]=\"uploader\" />"+
"\n            <br/>"+
"\n            Element"+
"\n            <div ngfSelect multiple=\"1\""+
"\n              [uploader]=\"uploader\""+
"\n              class=\"well my-drop-zone\""+
"\n              style=\"border-style:groove;padding:0.5em;text-align:center;\""+
"\n            >"+
"\n              Tap to Select"+
"\n            </div>"+
"\n            Images Only"+
"\n            <div ngfSelect accept=\"image/*\" multiple=\"1\""+
"\n              [uploader]=\"uploader\""+
"\n              class=\"well my-drop-zone\""+
"\n              style=\"border-style:groove;padding:0.5em;text-align:center;\""+
"\n            >"+
"\n              Tap to Select"+
"\n            </div>"+
"\n"+
"\n            <h3>Drop Files</h3>"+
"\n"+
"\n            <div ngfDrop"+
"\n              [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\""+
"\n              (fileOver)=\"fileOverBase($event)\""+
"\n              [uploader]=\"uploader\""+
"\n              class=\"well my-drop-zone\""+
"\n            >"+
"\n                Base drop zone"+
"\n            </div>"+
"\n"+
"\n            <div ngfDrop multiple=\"1\" selectable=\"1\""+
"\n              [ngClass]=\"{'another-file-over-class': validComboDrag}\""+
"\n              [(validDrag)]=\"validComboDrag\""+
"\n              [uploader]=\"uploader\""+
"\n              class=\"well my-drop-zone\""+
"\n            >"+
"\n              Combo drop/select zone"+
"\n            </div>"+
"\n        </div>"+
"\n"+
"\n        <div class=\"col-md-9\" style=\"margin-bottom: 40px\">"+
"\n"+
"\n            <h3>Upload Queue</h3>"+
"\n            <p>Queue length: {{ uploader?.queue?.length }}</p>"+
"\n"+
"\n            <table class=\"table\">"+
"\n                <thead>"+
"\n                  <tr>"+
"\n                      <th>Name</th>"+
"\n                      <th>Type</th>"+
"\n                      <th>Size</th>"+
"\n                      <th>Progress</th>"+
"\n                      <th>Status</th>"+
"\n                      <th>Actions</th>"+
"\n                  </tr>"+
"\n                </thead>"+
"\n                <tbody>"+
"\n                  <tr *ngFor=\"let item of uploader.queue\">"+
"\n                    <td>"+
"\n                      <div *ngIf=\"['image/png','image/jpeg'].indexOf(item._file.type)>=0\">"+
"\n                        <div class=\"previewIcon\" [ngfBackground]=\"item._file\"></div>"+
"\n                      </div>"+
"\n                      <strong>{{ item?.file?.name }}</strong>"+
"\n                    </td>"+
"\n                    <td nowrap>"+
"\n                      {{ item._file.type }}"+
"\n                    </td>"+
"\n                    <td nowrap>"+
"\n                      {{ item._file?.size/1024/1024 | number:'.2' }} MB"+
"\n                    </td>"+
"\n                    <td>"+
"\n                        <div class=\"progress\" style=\"margin-bottom: 0;\">"+
"\n                            <div class=\"progress-bar\""+
"\n                              role=\"progressbar\""+
"\n                              [ngStyle]=\"{ 'width': item.progress + '%' }\""+
"\n                            ></div>"+
"\n                        </div>"+
"\n                    </td>"+
"\n                    <td class=\"text-center\">"+
"\n                        <span *ngIf=\"item.isSuccess\">"+
"\n                          <i class=\"glyphicon glyphicon-ok\"></i>"+
"\n                        </span>"+
"\n                        <span *ngIf=\"item.isCancel\">"+
"\n                          <i class=\"glyphicon glyphicon-ban-circle\"></i>"+
"\n                        </span>"+
"\n                        <span *ngIf=\"item.isError\">"+
"\n                          <i class=\"glyphicon glyphicon-remove\"></i>"+
"\n                        </span>"+
"\n                    </td>"+
"\n                    <td nowrap>"+
"\n                        <button type=\"button\""+
"\n                          class=\"btn btn-success btn-xs\""+
"\n                          (click)=\"item.upload()\""+
"\n                          [disabled]=\"item.isReady || item.isUploading || item.isSuccess\""+
"\n                        >"+
"\n                            <span class=\"glyphicon glyphicon-upload\"></span>"+
"\n                            &nbsp;Upload"+
"\n                        </button>"+
"\n                        <button type=\"button\""+
"\n                          class=\"btn btn-warning btn-xs\""+
"\n                          (click)=\"item.cancel()\""+
"\n                          [disabled]=\"!item.isUploading\""+
"\n                        >"+
"\n                            <span class=\"glyphicon glyphicon-ban-circle\"></span>"+
"\n                            &nbsp;Cancel"+
"\n                        </button>"+
"\n                        <button type=\"button\""+
"\n                          class=\"btn btn-danger btn-xs\""+
"\n                          (click)=\"item.remove()\""+
"\n                        >"+
"\n                            <span class=\"glyphicon glyphicon-trash\"></span>"+
"\n                        </button>"+
"\n                    </td>"+
"\n                  </tr>"+
"\n                </tbody>"+
"\n            </table>"+
"\n"+
"\n            <div>"+
"\n                <div>"+
"\n                    Queue progress:"+
"\n                    <div class=\"progress\" style=\"\">"+
"\n                        <div class=\"progress-bar\""+
"\n                          role=\"progressbar\""+
"\n                          [ngStyle]=\"{ 'width': uploader.progress + '%' }\""+
"\n                        ></div>"+
"\n                    </div>"+
"\n                </div>"+
"\n                <button type=\"button\""+
"\n                  class=\"btn btn-success btn-s\""+
"\n                  (click)=\"uploader.uploadAll()\""+
"\n                  [disabled]=\"!uploader.getNotUploadedItems().length\""+
"\n                >"+
"\n                  <span class=\"glyphicon glyphicon-upload\"></span> Upload all"+
"\n                </button>"+
"\n                <button type=\"button\""+
"\n                  class=\"btn btn-warning btn-s\""+
"\n                  (click)=\"uploader.cancelAll()\""+
"\n                  [disabled]=\"!uploader.isUploading\""+
"\n                >"+
"\n                  <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all"+
"\n                </button>"+
"\n                <button type=\"button\""+
"\n                  class=\"btn btn-danger btn-s\""+
"\n                  (click)=\"uploader.clearQueue()\""+
"\n                  [disabled]=\"!uploader.queue.length\""+
"\n                >"+
"\n                  <span class=\"glyphicon glyphicon-trash\"></span> Remove all"+
"\n                </button>"+
"\n            </div>"+
"\n        </div>"+
"\n    </div>"+
"\n</div>"