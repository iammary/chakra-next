import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import AuthenticationForm from '@/components/AuthenticationForm';

interface UserModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={8}>
          <AuthenticationForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
