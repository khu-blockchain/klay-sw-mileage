type registerSwMileage = {
  body: FormData;
}

type getSwMileageList = {
  query: {
    studentId?: string;
    status?: number;
  }
}

type getSwMileageById = {
  params: {swMileageId: number}
}

type getApproveSwMileageTokenData = {}

export type {
  registerSwMileage as registerSwMileageRequest,
  getSwMileageList as getSwMileageListRequest,
  getSwMileageById as getSwMileageByIdRequest,
  getApproveSwMileageTokenData as getApproveSwMileageTokenDataRequest
}
