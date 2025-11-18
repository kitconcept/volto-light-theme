import React, { useEffect, useMemo } from 'react';
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Container } from '@plone/components';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getBreadcrumbs } from '@plone/volto/actions/breadcrumbs/breadcrumbs';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';

import homeSVG from '@plone/volto/icons/home.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
  controlpanel: {
    id: 'Site Setup',
    defaultMessage: 'Site Setup',
  },
});

type BreadcrumbItem = {
  title: string;
  url: string;
};

type BreadcrumbsProps = {
  pathname: string;
};

type BreadcrumbState = {
  items: BreadcrumbItem[];
  root?: string | null;
};

type RootState = {
  breadcrumbs: BreadcrumbState;
};

const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const BreadcrumbsComponent = ({ pathname }: BreadcrumbsProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname: realPath } = useLocation();
  const controlpanelItems = useMemo(
    () => [
      {
        url: '/controlpanel',
        title: intl.formatMessage(messages.controlpanel),
      },
    ],
    [intl],
  );
  const storeItems = useRootSelector((state) => state.breadcrumbs.items);
  const root = useRootSelector((state) => state.breadcrumbs.root);
  const items = realPath.startsWith('/controlpanel')
    ? controlpanelItems
    : storeItems;

  useEffect(() => {
    const baseUrl = getBaseUrl(pathname);

    if (!hasApiExpander('breadcrumbs', baseUrl)) {
      dispatch(getBreadcrumbs(baseUrl));
    }
  }, [dispatch, pathname]);

  return (
    <div
      role="navigation"
      aria-label={intl.formatMessage(messages.breadcrumbs)}
      className="breadcrumbs"
    >
      <Container layout>
        <div className="breadcrumb">
          <Link
            to={root || '/'}
            className="home"
            title={intl.formatMessage(messages.home)}
          >
            <Icon name={homeSVG} size="25px" />
          </Link>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={item.url}>
                <div className="divider" />
                {isLast ? (
                  <div className="section active">{item.title}</div>
                ) : (
                  <Link to={item.url} className="section">
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default BreadcrumbsComponent;
