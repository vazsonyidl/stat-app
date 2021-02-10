import {Component} from '@angular/core';
import {MultipleSelectionEnum} from 'components/search/search.interface';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.template.html'
})
export class ChartPageComponent {
  public allowedMultipleSelection: Array<MultipleSelectionEnum> = [MultipleSelectionEnum.YEAR];
}
