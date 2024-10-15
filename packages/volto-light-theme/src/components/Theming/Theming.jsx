import React from 'react';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import config from '@plone/volto/registry';

const Theming = ({ content }) => {
  const theme = content.theme || true;
  const color1 = content.color1 || 'red';
  const color2 = content.color2;
  const color3 = content.color3;
  const color4 = content.color4;

  return (
    <>
      {theme ? (
        <>
          {/* <BodyClass className={isSubsite ? 'is-subsite' : null}></BodyClass> */}
          <BodyClass className={theme ? `theme--${theme}` : null}></BodyClass>

          {theme && (
            <Helmet>
              <style>{`
                :root {
                  --custom-theme-color1: ${color1};
                  --custom-theme-color2: ${color2};
                  --custom-theme-color3: ${color3};
                  --custom-theme-color4: ${color4};
              }
              `}</style>
            </Helmet>
          )}
        </>
      ) : null}
    </>
  );
};

export default Theming;
