export const ImageBlockDataAdapter = ({
  block,
  data,
  id,
  item,
  onChangeBlock,
  value,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };

  const align = dataSaved.styles?.['align:noprefix'];
  const isFloating = align === 'left' || align === 'right';
  const sizeSaved = dataSaved.styles?.['size:noprefix'] ?? dataSaved.size;
  const size =
    !sizeSaved || sizeSaved === 'var(--size-large)' ? 'l' : sizeSaved;
  const isLarge = size === 'l';

  if (!isFloating) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': 'l',
      },
    };
  }
  if (isFloating && !isLarge) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': size,
        'blockWidth:noprefix': 'narrow',
      },
    };
  }
  if (isFloating && isLarge) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': 'l',
        'blockWidth:noprefix': 'default',
      },
    };
  }

  if (id === 'url') {
    if (value) {
      dataSaved = {
        ...dataSaved,
        credit: { data: item?.credit },
        description: item?.Description,
        title: item?.Title,
        image_field: item?.image_field,
        image_scales: item?.image_scales,
      };
    } else {
      [
        'alt',
        'credit',
        'description',
        'image_scales',
        'image_field',
        'title',
      ].forEach((id) => delete dataSaved[id]);
    }
  }
  onChangeBlock(block, dataSaved);
};
