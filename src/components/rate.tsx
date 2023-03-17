import { Component, For } from 'solid-js';

import emojiRatingVeryBad from 'src/assets/svg/review_emoji/emoji_rating_very_bad.svg';
import emojiRatingBad from 'src/assets/svg/review_emoji/emoji_rating_bad.svg';
import emojiRatingNormal from 'src/assets/svg/review_emoji/emoji_rating_normal.svg';
import emojiRatingGood from 'src/assets/svg/review_emoji/emoji_rating_good.svg';
import emojiRatingVeryGood from 'src/assets/svg/review_emoji/emoji_rating_very_good.svg';

export enum EmojiValue {
  VERY_BAD = 'VERY_BAD',
  BAD = 'BAD',
  NORMAL = 'NORMAL',
  GOOD = 'GOOD',
  VERY_GOOD = 'VERY_GOOD',
}

const emojiUrls = [
  { url: emojiRatingVeryBad, value: EmojiValue.VERY_BAD },
  { url: emojiRatingBad, value: EmojiValue.BAD },
  { url: emojiRatingNormal, value: EmojiValue.NORMAL },
  { url: emojiRatingGood, value: EmojiValue.GOOD },
  { url: emojiRatingVeryGood, value: EmojiValue.VERY_GOOD },
];

interface RateProps {
  value: EmojiValue | undefined;
  onChange?: (value: EmojiValue) => void;
}

export const Rate: Component<RateProps> = props => {
  const onClick = (value: EmojiValue) => {
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div class="rate-wrapper">
      <div class="emoji-wrapper">
        <For each={emojiUrls}>
          {obj => (
            <div
              class={`emoji-container ${obj.value === props.value ? 'emoji-container-active' : ''}`}
              onClick={() => onClick(obj.value)}
            >
              <img src={obj.url} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
