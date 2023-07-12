/**
 * OVERRIDE FileView.jsx
 * REASON: BFS theme
 * DATE: 2023-07-11
 * DEVELOPER: @iRohitSingh
 */

/**
 * File view component.
 * @module components/theme/View/FileView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const FileView = ({ content }) => (
  <Container className="view-wrapper">
    <h1 className="documentFirstHeading">
      {content.title}
      {content.subtitle && ` - ${content.subtitle}`}
    </h1>
    <div className="file-detail">
      {content.description && (
        <p className="documentDescription">{content.description}iRohitSingh</p>
      )}
      {content.file?.download && (
        <>
          <a href={flattenToAppURL(content.file.download)}>
            {content.file.filename}
          </a>{' '}
          <span>
            (
            {(() => {
              switch (content?.file['content-type']) {
                case 'image/jpeg':
                  return 'JPEG';
                case 'image/png':
                  return 'PNG';
                case 'image/svg+xml':
                  return 'SVG';
                case 'image/gif':
                  return 'GIF';
                case 'application/pdf':
                  return 'PDF';
                case 'application/msexcel':
                  return 'XLS';
                case 'application/vnd.ms-excel':
                  return 'XLS';
                case 'application/msword':
                  return 'DOC';
                case 'application/mspowerpoint':
                  return 'PPT';
                case 'audio/mp4':
                  return 'MP4';
                case 'application/zip':
                  return 'ZIP';
                case 'video/webm':
                  return 'WEBM';
                case 'video/x-msvideo':
                  return 'AVI';
                case 'video/x-sgi-movie':
                  return 'MOVIE';
                case 'text/xml':
                  return 'XML';
                case 'text/plain':
                  return 'TXT';
                case 'text/calendar':
                  return 'ICS';
                case 'image/x-icon':
                  return 'ICO';
                case 'image/bmp':
                  return 'BMP';
                case 'audio/mpeg':
                  return 'MP3';
                case 'audio/wav':
                  return 'WAV';
                case 'application/json':
                  return 'JSON';
                case 'application/postscript':
                  return 'PS';
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                  return 'XLSX';
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                  return 'DOCX';
                case 'application/xml':
                  return 'XML';
                case 'application/mshelp':
                  return 'HLP';
                case 'application/gzip':
                  return 'GZ';
                default:
                  return '';
              }
            })()}{' '}
            /{' '}
            {content.file?.size < 1000000
              ? Math.round(content.file.size / 1000)
              : Math.round(content.file.size / 1000000)}
            {content.file?.size < 1000000 ? 'KB' : 'MB'})
          </span>
        </>
      )}
    </div>
  </Container>
);

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
