import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { Content } from '@plone/types';
import cx from 'classnames';
import config from '@plone/volto/registry';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

const ColorContrastChecker = (props: { id: string; value: string }) => {
  const { id, value } = props;
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [contrastRatio, setContrastRatio] = useState(21);

  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );
  const colorPairMap = config.settings.colorContrastPairMap;

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Calculate relative luminance
  const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  // Calculate contrast ratio
  const getContrastRatio = (l1, l2) => {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  };

  useEffect(() => {
    const bg = hexToRgb(backgroundColor);
    const fg = hexToRgb(foregroundColor);
    if (bg && fg) {
      const bgLum = getLuminance(bg.r, bg.g, bg.b);
      const fgLum = getLuminance(fg.r, fg.g, fg.b);
      const ratio = getContrastRatio(bgLum, fgLum);
      setContrastRatio(ratio);
    }

    const colorPair = formData[colorPairMap[id]]?.toString();
    const newColorHex = value?.toString();

    if (id.includes('foreground')) {
      setForegroundColor(newColorHex);
      setBackgroundColor(colorPair ?? backgroundColor);
    } else {
      setForegroundColor(colorPair ?? foregroundColor);
      setBackgroundColor(newColorHex);
    }
  }, [backgroundColor, colorPairMap, foregroundColor, formData, id, value]);

  // Get WCAG compliance levels
  const getComplianceLevel = (ratio) => {
    if (ratio >= 3) return 'AA Large';
    return 'Failed';
  };

  return (
    <>
      {formData[id] && contrastRatio < 4.5 && (
        <span
          className={cx('color-contrast-label')}
          role="alert"
          aria-live="polite"
        >
          The color contrast ratio ({contrastRatio.toFixed(2)}:1) might not be
          accesible for all. WCAG Level: {getComplianceLevel(contrastRatio)}
          <a
            target="_blank"
            href="https://webaim.org/articles/contrast/"
            rel="noreferrer"
          >
            &#x3F;
          </a>
        </span>
      )}
    </>
  );
};

export default ColorContrastChecker;
