export const string = "<style>"+
"\n    .my-drop-zone { border: dotted 3px lightgray; }"+
"\n    /* Default class applied to drop zones on over */"+
"\n    .nv-file-over { border: dotted 3px red; }"+
"\n    .another-file-over-class { border: dotted 3px green; }"+
"\n    html, body { height: 100%; }"+
"\n</style>"+
"\n"+
"\n<div class=\"container\">"+
"\n"+
"\n    <div class=\"navbar navbar-default\">"+
"\n        <div class=\"navbar-header\">"+
"\n            <a class=\"navbar-brand\" href>Angular2 File Upload</a>"+
"\n        </div>"+
"\n    </div>"+
"\n"+
"\n    <div class=\"row\">"+
"\n"+
"\n        <div class=\"col-md-3\">"+
"\n"+
"\n            <h3>Select files</h3>"+
"\n"+
"\n            <div ng2FileDrop"+
"\n                 [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\""+
"\n                 (fileOver)=\"fileOverBase($event)\""+
"\n                 [uploader]=\"uploader\""+
"\n                 class=\"well my-drop-zone\">"+
"\n                Base drop zone"+
"\n            </div>"+
"\n"+
"\n            <div ng2FileDrop"+
"\n                 [ngClass]=\"{'another-file-over-class': hasAnotherDropZoneOver}\""+
"\n                 (fileOver)=\"fileOverAnother($event)\""+
"\n                 [uploader]=\"uploader\""+
"\n                 class=\"well my-drop-zone\">"+
"\n                Another drop zone"+
"\n            </div>"+
"\n"+
"\n            Multiple"+
"\n            <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple  />"+
"\n            <br/>"+
"\n            Single"+
"\n            <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" />"+
"\n        </div>"+
"\n"+
"\n        <div class=\"col-md-9\" style=\"margin-bottom: 40px\">"+
"\n"+
"\n            <h3>Upload queue</h3>"+
"\n            <p>Queue length: {{ uploader?.queue?.length }}</p>"+
"\n"+
"\n            <table class=\"table\">"+
"\n                <thead>"+
"\n                <tr>"+
"\n                    <th width=\"50%\">Name</th>"+
"\n                    <th>Size</th>"+
"\n                    <th>Progress</th>"+
"\n                    <th>Status</th>"+
"\n                    <th>Actions</th>"+
"\n                </tr>"+
"\n                </thead>"+
"\n                <tbody>"+
"\n                <tr *ngFor=\"let item of uploader.queue\">"+
"\n                    <td>"+
"\n                      <strong>{{ item?.file?.name }}</strong>"+
"\n                    </td>"+
"\n                    <td *ngIf=\"uploader.isHTML5\" nowrap>"+
"\n                      {{ item?.file?.size/1024/1024 | number:'.2' }} MB"+
"\n                    </td>"+
"\n                    <td *ngIf=\"uploader.isHTML5\">"+
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
"\n                            &nbsp;Remove"+
"\n                        </button>"+
"\n                    </td>"+
"\n                </tr>"+
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