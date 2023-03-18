import { Component } from 'solid-js';

interface AvatarProps {
  size?: number;
  isRound?: boolean;
  onClick?: () => void;
}

export const Avatar: Component<AvatarProps> = props => {
  const onClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <div class="avatar-wrapper" onClick={onClick}>
      <img
        class="avatar"
        src="https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x"
        style={{
          ...(props.size && { width: `${props.size}px`, height: `${props.size}px` }),
          ...(props.isRound && { 'border-radius': '50%' }),
          ...(props.onClick !== undefined && { cursor: 'pointer' }),
        }}
        alt=""
      />
    </div>
  );
};
