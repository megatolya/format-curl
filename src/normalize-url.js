import Url from './url';
import {isObject, isString} from './utils';

export default function normalizeUrl(url) {
  if (url instanceof URL) {
    return new Url(url.toString(), {});
  }

  if (isObject(url)) {
    const urlInstance = new Url('', {});
    Object.assign(urlInstance, url);

    return urlInstance;
  }

  if (isString(url)) {
    return new Url(url, {});
  }

  return new Url('', {});
}
