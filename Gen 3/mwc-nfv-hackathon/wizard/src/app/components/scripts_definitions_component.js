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

const TOOLTIPS = require('../config/tooltips.json');

module.exports = {
  template: require('../templates/scripts_definitions.html'),
  controller: function (dataService,authService,$scope) {
      "ngInject";


      this.DEFAULT_INPUT_TYPE = 'text';
      this.INPUT_PLACEHOLDER = 'Type here';
      this.FORM_SUBMIT_CLASS = '';
      this.SCRIPT_INFO_TOOLTIP = TOOLTIPS.SCRIPT_INFO_TOOLTIP;
      $scope.files = [];
      $scope.filename = [20];
      $scope.uploadwarning = false;
      this.upload_response = false;
      $("#Upload_Files").prop("disabled",true);

      this.scriptsInputsconfig = dataService.getScripts();

      const config_vnf = dataService.getVnfDefinition();
      this.VIMType = config_vnf.VIMType;
      this.OrchType = config_vnf.OrchType;
      this.numberOfVMs = config_vnf.numberOfVMs;
      this.VMsIndices = config_vnf.VMsIndices;
      $scope.scriptsInputs = [];

      console.log(config_vnf);

      $scope.doCollapse = function(index){

          var id ="expand-" + index;
          var spanId = "arrow-"+index;
          var x = document.getElementById(id);
          if (x.style.display === "block") {
              x.style.display = "none";
              document.getElementById(spanId).innerHTML = '<clr-icon shape="caret" style="transform: rotate(270deg);"></clr-icon>';
          } else {
              x.style.display = "block";
              document.getElementById(spanId).innerHTML = '<clr-icon shape="caret" style="transform: rotate(180deg);"></clr-icon>';
          }

          var vrows = document.getElementsByName("expand");

          for (i = 0; i <= vrows.length; i++) {
              if (Number(i) != Number(index)) {

                  vrows[i].style.display = "none";
                  innerId = "arrow-"+i;
                  document.getElementById(innerId).innerHTML = '<clr-icon shape="caret" style="transform: rotate(270deg);"></clr-icon>';
              }
          }
      };

      for (i = 0; i <= this.scriptsInputsconfig.create.length -1; i++) {
          
          if (this.OrchType == 'OSM 3.0' || this.OrchType == 'OSM 4.0' || this.OrchType == 'Heat' || this.OrchType == 'RIFT.ware 5.3' || this.OrchType == 'RIFT.ware 6.1'){	
              console.log(this.scriptsInputsconfig['create']);
              $scope.scriptsInputs[i] = {
                create: this.scriptsInputsconfig['create'][i]
              };
              this.scriptsInputsconfig['create'][i].text = "Cloud Init Script ";
              this.scriptsInputsconfig['create'][i].tooltip = TOOLTIPS.INIT;;
          } else{
              $scope.scriptsInputs[i] = {
                    create: emptyToString(this.scriptsInputsconfig['create'][i]),
                    configure: emptyToString(this.scriptsInputsconfig['configure'][i]),
                    delete: emptyToString(this.scriptsInputsconfig['delete'][i])
              };
	      
          }
          $scope.filename[i] = ['','',''];
      }
	
      this.isOSM = function(){

          return (this.OrchType == 'OSM 3.0' ||  this.OrchType == 'OSM 4.0'); 
      }

      this.empty = function (x) {
          return x == undefined || x === '' || x == null;
      };

      function emptyToString (x) {
          return x == undefined || x == null ? '' : x;
      }

      this.forms = {};

      dataService.setSubmitCallback(() => {
              this.FORM_SUBMIT_CLASS = 'submit';
              const isValid = this.forms.scriptsForm.$valid;
              var config_final = {};
              if (isValid) {
		            create_arr = [];
		            config_arr = [];
		            delete_arr = [];
		
                    for (i = 0; i <= this.scriptsInputsconfig.create.length -1; i++) {
                         if (this.OrchType == 'OSM 3.0' || this.OrchType == 'OSM 4.0' || this.OrchType == 'Heat' || this.OrchType == 'RIFT.ware 5.3' || 
                                 this.OrchType == 'RIFT.ware 6.1'){
                                create_arr.push(emptyToString($scope.scriptsInputs[i]['create'].value))
                         }else{
                                create_arr.push(emptyToString($scope.scriptsInputs[i]['create'].value)),
                                config_arr.push(emptyToString($scope.scriptsInputs[i]['configure'].value)),
                                delete_arr.push(emptyToString($scope.scriptsInputs[i]['delete'].value))
                         }
                    }

                    if (this.OrchType == 'OSM 3.0' || this.OrchType == 'OSM 4.0' || this.OrchType == 'Heat'){
                        config_final = {
                                    create: create_arr			
                        };
				
                    }else{
                        config_final = {
                                    create: create_arr,
					                config: config_arr,
					                delete: delete_arr					
                        };
                    }	

                    dataService.setScripts(config_final);
                    console.log(config_final);
              }
	 
              console.log("final");
              console.log(dataService.getScripts());
              return isValid;
      });

      $scope.setFiles = function (indx,element) {
          $("#Upload_Files").prop("disabled",false);
          $scope.files.push(element.files[0]);
          var res = indx.split("-");
          $scope.filename[Number(res[0])][Number(res[1])] = element.files[0].name;
	  console.log($scope.filename);
          $scope.uploadwarning = true;
          
          $scope.$apply( () => {

         for (i = 0; i <= 20; i++) {

                if (this.OrchType == 'OSM 3.0' || this.OrchType == 'Heat'){

                      $scope.scriptsInputs[i]['create'].value = $scope.filename[i][0];
                }else{
                      $scope.scriptsInputs[i]['create'].value = $scope.filename[i][0];
                      $scope.scriptsInputs[i]['configure'].value = $scope.filename[i][1];
                      $scope.scriptsInputs[i]['delete'].value = $scope.filename[i][2];
                }

        }

        console.log(this.scriptsInputs);
     });

          console.log($scope.files);
      };

      $scope.uploadFile = function () {
          console.log('In upload file: $scope.files');
          console.log($scope.files);
          var fd = new FormData();

          angular.forEach($scope.files, function (file) {
                  fd.append('file', file);
                  });
          var session_key = authService.getSessionKey();
          var username = authService.getUserName();
          console.log(session_key,username)
              if ($scope.files.length) {
                  this.upload_response = true;
                  var objXhr = new XMLHttpRequest();
                  objXhr.open("POST", 'http://' + location.hostname + ':5000' + '/backend' + '/upload');
                  objXhr.setRequestHeader('Authorization', session_key);
                  objXhr.setRequestHeader('username', username);
                  objXhr.onreadystatechange = function() {
                      if (this.readyState == 4 && this.status == 200) {
                          document.getElementById("uploadresponse").innerHTML =
                              this.responseText;
                          $scope.uploadwarning = false;
                      }
                  };

                  objXhr.send(fd);
                  $scope.files = [];
              } else {
                  alert('Please choose files to upload..')
              }
      }   
  }
};
