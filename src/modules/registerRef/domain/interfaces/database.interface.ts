export interface DataBaseI {
  addRegister?: (data) => any;
  deleteRegister?: (id: string) => any;
  getRegister?: (state: string) => any;
  updateStateRegister?: (id: string, state: string) => any;
  getTest?: () => any;
  findRegister: (data: existRegister) => any;
  verifyEmailRegistry?: (token: string) => any;
  updateRegisterVerifyEmail?: (id: string) => any;
  getRegistersQuery?: (query: any) => any;
  findAndDeleteRegister?: (id: any) => any;
}

interface existRegister {
  dni?: string;
  email?: string;
}
