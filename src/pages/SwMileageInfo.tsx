import React, {useEffect, useState} from 'react';
import {
  UnorderedList,
  ListItem,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Flex,
  HStack,
  Grid,
  Text,
  Button, Divider, Badge, useToast
} from '@chakra-ui/react';
import FormWrapper from "@/components/FormWrapper";
import Wrapper from "@/components/Wrapper";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import LVStack from "@/components/atom/LVStack";
import TokenImage from '@/components/atom/TokenImage';
import DataField from '@/components/DataField';
import useStudentStore from "@/store/global/useStudentStore";
import {caver} from "@/App";
import CopyToClipboard from 'react-copy-to-clipboard';


const SwMileageInfo = () => {
  const toast = useToast()
  const {swMileageToken, kip7} = useSwMileageTokenStore(state => state)
  const {getStudent} = useStudentStore(state => state)

  const [myMileageBalance, setMyMileageBalance] = useState<number>(0)

  const getMyMileageBalance = async () => {
    if(!kip7 || !swMileageToken) return;
    const result = await kip7.balanceOf(getStudent().wallet_address)
    setMyMileageBalance(Number(caver.utils.convertFromPeb(result, 'KLAY')))
  }

  const onCopyCA = () => {
    return toast({
      title     : `컨트랙트 주소가 복사되었습니다.`,
      status    : 'success',
      isClosable: true,
      position  : "top",
    })
  }

  useEffect(() => {
    getMyMileageBalance()
  }, [kip7, swMileageToken])

  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'SW Mileage 토큰'}
        description={`현재 사용중인 SW Mileage 토큰과 내 마일리지 점수( 마일리지 토큰 보유 수량 )입니다.`}
      >
        {!swMileageToken ?
          <Flex>
            활성화 상태인 토큰이 존재하지 않습니다.
          </Flex> :
          <LVStack w={'100%'} spacing={'30px'}>
            <HStack align={'center'} spacing={'10px'}>
              <Badge fontSize={'16px'} padding={'6px 10px'} borderRadius={'4px'} colorScheme='blue'>내 마일리지</Badge>
              <Text fontSize={'20px'}
                    fontWeight={600}>{myMileageBalance.toLocaleString()}점</Text>
            </HStack>
            <HStack align={'center'} spacing={'10px'}>
              <TokenImage
                src={swMileageToken.sw_mileage_token_image_url}
                p={'6px'}
                w={'60px'}
                h={'60px'}
              />
              <Text color={'var(--chakra-colors-gray-500)'} fontSize={'20px'}
                    fontWeight={600}>{swMileageToken.sw_mileage_token_symbol}</Text>
            </HStack>

            <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} rowGap={'30px'} columnGap={'40px'}>
              <DataField label={'이름'}>
                <Text>{swMileageToken.sw_mileage_token_name}</Text>
              </DataField>
              <DataField label={'설명'}>
                <Text w={'360px'} whiteSpace={'pre-wrap'}>{swMileageToken.description}</Text>
              </DataField>
              <DataField label={'컨트랙트 주소'}>
                <CopyToClipboard text={swMileageToken.contract_address} onCopy={() => onCopyCA()}>
                  <Button variant={'link'} colorScheme={'facebook'}>{swMileageToken.contract_address}</Button>
                </CopyToClipboard>,
              </DataField>
            </Grid>
          </LVStack>
        }
      </FormWrapper>
      <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
      <FormWrapper title={'마일리지 제도'}>
        <UnorderedList spacing={'6px'}>
          <ListItem>다양한 전공관련 비교과 활동 참여 독려를 위해 활동별 마일리지 점수를 부여</ListItem>
          <ListItem>매년 마일리지 점수에 따른 혜택 제공</ListItem>
          <ListItem>해외인턴십 및 해외교육 등 프로그램에 우선 선발 장학금/인센티브 제공</ListItem>
        </UnorderedList>
      </FormWrapper>
      <FormWrapper title={'마일리지 취득 배점에 따라 등급별 장학금 지급'}>
        <ScholarshipTable/>
      </FormWrapper>
      <FormWrapper title={'SW 마일리지 배점표'}>
        <UnorderedList spacing={'6px'}>
          <ListItem>사업단에서 운영한 프로그램에서 입상하여 상금을 수상한 학생들에게는 마일리지 점수를 부여하지 않는다.</ListItem>
          <ListItem>사업단에서 운영한 프로그램이 아니더라도, 같은 내용으로 타 행사에 참여하여 수상한 경우 마일리지 점수를 부여하지 않는다.</ListItem>
        </UnorderedList>
        <MileageScoreTable/>
      </FormWrapper>
    </Wrapper>
  )
};

export default SwMileageInfo;

const ScholarshipTable = () => {
  return (
    <Table variant={'info'}>
      <Thead>
        <Tr>
          <Th>구분</Th>
          <Th>지급기준</Th>
          <Th>장학금</Th>
          <Th>비고</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>1등급</Td>
          <Td>마일리지 취득 상위 10%</Td>
          <Td>100만원</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td>2등급</Td>
          <Td>마일리지 취득 상위 30%</Td>
          <Td>70만원</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td>3등급</Td>
          <Td>마일리지 취득 상위 50%</Td>
          <Td>50만원</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td>4등급</Td>
          <Td>마일리지 취득 상위 70%</Td>
          <Td>30만원</Td>
          <Td></Td>
        </Tr>
        <Tr>
          <Td>5등급</Td>
          <Td>마일리지 100점 이상 취득자 전원 </Td>
          <Td>20만원</Td>
          <Td>상위등급과 중복 배제</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

const MileageScoreTable = () => {
  return (
    <Table variant={'info'}>
      <Thead>
        <Tr>
          <Th>분야</Th>
          <Th colSpan={2}>비교과활동</Th>
          <Th>배점</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td rowSpan={13}>학술분야</Td>
          <Td rowSpan={2} whiteSpace={'pre-wrap'}>{`국내 학술회의 논문 발표\n(사사문구 필요)`}</Td>
          <Td>주저자 (100%)</Td>
          <Td>50</Td>
        </Tr>
        <Tr>
          <Td>공동저자 (50%)</Td>
          <Td>25</Td>
        </Tr>
        <Tr>
          <Td rowSpan={2} whiteSpace={'pre-wrap'}>{`내 학술지 논문 게재\n(사사문구 필요)`}</Td>
          <Td>주저자 (100%)</Td>
          <Td>100</Td>
        </Tr>
        <Tr>
          <Td>공동저자 (70%)</Td>
          <Td>70</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>오픈소스 코드기여 (기여도에 다른 차등지급)</Td>
          <Td>최대 200</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>교내 경진대회 및 공모전 수상 (운영위원회)</Td>
          <Td>최대 100</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>교외 경진대회 및 공모전 수상 (운영위원회)</Td>
          <Td>최대 200</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>교내 행사 기획 및 운영</Td>
          <Td>최대 100</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>국내 특허 출원 (사사문구 필요)</Td>
          <Td>150</Td>
        </Tr>
        <Tr>
          <Td rowSpan={4} whiteSpace={'pre-wrap'}>{`SW중심대학 사업단\n진행행사 참여`}</Td>
          <Td whiteSpace={'pre-wrap'}>{`SW페스티벌, Khuthon, Starup Dream2.0,\n학생회 주관 공모 행사 참여 (수상자 제외)`}</Td>
          <Td>20</Td>
        </Tr>
        <Tr>
          <Td whiteSpace={'pre-wrap'}>{`IITP 교육만족도 설문 및\n전공/기초/융합 교육 만족도 설문조사 등 참가`}</Td>
          <Td>20</Td>
        </Tr>
        <Tr>
          <Td whiteSpace={'pre-wrap'}>{`IITP 행사 참가\n(SW인재 페스티벌, 공동 해커톤, AI경진대회 등)`}</Td>
          <Td>50</Td>
        </Tr>
        <Tr>
          <Td whiteSpace={'pre-wrap'}>{`IITP, 협의회 및 타대학과의\n공동추진 행사 참관(1건당)\n(사업단에서 사전홍보된 행사에 한함)`}</Td>
          <Td>50</Td>
        </Tr>
        <Tr>
          <Td rowSpan={6}>국제분야</Td>
          <Td rowSpan={2} whiteSpace={'pre-wrap'}>{`국외 학술회의 논문 발표\n(사사문구 필요)`}</Td>
          <Td>주저자 (100%)</Td>
          <Td>100</Td>
        </Tr>
        <Tr>
          <Td>공동저자 (70%)</Td>
          <Td>70</Td>
        </Tr>
        <Tr>
          <Td rowSpan={2} whiteSpace={'pre-wrap'}>{`국외 학술지 논문 게제\n(사사문구 필요)`}</Td>
          <Td>주저자 (100%)</Td>
          <Td>250</Td>
        </Tr>
        <Tr>
          <Td>공동저자 (70%)</Td>
          <Td>175</Td>
        </Tr>
        <Tr>
          <Td rowSpan={2}>영어 봉사활동 실적</Td>
          <Td>해외 IT 봉사단 등</Td>
          <Td>100</Td>
        </Tr>
        <Tr>
          <Td>국내 봉사활동 등</Td>
          <Td>50</Td>
        </Tr>
        <Tr>
          <Td rowSpan={3}>창업분야</Td>
          <Td colSpan={2}>전공 관련 창업 (사업자등록증 제출)</Td>
          <Td>250</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>창업 공모전 수상</Td>
          <Td>150</Td>
        </Tr>
        <Tr>
          <Td colSpan={2} whiteSpace={'pre-wrap'}>{`앱스토어 소프트웨어 등록\n(단위점수:1점)`}</Td>
          <Td whiteSpace={'pre-wrap'}>{`다운로드 수\n*단위점수\n(최대 250)`}</Td>
        </Tr>
        <Tr>
          <Td rowSpan={4}>봉사분야</Td>
          <Td rowSpan={3}>SW 아너십</Td>
          <Td>강의(1회차 1시간 이상)</Td>
          <Td whiteSpace={'pre-wrap'}>{`50\n(2회차부터는 10)`}</Td>
        </Tr>
        <Tr>
          <Td>멘토보고서 (건당)</Td>
          <Td>15</Td>
        </Tr>
        <Tr>
          <Td>그 외 활동 (건당)</Td>
          <Td>10</Td>
        </Tr>
        <Tr>
          <Td>SW 나눔봉사단</Td>
          <Td>학기당</Td>
          <Td>10</Td>
        </Tr>
        <Tr>
          <Td rowSpan={2}>기타활동</Td>
          <Td rowSpan={2}>사업단장 인정 기타활동</Td>
          <Td whiteSpace={'pre-wrap'}>{`사업단 주관 프로그램 참가\n(특별 프로그램에 한함)`}</Td>
          <Td rowSpan={2}>별도 책정</Td>
        </Tr>
        <Tr>
          <Td>기타</Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
