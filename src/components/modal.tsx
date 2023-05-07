import { createSignal, createEffect, JSX, Show } from 'solid-js';
import { StyleClassEnum } from '../data/style-class.enum';

interface ModalProps {
  styleClass?: StyleClassEnum;
  onClose?: () => void;
  onOpen?: () => void;
  toggler: JSX.Element;
  children: JSX.Element;
}

export const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  const openModal = () => {
    if (props.onOpen) props.onOpen();
    setIsOpen(true);
  };
  const closeModal = () => {
    if (props.onClose) props.onClose();
    setIsOpen(false);
  };

  createEffect(() => {
    // This is to prevent the background from scrolling while the modal is open.
    if (isOpen()) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  });

  const handleModalClick = (event: any) => {
    if (event.target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  return (
    <div class="modal-wrapper">
      <div class="modal-toggler" onClick={openModal}>
        {props.toggler}
      </div>

      <Show when={isOpen()}>
        <div class="modal-background" onClick={handleModalClick}>
          <div class="modal">
            <div class="modal-top-container">
              <div class="title">Hello from title</div>
              <div class="close" onClick={closeModal}>
                &times;
              </div>
            </div>

            <div class="modal-content">{props.children}</div>
          </div>
        </div>
      </Show>
    </div>
  );
};
