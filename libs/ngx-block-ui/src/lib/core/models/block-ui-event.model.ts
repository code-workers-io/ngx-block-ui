import { BlockUIActions } from '../constants/block-ui-actions.constant';

export interface BlockUIEvent {
    name: string;
    action: BlockUIActions;
    message?: any;
}
