import type { Component } from 'solid-js';
import { Button } from './components/button/button';

const App: Component = () => {
  return (
    <div>
      <Button value="Ok" buttonClass="primary-button" />
      <br />
      <br />
      <Button value="Cancel" buttonClass="secondary-button" />
    </div>
  );
};

export default App;
