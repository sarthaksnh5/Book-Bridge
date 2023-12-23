export const fetchHelper = async (url, options) => {
  var data = {
    error: false,
    errorMessage: '',
    message: '',
  };

  try {
    const response = await fetch(url, options);

    if (response.status === 200) {
      data['message'] = await response.json();
      data['error'] = false;
      data['errorMessage'] = '';
    } else if (response.status === 201) {
      data['message'] = await response.json();
      data['error'] = false;
      data['errorMessage'] = '';
    } else if (response.status === 204) {
      data['message'] = "Content Delete";
      data['error'] = false;
      data['errorMessage'] = '';
    } else if (response.status === 400) {
      // go to login page
      data['message'] = '';
      data['error'] = true;
      data['errorMessage'] = ""
      var message = await response.json();
      var keys = Object.keys(message);
      keys.map(item => {
        data['errorMessage'] += `${item}: ${message[item]}\n`;
      })
      
    } else if (response.status === 401) {
      // go to login page
      data['message'] = '';
      data['error'] = true;
      data['errorMessage'] = 'Unauthorized';
    } else if (response.status === 404) {
      data['message'] = '';
      data['error'] = true;
      data['errorMessage'] = `${url}, this url not found on server`;
    } else if (response.status === 500) {
      data['message'] = '';
      data['error'] = true;
      data['errorMessage'] = 'Internal Server! Please Try again later!';
    } else {
      data['message'] = '';
      data['error'] = true;
      data['errorMessage'] = await response.text();
    }
  } catch (e) {
    data['message'] = '';
    data['error'] = true;
    data['errorMessage'] = e.toString();
  }

  return data;
};
