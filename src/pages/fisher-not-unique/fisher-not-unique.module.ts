import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FisherNotUniquePage} from "./fisher-not-unique";

@NgModule({
  declarations: [
      FisherNotUniquePage,
  ],
  imports: [
    IonicPageModule.forChild(FisherNotUniquePage),
  ],
})
export class FisherNotUniqueModule {}
