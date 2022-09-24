import type { Component, JSX } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface IconButtonProps {
  styleClass: StyleClassEnum;
  onClick?: () => void;
  children: JSX.Element;
}

export const IconButton: Component<IconButtonProps> = props => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div class={`icon-button-wrapper ${props.styleClass}`}>
      <button onClick={() => onClick()} class="icon-button">
        {props.children}
      </button>
    </div>
  );
};
