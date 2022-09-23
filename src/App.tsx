import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Dropdown } from './components/dropdown';
import { Radio } from './components/radio';
import { StyleClassEnum } from './data/style-class.enum';

const App: Component = () => {
  const arr = ['hello', 'wassup', 'asdsadsa'];
  const [dropdownValue, setDropdownValue] = createSignal(arr[0]);
  const [isChecked, setIsChecked] = createSignal(false);

  const radioItems1 = [
    { label: 'hi', value: 123 },
    { label: 'wassup', value: 321 },
  ];
  const [radio1, setRadio1] = createSignal(radioItems1[0]);
  const [radio2, setRadio2] = createSignal(radioItems1[0]);

  return (
    <div>
      <Button value="Ok" styleClass={StyleClassEnum.Primary} />
      <br />
      <Button value="Cancel" styleClass={StyleClassEnum.Secondary} onClick={() => console.log('clicked second btn')} />
      <br />
      <br />
      <br />
      <Dropdown
        value={dropdownValue()}
        items={arr}
        onChange={item => setDropdownValue(item)}
        styleClass={StyleClassEnum.Primary}
      />
      <br />
      <Dropdown
        value={dropdownValue()}
        items={arr}
        onChange={item => setDropdownValue(item)}
        styleClass={StyleClassEnum.Secondary}
      />
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
  );
};

export default App;
