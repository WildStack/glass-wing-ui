import type { Component } from 'solid-js';
import { createSignal, For, Show } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';
import { Triangulum } from './svg';

interface TreeItem {
  label: string;
  children?: Array<TreeItem>;
}

interface TreeProps {
  data: TreeProps | TreeItem;
  level?: number;
  value?: string;
  styleClass: StyleClassEnum;
  onClick?: () => void;
}

export const Tree: Component<TreeProps> = props => {
  const [collapse, setCollapse] = createSignal(false);
  const level = () => props.level || 0;

  const onToggleClick = () => {
    if ((props.data as TreeItem)?.children?.length) {
      setCollapse(!collapse());
    }
  };

  return (
    <div class={`tree-wrapper ${props.styleClass}`}>
      <div class="tree-node">
        <div class="tree-node-label-container">
          <div
            class="tree-node-label"
            style={{ 'padding-left': `${level() * 17 + 10}px` }}
            onClick={() => onToggleClick()}
          >
            <Show when={(props.data as TreeItem)?.children?.length}>
              <Triangulum svgClass={`tree-toggle-icon ${collapse() ? 'toggle collapsed' : 'toggle'}`} />
            </Show>

            <div class="tree-node-text">{(props.data as TreeItem).label}</div>
          </div>
        </div>

        <div class={'tree-node-children' + (collapse() ? ' collapsed' : '')}>
          <Show when={(props.data as TreeItem)?.children?.length}>
            <For each={(props.data as TreeItem).children}>
              {item => <Tree styleClass={props.styleClass} data={item} level={level() + 1} />}
            </For>
          </Show>
        </div>
      </div>
    </div>
  );
};
