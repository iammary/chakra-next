'use client';

import { AbsoluteCenter, Box, Button, ButtonGroup, Center } from '@chakra-ui/react';
import { useQuery, gql } from '@apollo/client';
import { ICharacter } from '@/interfaces/Character';
import Character from '@/components/Character';
import React from 'react';
import { useRouter } from 'next/navigation';

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
  const { loading, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });
  const router = useRouter();

  const { prev, next } = data?.characters?.info ?? {};

  if (loading) return <Center>Loading...</Center>;

  return (
    <>
      {data?.characters?.results.map((props: ICharacter) => <Character key={props.id} {...props} />)}
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