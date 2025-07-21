import React, { useCallback, useEffect, useState } from 'react';
import { Message } from 'semantic-ui-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import Body from '@kitconcept/volto-slider-block/components/Body';
import withBlockExtensions from '@plone/volto/helpers/Extensions/withBlockExtensions';
import {
  DotButton,
  NextButton,
  PrevButton,
} from '@kitconcept/volto-slider-block/components/DotsAndArrows';
import teaserTemplate from '@kitconcept/volto-slider-block/icons/teaser-template.svg';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const SliderView = (props) => {
  const {
    className,
    data,
    isEditMode = false,
    block,
    openObjectBrowser,
    onChangeBlock,
    slideIndex,
    setSlideIndex,
  } = props;
  const intl = useIntl();

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const autoplay =
    data.autoplayEnabled !== undefined ? data.autoplayEnabled : false;
  const autoplayOptions = {
    delay: data.autoplayDelay,
    jump: data.autoplayJump,
  };
  const plugins = isEditMode ? [] : autoplay ? [Autoplay(autoplayOptions)] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setSlideIndex && setSlideIndex(selectedIndex - 1);
    }
  }, [emblaApi, selectedIndex, setSlideIndex]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setSlideIndex && setSlideIndex(selectedIndex + 1);
    }
  }, [emblaApi, selectedIndex, setSlideIndex]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSlideIndex && setSlideIndex(index);
      }
    },
    [emblaApi, setSlideIndex],
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    // This syncs the current slide with the objectwidget (or other sources
    // able to access the slider context)
    // that can modify the SliderContext (and come here via props slideIndex)
    if (isEditMode) {
      scrollTo(slideIndex);
    }
  }, [slideIndex, scrollTo, isEditMode]);

  const sliderContainerWidth = emblaApi
    ?.rootNode()
    .getBoundingClientRect().width;

  console.log('data', data.variation);
  return (
    <>
      {/* START CUSTOMIZATION */}
      <div
        className={cx('block slider', data.variation || 'default', className)}
        style={{ '--slider-container-width': `${sliderContainerWidth}px` }}
      >
        {/* END CUSTOMIZATION */}
        {(data.slides?.length === 0 || !data.slides) && isEditMode && (
          <Message>
            <div className="teaser-item default">
              <img src={teaserTemplate} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {data.slides?.length > 0 && (
          <>
            <div className="slider-wrapper">
              {!data.hideArrows && data.slides?.length > 1 && (
                <>
                  <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                  <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </>
              )}

              <div className="slider-viewport" ref={emblaRef}>
                <div className="slider-container">
                  {data.slides &&
                    data.slides.map((item, index) => {
                      return (
                        <div key={item['@id']} className="slider-slide">
                          <Body
                            {...props}
                            key={item['@id']}
                            data={item}
                            isEditMode={isEditMode}
                            dataBlock={data}
                            index={index}
                            block={block}
                            openObjectBrowser={openObjectBrowser}
                            onChangeBlock={onChangeBlock}
                            isActive={selectedIndex === index}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            {data.slides?.length > 1 && (
              <div className="slider-dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    index={index}
                    onClick={() => scrollTo(index)}
                    className={'slider-dot'.concat(
                      index === selectedIndex ? ' slider-dot--selected' : '',
                    )}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default withBlockExtensions(SliderView);
