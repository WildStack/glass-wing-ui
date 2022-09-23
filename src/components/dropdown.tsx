import type { Component } from 'solid-js';
import { onCleanup, onMount } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { ArrowDownIcon } from './svg';

type StyleClass = 'primary-dropdown' | 'secondary-dropdown';

interface DropdownProps {
  value: string;
  items: string[];
  styleClass: StyleClass;
  onChange: (item: string) => string;
}

export const Dropdown: Component<DropdownProps> = props => {
  const [isOpen, setIsOpen] = createSignal(false);

  let dropdownRef: HTMLDivElement | undefined;

  function handleClickOutside(event: any) {
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      setIsOpen(false);
    }
  }

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div class={props.styleClass} ref={dropdownRef}>
      <div class={`dropdown ${isOpen() ? 'dropdown-input-border' : ''}`} onClick={() => setIsOpen(!isOpen())}>
        <div>{props.value}</div>

        <ArrowDownIcon styleClass="dropdown-icon" />

        <div class={`dropdown-container ${isOpen() ? 'visible' : ''}`}>
          <For each={props.items}>
            {item => (
              <div
                onClick={() => {
                  props.onChange(item);
                  console.log(item);
                }}
                class="dropdown-item"
              >
                {item}
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};
