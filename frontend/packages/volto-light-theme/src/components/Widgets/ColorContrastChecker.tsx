import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
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
  const [ligtherColor, setLigtherColor] = useState('#ffffff');
  const [darkerColor, setDarkerColor] = useState('#000000');
  const [contrastRatio, setContrastRatio] = useState(21);

  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );
  const colorMap = config.settings.colorMap;
  const colorPair = colorMap[id].colorPair;
  const colorDefault = colorMap[id].default;

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

  const ligtherColorObject = hexToRgb(ligtherColor);
  const darkerColorObject = hexToRgb(darkerColor);

  const lcLum = getLuminance(
    ligtherColorObject?.r,
    ligtherColorObject?.g,
    ligtherColorObject?.b,
  );
  const dcLum = getLuminance(
    darkerColorObject?.r,
    darkerColorObject?.g,
    darkerColorObject?.b,
  );

  const ratio = getContrastRatio(lcLum, dcLum);

  useEffect(() => {
    setDarkerColor(value ?? colorDefault);
    setLigtherColor(formData[colorPair] ?? colorMap[colorPair].default);
    setContrastRatio(ratio);
  }, [ratio, value, formData, colorDefault, colorPair, colorMap]);

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
          <FormattedMessage
            id="ColorContrastCheckerMessage"
            defaultMessage={
              'The color contrast ratio {contrastRatio}:1 might not be accessible for all. WCAG Level: {complianceLevel}'
            }
            values={{
              contrastRatio: contrastRatio.toFixed(1),
              complianceLevel: getComplianceLevel(contrastRatio),
            }}
          />
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
