import React, {ReactNode} from 'react';
import Modal from 'react-modal/';

Modal.setAppElement('#root')


interface IProps{
    children: ReactNode
    isOpen: boolean,
    setIsOpen: (v : boolean) => void
}

function CustomModal({setIsOpen, isOpen, children} : IProps) {

    function handleClose() {
        setIsOpen(false)
    }

    return (
        <div className="custom-modal">
            <Modal
                isOpen={isOpen}
                onRequestClose={handleClose}
                style={customStyles}
                contentLabel="modal"
            >
                {children}
            </Modal>
        </div>
    );
}

export default CustomModal



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '32px',
        border: 'none'
    },
};

