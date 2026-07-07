import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import zoomInSVG from '@plone/volto/icons/zoom-in.svg';

const ImageZoom = ({ children, hasLink = false }) => {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const openZoom = (e) => {
    // Prevent a surrounding link (href) from being followed and stop the
    // click from reaching the image underneath.
    e.preventDefault();
    e.stopPropagation();
    setIsZoomed(true);
  };

  return (
    <div className={`image-zoom-wrapper${hasLink ? ' has-link' : ''}`}>
      <ControlledZoom
        isZoomed={isZoomed}
        onZoomChange={setIsZoomed}
        isDisabled={!isZoomed}
      >
        {children}
      </ControlledZoom>
      <button
        type="button"
        className="image-zoom-button"
        aria-label="Zoom image"
        onClick={openZoom}
      >
        <Icon name={zoomInSVG} size="24px" />
      </button>
    </div>
  );
};

ImageZoom.propTypes = {
  children: PropTypes.node.isRequired,
  hasLink: PropTypes.bool,
};

export default ImageZoom;
