import { useSelector, shallowEqual } from 'react-redux';
import { Container } from '@plone/components';
import SlotRenderer from '@plone/volto/components/theme/SlotRenderer/SlotRenderer';
import type { Content } from '@plone/types';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const Footer = () => {
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );

  return (
    <footer id="footer">
      <div className="pre-footer">
        <SlotRenderer name="preFooter" content={content} />
      </div>
      <SlotRenderer name="footer" content={content} />
      <Container className="post-footer">
        <SlotRenderer name="postFooter" content={content} />
      </Container>
    </footer>
  );
};

export default Footer;
