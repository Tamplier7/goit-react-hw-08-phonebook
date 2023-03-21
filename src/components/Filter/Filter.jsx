import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/selectors';
import { AiOutlineSearch } from 'react-icons/ai'; // import the icon

import { Input, Stack, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <Flex alignItems='center' justifyContent='center'>
      <Stack w="xl" p={8}>
        <label htmlFor='filter'>Find contact by Name </label>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <AiOutlineSearch />
          </InputLeftElement>
          <Input
            type='text'
            id='filter'
            placeholder='Find a person'
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />
        </InputGroup>
      </Stack>
    </Flex>
  );
};
