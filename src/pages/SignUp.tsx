import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import useSignUpStore from "@/store/local/useSignUpStore";
import {
  Flex,
  FormControl,
  VStack,
  Text,
  HStack,
  useToast,
  Checkbox,
  Input,
  Button,
  Select, UnorderedList, ListItem, Divider, InputGroup, InputLeftElement, InputRightElement
} from "@chakra-ui/react";
import useIsAble from "@/hooks/useAble";
import KaiaConnectButton from "@/components/atom/KaiaConnecButtont";
import {BANK_CODE} from "@/assets/constants/bankCode.data";
import md5 from "md5";
import {useNavigate} from "react-router-dom";
import {caver} from "@/App";
import {useSignUp} from "@/feature/queries/student.queries";
import LVStack from "@/components/atom/LVStack";
import {UserRound, EyeOff, Eye} from "lucide-react";

const SignUp = () => {
  const [step, setStep] = useState<number>(0)
  const {reset} = useSignUpStore((state) => state)

  useEffect(() => {
    return () => reset()
  }, [])

  return (
    <InitLayout>
      <InitContentBox
        title={'회원가입'}
        description={<SignUpDescription/>}>
        {step === 0 && <Step0 setStep={setStep}/>}
        {step === 1 && <Step1 setStep={setStep}/>}
        {step === 2 && <Step2 setStep={setStep}/>}
      </InitContentBox>
    </InitLayout>
  );
};

export default SignUp;

const SignUpDescription = () => {
  return (
    <LVStack spacing={'6px'}>
      <Text whiteSpace={'pre-wrap'} color={'var(--chakra-colors-gray-500)'} fontSize={'14px'}
            fontWeight={400}>
        {'회원가입 진행 전, Klay 계정을 소유하지 않은 학생은 크롬 웹스토어를 통해\nKaia를 설치해주세요.'}
      </Text>
      <Button size={'sm'}
              onClick={() => window.open('https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi?hl=ko')}
              color={'#3366FF'} variant={'link'}>Kaia 다운로드</Button>
    </LVStack>
  )
}


const Step0 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)

  const [passwordShow, setPasswordShow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

  const canNext = useIsAble([
    state.studentId !== '',
    state.password !== '',
    state.confirmPassword !== '',
    state.confirmPassword === state.password
  ])
  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <Input variant={'basic'}
               value={state.studentId}
               onChange={(e) => setState('studentId', e.target.value)}
               placeholder={'학번을 입력해주세요.'}
               type={'text'}/>
      </FormControl>
      <FormControl>
        <InputGroup>
          <Input variant={'basic'}
                 value={state.password}
                 onChange={(e) => setState('password', e.target.value)}
                 placeholder={'비밀번호를 입력해주세요.'}
                 type={passwordShow ? 'text' : 'password'}/>
          <InputRightElement w={'56px'} h={'56px'}>
            {passwordShow ?
              <Eye cursor={'pointer'} onClick={() => setPasswordShow(false)} width={'20px'} color={'var(--chakra-colors-gray-400)'}/> :
              <EyeOff cursor={'pointer'} onClick={() => setPasswordShow(true)} width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
            }
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <InputGroup>
          <Input variant={'basic'}
                 value={state.confirmPassword}
                 onChange={(e) => setState('confirmPassword', e.target.value)}
                 placeholder={'동일한 비밀번호를 입력해주세요.'}
                 type={confirmPasswordShow ? 'text' : 'password'}/>
          <InputRightElement w={'56px'} h={'56px'}>
            {confirmPasswordShow ?
              <Eye cursor={'pointer'} onClick={() => setConfirmPasswordShow(false)} width={'20px'} color={'var(--chakra-colors-gray-400)'}/> :
              <EyeOff cursor={'pointer'} onClick={() => setConfirmPasswordShow(true)} width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
            }
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
      <Flex w={'100%'} justify={'flex-end'}>
        <Button color={'var(--main-color)'} variant={'link'} isDisabled={!canNext}
                onClick={() => setStep(prev => prev + 1)}>
          다음
        </Button>
      </Flex>
    </VStack>
  )
}

const Step1 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)

  const canNext = useIsAble([
    state.name !== '',
    state.email !== '',
    state.phoneNumber !== '',
    state.department !== '',
  ])

  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <Input variant={'basic'}
               value={state.name}
               onChange={(e) => setState('name', e.target.value)}
               placeholder={'이름을 입력해주세요.'}
               type={'text'}/>
      </FormControl>
      <FormControl>
        <Input variant={'basic'}
               value={state.email}
               onChange={(e) => setState('email', e.target.value)}
               placeholder={'이메일을 입력해주세요.'}
               type={'text'}/>
      </FormControl>
      <FormControl>
        <Input variant={'basic'}
               value={state.phoneNumber}
               onChange={(e) => setState('phoneNumber', e.target.value)}
               placeholder={'010-000-0000'}
               type={'text'}/>
      </FormControl>
      <FormControl>
        <Input variant={'basic'}
               value={state.department}
               onChange={(e) => setState('department', e.target.value)}
               placeholder={'학과를 입력해주세요.'}
               type={'text'}/>
      </FormControl>
      <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
      <Flex w={'100%'} justify={'space-between'}>
        <Button color={'var(--main-color)'} variant={'link'}
                onClick={() => setStep(prev => prev - 1)}>
          이전
        </Button>
        <Button isDisabled={!canNext} color={'var(--main-color)'} variant={'link'}
                onClick={() => setStep(prev => prev + 1)}>
          다음
        </Button>
      </Flex>
    </VStack>
  )
}

const Step2 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)
  const navigate = useNavigate();
  const toast = useToast();
  const [isTermChecked, setIsTermChecked] = useState(false)

  const canSignUp = useIsAble([
    state.walletAddress !== '',
    caver.utils.isAddress(state.walletAddress),
    state.bankAccountNumber !== '',
    state.bankCode !== '',
    isTermChecked
  ])

  const {mutate, isPending} = useSignUp({
    onSuccessFn: (data) => {
      toast({
        title     : `${data.name}님, 회원가입이 완료되었습니다`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
      navigate('/sign-in')
      return;
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const onSignUp = async () => {
    console.log('signup');
    
    await mutate({
      body: {
        studentId                       : state.studentId,
        password                        : md5(state.password),
        passwordConfirm                 : md5(state.confirmPassword),
        name                            : state.name,
        email                           : state.email,
        phoneNumber                     : state.phoneNumber,
        department                      : state.department,
        walletAddress                   : state.walletAddress,
        bankAccountNumber               : state.bankAccountNumber,
        bankCode                        : state.bankCode,
        personalInformationConsentStatus: isTermChecked ? 1 : 0
      }
    })
  }

  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <HStack w={'100%'} spacing={'10px'}>
          <Select bgColor={'var(--chakra-colors-gray-50)'} h={'56px'} w={'200px'} borderRadius={'12px'} borderColor={'var(--chakra-colors-gray-300)'}
                  placeholder='은행 선택' onChange={(e) => setState('bankCode', e.target.value)}>
            {Object.keys(BANK_CODE).map((el: string) => (
              <option value={el}>{BANK_CODE[el]}</option>
            ))}
          </Select>
          <Input variant={'basic'}
                 flex={1} value={state.bankAccountNumber}
                 onChange={(e) => setState('bankAccountNumber', e.target.value)}
                 placeholder={'계좌번호를 입력하세요.'}
                 type={'text'}/>
        </HStack>

      </FormControl>
      <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
      <FormControl>
        <LVStack w={'100%'} spacing={'10px'}>
          <Input variant={'basic'}
                 value={state.walletAddress}
                 onChange={(e) => setState('walletAddress', e.target.value)}
                 placeholder={'0x로 시작하는 주소를 입력하세요.'}
                 type={'text'}/>
          <UnorderedList spacing={'6px'} color={'var(--chakra-colors-gray-500)'} fontSize={'12px'} fontWeight={400}>
            <ListItem>지갑 연결 버튼을 눌러 Kaia를 연결하거나, 본인의 지갑주소를 입력해 주세요.</ListItem>
            <ListItem>Kaia가 열리지 않는다면 Kaia 아이콘을 클릭하여 주소를 복사해주세요.</ListItem>
            <ListItem fontWeight={600} color={'var(--main-color)'}>*주의* 회원가입시 등록되는 지갑 주소는 변경할 수 없습니다. 지갑 주소를 확인하세요.</ListItem>
          </UnorderedList>
          <KaiaConnectButton setAddress={(value: string) => setState('walletAddress', value)}/>
        </LVStack>
      </FormControl>
      <Flex align={'flex-start'} w={'100%'}>
        <Checkbox isChecked={isTermChecked} onChange={(e) => setIsTermChecked(e.target.checked)}>개인정보 제공에
          동의합니다.</Checkbox>
      </Flex>
      <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
      <Flex w={'100%'} justify={'space-between'}>
        <Button color={'var(--main-color)'} variant={'link'}
                onClick={() => setStep(prev => prev - 1)}>
          이전
        </Button>
        <Button color={'var(--main-color)'} variant={'link'} onClick={() => onSignUp()} isLoading={isPending}
                isDisabled={!canSignUp} size={'md'}>
          회원가입
        </Button>
      </Flex>
    </VStack>
  )
}
