import { Component, For, Show } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface BreadcrumbItem {
  link: string;
  label: string;
}

interface BreadcrumbProps {
  styleClass: StyleClassEnum;
  items: Array<BreadcrumbItem>;
  onClick?: (item: BreadcrumbItem) => void;
}

export const Breadcrumb: Component<BreadcrumbProps> = props => {
  const onClick = (item: BreadcrumbItem) => {
    if (props.onClick) {
      props.onClick(item);
    }
  };

  return (
    <div class={`breadcrumb-wrapper ${props.styleClass}`}>
      <Show when={props.items.length}>
        <div class="breadcrumb">
          <For each={props.items}>
            {(item, i) => (
              <div class="breadcrumb-item">
                <span class="breadcrumb-text" onClick={() => onClick(item)}>
                  {item.label}
                </span>
                <Show when={props.items.length - 1 !== i()}>
                  <span class="breadcrumb-separator">/</span>
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};
