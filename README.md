# format-curl

Format curl execution from request params

## Install

```shell
npm install --save format-curl
```

## Usage

```js
import curl from 'format-curl';

const params = {
    url: 'https://myhost.com',
    query: {
        param: 'value'
    },
    headers: {
        'x-header': 'test',
        'x-header2': 'test2'
    },
    body: JSON.stringify({
        param: '123'
    }),
    method: 'PUT',
    args: ['-vvv']
};

console.log(curl(params));
// curl -vvv "https://myhost.com?param=value" -H "x-header: test" -H "x-header2: test2" --data '{"param":"123"}' -X PUT
```

See `test.js` for more examples!

## TODO
* [URL](https://nodejs.org/api/url.html#url_class_url) class as param
* host/port/scheme/path/hash as params
