import React from 'react';
import { Box, Center, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
import { ICharacter } from '@/interfaces/Character';
import CharacterModal from '@/components/CharacterModal';
import { LocationIcon } from '@/icons/Location';

interface CharacterProps extends ICharacter {}

const MAX_EPISODES = 10;

const Character: React.FC<CharacterProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, image, location, episode = [] } = props;

  return (
    <>
      <Box p={4} display={{ md: 'flex' }} onClick={onOpen} cursor="pointer">
        <Box flexShrink={0}>
          <Center>
            <Image borderRadius="lg" width={{ md: 40 }} src={image} alt={name} />
          </Center>
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="wide" color="teal.600" textAlign={{ sm: 'center', md: 'left' }}>
            <LocationIcon /> {location.name}
          </Text>
          <Link mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" textAlign={{ sm: 'center', md: 'left' }}>
            {name}
          </Link>
          <Text mt={2} color="gray.500" textAlign={{ sm: 'center', md: 'left' }}>
            <Text as="span" fontWeight="bold">
              {episode.length} Episode{episode.length > 1 ? 's' : ''}:{' '}
            </Text>
            {episode
              .slice(0, MAX_EPISODES)
              ?.map(e => e.name)
              .join(', ')}
            {episode.length > MAX_EPISODES && ' ...'}
          </Text>
        </Box>
      </Box>
      <CharacterModal isOpen={isOpen} onClose={onClose} {...props} />
    </>
  );
};

export default Character;
