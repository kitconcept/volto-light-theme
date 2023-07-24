export const ImageBlockDataAdapter = ({
  block,
  data,
  id,
  item,
  onChangeBlock,
  value,
}) => {
  const SIZEMAP = {
    l: 'large',
    m: 'medium',
    s: 'small',
  };

  let dataSaved = {
    ...data,
    [id]: value,
  };

  if (id === 'align' && !(value === 'left' || value === 'right')) {
    if (data.size !== 'l') {
      dataSaved = {
        ...dataSaved,
        size: 'l',
        styles: {
          ...dataSaved.styles,
          'size:noprefix': SIZEMAP['l'],
        },
      };
    }
  }

  if (id === 'size') {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': SIZEMAP[value],
      },
    };
  }

  if (id === 'url') {
    dataSaved = {
      ...dataSaved,
      credit: { data: item?.credit },
      description: item?.Description,
      title: item?.Title,
    };
  }
  onChangeBlock(block, dataSaved);
};
