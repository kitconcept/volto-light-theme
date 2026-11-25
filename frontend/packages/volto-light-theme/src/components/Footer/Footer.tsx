import { Container } from '@plone/components';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import { useStickyContent } from '@kitconcept/volto-light-theme/helpers/useStickyContent';

const Footer = () => {
  const content = useStickyContent();

  return (
    <footer id="footer">
      <Container className="pre-footer">
        <SlotRenderer name="preFooter" content={content} />
      </Container>
      <SlotRenderer name="footer" content={content} />
      <Container className="post-footer">
        <SlotRenderer name="postFooter" content={content} />
      </Container>
    </footer>
  );
};

export default Footer;
