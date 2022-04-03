import { useMemo, useState } from 'react';

import {
  Container,
  Descendant,
  DescendantsPanel,
  Root,
  RootsPanel,
} from './styles';
import { FlattenedTreeItem, Tree } from './types';
import { buildTree } from './utils/build-tree';
import { extractDescendants } from './utils/extract-descendants';
import { flattenTree } from './utils/flatten-tree';
import { removeDescendants } from './utils/remove-descendants';

export type FinderProps = {
  tree: Tree;
};

export const Finder: React.VFC<FinderProps> = (props) => {
  const [tree, setTree] = useState(() => props.tree);

  const flattenedTree = useMemo(() => flattenTree(tree), [tree]);

  const roots = useMemo(
    () => flattenedTree.filter(({ depth }) => depth === 0),
    [flattenedTree],
  );

  const [selectedRootId, setSelectedRootId] = useState<
    FlattenedTreeItem['id'] | null
  >(null);

  const descendants = useMemo(() => {
    if (selectedRootId == null) {
      return [];
    }

    const descendants = extractDescendants(flattenedTree, selectedRootId);
    const collapsedIds = descendants
      .filter((item) => item.isDirectory && item.collapsed)
      .map(({ id }) => id);

    return removeDescendants(descendants, collapsedIds);
  }, [flattenedTree, selectedRootId]);

  const onCollapse = (id: FlattenedTreeItem['id']) => {
    const newFlattenedTree = flattenedTree.map((item) =>
      item.id === id && item.isDirectory
        ? { ...item, collapsed: !item.collapsed }
        : item,
    );
    const newTree = buildTree(newFlattenedTree);
    setTree(newTree);
  };

  return (
    <Container>
      <RootsPanel>
        <ul>
          {roots.map((item) => (
            <Root
              key={item.id}
              active={item.id === selectedRootId}
              onClick={() => {
                setSelectedRootId(item.id);
              }}
            >
              {item.id}
            </Root>
          ))}
        </ul>
      </RootsPanel>
      <DescendantsPanel>
        <ul>
          {descendants.map((item) => (
            <Descendant key={item.id} depth={item.depth - 1}>
              {item.isDirectory && (
                <button
                  onClick={() => {
                    onCollapse(item.id);
                  }}
                >
                  {item.collapsed ? '>' : '↓'}
                </button>
              )}
              {item.id}
            </Descendant>
          ))}
        </ul>
      </DescendantsPanel>
    </Container>
  );
};