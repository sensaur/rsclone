const { REACT_APP_HOST: host } = process.env;

const signIn = () => `${host}/api/v1/auth/signin`;

const signUp = () => `${host}/api/v1/auth/signup`;

const editUser = () => `${host}/api/v1/users/`;

const getAllCards = () => `${host}/api/v1/cards/`;

export {
  signIn, signUp, editUser, getAllCards,
};
