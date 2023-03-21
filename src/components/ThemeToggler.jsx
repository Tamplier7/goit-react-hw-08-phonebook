import { FiSun } from 'react-icons/fi';
import { BsMoonFill } from 'react-icons/bs';
import { Box, IconButton, useColorMode } from '@chakra-ui/react';

export const ThemeToggler = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box textAlign='right' py={4}>
            <IconButton
                icon={colorMode === 'light' ? <BsMoonFill /> : <FiSun />}
                _hover={{ boxShadow: '0px 4px 18px -2px #c3d0dd' }}
                onClick={toggleColorMode}
                variant='ghost'
                aria-label='Toggle theme mode'
                title={`Activated ${colorMode} mode`}
            />
        </Box>
    )
}