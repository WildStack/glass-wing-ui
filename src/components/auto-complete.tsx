import type { Component } from 'solid-js';
import { onCleanup, onMount } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';
import { ArrowDownIcon } from './svg';

interface ItemType {
  label: string;
  value: any;
}

interface AutoCompleteProps {
  value: ItemType;
  items: Array<ItemType>;
  styleClass: StyleClassEnum;
  onChange: (item: any) => string;
}

export const AutoComplete: Component<AutoCompleteProps> = props => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [shownItems, setShownItems] = createSignal<Array<ItemType>>([]);
  const [activeItem, setActiveItem] = createSignal(0);

  let dropdownRef: HTMLDivElement | undefined;
  let inputRef: HTMLInputElement | undefined;

  const handleClickOutside = (event: any) => {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.code === 'ArrowUp' && activeItem() > 0) {
      setActiveItem(activeItem() - 1);
    } else if (event.code === 'ArrowDown' && activeItem() < shownItems().length - 1) {
      setActiveItem(activeItem() + 1);
    }

    if (event.code === 'Enter') {
      console.log(shownItems()[activeItem()]);

      // first throw change
      props.onChange(shownItems()[activeItem()]);

      // then close dropdown
      setIsOpen(false);

      // then reset active item
      setActiveItem(0);
    }
  };

  onMount(() => {
    setShownItems(props.items);
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  const onClick = () => {
    setIsOpen(!isOpen());

    if (isOpen()) {
      inputRef?.focus();
      setShownItems(props.items);
    }
  };

  const onInput = (val: string) => {
    setShownItems(props.items.filter(el => el.label.toLowerCase().startsWith(val.toLowerCase())));
  };

  return (
    <div onKeyDown={keyDownHandler} class={`auto-complete-wrapper ${props.styleClass}`} ref={dropdownRef}>
      <div class={`auto-complete ${isOpen() ? 'auto-complete-input-border' : ''}`} onClick={() => onClick()}>
        <input ref={inputRef} type="text" value={props.value.label} onInput={e => onInput(e.currentTarget.value)} />

        <ArrowDownIcon styleClass="auto-complete-icon" />

        <div class={`auto-complete-container ${isOpen() ? 'visible' : ''}`}>
          <For each={shownItems()}>
            {(item, i) => (
              <div
                onClick={() => props.onChange(item)}
                onMouseOver={() => setActiveItem(i())}
                class={`auto-complete-item ${activeItem() === i() ? 'auto-complete-item-active' : ''}`}
              >
                {item.label}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
