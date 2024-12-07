import React, {useMemo} from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import {useLocation, useNavigate} from "react-router-dom";
import BasicLargeButton from "@/components/atom/BasicLargeButton";
import {removeLocalStorageData} from "@/utils/webStorage.utils";
import BasicButton from "@/components/atom/BasicButton";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const nav = useMemo(() => {
    switch (location.pathname.split('/')[1]){
      case '': return 'SW 마일리지'
      case 'register': return 'SW 마일리지 신청'
      case 'list': return '신청 내역'
      case 'profile': return '내 정보'
      default : return ''
    }
  }, [location])

  const logout = () => {
    removeLocalStorageData('refresh-token');
    removeLocalStorageData('refresh-expires');
    window.location.reload();
  }

  return (
    <Flex w={'100%'} p={'24px 32px'} justify={'space-between'} borderBottom={'1px solid var(--chakra-colors-gray-300)'}>
      <Text fontSize={'24px'} fontWeight={600}>{nav}</Text>
      <BasicButton size={'sm'} onClick={() => logout()}>로그아웃</BasicButton>
    </Flex>
  );
};

export default Header;
