import {SwMileageServer, SwMileageTokenServer} from "@/feature/serverInstance";
import {API} from "@/feature";
import {approveSwMileageTokenRequest, getSwMileageTokenListRequest} from "@/feature/types/swMileageTokens.request";
import {approveSwMileageTokenResponse, getSwMileageTokenListResponse} from "@/feature/types/swMileageTokens.response";
import {getApproveSwMileageTokenDataRequest} from "@/feature/types/swMileage.request";
import {getApproveSwMileageTokenDataResponse} from "@/feature/types/swMileage.response";

const getSwMileageTokenList: API<getSwMileageTokenListRequest, getSwMileageTokenListResponse> = async() => {
  try{
    const result = await SwMileageTokenServer.get('')
    return result.data;
  }catch (e) {
    throw e
  }
}

const approveSwMileageToken: API<approveSwMileageTokenRequest, approveSwMileageTokenResponse> = async(request) => {
  try{
    const result = await SwMileageTokenServer.post(`/${request.params.swMileageTokenId}/approve`, request.body)
    return result.data;
  }catch (e) {
    throw e
  }
}

const getApproveSwMileageTokenData: API<getApproveSwMileageTokenDataRequest, getApproveSwMileageTokenDataResponse> = async (request) => {
  try {
    const result = await SwMileageTokenServer.get(`approve/data`)
    return result.data;
  } catch (e) {
    throw e
  }
}


export {
  getSwMileageTokenList as getSwMileageTokenListAPI,
  approveSwMileageToken as approveSwMileageTokenAPI,
  getApproveSwMileageTokenData as getApproveSwMileageTokenDataAPI
}

