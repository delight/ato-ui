import type { ComponentsData } from "../types";

import { radioGroupHeadlessData } from "./radio-group-headless";
import { switchHeadlessData } from './switch-headless';
import { switchData } from './switch';
import { tabsHeadlessData } from "./tabs-headless";
import { tabsData } from "./tabs";

export const componentsList = [
    // 'accordion-headless',
    // 'accordion',
    // 'avatar-headless',
    // 'avatar',
    // 'combobox-headless',
    // 'combobox',
    // 'drop-menu-headless',
    // 'drop-menu',
    // 'modal-headless',
    // 'modal',
    'radio-group-headless',
    // 'radio-group',
    'switch-headless',
    'switch',
    'tabs-headless',
    'tabs',
    // 'toc-headless',
    // 'toc',
];

export const componentsData: ComponentsData = {
    'radio-group-headless': radioGroupHeadlessData,
    'switch-headless': switchHeadlessData,
    'switch': switchData,
    'tabs-headless': tabsHeadlessData,
    'tabs': tabsData
}

export function isComponent(key: string) {
    return componentsList.includes(key);
    // return key in componentsData;
}