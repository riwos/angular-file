import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ngfBackground } from './ngfBackground.directive';
import { ngfDrop } from './ngfDrop.directive';
import { ngf } from './ngf.directive';
import { ngfSelect } from './ngfSelect.directive';

const declarations = [
  ngf,
  ngfDrop,
  ngfSelect,
  ngfBackground
]

@NgModule({
  imports: [CommonModule],
  declarations: declarations,
  exports: declarations
}) export class ngfModule {}