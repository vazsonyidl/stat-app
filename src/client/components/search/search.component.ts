import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';

import {searchSchema} from './search.schema';
import {NameUrlPair, SearchSchemaVariable, TransformedSchema} from './search.interface';
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
  public options = new BehaviorSubject<Array<TransformedSchema>>([]);

  private destroy = new Subject<boolean>();

  constructor(private readonly searchService: SearchService) {
  }

  public ngOnInit(): void {
    this.availableTypes.next(searchSchema.type);
    this.typeFormControl.valueChanges.pipe(
      takeUntil(this.destroy),
      switchMap((selectedTypeUrl: string) => this.searchService.getSchema(selectedTypeUrl)),
      tap(() => this.removeAllControl()),
      tap((results: Array<SearchSchemaVariable>) => this.setControls(results)),
      tap((result) => this.options.next(this.transformOptions(result)))
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  public onSearch(): void {
    this.searchService.searchOptions.next(this.formGroup.value);
    this.searchService.search(this.typeFormControl.value, this.formGroup.value).pipe(
      takeUntil(this.destroy)
    ).subscribe();
  }

  private setControls(results: Array<SearchSchemaVariable>): void {
    for (const result of results) {
      this.formGroup.registerControl(result?.code, new FormControl(''));
    }
  }

  private transformOptions(results: Array<SearchSchemaVariable>): Array<TransformedSchema> {
    return results.map(resp => ({
      code: resp?.code,
      text: resp?.text,
      value: resp?.values?.reduce((acc, value, index) => {
        acc[value] = resp?.valueTexts[index];
        return acc;
      }, {})
    }));
  }

  private removeAllControl(): void {
    for (const option of this.options.value) {
      this.formGroup.removeControl(option?.code);
    }
  }
}
