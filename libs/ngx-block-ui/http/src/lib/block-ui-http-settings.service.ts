import { Injectable } from '@angular/core';
import {HttpSettings} from "@code-workers.io/ngx-block-ui";


@Injectable()
export class BlockUIHttpSettings {
  settings: HttpSettings = {};
}
