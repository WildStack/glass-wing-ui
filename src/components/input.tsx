import type { Component } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface InputProps {
  value?: string;
  styleClass: StyleClassEnum;
  onChange?: (item: string) => void;
  placeHolder?: string;
}

export const Input: Component<InputProps> = props => {
  const onInput = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div class={`input-wrapper ${props.styleClass}`}>
      <input
        placeholder={props.placeHolder ?? 'Text here'}
        class="input"
        value={props.value ?? ''}
        type="text"
        onInput={e => onInput(e.currentTarget.value)}
      />
    </div>
  );
};
