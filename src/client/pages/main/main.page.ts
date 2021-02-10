import {Component} from '@angular/core';
import {MultipleSelectionEnum} from 'components/search/search.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.template.html',
})
export class MainPageComponent {
  public allowedMultipleSelection: Array<MultipleSelectionEnum> = [MultipleSelectionEnum.COUNTY];
}
