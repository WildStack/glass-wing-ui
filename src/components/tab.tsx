/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, createEffect, createSignal, For } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface TabItem {
  id: any;
  label: string;
}

interface TabProps {
  // value: string;
  styleClass: StyleClassEnum;
  onClick?: (item: TabItem, i: number) => void;
  tabs: Array<TabItem>;
}

type TabDragEvent = DragEvent & { target: Element };

export const Tabs: Component<TabProps> = props => {
  const [activeTabIndex, setActiveTabIndex] = createSignal(0);
  const [draggableTabEndIndex, setDraggableTabEndIndex] = createSignal(0);

  const [tabs, setTabs] = createSignal<Array<TabItem>>([]);

  createEffect(() => {
    setTabs(props.tabs);
  });

  const onClick = (item: TabItem, i: number) => {
    setActiveTabIndex(i);

    if (props.onClick) {
      props.onClick(item, i);
    }
  };

  const onDragStart = (e: DragEvent, i: number) => {
    setActiveTabIndex(i);
  };

  const onDragEnter = (e: DragEvent, i: number) => {
    e.preventDefault();
    setDraggableTabEndIndex(i);
  };

  const onDragOver = (e: TabDragEvent, i: number) => {
    e.preventDefault();

    // if its hovered on itself then do not add hover effect
    if (activeTabIndex() === i) {
      return;
    }

    e.target.classList.add('tab-item-dragging');
  };

  const onDragLeave = (e: TabDragEvent, i: number) => {
    e.preventDefault();
    e.target.classList.remove('tab-item-dragging');
  };

  const onDragEnd = (e: TabDragEvent, i: number) => {
    e.preventDefault();
    const firstIndex = activeTabIndex();
    const secondIndex = draggableTabEndIndex();

    // if its itself then just return can not swap itself
    if (firstIndex === secondIndex) {
      return;
    }

    // change index in array
    const firstTab = tabs()[firstIndex]; // current item
    const secondTab = tabs()[secondIndex];

    // shallow copy whole array of tabs
    const tabsCopy = tabs().slice();

    // swap tabs
    tabsCopy[firstIndex] = secondTab;
    tabsCopy[secondIndex] = firstTab;

    // set tabs
    setTabs(tabsCopy);

    // set active tab index
    setActiveTabIndex(secondIndex);
  };

  return (
    <div class={`tab-wrapper ${props.styleClass}`}>
      <div class="tab-container">
        <For each={tabs()}>
          {(tab, i) => (
            <div
              class={`tab-item ${activeTabIndex() === i() ? 'tab-item-active' : ''}`}
              draggable={true}
              onClick={() => onClick(tab, i())}
              onDragStart={e => onDragStart(e, i())}
              onDragEnter={e => onDragEnter(e, i())}
              onDragOver={e => onDragOver(e, i())}
              onDragLeave={e => onDragLeave(e, i())}
              onDragEnd={e => onDragEnd(e, i())}
            >
              {tab.label}
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
