import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NotificationComponent} from './notification.component';
import {CONTAINER_DATA} from './notification.const';

const dummyInjectorData: string = 'Dummy notification injector data';

describe('Notification Component', () => {
  let component: NotificationComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      providers: [
        {provide: CONTAINER_DATA, useValue: dummyInjectorData}
      ]
    }).compileComponents();

    const fixture: ComponentFixture<NotificationComponent> = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should get injected data', () => {
    expect(component.notificationData).toEqual(dummyInjectorData);
  });

  it('should emit only when animation ended', () => {
    jest.spyOn(component.disappearAnimationEnded, 'emit');
    const animationEndEvent = {
      animationName: 'disappear-notification',
    };

    component.onAnimationEnd(animationEndEvent as AnimationEvent);
    expect(component.disappearAnimationEnded.emit).toHaveBeenCalledWith(true);
    expect(component.disappearAnimationEnded.emit).toHaveBeenCalledTimes(1);

    animationEndEvent.animationName = null;
    component.onAnimationEnd(animationEndEvent as AnimationEvent);
    expect(component.disappearAnimationEnded.emit).toHaveBeenCalledTimes(1);

    animationEndEvent.animationName = 'undefined';
    component.onAnimationEnd(animationEndEvent as AnimationEvent);
    expect(component.disappearAnimationEnded.emit).toHaveBeenCalledTimes(1);
  });
});
