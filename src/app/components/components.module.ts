import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShrinkingHeaderComponent } from '../components/shrinking-header/shrinking-header.component';

@NgModule({
  declarations: [
    ShrinkingHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    ShrinkingHeaderComponent
  ]
})
export class ComponentsModule { }
