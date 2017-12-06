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
var ngf_directive_1 = require("./ngf.directive");
var ngfSelect = (function (_super) {
    __extends(ngfSelect, _super);
    function ngfSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectable = true;
        _this.refChange = new core_1.EventEmitter();
        return _this;
    }
    ngfSelect.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngfSelect]' },] },
    ];
    /** @nocollapse */
    ngfSelect.ctorParameters = function () { return []; };
    ngfSelect.propDecorators = {
        "selectable": [{ type: core_1.Input },],
        "ref": [{ type: core_1.Input, args: ['ngfSelect',] },],
        "refChange": [{ type: core_1.Output, args: ['ngfSelectChange',] },],
    };
    return ngfSelect;
}(ngf_directive_1.ngf));
exports.ngfSelect = ngfSelect;
