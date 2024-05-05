'use client';

import { AbsoluteCenter, Box, Button, ButtonGroup, Center, Flex, Skeleton } from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';
import { ICharacter } from '@/interfaces/Character';
import Character from '@/components/Character';
import React from 'react';
import { useRouter, notFound } from 'next/navigation';

const GET_CHARACTERS = gql`
  query Characters($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        created
        species
        status
        gender
        location {
          id
          name
        }
        episode {
          id
          name
        }
      }
    }
  }
`;

interface CharactersProps {
  page?: number;
}

const Characters: React.FC<CharactersProps> = ({ page = 1 }) => {
  const { loading, data, error } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  const router = useRouter();

  const { prev, next } = data?.characters?.info ?? {};

  if (loading) return <Center>Loading...</Center>;

  if (error) return notFound();

  if (!data?.characters?.results?.length) return <Center p={8}>No results found</Center>;

  return (
    <>
      <Flex flexWrap="wrap" gap={6} pt={8} alignItems="center" justifyContent="center">
        {data.characters.results.map((props: ICharacter) => (
          <Character key={props.id} {...props} />
        ))}
      </Flex>
      <Box position="relative" h="100px" width="100%">
        <AbsoluteCenter p="4" color="white" axis="both">
          <ButtonGroup spacing={4}>
            <Button onClick={() => router.push(`/${prev}`)} isDisabled={!prev}>
              Prev
            </Button>
            <Button onClick={() => router.push(`/${next}`)} isDisabled={!next}>
              Next
            </Button>
          </ButtonGroup>
        </AbsoluteCenter>
      </Box>
    </>
  );
};

export default Characters;
