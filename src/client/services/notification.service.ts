import {ComponentRef, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {take, tap} from 'rxjs/operators';

import {CONTAINER_DATA} from '../components/notification/notification.const';
import {NotificationComponent} from '../components/notification/notification.component';

@Injectable()
export class NotificationService {
  private overlayRef: OverlayRef;
  private componentRef: ComponentRef<NotificationComponent>;
  private readonly _injector: Injector;

  constructor(private readonly overlay: Overlay) {
  }

  public attachNotification = (error: HttpErrorResponse): void => {
    if (this.overlayRef) this.destroyOverlay();
    this.overlayRef = this.createOverlay();

    this.componentRef = this.attachOverlay(error);
    this.componentRef?.instance?.disappearAnimationEnded.pipe(
      take(1),
      tap(() => this.destroyOverlay())
    ).subscribe();
  };


  private createOverlay = (): OverlayRef => this.overlay.create({
    positionStrategy: this.overlay.position()?.global().right('8px').top('4px')
  });

  private attachOverlay = (error: HttpErrorResponse): ComponentRef<NotificationComponent> =>
    this.overlayRef.attach(new ComponentPortal(
      NotificationComponent,
      null,
      this.createInjector(`${error.status} - ${error.statusText}`)
      )
    );

  private destroyOverlay = (): void => {
    this.overlayRef.dispose();
    this.overlayRef = null;
  };


  private createInjector = (dataToPass: string): Injector => Injector.create({
    parent: this._injector,
    providers: [{provide: CONTAINER_DATA, useValue: dataToPass}]
  });
}
