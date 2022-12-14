import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { BlockUI } from '../decorators/block-ui.decorator';
import { BlockUIContentComponent } from '../components/block-ui-content/block-ui-content.component';
import {NgxBlockUiModule} from "../../ngx-block-ui.module";


describe(`block-ui element directive`, () => {
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-comp',
    template: `
    <ng-template class="ref-template" #templateTest>
      <div class="test-template">Test</div>
    </ng-template>
    <div class="host-element" *blockUI="'element'; message: 'default'; template: templateTest">
        <h1 class="header">Test</h1>
    </div>
  `
  })
    // eslint-disable-next-line @angular-eslint/component-class-suffix
  class TestComp {
    @BlockUI('element') blockUI: any;
    blockName!: string;
  }

  let cf: ComponentFixture<any>;
  let blkContComp: DebugElement;
  let blockContentElement: HTMLElement;
  let testCmp: TestComp | null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxBlockUiModule.forRoot()],
      declarations: [TestComp]
    })
      .compileComponents();

    cf = TestBed.createComponent(TestComp);
    cf.detectChanges();

    testCmp = cf.debugElement.componentInstance;
  }));

  afterEach(() => {
    cf.destroy();
    testCmp = null;
  });

  it(`appends block-ui-content`, () => {
    blkContComp = cf.debugElement.query(By.directive(BlockUIContentComponent));
    blockContentElement = blkContComp.nativeElement;
    expect(blockContentElement).toBeDefined();
  });

  it(`adds 'block-ui-wrapper--element' to block-ui-content`, () => {
    const blkContComp = cf.debugElement.query(By.css('block-ui-content.block-ui-wrapper--element'));
    expect(blkContComp).toBeDefined();
  });

  it(`adds 'block-ui__element' class to host element`, () => {
    const hostElement = cf.debugElement.query(By.css('host-element.block-ui__element'));
    expect(hostElement).toBeDefined();
  });

  it(`projects transcluded elements`, () => {
    const { nativeElement } = cf.debugElement.query(By.css('h1.header'));
    expect(nativeElement).not.toBe(null);
  });

  it(`passes name property to block-ui-content`, () => {
    const name = 'test-name';
    const { componentInstance } = cf.debugElement.query(By.directive(BlockUIContentComponent));

    componentInstance.name = name;
    cf.detectChanges();

    expect(componentInstance.name).toBe(name);
  });

  it(`passes default message property to block-ui-content`, () => {
    const expectedMessage = 'default';
    const { componentInstance } = cf.debugElement.query(By.directive(BlockUIContentComponent));

    expect(componentInstance.defaultMessage).toBe(expectedMessage);
  });

  it(`passes custom template to block-ui-content`, () => {
    testCmp?.blockUI.start();
    cf.detectChanges();

    const template = cf.debugElement.query(By.css('.test-template'));
    expect(template).not.toBeNull();
  });
});
