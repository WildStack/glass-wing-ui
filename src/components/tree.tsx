import { Component, createSignal } from 'solid-js';

export const Tree: Component<{ data: any; level?: number }> = props => {
  const [collapse, setCollapse] = createSignal(false);

  const { data } = props;
  // const { collapse } = this.state;
  // const level = props.level || 0;
  let ChildrenNodes = [];

  if (data.children) {
    ChildrenNodes = data.children.map((d: any) => <Tree data={d} level={(props.level || 0) + 1} />);
  }

  return (
    <div class="tree-wrapper">
      <div class="tree-node" style={{ 'padding-left': `${(props.level || 0) * 10}px` }}>
        <div class="tree-node-label">
          <span class={collapse() ? 'toggle collasped' : 'toggle'} onClick={() => setCollapse(!collapse())}>
            ▼
          </span>

          {data.value}
        </div>
        <div class={'tree-node-children' + (collapse() ? ' collapsed' : '')}>{ChildrenNodes}</div>
      </div>
    </div>
  );
};
