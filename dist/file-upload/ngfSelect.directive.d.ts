import { EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive";
export declare class ngfSelect extends ngf {
    selectable: boolean;
    ref: ngfSelect;
    refChange: EventEmitter<ngfSelect>;
}
