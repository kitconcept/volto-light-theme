import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchResultPreview: {
    id: 'search_result_preview',
    defaultMessage: 'Search result preview',
  },
});

type GoogleSearchPreviewWidgetProps = {
  id: string;
  value?: string;
  onChange: (id: string, value: string | undefined) => void;
  formData?: Record<string, any>;
  [key: string]: any;
};

function formatBreadcrumb(url: string): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    const parts = [
      parsed.hostname,
      ...parsed.pathname.split('/').filter(Boolean),
    ];
    return parts.join(' › ');
  } catch {
    return url;
  }
}

const GoogleSearchPreviewWidget = (props: GoogleSearchPreviewWidgetProps) => {
  const intl = useIntl();
  const { formData } = props;
  const previewTitle = formData?.seo_title || '';
  const previewDescription = formData?.seo_description || '';
  const previewUrl = formData?.['@id'] || '';

  return (
    <>
      <div className="google-search-preview">
        <strong className="preview-heading">
          {intl.formatMessage(messages.searchResultPreview)}
        </strong>
        <div>
          {previewUrl && (
            <p className="preview-breadcrumb">{formatBreadcrumb(previewUrl)}</p>
          )}
          <p className="preview-title">{previewTitle || 'Untitled'}</p>
          {previewDescription && (
            <p className="preview-description">{previewDescription}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default GoogleSearchPreviewWidget;
