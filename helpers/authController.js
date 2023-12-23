import {
  changePasswordURL,
  loginURL,
  profileURL,
  registerURL,
} from '../constants/url_constants';
import {fetchHelper} from './fetchHelpers';

export const getLoginToken = async (email, password) => {
  var response = await fetchHelper(loginURL, {
    method: 'post',
    body: JSON.stringify({email, password}),
    headers: {'content-type': 'application/json'},
  });

  if (response['error']) {
    return {error: true, message: response['errorMessage']};
  } else {
    return {error: false, message: response['message']};
  }
};

export const registerUser = async (
  email,
  password,
  full_name,
  mobile_number,
  user_type,
) => {
  var response = await fetchHelper(registerURL, {
    method: 'post',
    body: JSON.stringify({
      email,
      password,
      full_name,
      mobile_number,
      user_type,
    }),
    headers: {'content-type': 'application/json'},
  });

  if (response['error']) {
    return {error: true, message: response['errorMessage']};
  } else {
    return {error: false, message: response['message']};
  }
};

export const getUserDetails = async userToken => {
  var response = await fetchHelper(profileURL, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response['error']) {
    return {error: true, message: response['errorMessage']};
  } else {
    return {error: false, message: response['message']};
  }
};

export const changePasswordController = async (
  token,
  old_password,
  new_password,
) => {
  var response = await fetchHelper(changePasswordURL, {
    method: 'put',
    body: JSON.stringify({
      old_password,
      new_password,
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    error: response['error'],
    message: response['error'] ? response['errorMessage'] : response['message'],
  };
};
