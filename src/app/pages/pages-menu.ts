import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Simulation',
    link: '/pages/layout/stepper',
  },
  {
    title: 'Add Device',
    link: '/pages/layout/list',
  },
  {
    title: 'Result',
    link: '/pages/layout/infinite-list',
  },
  {
    title: 'Logs',
    link: '/pages/layout/accordion',
  },
  {
    title: 'About Us',
    pathMatch: 'prefix',
    link: '/pages/layout/tabs',
  },
];
