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

  const alignStyle =
    dataSaved.styles?.['align:noprefix']?.['--block-alignment'];
  const isFloating =
    alignStyle === 'var(--align-left)' || alignStyle === 'var(--align-right)';
  const isLarge =
    dataSaved.size === 'l' ||
    dataSaved.styles?.['size:noprefix'] === 'var(--size-large)';

  if (!isFloating) {
    dataSaved = {
      ...dataSaved,
      size: 'l',
      styles: {
        ...dataSaved.styles,
        'size:noprefix': SIZEMAP['l'],
      },
    };
  }
  if (!isLarge && isFloating) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': SIZEMAP[dataSaved.size] || 'large',
        'blockWidth:noprefix': {
          '--block-width': 'var(--narrow-container-width)',
        },
      },
    };
  }
  if (isLarge && isFloating) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'size:noprefix': SIZEMAP['l'],
        'blockWidth:noprefix': {
          '--block-width': 'var(--default-container-width)',
        },
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
