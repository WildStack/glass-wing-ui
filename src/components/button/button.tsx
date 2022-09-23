import type { Component } from 'solid-js';
import styles from './button.module.scss';

type ButtonClass = 'primary-button' | 'secondary-button';

export const Button: Component<{ value: string; buttonClass: ButtonClass }> = props => {
  return <button class={`${styles['elamuk-button']} ${props.buttonClass}`}>{props.value}</button>;
};
