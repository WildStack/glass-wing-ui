import { Component } from 'solid-js';

interface LoaderProps {
  isLoading: boolean;
  size?: number;
  borderWidth?: number;
}

export const Loader: Component<LoaderProps> = props => {
  return (
    <div class="loader-wrapper">
      <div
        class={`loader ${props.isLoading ? 'loader-start' : 'loader-stop'}`}
        style={{
          ...(props.size && { width: `${props.size}px`, height: `${props.size}px` }),
          ...(props.borderWidth && { 'border-width': `${props.borderWidth}px` }),
        }}
      />
    </div>
  );
};
