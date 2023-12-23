import {chatURL} from '../constants/url_constants';
import {fetchHelper} from './fetchHelpers';

export const initializeChatController = async (
  token,
  user1,
  user2,
  chat_title,
  book_id,
) => {
  var response = await fetchHelper(chatURL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user1,
      user2,
      chat_title,
      book_id,
    }),
  });

  return {
    error: response['error'],
    message: response['error'] ? response['errorMessage'] : response['message'],
  };
};
