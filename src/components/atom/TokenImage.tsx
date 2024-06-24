import React from 'react';
import {ImageProps, Image} from "@chakra-ui/react";

const TokenImage = (props: ImageProps) => {
  return (
    <Image borderRadius={'100%'} border={'1px solid var(--chakra-colors-gray-300)'} objectFit={'cover'} {...props}/>
  );
};

export default TokenImage;
