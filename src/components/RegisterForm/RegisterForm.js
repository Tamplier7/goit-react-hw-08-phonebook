import { useDispatch } from 'react-redux';
import { signup } from 'redux/auth/authOperations';
import { useForm } from 'react-hook-form';

import {
  Stack,
  Input,
  Flex,
  Button,
  Text,
  Box,
  InputLeftElement,
  InputRightElement,
  InputGroup,
  Heading,
  FormLabel,
} from '@chakra-ui/react';

import {
  AiOutlineUser,
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai';

import {
  RxEyeOpen,
  RxEyeClosed
} from 'react-icons/rx';
import { useState } from 'react';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    dispatch(signup(data));
  };
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex justify="center" align="canter">
      <Flex
        pos="relative"
        justify="center"
        align="canter"
        direction="column"
        w="400px"
      >
        <Heading as="h1" align="center" fontWeight="700" fontSize="24px" mb={4}>
          Sign up
        </Heading>

        <Stack as="form" gap={1} onSubmit={handleSubmit(onSubmit)}>
          <Box pos="relative">
            <FormLabel>
              Username
              <InputGroup mt={2}>
                <Input
                  {...register('name', {
                    required: 'Username is required',
                  })}
                  type="text"
                />
                <InputLeftElement pointerEvents="none">
                  <AiOutlineUser color="gray.300" />
                </InputLeftElement>
                </InputGroup>
            </FormLabel>
            <Box position="absolute" top="90%">
              {errors?.name && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.name?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Box pos="relative">
            <FormLabel>
              Email
              <InputGroup mt={2}>
                <Input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                />
                <InputLeftElement pointerEvents="none">
                  <AiOutlineMail color="gray.300" />
                </InputLeftElement>
              </InputGroup>
            </FormLabel>
            <Box position="absolute" top="90%">
              {errors?.email && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.email?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Box pos="relative">
            <FormLabel>
              Password
              <InputGroup mt={2}>
                <Input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 7,
                      message: 'Min length is 7',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                />
                <InputLeftElement pointerEvents="none">
                  <AiFillLock color="gray.300" />
                </InputLeftElement>
                <InputRightElement>
                  <Button
                    background="transparent"
                    p="0"
                    w="100%"
                    aria-label="Show hide password"
                    _hover={{ bg: 'transparent' }}
                    _focus={{ bg: 'transparent' }}
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <RxEyeOpen />
                    ) : (
                      <RxEyeClosed />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormLabel>
            <Box pos="absolute" top="90%">
              {errors?.password && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.password?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Button type="submit">Sign up</Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
