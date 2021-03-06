import {Component} from '@angular/core';
import {MultipleSelectionEnum} from 'components/search/search.interface';

@Component({
  selector: 'app-statistic',
  templateUrl: 'statistic.template.html'
})
export class StatisticPageComponent {
  public readonly allowedMultipleSelection: Array<MultipleSelectionEnum> = [MultipleSelectionEnum.YEAR];
}
