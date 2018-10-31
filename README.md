
# format-curl
Format curl execution from request params

## Installation
from npm

```shell
npm install --save format-curl
```

from unpkg

```html
<script src="https://unpkg.com/format-curl@latest/dist/index.js"></script>
<!-- or -->
<script src="https://unpkg.com/format-curl@latest/dist/index.min.js"></script>
<!-- example -->
<script type="text/javascript">
const curl = window.formatCurl({
    href: 'http://my-host/pathname/',
},
{
    args: ['-v'],
    headers: {
        'accept': '*/*',
    },
});

console.log(curl);
</script>
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

### API

#### curl(url, [options])

Returns a string with a resulting curl command.

##### url
Type: `string` `Object`

The URL to request, as a string, a [WHATWG URL](https://nodejs.org/api/url.html#url_class_url) or [https.request options](https://nodejs.org/api/https.html#https_https_request_options_callback).

In case you provide partial or empty url it will use base url `http://localhost/` to fullfil it.

##### options
Type: `Object`

###### headers
Type: `Object`

Request headers.

###### json
Type: `boolean`

Helper for json format specific headers. Adds `accept` and `content-type` headers with `application/json` value in case they aren't presented.

###### method
Type: `string`

Request method.

###### body
Type: `string` `Object`

Request body. If you provide an object, it will be serialized via `JSON.stringify`.

###### args
Type: `Array`

Curl arguments. Like `-vvv`, `-k`, `-L` and etc.

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
