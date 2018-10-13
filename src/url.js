import {format, parse} from 'url';

function Url(url) {
  Object.assign(this, parse(url));
}

Url.prototype.toString = function() {
  return format(this);
}

export default Url;
