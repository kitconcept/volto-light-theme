export const VideoBlockDataAdapter = ({
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

  if (isFloating) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'blockWidth:noprefix': 'default',
      },
    };
  }

  onChangeBlock(block, dataSaved);
};
