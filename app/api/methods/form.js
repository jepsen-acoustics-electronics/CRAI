import Api from 'app/api';
import ApiConstants from '../ApiConstants';

export default function postForm(submitted) {

  return Api(
    ApiConstants.FORM + '?username=' + username + '&password=' + password,
    null,
    'post',
    null
  );
}
