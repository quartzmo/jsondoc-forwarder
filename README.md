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

## Demo

```
npm start
```

## Manual testing of routes in google-cloud-ruby

Click the link, then compare to the expectation. Adapted from the [unit tests](test/test.js).

#### It should return baseUrl if /#

https://quartzmo.github.io/google-cloud-ruby/#

Expected: `https://quartzmo.github.io/google-cloud-ruby`

#### It should return docs without hash

https://quartzmo.github.io/google-cloud-ruby/#/docs

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs`

#### It should return gem without hash

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting`

#### It should return gem and version without hash

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/v0.30.1/

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/v0.30.1`

#### It should capitalize module names

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud`

#### It should camel-case module names

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/errorreporting

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud/ErrorReporting`

#### It should redirect to latest if no version

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/google/cloud/errorreporting

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/latest/Google/Cloud/ErrorReporting`

#### It should redirect to latest if latest

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/latest/google/cloud/errorreporting

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/latest/Google/Cloud/ErrorReporting`

#### It should redirect to master if master

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/master/google/cloud/errorreporting

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/master/Google/Cloud/ErrorReporting`

#### It should redirect to google-cloud root from any type

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud/v0.50.0/google/cloud/datastore

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud/v0.50.0`

#### It should convert query strings to anchors for instance methods

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/errorreporting/errorevent?method=event_time-instance

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud/ErrorReporting/ErrorEvent#event_time-instance_method`

#### It should convert query strings to anchors for constructor methods

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-bigquery/v1.7.1/google/cloud/bigquery/project?method=initialize-constructor

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-bigquery/v1.7.1/Google/Cloud/Bigquery/Project#initialize-instance_method`

#### It should convert query strings to anchors for class methods

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-bigquery/v1.7.1/google/cloud?method=bigquery-class

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-bigquery/v1.7.1/Google/Cloud#bigquery-class_method`

#### It should convert query strings for sections to gem root module which links to OVERVIEW.md

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-bigquery/v1.7.1/google/cloud/bigquery?section=query-jobs

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-bigquery/v1.7.1/Google/Cloud/Bigquery`

#### It should convert guides/authentication guide to /gem/version

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-bigquery/v1.7.1/guides/authentication

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-bigquery/v1.7.1`

#### It should convert all guides to /gem/version

https://quartzmo.github.io/google-cloud-ruby/#/docs/google-cloud-error_reporting/v0.30.2/guides/instrumentation

Expected: `https://quartzmo.github.io/google-cloud-ruby/docs/google-cloud-error_reporting/v0.30.2`


