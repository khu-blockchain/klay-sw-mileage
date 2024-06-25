import {useMutation, useQuery} from "@tanstack/react-query";
import {Mutation, Query} from "@/feature";
import {getSwMileageByIdRequest, registerSwMileageRequest} from "@/feature/types/swMileage.request";
import {
  getSwMileageByIdResponse,
  getSwMileageListResponse,
  registerSwMileageResponse
} from "@/feature/types/swMileage.response";
import {getSwMileageByIdAPI, getSwMileageListAPI, registerSwMileageAPI} from "@/feature/api/swMileage.api";
import {Empty} from "@/store/types";
import useStudentStore from "@/store/global/useStudentStore";

const useRegisterSwMileage: Mutation<registerSwMileageRequest, registerSwMileageResponse> = (args) => {
  const {onSuccessFn, onErrorFn} = args
  return useMutation({
    mutationFn: async(data) => {
      return await registerSwMileageAPI(data)
    },
    ...(onSuccessFn && {onSuccess: (res: registerSwMileageResponse) => onSuccessFn(res)}),
    ...(onErrorFn && {onError: (res) => onErrorFn(res)})
  })
}

const useGetSwMileageList: Query<Empty, getSwMileageListResponse> = (args) => {
  const  {getStudent} = useStudentStore(state => state)

  return useQuery({
    queryKey: ['get-sw-mileage-list'],
    queryFn: async() => await getSwMileageListAPI({
      query: {
        studentId: getStudent().student_id
      }
    }),
    initialData: [],
    enabled: getStudent().student_id !== ''
  })
}

const useGetSwMileageById: Query<getSwMileageByIdRequest, getSwMileageByIdResponse> = (args) => {
  return useQuery({
    queryKey: ['get-sw-mileage-by-id'],
    queryFn: async() => await getSwMileageByIdAPI(args),
    initialData: null,
    enabled: args.params.swMileageId !== null
  })
}


export {
  useRegisterSwMileage,
  useGetSwMileageList,
  useGetSwMileageById
}
