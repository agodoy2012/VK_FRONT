import { Injectable } from '@angular/core';
import { state } from '@angular/animations';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [

  {
    state: "dashboard" ,
    name: 'Dashboards',
    type: 'link',
    icon: 'av_timer',
   
  },
  {
    state: "apps" ,
    name: 'Usuarios',
    type: 'sub',
    icon: 'people',
    children: [
      { state: 'contact', name: 'General', type: 'link' },
      { state: 'contact', name: 'VK', type: 'link' },
      { state: 'contact', name: 'AutoStar', type: 'link' },
      { state: 'contact', name: 'Contratos', type: 'link' },
      { state: 'contact', name: 'Corporativo', type: 'link' }
    ],
  },
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
