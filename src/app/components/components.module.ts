import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShrinkingHeaderComponent } from '../components/shrinking-header/shrinking-header.component';

@NgModule({
  declarations: [
    ShrinkingHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShrinkingHeaderComponent
  ]
})
export class ComponentsModule { }
