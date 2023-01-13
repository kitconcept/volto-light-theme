import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from '@plone/volto/registry';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Button, Container } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import galleryLeftSVG from '@kitconcept/volto-light-theme/icons/leftnav.svg';
import galleryRightSVG from '@kitconcept/volto-light-theme/icons/rightnav.svg';
import galleryPauseSVG from '@plone/volto/icons/pause.svg';
import galleryBackDownSVG from '@plone/volto/icons/back-down.svg';
import galleryPlaySVG from '@kitconcept/volto-light-theme/icons/gallery-play.svg';
import galleryFullScreenSVG from '@kitconcept/volto-light-theme/icons/fullscreen.svg';
import Video from '@plone/volto/components/manage/Blocks/Video/Body';
import Caption from 'volto-light-theme/components/Image/Caption';
import { Img } from '@kitconcept/volto-blocks/';

const ReactImageGallery = loadable(() => import('react-image-gallery'));

const renderLeftNav = (onClick, disabled) => {
  return (
    <Button
      className="image-gallery-icon image-gallery-left-nav primary basic"
      disabled={disabled}
      onClick={onClick}
      aria-label="Left Navigation Slider Arrow"
    >
      <Icon name={galleryLeftSVG} size="50px" color="#ffffff00" />
    </Button>
  );
};
const renderRightNav = (onClick, disabled) => {
  return (
    <Button
      className="image-gallery-icon image-gallery-right-nav primary basic"
      disabled={disabled}
      onClick={onClick}
      aria-label="Right Navigation Slider Arrow"
    >
      <Icon name={galleryRightSVG} size="50px" color="#ffffff00" />
    </Button>
  );
};

const renderPlayPauseButton = (onClick, isPlaying) => (
  <Button
    type="button"
    className="image-gallery-icon image-gallery-play-button basic primary"
    onClick={onClick}
    aria-label="Play or Pause Slideshow"
  >
    {isPlaying ? (
      <Icon name={galleryPauseSVG} size="48px" color="#000" />
    ) : (
      <Icon name={galleryPlaySVG} size="48px" color="#000" />
    )}
  </Button>
);

const renderFullscreenButton = (onClick, isFullscreen) => {
  return (
    <Button
      type="button"
      className="image-gallery-icon image-gallery-fullscreen-button primary basic"
      onClick={onClick}
      aria-label="Open Fullscreen Slider"
    >
      {isFullscreen ? (
        <Icon name={galleryBackDownSVG} size="48px" color="#000" />
      ) : (
        <Icon name={galleryFullScreenSVG} size="48px" color="#000" />
      )}
    </Button>
  );
};

const ImageGallery = React.forwardRef(({ items, ...props }, ref) => {
  const { settings } = config;
  const defaultImg = config.getComponent('DefaultImage').component;
  const slides = items
    .map((item, index, array) => {
      if (
        !settings.imageObjects.includes(item['@type']) &&
        item['@type'] !== 'Video'
      ) {
        return null;
      }
      const image = item.image_field
        ? item.image_scales?.[item.image_field]?.[0]
        : null;
      const imageNumber = (
        <>
          <FormattedMessage id="Image: " defaultMessage="Image: " />{' '}
          <span className="image-number">
            {`${index + 1}`}/{array.length},{' '}
          </span>
        </>
      );
      const renderImage = () => {
        const currentSlide = ref?.current && ref.current.getCurrentIndex();
        console.log('thisis is image teml');
        return (
          <div className="image-gallery-image">
            <figure className="image-wrapper">
              {item['@type'] === 'Video' ? (
                <Video
                  data={{
                    target_url: item.getRemoteUrl,
                    image_scales: item.image_scales,
                  }}
                  inGallery
                  currentSlide={index === currentSlide}
                />
              ) : image ? (
                <Img
                  src={item['@id']}
                  blurhash={image.blurhash}
                  scales={image.scales}
                  defaultScale="huge"
                  alt=""
                />
              ) : (
                <img src={defaultImg} alt="" />
              )}
              <Caption
                title={item.title}
                currentSlide={index === currentSlide}
                description={item.description}
                imageNumber={imageNumber}
                credit={item.credit?.data || item.credit}
                downloadFilename={item.title}
                downloadHref={
                  item.allow_image_download &&
                  `${flattenToAppURL(item['@id'])}/${
                    image.scales.fullscreen?.download ||
                    '@@images/image/fullscreen'
                  }`
                }
              />
            </figure>
          </div>
        );
      };

      if (item['@type'] === 'Video') {
        if (!item.image_field) {
          const url = item.getRemoteUrl;
          let placeholder = null;
          let videoID = null;

          if (url.match('youtu')) {
            //load video preview image from youtube
            if (url.match('list')) {
            } else {
              videoID = url.match(/.be\//)
                ? url.match(/^.*\.be\/(.*)/)[1]
                : url.match(/^.*\?v=(.*)$/)[1];
            }

            if (!placeholder) {
              placeholder =
                'https://img.youtube.com/vi/' + videoID + '/sddefault.jpg';
            }
          } else if (url.match('vimeo')) {
            videoID = url.match(/^.*\.com\/(.*)/)[1];
            if (!placeholder) {
              placeholder = 'https://vumbnail.com/' + videoID + '.jpg';
            }
          }
          return {
            thumbnail: placeholder,
            renderItem: renderImage,
            thumbnailAlt: '',
          };
        }
      }

      return {
        thumbnail: image
          ? `${flattenToAppURL(image.base_path || item['@id'])}/${
              image.scales.preview?.download || image.download
            }`
          : defaultImg,
        renderItem: renderImage,
        thumbnailAlt: '',
      };
    })
    .filter(Boolean);

  return (
    slides.length > 0 && (
      <Container>
        <ReactImageGallery
          items={slides}
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
          renderPlayPauseButton={renderPlayPauseButton}
          renderFullscreenButton={renderFullscreenButton}
          lazyLoad
          infinite
          ref={ref}
          {...props}
        />
      </Container>
    )
  );
});

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGallery;
