import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { Button } from './components/button';
import { Dropdown } from './components/dropdown';

const App: Component = () => {
  const arr = ['hello', 'wassup', 'asdsadsa'];
  const [dropdownValue, setDropdownValue] = createSignal(arr[0]);

  return (
    <div>
      <Button value="Ok" styleClass="primary-button" />
      <br />
      <br />
      <Button value="Cancel" styleClass="secondary-button" onClick={() => console.log('clicked second btn')} />
      <br />
      <br />
      <Dropdown
        value={dropdownValue()}
        items={arr}
        onChange={item => setDropdownValue(item)}
        styleClass="primary-dropdown"
      />
      <br />
      <Dropdown
        value={dropdownValue()}
        items={arr}
        onChange={item => setDropdownValue(item)}
        styleClass="secondary-dropdown"
      />
    </div>
  );
};

export default App;
