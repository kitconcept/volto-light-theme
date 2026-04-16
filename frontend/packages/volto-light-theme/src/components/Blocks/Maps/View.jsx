/**
 * View map block.
 * @module components/manage/Blocks/Maps/View
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';

/**
 * View image block class.
 * @class View
 * @extends Component
 */

const View = ({ data, intl, style, className }) => (
  // START CUSTOMIZATION
  <div className={cx('block maps', className)} style={style}>
    {/* // END CUSTOMIZATION */}
    <div className="maps-inner">
      <iframe
        title={data.title}
        src={data.url}
        className="google-map"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(injectIntl, withBlockExtensions)(View);
