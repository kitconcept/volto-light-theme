import { describe, it, expect, beforeEach } from 'vitest';
import config from '@plone/volto/registry';
import { getVLTComponent } from './settings';

const VltNavigation = () => null;
const AcmeNavigation = () => null;
const VltFooter = () => null;

describe('helpers/settings', () => {
  beforeEach(() => {
    config._data.utilities = {};
    config.registerUtility({
      name: 'vlt',
      type: 'navigation',
      method: VltNavigation,
    });
    config.registerUtility({
      name: 'acme',
      type: 'navigation',
      method: AcmeNavigation,
    });
    config.registerUtility({ name: 'vlt', type: 'footer', method: VltFooter });
    config.settings.vlt = {
      components: {
        header: 'vlt',
        navigation: 'acme',
        mobileNavigation: 'vlt',
        footer: 'vlt',
      },
    };
  });

  describe('getVLTComponent', () => {
    it('returns the component the settings select', () => {
      expect(getVLTComponent('navigation')).toBe(AcmeNavigation);
    });

    it('falls back to vlt when the configured name is not registered', () => {
      config.settings.vlt!.components.navigation = 'nope';
      expect(getVLTComponent('navigation')).toBe(VltNavigation);
    });

    it('falls back to vlt when no settings are present', () => {
      config.settings.vlt = undefined;
      expect(getVLTComponent('navigation')).toBe(VltNavigation);
    });
  });
});
