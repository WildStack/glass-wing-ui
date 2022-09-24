import type { Component, JSX } from 'solid-js';
import { Show } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface InputProps {
  value?: string;
  styleClass: StyleClassEnum;
  onChange?: (item: string) => void;
  placeHolder?: string;
  endIcon?: JSX.Element;
  endButtonIcon?: JSX.Element;
  endButtonText?: string;
}

export const Input: Component<InputProps> = props => {
  const onInput = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div class={`input-wrapper ${props.styleClass}`}>
      <div class="input-container">
        <div class="input-container-for-icon">
          <input
            placeholder={props.placeHolder ?? 'Text here'}
            class="input"
            value={props.value ?? ''}
            type="text"
            onInput={e => onInput(e.currentTarget.value)}
          />

          <Show when={props.endIcon}>
            <div class="input-container-end-icon-container">{props.endIcon}</div>
          </Show>
        </div>

        <Show when={props.endButtonIcon}>
          <div class="input-end-container">{props.endButtonIcon}</div>
        </Show>

        <Show when={props.endButtonText}>
          <div class="input-end-container">{props.endButtonText}</div>
        </Show>
      </div>
    </div>
  );
};
