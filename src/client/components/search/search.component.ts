import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';

import {searchSchema} from './search.schema';
import {NameUrlPair} from './search.interface';
import {SearchService} from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.template.html',
  styleUrls: ['search.style.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public formGroup = new FormGroup({});
  public typeFormControl = new FormControl('');
  public availableTypes = new BehaviorSubject<Array<NameUrlPair>>([]);
  public response = new BehaviorSubject<Array<{ [key: string]: string | { [key: string]: string } }>>([]);

  private destroy = new Subject<boolean>();

  constructor(private readonly searchService: SearchService) {
  }

  public ngOnInit(): void {
    this.availableTypes.next(searchSchema.type);
    this.typeFormControl.valueChanges.pipe(
      takeUntil(this.destroy),
      switchMap((selectedType: string) => this.searchService.getSchema(selectedType)),
      tap((results: Array<{ [key: string]: any }>) => {

        for (const result of results) {
          this.formGroup.setControl(result.text, new FormControl(''));
        }

        this.response.next(results.map(resp => ({
          text: resp.text,
          value: resp.values.reduce((acc, value, index) => {
            acc[value] = resp.valueTexts[index];
            return acc;
          }, {})
        })));
      }),
    ).subscribe();

  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
