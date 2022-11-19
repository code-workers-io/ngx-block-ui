
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import {  Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';


import { BlockUIContentComponent } from '../block-ui-content/block-ui-content.component';
import { BLOCKUI_DEFAULT } from '../../constants/block-ui-default-name.constant';
import { BlockUISettings } from '../../models/block-ui-settings.model';
import {NgxBlockUiModule} from "../../../ngx-block-ui.module";


describe('block-ui component', () => {

  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'template-comp',
    template: `
    <div class="test-template">{{message}}</div>
  `
  })
    // eslint-disable-next-line @angular-eslint/component-class-suffix
  class TestTemplateComp { }

  let cf: ComponentFixture<any>;
  let testCmp: any;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;
  const globalSettings: BlockUISettings = {
    message: 'Global',
    delayStart: 1900,
    delayStop: 2000,
  };

  beforeEach(async(() => {
    @Component({
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: 'test-comp',
      template: `
        <block-ui
          [name]="blockName"
          [message]="message"
          [delayStart]="delayStart"
          [delayStop]="delayStop"
          [template]="customTmp"
        >
          <h1 class="header">Test</h1>
        </block-ui>
      `
    })
      // eslint-disable-next-line @angular-eslint/component-class-suffix
    class TestComp {
      blockName: string | undefined;
      message: string | undefined;
      delayStart: number | undefined;
      delayStop: number | undefined;
      customTmp: any;
    }

    TestBed.configureTestingModule({
      imports: [
        NgxBlockUiModule.forRoot(globalSettings)
      ],
      declarations: [
        TestTemplateComp,
        TestComp
      ],
    })
      .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
    testCmp = cf.debugElement.componentInstance;
  }));

  it('appends block-ui-content', () => {
    expect(blockContentElement).toBeDefined();
  });

  it('projects transcluded elements', () => {
    const { nativeElement } = cf.debugElement.query(By.css('h1.header'));
    expect(nativeElement).not.toBe(null);
  });

  it('sets block-ui-content name to default if name is undefined', () => {
    const { componentInstance } = blkContComp;
    expect(componentInstance.name).toBe(BLOCKUI_DEFAULT);
  });

  it('passes name property to block-ui-content', () => {
    const name = 'test-name';
    const { componentInstance } = blkContComp;

    componentInstance.name = name;
    cf.detectChanges();

    expect(componentInstance.name).toBe(name);
  });

  it('passes default message property to block-ui-content', () => {
    const msg = 'test';
    const { componentInstance } = blkContComp;
    testCmp.message = msg;

    cf.detectChanges();

    expect(componentInstance.defaultMessage).toBe(msg);
  });

  it('passes delays to block-ui-content', () => {
    const start = 3000;
    const stop = 3000;
    const { componentInstance } = blkContComp;

    testCmp.delayStart = start;
    testCmp.delayStop = stop;

    cf.detectChanges();

    expect(componentInstance.delayStart).toBe(start);
    expect(componentInstance.delayStop).toBe(stop);
  });

  it('passes template to block-ui-content', () => {
    const { componentInstance } = blkContComp;

    testCmp.customTmp = TestTemplateComp;

    cf.detectChanges();

    expect(componentInstance.templateCmp).toBe(TestTemplateComp);
  });
});
