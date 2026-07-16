import React from 'react';
import config from '@plone/volto/registry';
import type { VLTSettings } from '../types';

const defaultComponent = 'vlt';

export type ComponentSlot = keyof VLTSettings['components'];

export function getVLTComponent(type: ComponentSlot): React.ComponentType<any> {
  const settings = config.settings.vlt?.components;
  const name = settings?.[type] || defaultComponent;
  const component = config.getUtility({ name, type }).method;
  return (
    component || config.getUtility({ name: defaultComponent, type }).method
  );
}
