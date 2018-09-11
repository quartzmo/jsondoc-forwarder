// Copyright 2018 Chris Smith (quartzmo)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var JsondocForwarder = require('../jsondoc-forwarder.js');
var assert = require('assert');
describe('JsondocForwarder', function() {
  var origin = "https://googlecloudplatform.github.io";
  var appPath = "/google-cloud-ruby/";
  var baseUrl = "https://googlecloudplatform.github.io/google-cloud-ruby";
  var moduleNames = {
    'errorreporting': 'ErrorReporting',
    'errorevent': 'ErrorEvent'
  };

  before(function() {
    // TODO: omit protocol and domain from baseUrl if possible
    this.forwarder = new JsondocForwarder(origin, appPath, null, moduleNames);
  });

  describe('#resolve()', function() {
    it('should return null for no anchor', function() {
      assert.equal(this.forwarder.resolve(baseUrl), null);
    });

    it('should return null for a normal anchor', function() {
      var url = baseUrl + "/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud/ErrorReporting/ErrorEvent#event_time-instance_method"
      assert.equal(this.forwarder.resolve(url), null);
    });

    it('should return baseUrl if /#', function() {
      var url = baseUrl + "/#";
      assert.equal(this.forwarder.resolve(url), baseUrl);
    });

    it('should return baseUrl if /#/', function() {
      var url = baseUrl + "/#/";
      assert.equal(this.forwarder.resolve(url), baseUrl);
    });

    it('should return docs without hash', function() {
      var url = baseUrl + "/#/docs";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs");
    });

    it('should return docs without hash and trailing slash', function() {
      var url = baseUrl + "/#/docs/";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs");
    });

    it('should return gem without hash', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting");
    });

    it('should return gem and version without hash', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/v0.30.1/";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/v0.30.1");
    });

    it('should capitalize module names', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud");
    });

    it('should camel-case module names', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/errorreporting";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud/ErrorReporting");
    });

    it('should redirect to latest if no version', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/google/cloud/errorreporting";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/latest/Google/Cloud/ErrorReporting");
    });

    it('should redirect to latest if latest', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/latest/google/cloud/errorreporting";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/latest/Google/Cloud/ErrorReporting");
    });

    it('should redirect to master if master', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/master/google/cloud/errorreporting";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/master/Google/Cloud/ErrorReporting");
    });

    it('should redirect to google-cloud root from any type', function() {
      var url = baseUrl + "/#/docs/google-cloud/v0.50.0/google/cloud/datastore";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud/v0.50.0");
    });

    it('should convert query strings to anchors for instance methods', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/v0.30.1/google/cloud/errorreporting/errorevent?method=event_time-instance";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/v0.30.1/Google/Cloud/ErrorReporting/ErrorEvent#event_time-instance_method");
    });

    it('should convert query strings to anchors for constructor methods', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/v1.7.1/google/cloud/bigquery/project?method=initialize-constructor";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/v1.7.1/Google/Cloud/Bigquery/Project#initialize-instance_method");
    });

    it('should convert query strings to anchors for class methods', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/v1.7.1/google/cloud?method=bigquery-class";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/v1.7.1/Google/Cloud#bigquery-class_method");
    });

    it('should convert query strings for sections to gem root module which links to OVERVIEW.md', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/v1.7.1/google/cloud/bigquery?section=query-jobs";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/v1.7.1/Google/Cloud/Bigquery");
    });

    it('should convert guides/authentication guide to /gem/version', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/v1.7.1/guides/authentication";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/v1.7.1");
    });

    it('should convert all versioned guides to /gem/version', function() {
      var url = baseUrl + "/#/docs/google-cloud-error_reporting/v0.30.2/guides/instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/v0.30.2");
    });

    it('should convert all master guides to /master/file.', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/master/guides/authentication";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/master/file.AUTHENTICATION");
    });

    it('should convert all latest guides to /latest/file.', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/latest/guides/authentication";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/latest/file.AUTHENTICATION");
    });

    it('should convert all unversioned guides to /latest/file.', function() {
      var url = baseUrl + "/#/docs/google-cloud-bigquery/guides/authentication";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-bigquery/latest/file.AUTHENTICATION");
    });

    it('should convert ONLY root guides/authentication guide to /docs/authentication', function() {
      var url = baseUrl + "/#/docs/guides/authentication";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/authentication");
    });

    it('should convert stackdriver/master/guides/instrumentation_configuration to /docs/stackdriver/master/guides/file.INSTRUMENTATION_CONFIGURATION', function() {
      var url = baseUrl + "/#/docs/stackdriver/master/guides/instrumentation_configuration";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/stackdriver/master/file.INSTRUMENTATION_CONFIGURATION");
    });

    it('should convert stackdriver/master/guides/debugger_instrumentation to debugger/master/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/master/guides/debugger_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-debugger/master/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/master/guides/error_reporting_instrumentation to error_reporting/master/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/master/guides/error_reporting_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/master/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/master/guides/logging_instrumentation to logging/master/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/master/guides/logging_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-logging/master/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/master/guides/trace_instrumentation to trace/master/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/master/guides/trace_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-trace/master/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/latest/guides/debugger_instrumentation to debugger/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/latest/guides/debugger_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-debugger/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/latest/guides/error_reporting_instrumentation to error_reporting/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/latest/guides/error_reporting_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/latest/guides/logging_instrumentation to logging/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/latest/guides/logging_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-logging/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/latest/guides/trace_instrumentation to trace/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/latest/guides/trace_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-trace/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/guides/debugger_instrumentation to debugger/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/guides/debugger_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-debugger/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/guides/error_reporting_instrumentation to error_reporting/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/guides/error_reporting_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-error_reporting/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/guides/logging_instrumentation to logging/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/guides/logging_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-logging/latest/file.INSTRUMENTATION");
    });

    it('should convert stackdriver/guides/trace_instrumentation to trace/latest/guides/instrumentation', function() {
      var url = baseUrl + "/#/docs/stackdriver/guides/trace_instrumentation";
      assert.equal(this.forwarder.resolve(url), baseUrl + "/docs/google-cloud-trace/latest/file.INSTRUMENTATION");
    });
  });
});