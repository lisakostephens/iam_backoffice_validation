/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { ModalProps } from '../../infrastructure/interfaces/components/modal';
import { Show } from './Show';

export const Modal = (props: ModalProps) => (
    <div className="modal-background" onClick={e => {
        (e.target as HTMLElement).className === 'modal-background' && props.onClose && props.onClose(); 
    }}>
        <div className={`custom-modal ${props.modalCustomCLass ? props.modalCustomCLass : ''}`}>
            <section className="title-bar">   
                <h2>{ props.title }</h2>
                <Show when={ props.showCloseButton || false }>
                    <button className="close-modal" onClick={() => props.onClose && props.onClose()}> <img src="assets/icons/close-icon.svg" alt="close-button" /> </button>
                </Show>
            </section>
            { props.children }
        </div>
    </div>
);

