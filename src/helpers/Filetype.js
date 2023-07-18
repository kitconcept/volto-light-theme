const Filetype = (mime_type) => {
  switch (mime_type) {
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
};

export default Filetype;
