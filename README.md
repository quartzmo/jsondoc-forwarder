# jsondoc_forwarder.js

A simple script for redirecting requests to legacy URLs of the [google-cloud-common site app](https://github.com/GoogleCloudPlatform/google-cloud-common/tree/master/site) to the YARD documentation site of [GoogleCloudPlatform/google-cloud-ruby](https://github.com/GoogleCloudPlatform/google-cloud-ruby).

## Usage

### Initialization

Typical usage:

```js
var appPath = "/google-cloud-ruby/";
var moduleNames = {
  'errorreporting': 'ErrorReporting',
  'errorevent': 'ErrorEvent',
  ...
};
var forwarder = new JsondocForwarder(null, appPath, null, moduleNames);
var forwardUrl = forwarder.resolve(window.location.href);
if (forwardUrl) window.location.href = forwardUrl;
```

## Tests

```
npm test
```

## Manual demo/browser testing

```
npm start
```
