type SwMileage = {
  sw_mileage_id: number;
  student_id: string;
  name: string;
  department: string;
  phone_number: string;
  email: string;
  wallet_address: string;
  content: string;
  academic_field: string;
  extracurricular_activity: string;
  extracurricular_activity_classification?: string;
  status: number // 1: 생성, 2: 승인, 3: 반려
  created_at: string;
  updated_at: string;
  comment: string;
  sw_mileage_files: Array<SwMileageFile>
}

type SwMileageFile = {
  sw_mileage_file_id: number;
  sw_mileage_id: number;
  name: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export type {
  SwMileage,
  SwMileageFile
}
