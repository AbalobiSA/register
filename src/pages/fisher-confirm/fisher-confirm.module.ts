import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FisherConfirmPage } from './fisher-confirm';

@NgModule({
  declarations: [
    FisherConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(FisherConfirmPage),
  ],
})
export class FisherConfirmPageModule {}
