import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/authOperations';

import {
  Stack,
  Input,
  Flex,
  Button,
  Text,
  Box,
  InputLeftElement,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

import {
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai';

import {
  RxEyeOpen,
  RxEyeClosed
} from 'react-icons/rx';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState();
  const dispatch = useDispatch();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    dispatch(login(data));
  };

  return (
    <Flex justify="center" align="canter">
      <Flex
        pos="relative"
        justify="center"
        align="canter"
        direction="column"
        w="400px"
      >
        <Text as="h1" align="center" fontWeight="700" fontSize="24px" mb={4}>
          Sign in
        </Text>

        <Stack as="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
          <Box pos="relative">
            <Text as="label" htmlFor="email">
              Email
            </Text>
            <InputGroup mt={2}>
              <Input
                {...register('email', {
                  required: 'Email is required',
                })}
                id="email"
                type="email"
              />
              <InputLeftElement pointerEvents="none">
                  <AiOutlineMail color="gray.300" />
                </InputLeftElement>
             </InputGroup>
            <Box position="absolute">
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
            <Text as="label" htmlFor="password">
              Password
            </Text>
            <InputGroup mt={2}>
              <Input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 7,
                    message: 'Min length is 7',
                  },
                })}
                id="password"
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
                  {showPassword ? <RxEyeOpen /> : <RxEyeClosed />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Box pos="absolute">
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
          <Button type="submit">Sign In</Button>
        </Stack>
      </Flex>
    </Flex>
  );
};
