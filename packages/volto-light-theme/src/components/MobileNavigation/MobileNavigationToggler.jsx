import React from 'react';
import cx from 'classnames';

export const MobileNavigationToggler = ({ isMobileMenuOpen }) => {
  return (
    <div
      className={cx('hamburger hamburger--collapse', {
        'is-active': isMobileMenuOpen,
      })}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </div>
  );
};
