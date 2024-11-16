import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'ngx-components',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class LayoutComponent {
  @HostBinding('style') style= 'overflow: auto';
}
