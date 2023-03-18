import type { Component } from 'solid-js';
import { createSignal, For } from 'solid-js';
import { AutoComplete } from './components/auto-complete';
import { Button } from './components/button';
import { Checkbox } from './components/checkbox';
import { Dropdown } from './components/dropdown';
import { IconButton } from './components/icon-button';
import { Input } from './components/input';
import { Radio } from './components/radio';
import { StyleClassEnum } from './data/style-class.enum';
import { AiFillShop, AiFillAlert } from 'solid-icons/ai';
import { ListView } from './components/list-view';
import { TextArea } from './components/text-area';
import { Tree } from './components/tree';
import { Popover } from './components/popover';
import { Tabs } from './components/tab';
import { Breadcrumb } from './components/breadcrumb';
import { ColorPicker, ColorValue } from './components/color-picker';
import { Slider } from './components/slider';
import { EmojiValue, Rate } from './components/rate';
import { Progress } from './components/progress';
import { Loader } from './components/loader';
import { Modal } from './components/modal';
import { DatePicker, DateValue } from './components/date-picker';

const data = {
  label: 'node1',
  children: [
    {
      label: 'node2',
      children: [
        {
          label: 'node2-1',
          children: [
            {
              label: 'node2-1-1',
            },
          ],
        },
        {
          label: 'node2-2',
          children: [
            {
              label: 'node2-2-1',
            },
          ],
        },
        {
          label: 'node2-3',
        },
      ],
    },
    {
      label: 'node3',
    },
  ],
};

const bigLoremText =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

//TODO remove (only for testing purposes)
const tomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  return tomorrow;
};

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
  const [colorPicker, setColorPicker] = createSignal<ColorValue>({
    hex: '#3d424b',
    rgba: '',
    type: 'RGBA',
  });
  const [colorPicker2, setColorPicker2] = createSignal<ColorValue>({
    hex: '#3d411b',
    rgba: '',
    type: 'RGBA',
  });
  const [slider, setSlider] = createSignal(0);
  const [rate, setRate] = createSignal<EmojiValue>();

  const [date1, setDate1] = createSignal<DateValue>(new DateValue(tomorrow().toString()));
  const [date2, setDate2] = createSignal<DateValue>(new DateValue(new Date().toString()));

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px' }}>
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
        <br />
        <br />
        <Input value="hahah" styleClass={StyleClassEnum.Primary} />
        <br />
        <Input styleClass={StyleClassEnum.Secondary} onChange={val => console.log(val)} />
        <br />
        <Input styleClass={StyleClassEnum.Primary} endButtonIcon={<AiFillShop />} />
        <br />
        <Input styleClass={StyleClassEnum.Secondary} endButtonIcon={<AiFillShop />} />
        <br />
        <Input styleClass={StyleClassEnum.Secondary} endIcon={<AiFillAlert />} />
        <br />
        <Input styleClass={StyleClassEnum.Primary} endButtonText="Primary" />
        <br />
        <Input styleClass={StyleClassEnum.Secondary} endButtonText="Search" />
      </div>
      <div style={{ 'margin-left': '30px', width: '250px' }}>
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
        <ListView styleClass={StyleClassEnum.Primary} data={arr3} />
        <br />
        <ListView
          styleClass={StyleClassEnum.Secondary}
          data={arr3}
          onClick={e => {
            console.log(e);
          }}
        />
      </div>
      <div style={{ 'margin-left': '30px', width: '300px' }}>
        <TextArea styleClass={StyleClassEnum.Primary} row={8} />
        <br />
        <TextArea styleClass={StyleClassEnum.Secondary} row={5} value="Hello this is text" />
        <br />
        <Tree data={data} styleClass={StyleClassEnum.Primary} />
        <br />
        <Tree data={data} styleClass={StyleClassEnum.Secondary} />
      </div>
      <div style={{ 'margin-left': '30px', width: '300px' }}>
        <Popover text="Hello">
          <Button value="Popover text example" styleClass={StyleClassEnum.Primary} />
        </Popover>
        <br />
        <Popover text={bigLoremText}>
          <Button value="Popover big text example" styleClass={StyleClassEnum.Primary} />
        </Popover>
        <br />
        <Tabs
          styleClass={StyleClassEnum.Primary}
          tabs={[
            { id: 1, label: 'Tab 1' },
            { id: 2, label: 'Tab 2' },
            { id: 3, label: 'Tab 3' },
          ]}
        />
        <br />
        <Tabs
          styleClass={StyleClassEnum.Secondary}
          tabs={[
            { id: 1, label: 'Tab 1' },
            { id: 2, label: 'Tab 2' },
            { id: 3, label: 'Tab 3' },
          ]}
        />
        <br />
        <Breadcrumb
          styleClass={StyleClassEnum.Primary}
          items={[
            { label: 'Tab 1', link: 'aa' },
            { label: 'Sub Tab', link: 'aa' },
            { label: 'Sub Tab 2', link: 'aa' },
          ]}
        />
        <br />
        <Breadcrumb
          styleClass={StyleClassEnum.Secondary}
          items={[
            { label: 'Tab 1', link: 'aa' },
            { label: 'Sub Tab', link: 'aa' },
            { label: 'Sub Tab 2', link: 'aa' },
          ]}
        />
        <br />
        <div style={{ display: 'flex' }}>
          <ColorPicker styleClass={StyleClassEnum.Primary} value={colorPicker()} onChange={e => setColorPicker(e)} />
          <ColorPicker styleClass={StyleClassEnum.Primary} value={colorPicker2()} onChange={e => setColorPicker2(e)} />
        </div>
        <br />
        <Slider value={slider()} onChange={e => setSlider(e)} styleClass={StyleClassEnum.Primary} />
        <div style={{ color: 'white' }}>{JSON.stringify(slider())}</div>
        <br />
        <Rate value={rate()} onChange={e => setRate(e)} />
        <div style={{ color: 'white' }}>{JSON.stringify(rate())}</div>
        <br />
        <Progress value={30} />
        <br />
        <div style={{ display: 'flex' }}>
          <Loader isLoading={true} size={110} borderWidth={30} />
          <Loader isLoading={false} />
        </div>
        <br />

        <Modal
          onOpen={() => console.log('opened')}
          onClose={() => console.log('closed')}
          toggler={<Button value="Open Modal" styleClass={StyleClassEnum.Primary} />}
        >
          <h1>Hello</h1>
          <h1>Hello</h1>
          {/* <For each={Array.from(Array(100).keys())}>{(e, i) => <h1>Hello</h1>}</For> */}
        </Modal>
        <br />
        <DatePicker value={date1()} onChange={e => setDate1(e)} styleClass={StyleClassEnum.Primary} />
        <DatePicker value={date2()} onChange={e => setDate2(e)} styleClass={StyleClassEnum.Primary} />
      </div>
    </div>
  );
};

export default App;
