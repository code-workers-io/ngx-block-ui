import { map } from 'rxjs/operators';
import { BlockUIInstanceService } from './block-ui-instance.service';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BLOCKUI_DEFAULT } from '../constants/block-ui-default-name.constant';


describe('BlockUIInstance service', () => {
  let blockUIService: BlockUIInstanceService;

  beforeEach(() => {
    blockUIService = new BlockUIInstanceService();

    spyOn(blockUIService as any, 'dispatch');
  });

  describe('decorate', () => {
    it('returns NgBlockUI instance', () => {
      const blockUI = blockUIService.decorate();

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        (blockUIService as any).blockUISubject, BlockUIActions.START, BLOCKUI_DEFAULT
      );

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        (blockUIService as any).blockUISubject, BlockUIActions.STOP, BLOCKUI_DEFAULT
      );

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        (blockUIService as any).blockUISubject, BlockUIActions.RESET, BLOCKUI_DEFAULT
      );
    });

    it('passes instance name to NgBlockUI instance', () => {
      const expectName = 'test';
      const blockUI = blockUIService.decorate(expectName);

      expect((blockUIService as any).dispatch).toHaveBeenCalledWith(
        (blockUIService as any).blockUISubject, BlockUIActions.START, expectName
      );
    });
  });

  describe('observe', () => {
    it('returns a blockUI observable', () => {
      const blockUIObservable = blockUIService.observe();

      expect(blockUIObservable).toEqual(blockUIService.blockUIObservable$);
    });

    it('observable subscribes to blockUISubject', done => {
      const blockUIObservable = blockUIService.observe();
      const expectedResult = 'test';

      blockUIService.blockUIObservable$.pipe(map((data) => {
        expect(data).toEqual(expectedResult);
        done();
      }))
        .subscribe();

      (blockUIService as any).blockUISubject.next(expectedResult);
    });
  });

  describe('dispatch', () => {
    let expectedData = {
      name: BLOCKUI_DEFAULT,
      action: BlockUIActions.START,
      message: undefined
    };

    beforeEach(() => {
      blockUIService = new BlockUIInstanceService();

      spyOn((blockUIService as any).blockUISubject, 'next');
    });

    it('invokes blockUISubject next method', () => {
      const dispatcher = (blockUIService as any).dispatch(
        (blockUIService as any).blockUISubject, BlockUIActions.START
      );

      dispatcher();

      expect((blockUIService as any).blockUISubject.next).toHaveBeenCalledWith(expectedData);
    });

    it('passes message to dispatched data', () => {
      const message = 'Loading...';

      const dispatcher = (blockUIService as any).dispatch(
        (blockUIService as any).blockUISubject, BlockUIActions.START
      );

      dispatcher(message);

      expect((blockUIService as any).blockUISubject.next).toHaveBeenCalledWith(
        { ...expectedData, message }
      );
    });
  });
});
