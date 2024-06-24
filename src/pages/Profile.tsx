import React, {useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormControlProps,
  Grid,
  HStack,
  Text,
  useToast
} from "@chakra-ui/react";
import BasicInput from "@/components/atom/BasicInput";
import FormWrapper from "@/components/FormWrapper";
import useStudentStore from "@/store/global/useStudentStore";
import {BANK_CODE} from "@/assets/constants/bankCode.data";
import BasicSelect from "@/components/atom/BasicSelect";
import {useUpdateStudentInfo} from "@/feature/queries/student.queries";
import useIsAble from "@/hooks/useAble";
import {caver} from "@/App";
import BasicButton from "@/components/atom/BasicButton";

const Profile = () => {
  const toast = useToast();
  const {getStudent, setStudentInfo} = useStudentStore(state => state);

  const [bankCode, setBankCode] = useState(() => getStudent().bank_code)
  const [accountNumber, setAccountNumber] = useState(() => getStudent().bank_account_number)

  const isAble = useIsAble([
    bankCode !== '',
    accountNumber !== ''
  ])

  const {mutate} = useUpdateStudentInfo({
    onSuccessFn: (data) => {
      toast({
        title      : `회원 정보가 수정되었습니다.`,
        status     : 'success',
        isClosable : true,
        position   : "top",
      })
      setStudentInfo(data);
      setIsEditable(false)
    },
    onErrorFn: (error: any) => toast({
      title      : `${error.response.data.code}:: 문제가 발생했습니다.`,
      description: '잠시 후 다시 시도해주세요.',
      status     : 'error',
      isClosable : true,
      position   : "top",
    })
  })

  const [isEditable, setIsEditable] = useState(false)

  const updateStudentInfo = async() => {
    await mutate({
      params: {studentId: getStudent().student_id},
      body: {
        ...(bankCode && {bankCode}),
        ...(accountNumber && {bankAccountNumber: accountNumber}),
      }
    })
  }

  return (
    <Wrapper>
      <LVStack w={'100%'}>
        <FormWrapper
          title={'기본 정보'}
          description={'기본 정보는 수정이 불가능합니다.'}
        >
          <Grid gap={'24px'} w={'100%'} templateColumns={'repeat(1, 1fr)'}>
            <WithRowLabel label={'이름'}>
              {getStudent().name}
            </WithRowLabel>
            <WithRowLabel label={'학번'}>
              {getStudent().student_id}
            </WithRowLabel>
            <WithRowLabel label={'소속 학과'}>
              {getStudent().department}
            </WithRowLabel>
            <WithRowLabel label={'이메일'}>
              {getStudent().email}
            </WithRowLabel>

          </Grid>
        </FormWrapper>
        <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
        <FormWrapper
          title={'Klaytn 지갑 및 계좌 정보'}
          description={'수정하기 버튼을 눌러 계좌 정보를 수정할 수 있습니다.'}
        >
          {!isEditable ?
            <>
              <Grid gap={'24px'} w={'100%'} templateColumns={'repeat(1, 1fr)'}>
                <WithRowLabel label={'Klaytn 지갑 주소'}>
                  {getStudent().wallet_address}
                </WithRowLabel>
                <WithRowLabel label={'계좌 은행'}>
                  {BANK_CODE[getStudent().bank_code] ?? '-'}
                </WithRowLabel>
                <WithRowLabel label={'계좌 번호'}>
                  {getStudent().bank_account_number}
                </WithRowLabel>

              </Grid>
              <Flex w={'100%'} justify={'flex-end'}>
                <BasicButton onClick={() => setIsEditable(true)}>수정</BasicButton>
              </Flex>
            </> :
            <>
              <Grid gap={'24px'} w={'100%'} templateColumns={'repeat(1, 1fr)'}>
                <WithRowLabel label={'Klaytn 지갑 주소'}>
                  {getStudent().wallet_address}
                </WithRowLabel>
                <WithRowLabel label={'계좌 은행'}>
                  <BasicSelect w={'200px'} value={bankCode} placeholder='은행 선택'
                               onChange={(e) => setBankCode(e.target.value)}>
                    {Object.keys(BANK_CODE).map((el: string) => (
                      <option value={el}>{BANK_CODE[el]}</option>
                    ))}
                  </BasicSelect>
                </WithRowLabel>
                <WithRowLabel label={'계좌 번호'}>
                  <BasicInput w={'500px'} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}/>
                </WithRowLabel>

              </Grid>
              <Flex w={'100%'} justify={'flex-end'} gap={'10px'}>
                <Button onClick={() => setIsEditable(false)}>취소</Button>
                <BasicButton isDisabled={!isAble} onClick={() => updateStudentInfo()}>저장</BasicButton>
              </Flex>

            </>
          }
        </FormWrapper>
      </LVStack>
    </Wrapper>
  );
};

export default Profile;

const WithRowLabel = (props: FormControlProps & {label: string}) => {
  const {label, ...formControlProps} = props;
  return (
    <FormControl {...formControlProps}>
      <HStack spacing={'16px'}>
        <Text fontWeight={500} w={'120px'}>{label}</Text>
        <Flex flex={1}>
          {formControlProps.children}
        </Flex>
      </HStack>
    </FormControl>
  )
}
