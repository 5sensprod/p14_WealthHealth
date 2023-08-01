import React from 'react'
import Modal from 'react-modal'
import styles from './Modal.module.css'

Modal.setAppElement('#root')

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={styles.customModal}
      overlayClassName={styles.customOverlay}
    >
      {children}
    </Modal>
  )
}

export default ModalComponent
