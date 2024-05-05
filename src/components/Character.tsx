import React from 'react';
import { Box, Flex, Image, Link, Text, useDisclosure } from '@chakra-ui/react';
import { ICharacter } from '@/interfaces/Character';
import CharacterModal from '@/components/CharacterModal';
import { LocationIcon } from '@/icons/Location';

interface CharacterProps extends ICharacter {}

const MAX_EPISODES = 10;

const Character: React.FC<CharacterProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name, image, location, episode = [], gender } = props;

  return (
    <>
      <Flex
        as="article"
        width={600}
        height={{ base: 'initial', md: 220 }}
        onClick={onOpen}
        flexDirection={{ base: 'column', md: 'row' }}
        cursor="pointer"
        bg={gender === 'Male' ? `teal.900` : `pink.800`}
        borderRadius="lg"
        overflow="hidden"
        color="white">
        <Flex flex="2 1 0%" width="100%">
          <Image width="100%" height={{ base: 300, md: '100%' }} objectFit="cover" src={image} alt={name} />
        </Flex>

        <Flex flex="3 1 0%" flexDirection="column" p={4}>
          <Text fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="wide">
            <LocationIcon /> {location.name}
          </Text>
          <Link mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold">
            {name}
          </Link>
          <Text mt={2} color="gray.300" noOfLines={[1, 2, 3]}>
            <Text as="span" fontWeight="bold">
              {episode.length} Episode{episode.length > 1 ? 's' : ''}:{' '}
            </Text>
            {episode
              .slice(0, MAX_EPISODES)
              ?.map(e => e.name)
              .join(', ')}
            {episode.length > MAX_EPISODES && ' ...'}
          </Text>
        </Flex>
      </Flex>
      <CharacterModal isOpen={isOpen} onClose={onClose} {...props} />
    </>
  );
};

export default Character;
