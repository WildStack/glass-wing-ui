import type { Component } from 'solid-js';

type StyleClass = 'primary-button' | 'secondary-button';

interface ButtonProps {
  value: string;
  styleClass: StyleClass;
  onClick?: () => void;
}

export const Button: Component<ButtonProps> = props => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button onClick={() => onClick()} class={`button ${props.styleClass}`}>
      {props.value}
    </button>
  );
};
