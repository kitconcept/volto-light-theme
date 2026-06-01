import { useLiveData } from '@kitconcept/volto-light-theme/helpers/useLiveData';
import { IconLinkListTemplate } from '@kitconcept/volto-light-theme/primitives/IconLinkList';
import type { StickyMenuSettings } from '../../types';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

import {
  usePrevNextButtons,
  PrevButton,
  NextButton,
} from './MobileCarouselArrowButton';
import type { Content } from '@plone/types';

const MobileStickyMenu = ({ content }: { content: Content }) => {
  const options: EmblaOptionsType = {};
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const showMobileStickyMenu = useLiveData<StickyMenuSettings['sticky_menu']>(
    content,
    'kitconcept.sticky_menu',
    'enable_mobile_sticky_menu',
  );
  const menuData = useLiveData<StickyMenuSettings['sticky_menu']>(
    content,
    'kitconcept.sticky_menu',
    'sticky_menu',
  );

  const sticky_menu_color = useLiveData<
    StickyMenuSettings['sticky_menu_color']
  >(content, 'kitconcept.sticky_menu', 'sticky_menu_color');

  const sticky_menu_foreground_color = useLiveData<
    StickyMenuSettings['sticky_menu_foreground_color']
  >(content, 'kitconcept.sticky_menu', 'sticky_menu_foreground_color');

  if (!showMobileStickyMenu) {
    return null;
  }

  return (
    <div
      className="mobile-sticky-menu"
      role="navigation"
      aria-label="Mobile Sticky menu"
      style={
        {
          '--sticky-menu-color': sticky_menu_color,
          '--sticky-menu-foreground-color': sticky_menu_foreground_color,
        } as React.CSSProperties
      }
    >
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {menuData &&
              menuData.map((item) => (
                <ul className="embla__slide" key={item['@id']}>
                  <IconLinkListTemplate item={item} />
                </ul>
              ))}
          </div>
        </div>
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </section>
    </div>
  );
};

export default MobileStickyMenu;
