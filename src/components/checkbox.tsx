import type { Component } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface CheckBoxProps {
  isChecked: boolean;
  styleClass?: StyleClassEnum;
  labelText?: string;
  onChange: (isChecked: boolean) => void;
}

export const Checkbox: Component<CheckBoxProps> = props => {
  return (
    <div class={`checkbox-wrapper ${props.styleClass}`}>
      <label class="checkbox-container" style={{ 'margin-right': '100px' }}>
        {props.labelText ? <div class="checkbox-text">{props?.labelText}</div> : null}
        <input type="checkbox" checked={props.isChecked} onChange={() => props.onChange(!props.isChecked)} />
        {props.isChecked ? <span class="checkbox-checkmark" /> : <span class="unselectable-checkbox-checkmark" />}
      </label>
    </div>
  );
};
