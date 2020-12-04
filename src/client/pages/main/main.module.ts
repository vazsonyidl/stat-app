import {NgModule} from "@angular/core";

import {MainPageComponent} from "./main.page";
import {MapModule} from "../../components/map/map.module";
import {SearchModule} from "../../components/search/search.module";

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    MapModule,
    SearchModule
  ],
})
export class MainPageModule {
}
