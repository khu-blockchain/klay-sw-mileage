import React, {ReactNode} from "react";
import {Flex, HStack, Text} from "@chakra-ui/react";

const DataField = ({label, children}: {label: string, children: ReactNode}) => {
  return (
    <HStack justify={'flex-start'} spacing={0}>
      <Text color={'var(--chakra-colors-gray-500)'} fontWeight={600} w={'100px'}>{label}</Text>
      <Flex flex={1}>
        {children}
      </Flex>
    </HStack>
  )
}

export default DataField;
