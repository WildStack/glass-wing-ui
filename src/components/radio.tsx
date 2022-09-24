import { Component, For } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface RadioProps {
  styleClass?: StyleClassEnum;
  value: any;
  items: Array<{ label: string; value: any }>;
  onChange: (itemValue: any) => void;
}

export const Radio: Component<RadioProps> = props => {
  return (
    <form>
      <div class={`radio-wrapper ${props.styleClass}`}>
        <For each={props.items}>
          {item => (
            <label class="radio-container">
              <input
                type="radio"
                checked={item.value === props.value}
                onChange={() => props.onChange(item.value)}
                name="radio"
              />
              <span class="radio-checkmark" />
              {item.label ? <div class="radio-text">{item.label}</div> : null}
            </label>
          )}
        </For>
      </div>
    </form>
  );
};
