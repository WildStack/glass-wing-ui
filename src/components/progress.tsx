import { Component } from 'solid-js';

interface ProgressProps {
  value: number;
}

export const Progress: Component<ProgressProps> = props => {
  return (
    <div class="progress-wrapper">
      <div class="progress">
        <div class="progress-moving" style={{ width: `${props.value ?? 0}%` }} />
        <div class="progress-text">12%</div>
      </div>
    </div>
  );
};
