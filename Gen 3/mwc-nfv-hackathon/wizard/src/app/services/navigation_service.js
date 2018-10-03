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

module.exports = function (dataService, $state) {
    "ngInject";

    this.currPath = 0;
	this.state_path;
    //var config_data = dataService.getVnfDefinition();
    this.VIMType = "";
    this.OrchType = "";
    this.changeRoute = function( pathId ) {
      this.currPath = pathId;
      this.updatePath()
    };
	    this.links = [
     		 {name: 'VNF definitions', href: 'wizard.vnfdef', button:'Continue'},
	 	 {name: 'Network Configurations', href: 'wizard.netconfig', button:'Continue'},
	         {name: 'VNF Configurations', href: 'wizard.vnfconfig', button:'Continue'},
	         {name: 'NIC Definitions', href: 'wizard.nic_definitions', button: 'Continue'},
    	 	 {name: 'EPA Configurations', href: 'wizard.epa_configurations', button: 'Continue'},
		 {name: 'Scripts', href: 'wizard.scripts', button: 'Continue'},
		 {name: 'Summary', href: 'wizard.summary', button: 'Generate'},
		 {name: 'Generate', href: 'wizard.generate', button: 'Create new'}
	    ];

	this.epas = [
	  {name: 'EPA VCloud TOSCA', href: 'wizard.epa_configurations_vc_tosca', button:'Continue'},
	  {name: 'EPA VCloud CLOUDIFY', href: 'wizard.epa_configurations_vc_cloudify', button:'Continue'},
	  {name: 'EPA VCloud OSM', href: 'wizard.epa_configurations_vc_osm', button:'Continue'},
	  {name: 'EPA VCloud RIFT', href: 'wizard.epa_configurations_vc_rift', button:'Continue'},
	  {name: 'EPA VCloud OVF', href: 'wizard.epa_configurations_vc_ovf', button:'Continue'},
	  {name: 'EPA OpenStack TOSCA', href: 'wizard.epa_configurations_os_tosca', button:'Continue'},
	  {name: 'EPA OpenStack CLOUDIFY', href: 'wizard.epa_configurations_os_cloudify', button:'Continue'},
	  {name: 'EPA OpenStack HEAT', href: 'wizard.epa_configurations_os_heat', button:'Continue'},
	  {name: 'EPA OpenStack OSM', href: 'wizard.epa_configurations_ost_osm', button:'Continue'},
	  {name: 'EPA OpenStack RIFT', href: 'wizard.epa_configurations_ost_rift', button:'Continue'}	    
	  
    ];
	
    this.prevPath = function(){
      dataService.update();
//      alert(this.currPath);
      var config_data = dataService.getVnfDefinition();
      var vnf_config =  dataService.getVnfConfiguration();
      this.flavor = vnf_config.Flavor ;
      this.VIMType = config_data.VIMType;
      this.OrchType = config_data.OrchType;
      this.customFlavor = 0;
      if (this.VIMType === 'OpenStack' && ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2' || this.OrchType == 'TOSCA 1.1' ||  this.OrchType === 'Heat')) {
	      for(f=0; f< this.flavor.length; f++){	
		      if(this.flavor[f] == 'auto'){
			      this.customFlavor ++ ;      
		      }
	      }
      }

      if ((this.VIMType === 'vCloud Director' || !this.customFlavor )&& ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2'  ||  this.OrchType == 'TOSCA 1.1' || this.OrchType === 'Heat' || this.OrchType === 'Ovf')) {
  
	   /*	      if (this.currPath - 1 == 4){
				
				this.currPath = this.currPath - 1 ;
				
	      }
		  
		  if (this.currPath - 2 == 4){
				if (this.OrchType === 'Ovf'){
					this.currPath = this.currPath - 2 ;
				}
				
	      }*/

	      if (this.OrchType === 'Ovf'){
                        if (this.currPath - 1 == 5){
                                this.currPath = this.currPath - 1 ;
                        }

         }else if (this.VIMType === 'vCloud Director'  && this.OrchType == 'TOSCA 1.1' ){
			//alert("I")
			
			  this.currPath = this.currPath ;
			
	    }else {

                        if (this.currPath - 1 == 4){
                                this.currPath = this.currPath - 1 ;
                        }
               }

      }

      
      this.currPath = this.currPath - 1;
      this.updatePath()
    };

    this.nextPath = function() {
 //     alert(this.currPath);
      /*var config_data = dataService.getVnfDefinition();
      this.VIMType = config_data.VIMType;
       this.OrchType = config_data.OrchType;
*/
      var config_data = dataService.getVnfDefinition();
      var vnf_config =  dataService.getVnfConfiguration();
      this.flavor = vnf_config.Flavor ;
      this.VIMType = config_data.VIMType;
      this.OrchType = config_data.OrchType;
      this.customFlavor = 0;
      if (this.VIMType === 'OpenStack' && ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2' || this.OrchType == 'TOSCA 1.1' ||  this.OrchType === 'Heat')) {
	      for(f=0; f< this.flavor.length; f++){	
		      if(this.flavor[f] == 'auto'){
			      this.customFlavor ++ ;      
		      }
	      }
      }

      if ((this.VIMType === 'vCloud Director' || !this.customFlavor )&& ( this.OrchType === 'Cloudify 3.4' || this.OrchType == 'TOSCA 1.1' || this.OrchType === 'Cloudify 4.2'  || this.OrchType === 'Heat' || this.OrchType === 'Ovf')) {
  
	   /*   if (this.currPath + 1 == 4){
//               alert("I am here");
				if (this.OrchType === 'Ovf'){
					this.currPath = this.currPath + 2 ;
				}else{
					this.currPath = this.currPath + 1 ;
				}
	      } */

	      if (this.OrchType === 'Ovf'){  
			if (this.currPath + 1 == 5){
                this.currPath = this.currPath + 1 ;
            }

	      }else if (this.VIMType === 'vCloud Director'  && this.OrchType == 'TOSCA 1.1' ){
			//alert("I")
			
			  this.currPath = this.currPath ;
			
	      }else {

			if (this.currPath + 1 == 4){
				this.currPath = this.currPath + 1 ;
			}
	       }
      }
      if( dataService.update() ) {
        if (this.currPath + 1 === this.links.length) {
          this.currPath = 0;
          dataService.populateData();
        } else {
          this.currPath = this.currPath + 1;
        }

        this.updatePath()
      }
    };

    this.updatePath = function()  {

     // alert(this.links[this.currPath].href);
      //alert(this.currPath);
	  //var num = 3 
	  //alert(num);
	  if (this.currPath === 4){
		  
		  //alert("inside select epa");
		  this.state_path = this.selectepa();
	  }else { 
	     //alert("inside normal");
	      this.state_path = this.links[this.currPath].href;
	  }
	  
	  //alert(this.state_path);
      //$state.go(this.links[this.currPath].href);
      $state.go(this.state_path);
    }
	
	this.selectepa = function() {
		
	   var config_data = dataService.getVnfDefinition();
	   var path;
       this.VIMType = config_data.VIMType;
       this.OrchType = config_data.OrchType;	
       //VIMType = ['vCloud Director', 'OpenStack'];
       //OrchType = ['TOSCA 1.1', 'Cloudify 3.4', 'OSM 3.0'];	
       //alert('I am in')	   ;
	    //alert(this.VIMType);
		//alert(this.OrchType);
	   if (this.VIMType === 'vCloud Director' && this.OrchType === 'TOSCA 1.1') {
		   
		   path = this.epas[0].href;
		   		   
	   }else if (this.VIMType === 'vCloud Director' && ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2')) {
		   
		   path = this.epas[1].href;
		   
	   }else if (this.VIMType === 'vCloud Director' && this.OrchType === 'OSM 3.0') {
		   
		   path = this.epas[2].href;
		   
	   }else if (this.VIMType === 'vCloud Director' && this.OrchType === 'RIFT.ware 5.3') {
		  
		   //alert();
		   path = this.epas[3].href;
		   
	   }else if (this.VIMType === 'vCloud Director' && this.OrchType === 'Ovf') {

                   //alert();
                   path = this.epas[4].href;

           }else if (this.VIMType === 'OpenStack' && this.OrchType === 'TOSCA 1.1') {
		   
		   path = this.epas[5].href;
		   
	   }else if (this.VIMType === 'OpenStack' && (this.OrchType === 'Cloudify 3.4' ||this.OrchType === 'Cloudify 4.2')) {
		   
		   path = this.epas[6].href;
		   
	   }else if (this.VIMType === 'OpenStack' && (this.OrchType === 'Heat')) {
		   
		   path = this.epas[7].href;
		   
	   }else if (this.VIMType === 'OpenStack' && this.OrchType === 'OSM 3.0') {
		   
		   path = this.epas[8].href;
		   
	   }else if (this.VIMType === 'OpenStack' && (this.OrchType === 'RIFT.ware 5.3' || this.OrchType === 'RIFT.ware 6.1')) {
		   //alert();
		   path = this.epas[9].href;
		   
	   }
	   
	   //alert(path);
	   return path ;
				
	}

   this.IsEpaDisable = function(){
      var config_data = dataService.getVnfDefinition();
      var vnf_config =  dataService.getVnfConfiguration();
      this.flavor = vnf_config.Flavor ;
      this.VIMType = config_data.VIMType;
      this.OrchType = config_data.OrchType;
      this.customFlavour = 0;
      if (this.VIMType === 'OpenStack' && ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2' || this.OrchType == 'TOSCA 1.1' ||  this.OrchType === 'Heat')) {
	      for(f=0; f< this.flavor.length; f++){	
		      if(this.flavor[f] == 'auto'){
			      this.customFlavor ++ ;      
		      }
	      }
      }
      if ((this.VIMType === 'vCloud Director' || !this.customFlavor )&& ( this.OrchType === 'Cloudify 3.4' || this.OrchType === 'Cloudify 4.2' || this.OrchType == 'TOSCA 1.1' ||  this.OrchType === 'Heat' || this.OrchType === 'Ovf1')) {
	      return true;
      }
      return false;
   }
   
   this.IsScriptDisable = function(){
      var config_data = dataService.getVnfDefinition();
      this.VIMType = config_data.VIMType;
      this.OrchType = config_data.OrchType;
      
      if (this.VIMType === 'vCloud Director'&& this.OrchType === 'Ovf') {
	      return true;
      }
      return false;
   }
};
