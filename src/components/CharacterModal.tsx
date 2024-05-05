import React from 'react';
import { Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, ModalProps, Text, VStack } from '@chakra-ui/react';
import { ICharacter } from '@/interfaces/Character';

interface CharacterModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'>, ICharacter {}

const CharacterModal: React.FC<CharacterModalProps> = ({ isOpen, onClose, name, image, location, episode, gender, species, status }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody p={8}>
          <VStack spacing={4} align="stretch">
            <Image margin="0 auto" borderRadius="lg" width={{ md: 40 }} src={image} alt={name} />
            <Text textAlign="center" textTransform="uppercase" color={gender === 'Male' ? 'teal.600' : 'pink.600'} letterSpacing="wide" fontWeight="bold">
              {name} ({species})
            </Text>
            <VStack spacing={1} align="stretch">
              <Text fontSize="sm">
                <Text as="span" textTransform="uppercase" fontWeight="bold">
                  Location:{' '}
                </Text>
                {location.name}
              </Text>
              <Text fontSize="sm">
                <Text as="span" textTransform="uppercase" fontWeight="bold">
                  Status:{' '}
                </Text>
                {status}
              </Text>
              <Text fontSize="sm">
                <Text as="span" textTransform="uppercase" fontWeight="bold">
                  Episodes:{' '}
                </Text>
                {episode.length}
              </Text>
              <Text fontSize="sm">
                <Text as="span" textTransform="uppercase" fontWeight="bold">
                  Gender:{' '}
                </Text>
                {gender}
              </Text>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterModal;
