import React, {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {useParams} from "react-router-dom";
import {useGetSwMileageById} from "@/feature/queries/swMileage.queries";
import {Nullable, SwMileage} from "@/store/types";
import LoadingBox from "@/components/LoadingBox";
import {Button, Divider, Flex, Grid, ListItem, Text, UnorderedList} from "@chakra-ui/react";
import DataField from "@/components/DataField";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import StatusLabel from "@/components/StatusLabel";
import {downloadFile} from "@/utils/file.utils";

const RegisteredMileageDetail = () => {
  const {id} = useParams();
  const {activityFields} = useActivityFieldStore(state => state);
  const [swMileageDetail, setSwMileageDetail] = useState<Nullable<SwMileage>>(null)

  const {data, isFetching} = useGetSwMileageById({
    params: {
      swMileageId: Number(id)
    }
  })

  useEffect(() => {
    if(data) {
      setSwMileageDetail(data)
    }
  }, [data])

  return (
    <Wrapper direction={'column'}>
      <FormWrapper title={'내 마일리지 신청 내역 상세'}>
        {isFetching && <LoadingBox height={'100px'}/>}
        {(!isFetching && !swMileageDetail) &&
          <Flex direction={'column'} h={'300px'} w={'100%'} justify={'center'} align={'center'} gap={'10px'}>
            <Text fontSize={'24px'} fontWeight={600}>문제가 발생했습니다.</Text>
            <Text color={'var(--chakra-colors-gray-400)'}>잠시 후 다시 시도해주세요.</Text>
          </Flex>
        }
        {(!isFetching && swMileageDetail) &&
          <>
            <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(2, 1fr)'}>
              <DataField label={'승인 상태'}>
                <StatusLabel status={swMileageDetail.status}/>
              </DataField>
              <DataField label={'이름'}>
                <Text>{swMileageDetail.name}</Text>
              </DataField>
              <DataField label={'학번'}>
                <Text>{swMileageDetail.student_id}</Text>
              </DataField>
              <DataField label={'학과'}>
                <Text>{swMileageDetail.department}</Text>
              </DataField>
              <DataField label={'전화번호'}>
                <Text>{swMileageDetail.phone_number}</Text>
              </DataField>
              <DataField label={'이메일'}>
                <Text>{swMileageDetail.email}</Text>
              </DataField>
              <DataField label={'지갑 주소'}>
                <Text>{swMileageDetail.wallet_address}</Text>
              </DataField>
            </Grid>
            {activityFields &&
              <>
                <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
                <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(1, 1fr)'}>
                  <DataField label={'활동 분야'}>
                    <Text>{ACTIVITY_CATEGORIES[swMileageDetail.academic_field]}</Text>
                  </DataField>
                  <DataField label={'바교과 활동'}>
                    <Text>{swMileageDetail.extracurricular_activity}</Text>
                  </DataField>
                  {swMileageDetail.extracurricular_activity_classification &&
                    <DataField label={'비교과 구분'}>
                      <Text>{swMileageDetail.extracurricular_activity_classification}</Text>
                    </DataField>
                  }
                  <DataField label={'활동 내용'}>
                    <Text>{swMileageDetail.content}</Text>
                  </DataField>
                  {swMileageDetail.sw_mileage_files.length !== 0 &&
                    <DataField label={'제출 파일'}>
                      <UnorderedList>
                        {swMileageDetail.sw_mileage_files.map(el =>
                          <ListItem >
                            <Button onClick={() => downloadFile(el.url, el.name)} variant={'link'} colorScheme={'facebook'}>
                              {el.name}
                            </Button>
                          </ListItem>
                        )}
                      </UnorderedList>
                    </DataField>
                  }
                </Grid>
              </>
            }
          </>

        }
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisteredMileageDetail;
