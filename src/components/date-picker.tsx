import { Component, onCleanup, onMount } from 'solid-js';

import { StyleClassEnum } from '../data/style-class.enum';
import { Datepicker } from 'vanillajs-datepicker';

interface DatePickerProps {
  value: DateValue;
  styleClass: StyleClassEnum;
  onChange?: (item: DateValue) => void;
}

export class DateValue {
  dateValue: Date;

  constructor(date: string) {
    this.dateValue = new Date(date);
  }

  format() {
    // formats in "dd/mm/yyyy"
    return this.dateValue.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}

/**
 * @link https://mymth.github.io/vanillajs-datepicker/#/
 * @link https://raw.githack.com/mymth/vanillajs-datepicker/v1.3.1/demo/index.html
 */
export const DatePicker: Component<DatePickerProps> = props => {
  let datePickerRef!: Datepicker;
  let inputRef!: HTMLInputElement;

  onMount(() => {
    datePickerRef = new Datepicker(inputRef, {
      format: 'dd/mm/yyyy',
      todayBtn: true,
      todayBtnMode: 1,
      defaultViewDate: new Date(),
    });

    datePickerRef.pickerElement?.addEventListener('click', () => {
      const date = datePickerRef.getDate() as string;
      if (props.onChange) {
        props.onChange(new DateValue(date));
      }
    });
  });

  onCleanup(() => {
    datePickerRef.destroy();
  });

  return (
    <div class={`date-picker-wrapper ${props.styleClass}`}>
      <input ref={inputRef} type="text" name="foo" id="date-picker" readonly value={props.value.format()} />
    </div>
  );
};
