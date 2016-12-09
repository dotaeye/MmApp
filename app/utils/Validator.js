export function validPhone(number) {
  return /(^(13\d|15[^4\D]|17[13678]|18\d)\d{8}|170[^346\D]\d{7})$/.test(number);
}

export function validPassword(password) {
  return password.length >= 6 && password.length <= 16
}

export function getValidErrorMessage(err) {
  if (!err) {
    return null;
  }
  return err[Object.keys(err)[0]].errors[0].message;
}