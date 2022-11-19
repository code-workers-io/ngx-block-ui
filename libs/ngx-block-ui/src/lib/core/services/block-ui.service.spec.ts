
import { TestBed } from '@angular/core/testing';


import { BlockUIService } from './block-ui.service';
import { BlockUIInstanceService } from './block-ui-instance.service';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BLOCKUI_DEFAULT } from '../constants/block-ui-default-name.constant';

// This needs to be more thorough
// I am having issues spying on blockUIInstance.dispatch
describe('BlockUI service', () => {
  let blockUIService: BlockUIService;

  beforeEach(() => {
    blockUIService = new BlockUIService(new BlockUIInstanceService());

    spyOn(blockUIService as any, 'dispatch');
  });

  describe('decorate', () => {
    const instance = 'testInstance';

    it('methods dispatch corresponding actions', () => {
      blockUIService.start(instance);
      blockUIService.update(instance, 'testMessage');
      blockUIService.stop(instance);
      blockUIService.unsubscribe(instance);

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.START, undefined
      );

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.UPDATE, undefined
      );

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.STOP
      );

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.UNSUBSCRIBE
      );
    });

    it('start method can be passed a message', () => {
      const message = 'Test message';

      blockUIService.start(instance, message);

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.START, message
      );
    });

    it('passes a message to the update method', () => {
      const message = 'Test message';

      blockUIService.update(instance, message);

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        instance, BlockUIActions.UPDATE, message
      );
    });
  });
});
