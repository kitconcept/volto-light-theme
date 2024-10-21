/**
 * File view component.
 * @module components/theme/View/FileView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers/';
import config from '@plone/volto/registry';
import FileType from '../../helpers/Filetype';

/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const FileView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;
  return (
    <Container id="page-document" className="view-wrapper fileitem-view">
      <h1 className="documentFirstHeading">
        {content.title}
        {content.subtitle && ` - ${content.subtitle}`}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.file?.download && (
        <p>
          <a href={flattenToAppURL(content.file.download)}>
            {content.file.filename}
          </a>{' '}
          <span>
            ({FileType(content?.file['content-type'])}/{' '}
            {content.file?.size < 1000000
              ? Math.round(content.file.size / 1000)
              : Math.round(content.file.size / 1000000)}
            {content.file?.size < 1000000 ? 'KB' : 'MB'})
          </span>
        </p>
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FileView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    file: PropTypes.shape({
      download: PropTypes.string,
      filename: PropTypes.string,
    }),
  }).isRequired,
};

export default FileView;
