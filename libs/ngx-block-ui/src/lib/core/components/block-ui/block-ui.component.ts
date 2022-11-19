import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  ComponentRef
} from '@angular/core';
import { BlockUIInstanceService } from '../../services/block-ui-instance.service';
import { BLOCKUI_DEFAULT } from '../../constants/block-ui-default-name.constant';

@Component({
  selector: 'block-ui',
  template: `
    <ng-content></ng-content>
    <block-ui-content
      [name]="name"
      [message]="message"
      [template]="template"
      [delayStart]="delayStart"
      [delayStop]="delayStop"
    >
    </block-ui-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class BlockUIComponent implements OnInit {
  @Input() name!: string;
  @Input() message: any;
  @Input() delayStart: number | undefined;
  @Input() delayStop: number | undefined;
  @Input() template: any;

  constructor(
    private blockUI: BlockUIInstanceService,
  ) { }

  ngOnInit() {
    this.name = this.name || BLOCKUI_DEFAULT;
    this.template = this.template || this.blockUI.blockUISettings.template;
  }
}
