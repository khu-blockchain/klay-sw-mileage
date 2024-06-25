import {SwMileage, SwMileageFile} from "@/store/types";

type registerSwMileage = {
  swMileage: SwMileage,
  swMileageFiles: Array<SwMileageFile>
}

type getSwMileageList = Array<SwMileage>


type getSwMileageById = SwMileage

type getApproveSwMileageTokenData = {
  spenderAddress: string;
  approveAmount: number;
}

export type {
  registerSwMileage as registerSwMileageResponse,
  getSwMileageList as getSwMileageListResponse,
  getSwMileageById as getSwMileageByIdResponse,
  getApproveSwMileageTokenData as getApproveSwMileageTokenDataResponse,
}
