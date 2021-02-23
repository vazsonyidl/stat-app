import {Injectable} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

import {OverlayComponent} from 'components/overlay/overlay.component';

@Injectable()
export class OverlayService {
  private overlayRef: OverlayRef;

  constructor(private readonly overlay: Overlay) {
  }

  public attachOverlayToElement = (element: HTMLElement): void => {
    this.overlayRef = this.createOverlayReference(element);
    this.overlayRef.attach(new ComponentPortal(OverlayComponent));
  };

  public destroyOverlay = (): void => this.overlayRef.dispose();

  private createOverlayReference(element: HTMLElement): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay.position().flexibleConnectedTo(element).withPositions([{
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
      }]),
      width: '100%',
      height: element?.offsetHeight
    });
  }
}
