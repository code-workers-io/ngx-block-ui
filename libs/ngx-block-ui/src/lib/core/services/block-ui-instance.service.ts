import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BLOCKUI_DEFAULT } from '../constants/block-ui-default-name.constant';
import { NgBlockUI } from '../models/block-ui.model';
import { BlockUISettings } from '../models/block-ui-settings.model';
import { BlockUIEvent } from '../models/block-ui-event.model';


@Injectable()
export class BlockUIInstanceService {
  blockUISettings: BlockUISettings | any = {};
  blockUIInstances: any = {};
  private blockUISubject: ReplaySubject<any> = new ReplaySubject(1);
  blockUIObservable$: Observable<any> = this.blockUISubject.asObservable();

  constructor() {
    this.blockUIObservable$.subscribe(this.blockUIMiddleware.bind(this));
  }

  getSettings(): BlockUISettings | any {
    return this.blockUISettings;
  }

  updateSettings(settings: BlockUISettings | any = {}): void {
    this.blockUISettings = { ...this.blockUISettings, ...settings };
  }

  decorate(name: string = BLOCKUI_DEFAULT): NgBlockUI {
    const blockUI = {
      name,
      isActive: false,
      blockCount: 0,
      start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
      update: this.dispatch(this.blockUISubject, BlockUIActions.UPDATE, name),
      stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
      reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
      resetGlobal: this.dispatch(this.blockUISubject, BlockUIActions.RESET_GLOBAL, name),
      unsubscribe: this.dispatch(this.blockUISubject, BlockUIActions.UNSUBSCRIBE, name)
    } as NgBlockUI;

    this.blockUIInstances[name] = this.blockUIInstances[name] || blockUI;

    return blockUI;
  }

  observe(): Observable<any> {
    return this.blockUIObservable$;
  }

  clearInstance(instanceName: string) {
    this.dispatch(this.blockUISubject, BlockUIActions.RESET, instanceName);
  }

  private blockUIMiddleware({ action, name }: BlockUIEvent): void {
    let isActive: boolean | null = null;

    switch (action) {
      case (BlockUIActions.START):
        isActive = true;
        break;

      case (BlockUIActions.STOP):
      case (BlockUIActions.RESET):
        isActive = false;
        break;
    }

    if (isActive !== null) {
      this.blockUIInstances[name].isActive = isActive;
    }
  }

  private dispatch(subject: ReplaySubject<any>, action: BlockUIActions, name: string = BLOCKUI_DEFAULT): (message?: any) => void {
    return (message?: any): void => {
      subject.next({
        name,
        action,
        message
      });
    };
  }
}
