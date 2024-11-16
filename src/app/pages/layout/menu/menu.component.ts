import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../core/base/base.component';
import {MenuItem} from '../models/menu-item';


@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  @Input() menuItems: MenuItem[];

  doAction(action: () => void): void {
    action();
  }

}
