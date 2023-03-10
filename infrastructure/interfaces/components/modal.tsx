export interface ModalProps {
    children: JSX.Element | JSX.Element[]
    showCloseButton?: boolean;
    onClose?: Function;
    title?: string;
    modalCustomCLass?: string;
}