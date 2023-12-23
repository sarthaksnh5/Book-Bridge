import {booksURL} from '../constants/url_constants';
import {fetchHelper} from './fetchHelpers';

export const getBooks = async token => {
  var response = await fetchHelper(booksURL, {
    method: 'get',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response['error']) {
    return {error: true, message: response['errorMessage']};
  } else {
    return {error: false, message: response['message']};
  }
};

export const addBookController = async (
  token,
  registered_by,
  title,
  author,
  publication_year,
  grade,
  description,
) => {
  var response = await fetchHelper(booksURL, {
    method: 'post',
    body: JSON.stringify({
      registered_by,
      title,
      author,
      publication_year,
      grade,
      description,
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response['error']) {
    return {error: response['error'], message: response['errorMessage']};
  } else {
    return {error: response['error'], message: response['message']};
  }
};

export const getBookDetails = async (book_id, token) => {
  var response = await fetchHelper(`${booksURL}${book_id}`, {
    method: 'get',
    headers: {Authorization: `Bearer ${token}`},
  });

  if (response['error']) {
    return {error: response['error'], message: response['errorMessage']};
  } else {
    return {error: response['error'], message: response['message']};
  }
};

export const deleteSelectedBook = async (book_id, token) => {
  var response = await fetchHelper(`${booksURL}${book_id}`, {
    method: 'delete',
    headers: {Authorization: `Bearer ${token}`},
  });

  if (response['error']) {
    return {error: response['error'], message: response['errorMessage']};
  } else {
    return {error: response['error'], message: response['message']};
  }
};
