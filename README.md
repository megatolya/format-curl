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

## Publish

Build package and publish under `beta` tag:

```bash
npm run build && npm publish --tag beta
```

Now you can install it using published version (`npm install format-curl@<version>`) and test it. When you finish, add a `latest` tag to the published version:

```bash
npm dist-tag rm format-curl beta
npm dist-tag add format-curl@<version> latest
```

## TODO
* user-argent, cookies as a params (and as curl arguments)
