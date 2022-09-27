import { Component, createSignal, JSX, onCleanup } from 'solid-js';

interface PopoverProps {
  text: string;
  children: JSX.Element;
}

export const Popover: Component<PopoverProps> = props => {
  let timerId: NodeJS.Timeout;
  const [startLongPress, setStartLongPress] = createSignal(false);
  const [showLeft, setShowLeft] = createSignal(false);

  const onMouseEnter = (e: MouseEvent) => {
    timerId = setTimeout(() => {
      setShowLeft(e.pageX > 500);
      setStartLongPress(true);
    }, 1500);
  };

  const onMouseLeave = () => {
    setStartLongPress(false);
    clearTimeout(timerId);
  };

  onCleanup(() => {
    clearTimeout(timerId);
  });

  const isContainerVisible = () => (startLongPress() ? 'is-container-visible' : '');
  const isContainerLeft = () => (showLeft() ? 'is-container-left' : '');

  return (
    <div class={`popover-wrapper`}>
      <div class="popover-child" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {props.children}

        <div class={`popover-container ${isContainerVisible()} ${isContainerLeft()}`}>
          <div class="popover-text">{props.text}</div>
        </div>
      </div>
    </div>
  );
};
