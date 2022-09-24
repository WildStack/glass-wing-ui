import type { Component } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface TextAreaProps {
  value?: string;
  styleClass: StyleClassEnum;
  onChange?: (item: string) => void;
  placeHolder?: string;
  row?: number;
}

export const TextArea: Component<TextAreaProps> = props => {
  const onInput = (value: string) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div class={`text-area-wrapper ${props.styleClass}`}>
      <textarea
        class="text-area"
        onInput={e => onInput(e.currentTarget.value)}
        placeholder={props.placeHolder ?? 'Text here'}
        rows={props.row}
      >
        {props.value}
      </textarea>
    </div>
  );
};
