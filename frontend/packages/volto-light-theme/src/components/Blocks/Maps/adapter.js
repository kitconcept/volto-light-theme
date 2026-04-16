export const MapsBlockDataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };

  const alignStyle =
    dataSaved.styles?.['align:noprefix']?.['--block-alignment'];
  const isFloating =
    alignStyle === 'var(--align-left)' || alignStyle === 'var(--align-right)';

  if (isFloating) {
    dataSaved = {
      ...dataSaved,
      styles: {
        ...dataSaved.styles,
        'blockWidth:noprefix': {
          '--block-width': 'var(--default-container-width)',
        },
      },
    };
  }

  onChangeBlock(block, dataSaved);
};
