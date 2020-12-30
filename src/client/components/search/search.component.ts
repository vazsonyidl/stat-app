import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

import {BehaviorSubject, EMPTY, Observable, Subject} from 'rxjs';
import {catchError, take, takeUntil, tap} from 'rxjs/operators';

import {SearchService, schemaCacheBuster} from './search.service';
import {NotificationService} from '../../services/notification.service';
import {allowedMultipleSelection, searchSchema} from './search.const';
import {NameUrlPair, SearchResponse, SearchSchemaVariable, TransformedSchema} from './search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.template.html',
  styleUrls: ['search.style.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  public formGroup = new FormGroup({});
  public typeFormControl = new FormControl('');
  public availableTypes = new BehaviorSubject<Array<NameUrlPair>>([]);
  public options = new BehaviorSubject<Array<TransformedSchema>>([]);

  private destroy = new Subject<boolean>();

  constructor(private readonly searchService: SearchService,
              private readonly notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.availableTypes.next(searchSchema.type);
  }

  public ngOnDestroy(): void {
    schemaCacheBuster.next();
    this.destroy.next(true);
    this.destroy.complete();
  }

  public onSearch(): void {
    this.searchService.search(this.typeFormControl.value, this.formGroup.value).pipe(
      takeUntil(this.destroy),
      tap((response: SearchResponse) => this.searchService.searchResponse.next(response))
    ).subscribe();
  }

  public handleSchemaChange(selection: MatSelectChange): void {
    this.searchService.getSchema(selection.value).pipe(
      takeUntil(this.destroy),
      take(1),
      tap((results: Array<SearchSchemaVariable>) => this.setUpControls(results)),
      catchError((error: HttpErrorResponse) => this.handleError(error))
    ).subscribe();
  }

  private setUpControls = (results: Array<SearchSchemaVariable>) => {
    this.removeAllControl();
    this.registerControlsOnForm(results);
    this.options.next(this.transformOptions(results));
  };

  private registerControlsOnForm(results: Array<SearchSchemaVariable>): void {
    for (const result of results) {
      this.formGroup.registerControl(result?.code, new FormControl('', Validators.required));
    }
  }

  private removeAllControl(): void {
    for (const option of this.options.value) {
      this.formGroup.removeControl(option?.code);
    }
  }

  private handleError = (error: HttpErrorResponse): Observable<never> => {
    this.notificationService.attachNotification(error);
    this.removeAllControl();
    this.options.next([]);
    return EMPTY;
  };

  private transformOptions(results: Array<SearchSchemaVariable> = []): Array<TransformedSchema> {
    return results.map(resp => ({
      code: resp?.code,
      text: resp?.text,
      value: resp?.values?.reduce((acc, value, index) => {
        acc[value] = resp?.valueTexts[index];
        return acc;
      }, {}),
      multiple: allowedMultipleSelection.includes(resp?.text)
    }));
  }
}
