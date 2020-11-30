import {NgModule} from "@angular/core";

import {MainPageComponent} from "./main.page";
import {MapModule} from "../../components/map/map.module";

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    MapModule
  ],
})
export class MainPageModule {
}
