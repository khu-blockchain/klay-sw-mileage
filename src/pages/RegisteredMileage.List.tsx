import React, {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {useGetSwMileageList} from "@/feature/queries/swMileage.queries";
import LoadingBox from "@/components/LoadingBox";
import {PaginationTable} from "@/components/Pagenation";
import {SwMileage} from "@/store/types";
import {Text} from '@chakra-ui/react';
import {parseToFormattedDate} from "@/utils/dayjs.utils";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import {reduceAddress} from "@/utils/web3.utils";
import StatusLabel from "@/components/StatusLabel";
import {useNavigate} from "react-router-dom";

const RegisteredMileageList = () => {

  const navigate = useNavigate();
  const [swMileageList, setSwMileageList] = useState<Array<SwMileage>>([])
  const {data, isFetching} = useGetSwMileageList({})

  useEffect(() => {
    if(data) {
      setSwMileageList(data)
    }
  }, [data])

  const header = [
    {
      key  : 'created_at',
      label: '신청 날짜'
    },
    {
      key  : 'academic_field',
      label: '활동 분야'
    },
    {
      key  : 'extracurricular_activity',
      label: '비교과 활동'
    },
    {
      key  : 'wallet_address',
      label: '등록 지갑'
    },
    {
      key  : 'status',
      label: '상태'
    }
  ]

  const tableData = (data: Array<SwMileage>) => {
    return data.map(swMileage => {
      return {
        id                      : swMileage.sw_mileage_id,
        created_at              : <Text>{parseToFormattedDate(swMileage.created_at)}</Text>,
        academic_field           : <Text>{ACTIVITY_CATEGORIES[swMileage.academic_field]}</Text>,
        extracurricular_activity: <Text>{swMileage.extracurricular_activity}</Text>,
        wallet_address          : <Text>{reduceAddress(swMileage.wallet_address)}</Text>,
        status                  : <StatusLabel status={swMileage.status}/>
      }
    })
  }

  const onClickRegisteredMileage = (mileageId: number) => {
    navigate(`${mileageId}`)
  }

  return (
    <Wrapper direction={'column'}>
      <FormWrapper title={'내 마일리지 신청 내역'}>
        {isFetching ?
          <LoadingBox height={'100px'}/> :
          <PaginationTable onClickRow={(data) => onClickRegisteredMileage(data.id)} headers={header} data={tableData(swMileageList)}/>
        }
      </FormWrapper>
    </Wrapper>
  );
};

export default RegisteredMileageList;
