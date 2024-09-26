export interface UserData {
  addUserPets: (data) => any;
  updateUserPets: (data, id) => any;
  deleteUserPets: (id) => any;
  getUserPets: (id) => any;
  getCountries: () => any;
  getStates: (id) => any;
  getGenderPets: () => any;
  getProfiles: () => any;
}
