import { Component, onMount } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface SliderProps {
  value: number;
  styleClass: StyleClassEnum;
  onChange: (item: number) => void;
  min?: number;
  max?: number;
}

type RangeEvent = Event & {
  currentTarget: HTMLInputElement;
  target: Element;
};

export const Slider: Component<SliderProps> = props => {
  const onChange = (value: RangeEvent) => {
    props.onChange(parseInt(value.currentTarget.value));
  };

  onMount(() => {
    if (props.min && props.max && props.min > props.max) {
      throw new Error('min should be lower than max');
    }
  });

  return (
    <div class={`slider-wrapper ${props.styleClass}`}>
      <input
        type="range"
        class="slider"
        min={props.min ?? 0}
        max={props.max ?? 100}
        value={props.value}
        onChange={onChange}
      />
    </div>
  );
};
