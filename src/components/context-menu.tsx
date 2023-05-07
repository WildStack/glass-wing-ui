import { AiOutlineRight } from 'solid-icons/ai';
import { Component, createSignal, JSX, onCleanup, Show, For, onMount, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';
import { StyleClassEnum } from '../data/style-class.enum';

export interface ContextMenuItem<T = object> {
  id: string;
  label: string;
  icon?: JSX.Element;
  end?: string;
  items?: ContextMenuItem<T>[];
  value?: T;
}

interface ContextMenuProps<T = object> {
  styleClass: StyleClassEnum;
  onClick?: (item: ContextMenuItem) => void;
  children?: JSX.Element;
  items: ContextMenuItem<T>[];
}

interface ContextMenuStoreItem {
  isOpen: boolean;
  index: number;
  hasChildren: boolean;
}

interface ContextMenuItemProps {
  items?: ContextMenuItem[];
  isRoot?: boolean;
  nthElementClicked?: number | null;
  parentItemsLength?: number | null;
  onItemClick: (item: ContextMenuItem) => void;
}

const CONTEXT_MENU_ITEM_HEIGHT = 30;
const SLIGHT_OFFSET_PX = 8;

const determineStyle = (params: {
  nthElementClicked?: number | null;
  isRoot?: boolean;
  containerRef: HTMLDivElement;
  itemsLength?: number | null;
}): JSX.CSSProperties => {
  if (params.isRoot) {
    return {};
  }

  //! must be in this order
  const main = params.containerRef.getBoundingClientRect();

  if (main.x === 0 && main.y === 0) {
    return {
      position: 'absolute',
    };
  }

  const body = document.body.getBoundingClientRect();
  const isBottom = main.top + (params.itemsLength ?? 0) * CONTEXT_MENU_ITEM_HEIGHT + 50 > body.height;

  // console.log('itemsLength: ' + params?.itemsLength);
  // console.log('nthElementClicked: ' + params?.nthElementClicked);
  // console.log((params?.itemsLength ?? 0) - (params?.nthElementClicked ?? 0) - 1);

  return {
    position: 'absolute',
    ...(isBottom
      ? {
          bottom: `${((params?.itemsLength ?? 0) - (params?.nthElementClicked ?? 0) - 1) * CONTEXT_MENU_ITEM_HEIGHT}px`,
        }
      : {
          top: `${(params.nthElementClicked ?? 0) * CONTEXT_MENU_ITEM_HEIGHT}px`,
        }),
  };
};

const ContextMenuItem: Component<ContextMenuItemProps> = props => {
  let containerRef!: HTMLDivElement;

  const [openMap, setOpenMap] = createStore<ContextMenuStoreItem[]>([]);
  const [shouldBeLeft, setShouldBeLeft] = createSignal(false);
  const [nthElementClicked, setNthElementClicked] = createSignal<number | null>(null);

  onMount(() => {
    setOpenMap(
      props?.items?.map((e, i) => ({ isOpen: false, index: i, hasChildren: Boolean(e.items?.length ?? null) })) ?? [],
    );

    //! determine if container should be left
    const main = containerRef.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    const isLeft = main.x + main.width > body.width;
    setShouldBeLeft(isLeft);
  });

  const onItemClick = (i: number) => {
    const item = openMap.find(e => e.index === i);
    const contextMenuItem = props.items?.[i];

    if (contextMenuItem && !item?.hasChildren) {
      props.onItemClick(contextMenuItem);
      return;
    }
  };

  const onMouseOver = (i: number) => {
    setNthElementClicked(i);
    setOpenMap(prevOpenMap =>
      prevOpenMap.map(e => ({ index: e.index, isOpen: e.index === i, hasChildren: e.hasChildren })),
    );
  };

  return (
    <div
      ref={containerRef}
      class="list-view-container"
      style={{
        ...determineStyle({
          containerRef,
          isRoot: props.isRoot,
          itemsLength: props.parentItemsLength,
          nthElementClicked: props.nthElementClicked,
        }),
        ...(shouldBeLeft() ? { right: '100%' } : { left: '100%' }),
      }}
    >
      <ul class="list-view-list">
        <For each={props.items}>
          {(item, i) => (
            <>
              <li class={`list-view-item`} onClick={() => onItemClick(i())} onMouseOver={() => onMouseOver(i())}>
                <div class="icon">
                  <Show when={item.icon}>{item.icon}</Show>
                </div>

                <div class="label">{item.label}</div>

                <div class="end">
                  <Show when={item.end && !item.items}>{item.end}</Show>

                  <Show when={item.items?.length}>
                    <AiOutlineRight />
                  </Show>
                </div>
              </li>

              <Show when={item.items?.length && openMap[i()]?.isOpen}>
                <ContextMenuItem
                  items={item.items}
                  isRoot={false}
                  nthElementClicked={nthElementClicked()}
                  onItemClick={props.onItemClick}
                  parentItemsLength={props.items?.length}
                />
              </Show>
            </>
          )}
        </For>
      </ul>
    </div>
  );
};

/**
 * //TODO when bottom hist second nested child is weirdly positioned
 * TODO when bottom hist second nested child is weirdly positioned
 * @description Inspiration https://codesandbox.io/s/xx52d?file=/src/Menu.js
 */
export const ContextMenu: Component<ContextMenuProps> = props => {
  let containerRef!: HTMLDivElement;

  const [isOpen, setIsOpen] = createSignal(false);
  const [content, setContent] = createSignal<{ clientY: number; clientX: number; isBottom: boolean }>({
    clientY: 0,
    clientX: 0,
    isBottom: false,
  });

  createEffect(() => {
    //! adds event blocker for all scroll but scrollbars are still visible
    if (isOpen()) {
      window.addEventListener('wheel', event, { passive: false });
    } else {
      window.removeEventListener('wheel', event);
    }
  });

  onMount(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });

  onCleanup(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleContextMenu = (e: MouseEvent): void => {
    //! must be in this order
    e.preventDefault();
    setIsOpen(true);

    const main = containerRef.getBoundingClientRect();
    const body = document.body.getBoundingClientRect();
    const isLeft = e.x + main.width + 50 > body.width; // +50 for insurance for exact side by side at the end of body
    const isBottom = e.y + main.height > body.height;

    setContent({
      clientY: e.clientY,
      clientX: isLeft ? e.clientX - main.width - SLIGHT_OFFSET_PX : e.clientX + SLIGHT_OFFSET_PX,
      isBottom,
    });
  };

  const handleClickOutside = (event: any) => {
    if (containerRef && !containerRef.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const event = (e: WheelEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div class="for-click-outside-class-required">
        <div class="contex-menu-toggler" onContextMenu={handleContextMenu}>
          {props.children}
        </div>

        <Show when={isOpen()}>
          <div class="background-invisble-div-block-everything" />

          <div
            ref={containerRef}
            class={`context-menu-container ${props.styleClass}`}
            style={{
              ...(content().isBottom
                ? { bottom: `${SLIGHT_OFFSET_PX}px` }
                : { top: `${content().clientY.toString()}px` }),
              left: `${content().clientX.toString()}px`,
            }}
          >
            <ContextMenuItem
              items={props.items}
              isRoot={true}
              onItemClick={item => {
                setIsOpen(false);
                if (props.onClick) props.onClick(item);
              }}
            />
          </div>
        </Show>
      </div>
    </>
  );
};
