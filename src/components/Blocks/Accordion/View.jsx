import React from 'react';
import {
  getPanels,
  accordionBlockHasValue,
} from '@eeacms/volto-accordion-block/components/manage/Blocks/Accordion/util';
import { Accordion, Icon } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';
import { useLocation } from 'react-router-dom';

import cx from 'classnames';
import { Icon as VoltoIcon, RenderBlocks } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import config from '@plone/volto/registry';
import '@eeacms/volto-accordion-block/components/manage/Blocks/Accordion/editor.less';

const View = (props) => {
  const { data, className } = props;
  const location = useLocation();
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState([]);
  const accordionConfig = config.blocks.blocksConfig.accordion;
  const { titleIcons } = accordionConfig;
  const handleClick = (e, itemProps) => {
    const { index } = itemProps;
    if (data.non_exclusive) {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [...activeIndex, index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    } else {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    }
  };

  const isExclusive = (index) => {
    return activeIndex.includes(index);
  };

  React.useEffect(() => {
    return data.collapsed ? setActiveIndex([]) : setActiveIndex([0]);
  }, [data.collapsed]);

  return (
    <div className={cx('block accordion-block', className)}>
      {data.headline && <h2 className="headline">{data.headline}</h2>}
      {panels.map(([id, panel], index) => {
        return accordionBlockHasValue(panel) ? (
          <Accordion
            key={id}
            exclusive={!data.exclusive}
            className={
              data.styles ? data.styles.theme : accordionConfig?.defaults?.theme
            }
            {...accordionConfig.options}
          >
            <React.Fragment>
              <Accordion.Title
                as={data.title_size}
                active={isExclusive(index)}
                index={index}
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.nativeEvent.keyCode === 13) {
                    handleClick(e, { index });
                  }
                }}
                className={cx('accordion-title', {
                  'align-arrow-left': !props?.data?.right_arrows,
                  'align-arrow-right': props?.data?.right_arrows,
                })}
              >
                {accordionConfig.semanticIcon ? (
                  <Icon className={accordionConfig.semanticIcon} />
                ) : isExclusive(index) ? (
                  <VoltoIcon
                    name={
                      props?.data?.right_arrows
                        ? titleIcons.opened.rightPosition
                        : titleIcons.opened.leftPosition
                    }
                    size={titleIcons.size}
                  />
                ) : (
                  <VoltoIcon
                    name={
                      props?.data?.right_arrows
                        ? titleIcons.closed.rightPosition
                        : titleIcons.closed.leftPosition
                    }
                    size={titleIcons.size}
                  />
                )}
                <span>{panel?.title}</span>
              </Accordion.Title>
              <AnimateHeight
                animateOpacity
                duration={500}
                height={isExclusive(index) ? 'auto' : 0}
              >
                <Accordion.Content active={isExclusive(index)}>
                  <RenderBlocks
                    {...props}
                    location={location}
                    metadata={metadata}
                    content={panel}
                  />
                </Accordion.Content>
              </AnimateHeight>
            </React.Fragment>
          </Accordion>
        ) : null;
      })}
    </div>
  );
};

export default withBlockExtensions(View);
