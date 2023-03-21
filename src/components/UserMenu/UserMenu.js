import { useAuth } from "hooks/useAuth";
import { ModalLogOut } from "components/ModalLogOut"
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Fragment } from "react";

export const UserMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useAuth();

    return (
        <Fragment>
            <Flex alignItems='center' gap={5}>
            <Text fontSize="lg">Welcome, {user.name}</Text>
            <Button
            borderRadius="86% 14% 72% 28% / 44% 53% 47% 56%"
            _hover={{ boxShadow: '0px 4px 18px -2px #c3d0dd' }}
            type="submit"
            onClick={onOpen}
            >
            Logout
            </Button>
            </Flex>
            <ModalLogOut modalHandler={{ isOpen, onClose }} />
        </Fragment>
    )
};