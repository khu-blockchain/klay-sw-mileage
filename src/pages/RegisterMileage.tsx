import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Divider,
  Flex,
  FormControl,
  Grid,
  HStack,
  Text,
  useToast
} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";
import useStudentStore from "@/store/global/useStudentStore";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";
import LoadingBox from "@/components/LoadingBox";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import BasicTextarea from "@/components/atom/BasicTextarea";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import {caver, provider} from "@/App";
import BasicInput from "@/components/atom/BasicInput";
import WithLabel from "@/components/WithLabel";
import {useDropzone} from "react-dropzone";
import {CloudUpload, X} from 'lucide-react';
import {MINIMUM_ALLOWANCE_AMOUNT} from "@/assets/constants/config.data";
import useIsAble from "@/hooks/useAble";
import FormWrapper from "@/components/FormWrapper";
import {useApproval} from "@/feature/queries/swMileageTokens.queries";
import {useRegisterSwMileage} from "@/feature/queries/swMileage.queries";
import BasicSelect from "@/components/atom/BasicSelect";
import BasicButton from "@/components/atom/BasicButton";
import {useNavigate} from "react-router-dom";

const RegisterMileage = () => {
  const {getStudent} = useStudentStore(state => state);
  const {activityFields, getActivityCategories} = useActivityFieldStore(state => state);
  const {kip7, swMileageToken, approveData} = useSwMileageTokenStore(state => state);

  const toast = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [extracurricularActivity, setExtracurricularActivity] = useState<string>('')
  const [extracurricularActivityClassification, setExtracurricularActivityClassification] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [files, setFiles] = useState<Array<File | null>>([null])
  const [isNeedToApproval, setIsNeedToApproval] = useState(false)

  const isAble = useIsAble([
    selectedCategory !== '',
    extracurricularActivity !== '',
    content !== ''
  ])

  const {mutate: approvalMutate, isPending: approvalPending} = useApproval({
    onSuccessFn: async (data) => {
      await checkAllowance()
    },
    onErrorFn  : (error: any) => toast({
      title      : `${error.response.data.code}:: 문제가 발생했습니다.`,
      description: 'Kaia에서 요청한 트랜잭션을 취소하고 다시 권한 등록을 진행해주세요.',
      status     : 'error',
      isClosable : true,
      position   : "top",
    })
  })

  const {mutate: registerSwMileageMutate, isPending} = useRegisterSwMileage({
    onSuccessFn: async (data) => {
      toast({
        title      : `SW 마일리지 신청이 제출되었습니다.`,
        status     : 'success',
        isClosable : true,
        position   : "top",
      })
      navigate('/list')
    },
    onErrorFn  : (error: any) => toast({
      title      : `${error.response.data.code}:: 문제가 발생했습니다.`,
      description: 'Kaia에서 요청한 트랜잭션을 취소하고 다시 권한 등록을 진행해주세요.',
      status     : 'error',
      isClosable : true,
      position   : "top",
    })
  })

  const leafField = (object: any) => {
    if(!object || object.hasOwnProperty('default') || object.hasOwnProperty('description') || object.hasOwnProperty('optional')) {
      return []
    }
    return Object.keys(object)
  }

  //length가 0이 아닌데 선택한게 없을 경우 예외처리

  const checkAllowance = async () => {
    if(!kip7?._address || !approveData?.spenderAddress) {
      return;
    }
    try {
      const result = await kip7.allowance(getStudent().wallet_address, approveData.spenderAddress);
      console.log(Number(caver.utils.convertFromPeb(result, 'KLAY')));
      // allowance 최소 기준값 10000000
      if(Number(caver.utils.convertFromPeb(result, 'KLAY')) < MINIMUM_ALLOWANCE_AMOUNT) {
        setIsNeedToApproval(true)
        return;
      }
      setIsNeedToApproval(false)
    } catch (e) {
      console.log(e)
    }
  }

  const signApproval = async () => {
    if(!kip7?._address || !swMileageToken || !approveData) return;
    const estimateGas = await kip7.methods.approve(approveData.spenderAddress, approveData.approveAmount).estimateGas({from: getStudent().wallet_address})
    const encodeApproveData = kip7.methods.approve(approveData.spenderAddress, approveData.approveAmount).encodeABI()

    try {
      const {rawTransaction} = await provider.request({
        method: 'klay_signTransaction',
        params: [{
          type : 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from : getStudent().wallet_address,
          to   : swMileageToken.contract_address,
          gas  : caver.utils.toHex(estimateGas * 2),
          value: '0',
          data : encodeApproveData,
        }]
      })
      console.log(rawTransaction)
      await approvalMutate({
        params: {swMileageTokenId: swMileageToken.sw_mileage_token_id},
        body  : {
          studentId     : getStudent().student_id,
          rawTransaction: rawTransaction
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const registerSwMileage = async () => {
    if(!activityFields) {
      return;
    }
    if(leafField(activityFields[selectedCategory][extracurricularActivity]).length !== 0 && !extracurricularActivityClassification) {
      toast({
        title     : `비교과 활동 구분을 선택해주세요.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      return;
    }
    let formData = new FormData();
    formData.append('studentId', getStudent().student_id);
    formData.append('name', getStudent().name);
    formData.append('department', getStudent().department);
    formData.append('phoneNumber', getStudent().phone_number);
    formData.append('email', getStudent().email);
    formData.append('walletAddress', getStudent().wallet_address);
    formData.append('content', content);
    formData.append('academicField', selectedCategory);
    formData.append('extracurricularActivity', extracurricularActivity);
    if(extracurricularActivityClassification) {
      formData.append('extracurricularActivityClassification', extracurricularActivityClassification);
    }
    const reduceFiles = files.filter(el => !!el) as Array<File>;
    reduceFiles.forEach((el, index) => {
      formData.append(`file${index + 1}`, el);
    })

    await registerSwMileageMutate({
      body: formData
    })


  }

  useEffect(() => {
    checkAllowance()
  }, [kip7?._address])

  useEffect(() => {
    setExtracurricularActivityClassification('')
  }, [extracurricularActivity])

  useEffect(() => {
    setExtracurricularActivity('')
  }, [selectedCategory])

  return (
    <LVStack w={'100%'} spacing={'20px'}>
      {isNeedToApproval ?
        <Alert alignItems={'flex-start'} status='warning' borderRadius={'8px'}>
          <AlertIcon/>
          <HStack w={'100%'} justify={'space-between'}>
            <LVStack spacing={'2px'}>
              <AlertTitle>관리자 권한 등록이 필요한 계정입니다.</AlertTitle>
              <AlertDescription whiteSpace={'pre-wrap'}>
                {'하단의 "권한 등록하기" 버튼을 클릭하여 권한 등록 절차를 진행해 주세요.\n' +
                  '만일 권한을 등록했음에도 해당 안내 문구가 지속적으로 보일 경우, 권한 부여 트랜잭션이 처리될 때 까지 잠시만 기다려주세요.\n' +
                  '우측 "갱신하기" 버튼을 눌러 권한 등록 상태를 갱신할 수 있습니다.'}
              </AlertDescription>
            </LVStack>
            <Button onClick={() => checkAllowance()} fontSize={'14px'} colorScheme={'orange'} variant={'link'}>갱신하기</Button>
          </HStack>
        </Alert> :
        <Alert status='success' borderRadius={'8px'}>
          <AlertIcon/>
          <AlertTitle>관리자 권한 등록이 완료된 계정입니다.</AlertTitle>
        </Alert>
      }
      <Wrapper direction={'column'}>
        <LVStack w={'100%'}>
          <FormWrapper
            title={'기본 정보'}
            description={'신청 상 오류를 줄이기 위해 기본 정보는 회원가입 정보를 바탕으로 기입됩니다.\n잘못 기입된 항목이 존재할 경우 "내 정보" 에서 수정해주세요.'}
          >
            <Grid gap={'16px'} w={'100%'} templateColumns={'repeat(3, 1fr)'}>
              <WithLabel label={'이름'}>
                <BasicInput isDisabled={true} value={getStudent().name}/>
              </WithLabel>
              <WithLabel label={'학번'}>
                <BasicInput isDisabled={true} value={getStudent().student_id}/>
              </WithLabel>
              <WithLabel label={'소속 학과'}>
                <BasicInput isDisabled={true} value={getStudent().department}/>
              </WithLabel>
              <WithLabel label={'이메일'}>
                <BasicInput isDisabled={true} value={getStudent().email}/>
              </WithLabel>
              <WithLabel label={'Klaytn 지갑 주소'}>
                <BasicInput fontSize={'12px'} isDisabled={true} value={getStudent().wallet_address ?? '-'}/>
              </WithLabel>
            </Grid>
          </FormWrapper>
          <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
          <FormWrapper title={'활동 정보'} description={'활동 분야 및 내용을 입력해 주세요.'}>
            {
              !activityFields ?
                <LoadingBox height={'400px'}/> :
                <LVStack w={'100%'} spacing={'20px'}>
                  <HStack w={'100%'} spacing={'20px'}>
                    <WithLabel w={'300px'} label={'활동 분야'}>
                      <BasicSelect value={selectedCategory} placeholder='활동 선택'
                                   onChange={(e) => setSelectedCategory(e.target.value)}>
                        {getActivityCategories().map((el: string) => (
                          <option key={el} value={el}>{ACTIVITY_CATEGORIES[el]}</option>
                        ))}
                      </BasicSelect>
                    </WithLabel>
                    <WithLabel label={'비교과 활동'}>
                      <HStack>
                        <BasicSelect isDisabled={!selectedCategory}
                                     value={extracurricularActivity}
                                     onChange={(e) => setExtracurricularActivity(e.target.value)}
                                     placeholder='비교과 활동 선택'>
                          {selectedCategory ? Object.keys(activityFields[selectedCategory]).map((el: string) => (
                            <option key={el} value={el}>{el}</option>
                          )) : []}
                        </BasicSelect>
                        <BasicSelect isDisabled={!extracurricularActivity}
                                     value={extracurricularActivityClassification}
                                     onChange={(e) => setExtracurricularActivityClassification(e.target.value)}
                                     placeholder='비교과 활동 구분 선택'>
                          {(selectedCategory && extracurricularActivity) ? leafField(activityFields[selectedCategory][extracurricularActivity]).map((el: string) => (
                            <option key={el} value={el}>{el}</option>
                          )) : []}
                        </BasicSelect>
                      </HStack>
                    </WithLabel>
                  </HStack>
                  <WithLabel label={'활동 내용'}>
                    <BasicTextarea value={content}
                                   onChange={(e) => setContent(e.target.value)}
                                   height={'200px'}
                                   resize={'none'}
                                   placeholder='날짜, 시간, 활동명/논문 제목/업체명 등, 논문의 경우 주저자/공동저자 표시 필수'/>
                  </WithLabel>

                  <FormControl w={'100%'}>
                    <HStack w={'100%'} align={'center'} justify={'space-between'} mb={'8px'}>
                      <Text fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>활동 증명</Text>
                      <Button onClick={() => setFiles(prev => prev.concat(null))} variant={'link'} fontSize={'14px'}
                              color={'var(--main-color)'}>파일 추가</Button>
                    </HStack>
                    <LVStack w={'100%'}>
                      {files.map((el, index) => <FileContainer key={index} files={files} setFiles={setFiles}
                                                               index={index}/>)}
                    </LVStack>
                  </FormControl>
                </LVStack>
            }
          </FormWrapper>
          <Flex p={'32px'} w={'100%'} justify={'flex-end'} gap={'10px'}>
            {isNeedToApproval ?
              <BasicButton isLoading={approvalPending} onClick={() => signApproval()}>
                권한 등록하기
              </BasicButton> :
              <BasicButton isLoading={isPending} isDisabled={!isAble} onClick={() => registerSwMileage()}>
                신청하기
              </BasicButton>
            }
          </Flex>
        </LVStack>
      </Wrapper>
    </LVStack>

  );
};

export default RegisterMileage;

type FileContainerProps = {
  index: number,
  setFiles: Dispatch<SetStateAction<Array<File | null>>>
  files: Array<File | null>
}

const FileContainer = (props: FileContainerProps) => {
  const {index, setFiles, files} = props;
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    onDrop  : acceptedFiles => {
      const file = acceptedFiles[0]
      setFiles(prev => prev.map((el, idx) => {
        if(index === idx) return file;
        else return el;
      }))
    }
  });

  const deleteFile = () => {
    setFiles(prev => prev.filter((el, idx) => idx !== index))
  }

  return (
    <HStack overflow={'hidden'} w={'100%'} borderRadius={'8px'} justify={'space-between'}
            spacing={'20px'}
            border={'1px solid var(--chakra-colors-gray-300)'}>
      <HStack flex={1} {...getRootProps({className: 'dropzone'})} cursor={'pointer'}>
        <Flex bgColor={'var(--chakra-colors-gray-100)'} justify={'center'} align={'center'} p={'8px'}>
          <CloudUpload color={'var(--chakra-colors-gray-400)'} size={'20px'}/>
        </Flex>
        <Flex>
          <input {...getInputProps()} />
          {files[index] &&
            <Text fontSize={'14px'} color={'var(--chakra-colors-gray-500)'}>{files[index]?.name ?? '-'}</Text>}
          {!files[index] &&
            <Text fontSize={'14px'} color={'var(--chakra-colors-gray-500)'}>이곳을 클릭하거나 파일을 드래그하여 업로드 하세요</Text>}
        </Flex>
      </HStack>
      <Flex justify={'center'} align={'center'} p={'8px'}>
        <X onClick={() => deleteFile()} cursor={'pointer'} color={'var(--chakra-colors-gray-400)'} size={'16px'}/>
      </Flex>
    </HStack>
  )
}


