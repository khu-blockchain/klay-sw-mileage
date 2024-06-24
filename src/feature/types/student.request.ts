type signUp = {
  body: {
    studentId: string;
    password: string;
    passwordConfirm: string;
    name: string;
    email: string;
    phoneNumber: string;
    department: string;
    walletAddress: string;
    bankAccountNumber: string;
    bankCode: string;
    personalInformationConsentStatus: number
  }
}

type getStudentInfoById = {
  params: {studentId: string}
}

type updateStudentInfo = {
  params: {studentId: string};
  body: {
    bankAccountNumber?: string;
    bankCode?: string;
  }
}

export type {
  signUp as signUpRequest,
  getStudentInfoById as getStudentInfoByIdRequest,
  updateStudentInfo as updateStudentInfoRequest,

}
