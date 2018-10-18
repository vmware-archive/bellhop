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

/**
 * Created by jakub on 1/19/17.
 */
const TOOLTIPS = require('../config/tooltips.json');

module.exports = {
  template: require('../templates/epa_configuration_vc_ovf.html'),
  controller: function ( dataService, $scope) {
    "ngInject";
	
	this.FORM_SUBMIT_CLASS = 'submit';
    this.NO_CLASS = '';
	this.DISABLED_FORM_GROUP = 'form-group disabled';
    this.FORM_GROUP = 'form-group';
	this.INPUT_PLACEHOLDER = "Enter the Number";
	this.NUMBER_NUMA_NODE ;
	this.NUMA_AFFINITY = false;
	this.MEMORY_RESERVATION = 0;
	this.LATENCY_SENSITIVITY = "Normal";
	
	this.MEMORY_RESERVATION_TOOLTIP = TOOLTIPS.MEMORY_RESERVATION_TOOLTIP;
	this.LATENCY_SENSITIVITY_TOOLTIP = TOOLTIPS.LATENCY_SENSITIVITY_TOOLTIP;
	this.NUMA_AFFINITY_TOOLTIP = TOOLTIPS.NUMA_AFFINITY_TOOLTIP;
	this.NUMBER_NUMA_NODES_TOOLTIP = TOOLTIPS.NUMBER_NUMA_NODES_TOOLTIP;
	this.HUGE_PAGE_TOOLTIP = TOOLTIPS.HUGE_PAGE_TOOLTIP;

	const config = dataService.getNicDefintion();
	this.numberOfNICs = config.numberOfNICs;
	this.Interfaces = config.Interfaces;        
        	
	const config_epa = dataService.getEpaDefintion();
	console.log(config_epa);
	
		
	$scope.NumaAffinitySelected = config_epa.NumaAffinity;
	$scope.MemoryReservationSelected = config_epa.MemoryReservation;
	$scope.LatencySensitivitySelected = config_epa.LatencySensitivity;
	$scope.NumberNumaNodeSelected = config_epa.NumberNumaNode;
	this.LatencySensitivity =  config_epa.LatencySensitivity;
        this.MemoryReservation = config_epa.MemoryReservation;
        $scope.HugePagesSelected = config_epa.Huge_Pages;
	//$scope.NumaAffinitySelected = false;
	//$scope.MemoryReservationSelected = false;
	//$scope.LatencySensitivitySelected = false;
	//$scope.NumberNumaNodeSelecited = 1;
	
	$scope.SRIOVInterfacesSelected = [];
	
	const config_vnf = dataService.getVnfDefinition();
	 this.VIMType = config_vnf.VIMType;
	 this.OrchType = config_vnf.OrchType;
	 this.numberOfVMs = config_vnf.numberOfVMs;
	 this.VMsIndices = config_vnf.VMsIndices;
	 const vnfconfig = dataService.getVnfConfiguration();
	 this.FlavorSelected = vnfconfig.Flavor;
	
	
	const config_nic = dataService.getNicDefintion();
	$scope.NICs = remove_dups(config_nic.NICs);
        
	// VNF configuration
	//var vnfconfig = dataService.getVnfConfiguration();
        this.RAM = vnfconfig.RAM;

	// Diable MemResv for SR-IOV
        $scope.DisabledMemRev = new Array(this.MemoryReservation.length);

	for (i = 0; i < this.numberOfVMs; i++) {
		$scope.DisabledMemRev[i] = false;
		for (n = 0; n <	this.numberOfNICs[i]; n++){
			
		   if(this.Interfaces[i][n] == "SR-IOV"){
			this.MemoryReservation[i] = this.RAM[i] * 1024;
			$scope.DisabledMemRev[i] = true;
			
		   }

		}
		
	}	
        console.log($scope.DisabledMemRev);		
	// Default latency 
	for (i = 0; i < this.numberOfVMs; i++) {

                if( this.LatencySensitivity[i] == "" || this.LatencySensitivity[i] == "false"|| this.LatencySensitivity[i] == "true"||typeof this.LatencySensitivity[i] == undefined ){

                        $scope.LatencySensitivitySelected[i] = "Normal";
                }
        }

   function  remove_dups(object){	   
		var NICs = [];
		for (i = 0; i < object.length ; i++) {
				if (typeof object[i] !== 'undefined' && object[i] !== null && object[i] != ""){	
				NICs.push(object[i]);
			}
		}
		return NICs;
	}
	
        $scope.LATENCYSENSITIVITY =['Low','Normal','Medium','High'];

         for (i = 0; i < this.LatencySensitivity.length; i++) {
                 if(( i < this.numberOfVMs ) && ( this.LatencySensitivity[i] == "" || this.LatencySensitivity[i] == "false"|| this.LatencySensitivity[i] == "true"||typeof this.LatencySensitivity[i] == undefined )){
                                $scope.LatencySensitivitySelected[i] = $scope.LATENCYSENSITIVITY[0];
                        }else{
				$scope.LatencySensitivitySelected[i] = "Normal" ;
			}
			
         }
       
	 for (i = 0; i < this.MemoryReservation.length; i++) {
                 if(( i < this.numberOfVMs ) && (this.MemoryReservation[i] == "" || this.MemoryReservation[i] == "false"|| this.MemoryReservation[i] == "true"||typeof this.MemoryReservation[i] == undefined )){
                                $scope.MemoryReservationSelected[i] = "0";
                        }else{
                                $scope.MemoryReservationSelected[i] = $scope.MemoryReservationSelected[i];
                        }

         }
 
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
	dataService.setSubmitCallback( function () {
		
		this.formSubmit = true;
		var isValid = this.forms.epaDefinitionForm.$valid;

                 this.validCnt = 0 ;
		 for (i = 0; i < this.numberOfVMs; i++) {

		 if ((typeof $scope.MemoryReservationSelected[i] == 'undefined') || ($scope.MemoryReservationSelected[i] =="") ||  isNaN($scope.MemoryReservationSelected[i])){
                                this.validCnt++;
                         }


                  //alert(this.Image[i]);
                     if($scope.NumaAffinitySelected[i]){

		     		if ((typeof $scope.NumberNumaNodeSelected[i] == 'undefined') || ($scope.NumberNumaNodeSelected[i] =="") ||  isNaN($scope.NumberNumaNodeSelected[i])){
		    	 	this.validCnt++;
			 }

			 }
		  }
		  if(this.validCnt){
			  isValid = false;
		  }

		
		if( isValid ) {
                      for (i = 0; i < this.numberOfVMs; i++) {
			if(!$scope.NumaAffinitySelected[i])
			{
				$scope.NumberNumaNodeSelected[i] = 0;
			}
		      }
			var config = {
			  NumaAffinity: $scope.NumaAffinitySelected,
			  MemoryReservation: $scope.MemoryReservationSelected,
			  LatencySensitivity: $scope.LatencySensitivitySelected,
			  NumberNumaNode:$scope.NumberNumaNodeSelected,
			  SRIOVInterfaces:$scope.SRIOVInterfacesSelected,
                          Huge_Pages : $scope.HugePagesSelected
					  
			};
			dataService.setEPA( config);
			
		}
		console.log(" I am here");
		console.log(config);
		return isValid;
		
	}.bind(this));
  }
};
