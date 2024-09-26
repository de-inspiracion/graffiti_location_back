export interface PostDataI {
  register: (data) => any;
  getRegister: (id) => any;
  existsRegister: (dni, email) => any;
}
