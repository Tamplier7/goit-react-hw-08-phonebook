import { useAuth } from 'hooks/useAuth';
import { Box, Container, Flex, Text } from '@chakra-ui/react';
import { AuthNav } from 'components/AuthNav';
import { UserMenu } from 'components/UserMenu';
import { ThemeToggler } from 'components/ThemeToggler';

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Box as='header'>
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center' gap={4}> 
          <Flex gap={4} align="center">
            <Text as="h2" fontSize="xl" fontWeight="700">
              Welcome to PhoneBook
            </Text>
            <ThemeToggler />
            </Flex>
          {!isLoggedIn && (
            <Flex justify="space-between" align="center">
              <AuthNav />
            </Flex>
          )}
          {isLoggedIn && (
            <Flex gap={4} align="center">
              <UserMenu />
            </Flex>
          )}
        </Flex>
      </Container>
      </Box>
  );
};
