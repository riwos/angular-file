"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var FileUploader_class_1 = require("./FileUploader.class");
var FileItem_class_1 = require("./FileItem.class");
var ngfUploader = /** @class */ (function (_super) {
    __extends(ngfUploader, _super);
    function ngfUploader(Http) {
        var _this = _super.call(this) || this;
        _this.Http = Http;
        _this.refChange = new core_1.EventEmitter();
        _this.options = {
            autoUpload: false,
            isHTML5: true,
            filters: [],
            removeAfterUpload: false,
            disableMultipart: false
        };
        _this.useNgHttp = false;
        return _this;
    }
    ngfUploader.prototype.ngOnInit = function () {
        var _this = this;
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(function () {
            _this.refChange.emit(_this);
            //this.directiveInit.emit(this)
        }, 0);
    };
    ngfUploader.prototype.ngOnChanges = function (changes) {
        if (changes.options) {
            this.setOptions(changes.options.currentValue);
        }
    };
    ngfUploader.prototype.uploadFiles = function (files) {
        var _this = this;
        var valids = [];
        files.map(function (file) {
            if (_this.isFileValid(file)) {
                valids.push(file);
            }
        });
        var promise = this.useNgHttp ? this.ngHttpFiles(this.getFormData(valids)) : this.xhrOneByOne(valids);
        return promise.then(function (response) { return _this.success.emit(response); })
            .catch(function (e) {
            _this.catcher.emit(e);
            _this.done.emit(e);
            return Promise.reject(e);
        });
    };
    //old school way to send files. Still pretty handy
    ngfUploader.prototype.xhrOneByOne = function (files) {
        var _this = this;
        var promises = files.map(function (file) {
            var fileItem = new FileItem_class_1.FileItem(_this, file, _this.options);
            return _this._xhrTransport(fileItem);
        });
        return Promise.all(promises);
    };
    ngfUploader.prototype.ngHttpFiles = function (formData) {
        var config = Object.assign({}, this.options);
        config.body = formData;
        var request = new http_1.Request(config);
        return this.postRequest(config);
    };
    ngfUploader.prototype.postRequest = function (config) {
        return this.Http.request(config).toPromise();
    };
    ngfUploader.decorators = [
        { type: core_1.Directive, args: [{ selector: 'ngfUploader' },] },
    ];
    /** @nocollapse */
    ngfUploader.ctorParameters = function () { return [
        { type: http_1.Http, },
    ]; };
    ngfUploader.propDecorators = {
        'ref': [{ type: core_1.Input },],
        'refChange': [{ type: core_1.Output },],
        'options': [{ type: core_1.Input },],
        'useNgHttp': [{ type: core_1.Input },],
    };
    return ngfUploader;
}(FileUploader_class_1.FileUploader));
exports.ngfUploader = ngfUploader;
