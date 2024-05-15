import React, { useState, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import { useUndoManager } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { useCookies } from 'react-cookie';
import { getCookieOptions } from '@plone/volto/helpers';

import settingsSVG from '@plone/volto/icons/settings.svg';

const messages = defineMessages({
  settings: {
    id: 'Settings',
    defaultMessage: 'Settings',
  },
});

const SettingsToolbar = (props) => {
  const intl = useIntl();
  const [cookies, setCookie] = useCookies();

  const [expanded, setExpanded] = useState(cookies.sidebar_expanded);
  const sidebar = document.querySelector('#sidebar');
  const sidebarContainer =
    sidebar.getElementsByClassName('sidebar-container')[0];

  const body = document.body;

  const sidebarPusher = document.querySelector('#sidebar > .pusher');
  const resetFullSizeSidebar = useCallback(() => {
    if (!expanded) {
      const currentResizer = document.querySelector('#sidebar');
      const sidebarContainer =
        currentResizer.getElementsByClassName('sidebar-container')[0];
      sidebarContainer?.classList.remove('full-size');
      sidebarContainer?.classList.remove('no-toolbar');
    }
  }, [expanded]);

  const onToggleExpanded = () => {
    if (expanded) {
      sidebarContainer.classList.remove('collapsed');
      body.classList.remove('has-sidebar-collapsed');
      body.classList.add('has-sidebar');
      sidebarPusher.classList.add('expanded');
    } else {
      sidebarContainer.classList.add('collapsed');
      body.classList.add('has-sidebar-collapsed');
      body.classList.remove('has-sidebar');
      sidebarPusher.classList.remove('expanded');
    }
    setCookie('sidebar_expanded', expanded, getCookieOptions());
    setExpanded(!expanded);
    resetFullSizeSidebar();
  };

  return (
    <Plug
      pluggable="main.toolbar.settings"
      id="settings-toolbar-button"
      //   dependencies={[canUndo, canRedo]}
    >
      <Button
        className="settings"
        style={{ marginLeft: '20px' }}
        onClick={props.handleShrink}
        aria-label={intl.formatMessage(messages.settings)}
      >
        <Icon
          name={settingsSVG}
          className="circled"
          size="30px"
          title={intl.formatMessage(messages.settings)}
        />
      </Button>
    </Plug>
  );
};

export default SettingsToolbar;
