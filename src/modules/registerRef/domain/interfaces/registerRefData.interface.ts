export interface RegisterRefData {
  name: string;
  lastName: string;
  photoSelfie: string;
  photoDocumentFront: string;
  photoDocumentBack?: string;
  yearsExperience: number;
  sportsImplementation: object;
  dni: string;
  country: string;
  stateAddress: string;
  city: string;
  phone: string;
  address: string;
  gender: string;
  birthdate: string;
  email: string;
  password: string;
  postalCode: string;
  stateRegistry?: string;
  profile?: string;
  existRegister?: boolean;
  hasExperience: boolean;
  token?: string;
  emailVerified: boolean;
  topics?: {
    country: string;
    city: string;
    emailFormat: string;
    profile: string;
  };
}
