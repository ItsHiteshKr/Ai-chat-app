'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top',
  pauseOnPageIdle: true,
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster}>
        {(toast) => (
          <Toast.Root width={{ base: '320px', md: '400px' }} p={4} fontSize="md">
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger alignSelf="center" />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
