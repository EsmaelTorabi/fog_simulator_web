import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from '../../models/menu-item';
import {BaseComponent} from "../base/base.component";

@Component({
  selec: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent  {
  @Input() menuItems: MenuItem[];


  doAction(action: () => void): void {
    action();
  }

}
