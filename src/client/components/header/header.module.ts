import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './header.component';

@NgModule({
  imports: [
    MatIconModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {}
