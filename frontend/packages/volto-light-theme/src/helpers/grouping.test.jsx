import { groupByBGColor } from './grouping';
describe('groupByBGColor', () => {
  it('grid + grid + slate grey', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
        },
        2: {
          '@type': '__grid',
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
      },
      blocks_layout: {
        items: [1, 2, 3],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([[1, 2], [3]]);
  });

  it('grid + grid grey + slate grey', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
        },
        2: {
          '@type': 'slate',
          theme: 'grey',
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
      },
      blocks_layout: {
        items: [1, 2, 3],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([[1], [2, 3]]);
  });

  it('slate grey + slate grey + slate grey ', () => {
    const content = {
      blocks: {
        1: {
          '@type': 'slate',
          theme: 'grey',
        },
        2: {
          '@type': 'slate',
          theme: 'grey',
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
      },
      blocks_layout: {
        items: [1, 2, 3],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([[1, 2, 3]]);
  });

  it('slate grey + slate + slate grey ', () => {
    const content = {
      blocks: {
        1: {
          '@type': 'slate',
          theme: 'grey',
        },
        2: {
          '@type': 'slate',
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
      },
      blocks_layout: {
        items: [1, 2, 3],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([
      [1],
      [2],
      [3],
    ]);
  });

  it('grid + grid + slate grey + slate grey + slate + slate', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
        },
        2: {
          '@type': '__grid',
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
        4: {
          '@type': 'slate',
          theme: 'grey',
        },
        5: {
          '@type': 'slate',
        },
        6: {
          '@type': 'slate',
        },
      },
      blocks_layout: {
        items: [1, 2, 3, 4, 5, 6],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('grid + grid + slate grey + slate grey + slate + slate - transparent', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        2: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
        4: {
          '@type': 'slate',
          theme: 'grey',
        },
        5: {
          '@type': 'slate',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        6: {
          '@type': 'slate',
          styles: {
            backgroundColor: 'transparent',
          },
        },
      },
      blocks_layout: {
        items: [1, 2, 3, 4, 5, 6],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('grid + grid + slate grey + slate grey + slate + slate - transparent mixed', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        2: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        3: {
          '@type': 'slate',
          theme: 'grey',
        },
        4: {
          '@type': 'slate',
          theme: 'grey',
        },
        5: {
          '@type': 'slate',
        },
        6: {
          '@type': 'slate',
        },
      },
      blocks_layout: {
        items: [1, 2, 3, 4, 5, 6],
      },
    };
    const { blocks, blocks_layout } = content;
    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
  });

  it('grid + grid + slate grey + slate grey + slate + slate - transparent mixed', () => {
    const content = {
      blocks: {
        1: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        2: {
          '@type': '__grid',
        },
        3: {
          '@type': '__grid',
          styles: {
            backgroundColor: 'transparent',
          },
        },
        4: {
          '@type': 'slate',
          theme: 'grey',
        },
        5: {
          '@type': 'slate',
          theme: 'grey',
        },
        6: {
          '@type': 'slate',
        },
        7: {
          '@type': 'slate',
        },
        8: {
          '@type': 'slate',
          styles: {
            backgroundColor: 'transparent',
          },
        },
      },
      blocks_layout: {
        items: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    };
    const { blocks, blocks_layout } = content;

    expect(groupByBGColor(blocks, blocks_layout)).toStrictEqual([
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ]);
  });
});
