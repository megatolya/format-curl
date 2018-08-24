# format-curl

Format curl execution from request params

## Installation

```shell
npm install --save format-curl
```

## Usage

```js
import curl from 'format-curl';

const url = 'https://myhost.com?param=value';
const options = {
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

console.log(curl(url, options));
// curl -vvv "https://myhost.com?param=value" -H "x-header: test" -H "x-header2: test2" --data '{"param":"123"}' -X PUT
```

See `test/index.test.js` for more examples!

## TODO
* user-argent, cookies as a params (and as curl arguments)
