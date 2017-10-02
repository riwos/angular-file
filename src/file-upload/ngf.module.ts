import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ngfBackground } from './ngfBackground.directive';
import { ngfDrop } from './ngfDrop.directive';
import { ngf } from './ngf.directive';
import { ngfSelect } from './ngfSelect.directive';
import { ngfUploader } from './ngfUploader.directive';
import{ HttpModule } from '@angular/http';

const declarations = [
  ngfDrop,
  ngfSelect,
  ngfBackground,
  ngfUploader,
  ngf
]

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: declarations,
  exports: [HttpModule, ...declarations]
}) export class ngfModule {}