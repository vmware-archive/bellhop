/*#########################################################################
# Copyright 2017-2018 VMware Inc.
# This file is part of VNF-ONboarding
# All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# For those usages not covered by the Apache License, Version 2.0 please
# contact:  osslegalrouting@vmware.com

###########################################################################*/

const angular = require('angular');
require('angular-ui-router');

yaml = require('js-yaml');
//fs   = require('fs');

/* Clarity */
require('mutationobserver-shim');
require('@webcomponents/custom-elements');
require('clarity-icons');

/* Config */
const routesConfig = require('./routes');

/* Components */
const loginComponent = require('./app/components/login_component');
const wizardComponent = require('./app/components/steps_component');
const selectvnfComponent = require('./app/components/select_vnf_component');
const vnfDefComponent = require('./app/components/vnf_definition_component');
const vnfConfigComponent = require('./app/components/vnf_configuration_component');
const networkconfigComponent = require('./app/components/network_configuration_component');
const nicComponent = require('./app/components/nic_definitions_component');
//const epaComponent = require('./app/components/epa_configurations_component');
const scriptsComponent = require('./app/components/scripts_definitions_component');
const summaryComponent = require('./app/components/summary_component');
const rangeComponent = require('./app/components/range_component');
const generateComponent = require('./app/components/generate_component');
const epavctComponent = require('./app/components/epa_configurations_vct_component');
const epavcsComponent = require('./app/components/epa_configurations_vcosm_component');
const epavcriftComponent = require('./app/components/epa_configurations_vcrift_component');
const epavccloudifyComponent = require('./app/components/epa_configurations_vccloudify_component');
const epavcovfComponent = require('./app/components/epa_configurations_vcovf_component');

const epaostComponent = require('./app/components/epa_configurations_ost_component');
const epaostosmComponent = require('./app/components/epa_configurations_ostosm_component');
const epaostriftComponent = require('./app/components/epa_configurations_ostrift_component');
const epaoscloudifyComponent = require('./app/components/epa_configurations_oscloudify_component');
const epaosheatComponent = require('./app/components/epa_configurations_osheat_component');

const signupComponent = require('./app/components/signup_component');

/* Services */
const dataService = require('./app/services/data_service');
const navigationService = require('./app/services/navigation_service');
// const dbService = require('./app/services/db_service');
const authService = require('./app/services/auth_service');
const signupService = require('./app/services/signup_service');
const forgotpasswordComponent = require('./app/components/forgotpassword_component');

/* CSS */
require('./index.scss');
require('clarity-icons/clarity-icons.min.css');
require('clarity-ui/clarity-ui.min.css');

module.exports = angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('dataService', dataService)
  .service('navigationService', navigationService)
  // .service('dbService',dbService)
  .service('authService',authService)
  .service('signupService',signupService)
  .component('wizard', wizardComponent)
  .component('vnfdef', vnfDefComponent)
  .component('vnfconfig', vnfConfigComponent)
  .component('selectvnf',selectvnfComponent)
  .component('nic', nicComponent)
  .component('netconfig', networkconfigComponent)
 // .component('epa', epaComponent)
  .component('epavct', epavctComponent)
  .component('epavcs', epavcsComponent)
  .component('epavcrift',epavcriftComponent)
  .component('epaost', epaostComponent)
  .component('epaostosm', epaostosmComponent)
  .component('epaostrift',epaostriftComponent)
  .component('scripts', scriptsComponent)
  .component('summary', summaryComponent)
  .component('range', rangeComponent)
  .component('generate', generateComponent)
  .component('login',loginComponent)
  .component('epavccloudify', epavccloudifyComponent)
  .component('epaoscloudify', epaoscloudifyComponent)
  .component('epaosheat', epaosheatComponent)
  .component('signup',signupComponent)
  .component('forgotpassword',forgotpasswordComponent)
  .component('epavcovf', epavcovfComponent)
  .name
;
