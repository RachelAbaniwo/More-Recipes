export const checkEmail = (email) => {
  const check = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  check.test(email);
};
