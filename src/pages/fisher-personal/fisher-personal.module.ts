import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FisherPersonalPage } from './fisher-personal';

@NgModule({
  declarations: [
    FisherPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(FisherPersonalPage),
  ],
})
export class FisherPersonalPageModule {}
