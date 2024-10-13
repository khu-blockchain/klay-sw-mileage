import React from 'react';
import {Button, ButtonProps, Image} from "@chakra-ui/react";
import KaiaIcon from '@/assets/img/icon_kaia.png'
import {provider} from "@/App";
const KaiaConnectButton = (props: ButtonProps & {setAddress: (value: string) => void}) => {
  const {setAddress, ...buttonProps} = props;

  const connectKaia = async() => {
    try {
      const result = await provider.enable();
      setAddress(result[0]);
    } catch (error) {
      // Handle error. Likely the user rejected the login
      console.error(error);
    }
  }

  return (
    <Button onClick={() => connectKaia()} fontSize={'14px'} borderRadius={'15px'} minW={'280px'} h={'44px'} w={'100%'} color={'#ffffff'} colorScheme={'messenger'} bgColor={'var(--kaia-color)'} {...buttonProps}>
      <Image src={KaiaIcon} w={'14px'} mr={'7px'} objectFit={'cover'}/>
      Connect to Kaia
    </Button>
  );
};

export default KaiaConnectButton;
