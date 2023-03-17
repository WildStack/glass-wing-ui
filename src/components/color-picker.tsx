import Pickr from '@simonwep/pickr';
import { Component, onCleanup, onMount } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface ColorPickerProps {
  value: ColorValue;
  styleClass: StyleClassEnum;
  onChange?: (item: ColorValue) => void;
}

export interface ColorValue {
  hex: string;
  rgba: string;
  type: Pickr.Representation;
}

export const ColorPicker: Component<ColorPickerProps> = props => {
  let pickrRef: Pickr;

  onMount(() => {
    pickrRef = Pickr.create({
      el: '#pickr-container',
      appClass: 'color-picker-custom-container',
      theme: 'nano',
      default: props.value.hex ?? '#3d424b',
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: { hex: true, rgba: true, input: true },
      },
    });

    if (props.value) {
      switch (props.value.type) {
        case 'HEXA':
          pickrRef.setColor(props.value.hex);
          break;
        case 'RGBA':
          pickrRef.setColor(props.value.rgba);
          break;
      }
    }

    pickrRef.on('change', () => {
      // this statement is for only black color (weird animation happens without this)
      if (pickrRef.getColor().toHEXA().toString() === '#000000' && props.onChange) {
        props.onChange({
          hex: pickrRef.getColor().toHEXA().toString(),
          rgba: pickrRef.getColor().toRGBA().toString(),
          type: pickrRef.getColorRepresentation(),
        });
        return;
      }

      const color = pickrRef.getColor();
      const type = pickrRef.getColorRepresentation();

      switch (type) {
        case 'HEXA':
          pickrRef.setColor(color.toHEXA().toString());
          break;
        case 'RGBA':
          pickrRef.setColor(color.toRGBA().toString());
          break;
      }

      if (props.onChange) {
        props.onChange({
          hex: color.toHEXA().toString(),
          rgba: color.toRGBA().toString(),
          type,
        });
      }
    });
  });

  onCleanup(() => {
    pickrRef.destroyAndRemove();
  });

  return (
    <div class={`color-picker-wrapper ${props.styleClass}`}>
      <div id="pickr-container" style={{ border: '1px solid white' }} />
    </div>
  );
};
