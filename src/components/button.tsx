import type { Component } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface ButtonProps {
  value: string;
  styleClass: StyleClassEnum;
  onClick?: () => void;
}

export const Button: Component<ButtonProps> = props => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div class={`button-wrapper ${props.styleClass}`}>
      <button onClick={() => onClick()} class={`button ${props.styleClass}`}>
        {props.value}
      </button>
    </div>
  );
};
