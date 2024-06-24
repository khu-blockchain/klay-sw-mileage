import {SwMileage, SwMileageFile} from "@/store/types";

type registerSwMileage = {
  swMileage: SwMileage,
  swMileageFiles: Array<SwMileageFile>
}

type getSwMileageList = Array<SwMileage>


type getSwMileageById = SwMileage

export type {
  registerSwMileage as registerSwMileageResponse,
  getSwMileageList as getSwMileageListResponse,
  getSwMileageById as getSwMileageByIdResponse,
}
