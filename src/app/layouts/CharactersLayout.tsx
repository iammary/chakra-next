'use client';

import React from 'react';
import { Box, Flex, Heading, IconButton, Spacer, useDisclosure, VStack } from '@chakra-ui/react';
import Characters from '@/components/Characters';
import { UserIcon } from '@/icons/User';
import UserModal from '@/components/UserModal';
import Link from 'next/link';

interface CharactersLayoutsProps {
  page?: number;
}

const CharactersLayout: React.FC<CharactersLayoutsProps> = ({ page = 1 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Link href="/">
            <Heading size="md" color="green.700">The Rick and Morty Characters</Heading>
          </Link>
        </Box>
        <Spacer />
        <IconButton aria-label="Update details" icon={<UserIcon />} onClick={onOpen}>
          Sign Up
        </IconButton>
      </Flex>
      <VStack p={4} align="stretch">
        <Heading size="lg" textAlign="center">
          Information Page {page}
        </Heading>
        <Characters page={page} />
      </VStack>
      <UserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CharactersLayout;
