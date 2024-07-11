import {Nullable, SwMileageToken} from "@/store/types";
import {create} from "zustand";
import Caver, {KIP7} from "caver-js";

interface SwMileageTokenState {
  swMileageToken: Nullable<SwMileageToken>
  kip7: Nullable<KIP7>,
  setSwMileageToken: (token: SwMileageToken) => void
  setKip7: (kip7: KIP7) => void;
  approveData: Nullable<{spenderAddress: string; approveAmount: string;}>
  setApproveData: (data: {spenderAddress: string; approveAmount: string;}) => void;

}

const useSwMileageTokenStore = create<SwMileageTokenState>((set) => ({
  swMileageToken: null,
  kip7: new Caver().kct.kip7.create(),
  setSwMileageToken: (swMileageToken: SwMileageToken) => set({swMileageToken}),
  setKip7: (kip7: KIP7) => set({kip7}),
  approveData: null,
  setApproveData: (approveData ) => set({approveData})
}))

export default useSwMileageTokenStore
