import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { AutoComplete } from './components/auto-complete';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Dropdown } from './components/dropdown';
import { IconButton } from './components/icon-button';
import { Input } from './components/input';
import { Radio } from './components/radio';
import { StyleClassEnum } from './data/style-class.enum';
import { AiFillShop, AiFillAlert } from 'solid-icons/ai';

const App: Component = () => {
  const arr = ['hello', 'wassup', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'];
  const arr2 = ['hello', 'wassup', '2'];
  const arr3 = [
    { label: 'abb', value: 123 },
    { label: 'bbbb', value: '123' },
    { label: 'aaaaa', value: '123' },
    { label: 'aaaaa', value: '123' },
    { label: 'ss', value: [] },
  ];

  const [dropdownValue, setDropdownValue] = createSignal(arr[0]);
  const [autoCompleteValue, setAutoCompleteValue] = createSignal(arr3[0]);
  const [isChecked, setIsChecked] = createSignal(false);

  const radioItems1 = [
    { label: 'hi', value: 123 },
    { label: 'wassup', value: 321 },
  ];
  const [radio1, setRadio1] = createSignal(radioItems1[0]);
  const [radio2, setRadio2] = createSignal(radioItems1[0]);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Button value="Ok" styleClass={StyleClassEnum.Primary} />
        <br />
        <Button
          value="Cancel"
          styleClass={StyleClassEnum.Secondary}
          onClick={() => console.log('clicked second btn')}
        />
        <br />
        <br />
        <br />
        <div style={{ width: '200px' }}>
          <Dropdown
            value={dropdownValue()}
            items={arr}
            onChange={item => setDropdownValue(item)}
            styleClass={StyleClassEnum.Primary}
          />
          <br />
          <Dropdown
            value={dropdownValue()}
            items={arr2}
            onChange={item => setDropdownValue(item)}
            styleClass={StyleClassEnum.Secondary}
          />
        </div>
        <br />
        <br />
        <br />
        <Checkbox
          labelText="This is checkbox with text"
          styleClass={StyleClassEnum.Primary}
          isChecked={isChecked()}
          onChange={e => setIsChecked(e)}
        />
        <br />
        <Checkbox styleClass={StyleClassEnum.Secondary} isChecked={isChecked()} onChange={e => setIsChecked(e)} />
        <br />
        <br />
        <br />
        <br />
        <Radio
          value={radio1}
          items={radioItems1}
          onChange={itemVal => setRadio1(itemVal)}
          styleClass={StyleClassEnum.Primary}
        />
        <br />
        <Radio
          value={radio2}
          items={radioItems1}
          onChange={itemVal => setRadio2(itemVal)}
          styleClass={StyleClassEnum.Secondary}
        />
      </div>
      <div>
        <Input value="hahah" styleClass={StyleClassEnum.Primary} />
        <br />
        <Input styleClass={StyleClassEnum.Secondary} onChange={val => console.log(val)} />
        <br />
        <br />
        <AutoComplete
          value={autoCompleteValue()}
          items={arr3}
          onChange={item => setAutoCompleteValue(item)}
          styleClass={StyleClassEnum.Primary}
        />
        <br />
        <br />
        <IconButton styleClass={StyleClassEnum.Primary}>
          <AiFillShop />
        </IconButton>
        <br />
        <IconButton styleClass={StyleClassEnum.Secondary}>
          <AiFillAlert />
        </IconButton>
        <br />
        <br />
      </div>
    </div>
  );
};

export default App;
