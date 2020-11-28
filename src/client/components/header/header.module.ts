import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
