import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Modal, Button } from 'antd';

const ModalMint = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
return (
    <>
    <Modal
    title="Title"
    visible={visible}
    onOk={handleOk}
    confirmLoading={confirmLoading}
    onCancel={handleCancel}
    >
    <p>{modalText}</p>
    </Modal>
    </>
    )
}
export default ModalMint