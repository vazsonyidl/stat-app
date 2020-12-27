import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

import {NotificationComponent} from '../components/notification/notification.component';
import {CONTAINER_DATA} from '../components/notification/notification.const';

@Injectable()
export class NotificationService {
  private overlayRef: OverlayRef;
  private readonly _injector: Injector;

  constructor(private readonly overlay: Overlay) {
  }

  public attachNotification = (error: HttpErrorResponse): void => {
    if (this.overlayRef) this.destroyOverlay();

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()?.global().right('8px').top('4px')
    });

    this.overlayRef.attach(new ComponentPortal(NotificationComponent, null, this.createInjector(
      `${error.status} - ${error.statusText}`))
    );
  };

  private destroyOverlay = () => {
    this.overlayRef.dispose();
    this.overlayRef = null;
  };


  private createInjector = (dataToPass: string): Injector => {
    return Injector.create({
      parent: this._injector,
      providers: [{provide: CONTAINER_DATA, useValue: dataToPass}]
    });
  }
}
