import { createSignal, For } from 'solid-js';
import type { Component } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface ListViewItem {
  label: string;
  value: any;
}

interface ListViewProps {
  styleClass: StyleClassEnum;
  onClick?: (item: ListViewItem) => void;
  data: Array<ListViewItem>;
}

export const ListView: Component<ListViewProps> = props => {
  const [activeItem, setActiveItem] = createSignal(0);

  const onClick = (item: ListViewItem, index: number) => {
    if (props.onClick) {
      props.onClick(item);
    }

    setActiveItem(index);
  };

  return (
    <div class={`list-view-wrapper ${props.styleClass}`}>
      <div class="list-view-container">
        <ul class="list-view-list">
          <For each={props.data}>
            {(item, i) => (
              <li
                class={`list-view-item ${activeItem() === i() ? 'list-view-item-active' : ''}`}
                onClick={() => onClick(item, i())}
              >
                {item.label}
              </li>
            )}
          </For>
        </ul>
      </div>
    </div>
  );
};
