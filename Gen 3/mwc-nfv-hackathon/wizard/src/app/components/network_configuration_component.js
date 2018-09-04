/* #########################################################################
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

require('imports-loader?$=>jQuery!jquery-ui-sortable-npm');

 module.exports = {
   template: require('../templates/network_configuration.html'),
   controller: function ( dataService, $scope ) {
     "ngInject";

	 
	// ##########
	
	 this.FORM_SUBMIT_CLASS = 'submit';
	 this.NO_CLASS = '';
	 this.DISABLED_FORM_GROUP = 'form-group disabled';
	 this.FORM_GROUP = 'form-group';
	 this.mgmtValid = true;
	
	
	// ########
	 
	 this.VCDINTERFACES = ['Select Type','E1000','VMXNET3'];
	 this.OPENSTACKINTERFACES = ['Select Type','VIRTIO','PCI-PASSTHROUGH','SR-IOV','E1000','VMXNET3'];
	 this.VCD_CLOUDIFY_INTERFACES = ['Select Type','Default'];
	 this.OPENSTACK_CLOUDIFY_INTERFACES = ['Select Type','Default','SR-IOV'];
         //this.possibleNetworkType = ['Select Type','isolated','natRouted','bridged'];
         this.possibleNetworkType = ['Select Type','Direct','Routed','Isolated'];
	 
	 
	 const config_vnf = dataService.getVnfDefinition();
	 this.VIMType = config_vnf.VIMType;
	 this.OrchType = config_vnf.OrchType;
	 $scope.DisplayTooltip = false;
	 console.log(config_vnf);
	 
	 const config = dataService.getNetworkConfiguration();
	 this.numberOfNICs = config.numberOfNetworks;
	 this.NICs = config.Networks;
	 this.indices = config.NetworkIndices;
	 this.Interfaces = config.NewNetwork;
	 this.Subnet = config.Subnet;

         this.Edge_Gateway = config.Edge_Gateway;
         this.Network_Name = config.Network_Name;
         this.Static_Range = config.Static_Range;
         this.Static_Start = config.Static_Start;
         this.Static_end = config.Static_end;
         this.Netmask = config.Netmask;
         this.Gateway_IP = config.Gateway_IP;
         //this.DNS = config.DNS;
         this.DNS1 = config.DNS1;
         this.DNS2 = config.DNS2;
         this.DNS_Suffix = config.DNS_Suffix;
         this.DHCP_Start = config.DHCP_Start;
         this.DHCP_End = config.DHCP_End;
		
         this.mgmtNetwork = config.mgmtNetwork;
         this.SubnetCidr = config.SubnetCidr;
	 this.EthernetType = config.EthernetType;
	 this.NetworksType = config.NetworksType;
	 this.mgmtNetworkEthernetType = config.mgmtNetworkEthernetType;
	 
	 this.OrgVdc_Network = config.OrgVdc_Network;
	 this.OrgVdcNetwork = config.OrgVdcNetwork;
	 
         this.Parent_Network = config.Parent_Network;
         this.Network_Type = config.Network_Type;
         this.ParentNetworkType = config.ParentNetwork_Type; 
	 
	 $scope.mgmtNetworkEthernetTypeSelected = this.mgmtNetworkEthernetType || 'ELAN';
         this.createMgmtNetwork = config.create_mgmt_network;
	 this.NICshow = [];

	 console.log(config);
	
	 $scope.NETWORKSTYPES = ['INTERNAL', 'EXTERNAL'];
	 $scope.NetworksTypeSelected = this.NetworksType;
	 for (i = 0; i < this.NetworksType.length; i++) {
		 if( this.NetworksType[i] == "" || typeof this.NetworksType[i] == undefined ){
			 $scope.NetworksTypeSelected[i] = $scope.NETWORKSTYPES[0];
		 }
	 }
	 
	 $scope.ETHERNETTYPE = ['ELAN','ELINE'];
	 $scope.EthernetTypeSelected = this.EthernetType;
	 
	 
	 for (i = 0; i < this.EthernetType.length; i++) {
		 if( this.EthernetType[i] == "" || typeof this.EthernetType[i] == undefined ){
				$scope.EthernetTypeSelected[i] = $scope.ETHERNETTYPE[0];
			}
	 }
	
         //$scope.PARENTNETWORKTYPE = ['isolated','natRouted','bridged'];
         $scope.PARENTNETWORKTYPE = ['Direct','Routed','Isolated'];
         $scope.ParentNetworkTypeSelected = this.ParentNetworkType;


         for (i = 0; i < this.ParentNetworkType.length; i++) {
                 if(this.ParentNetworkType[i] == "" || typeof this.ParentNetworkType[i] == undefined ){
                                $scope.ParentNetworkTypeSelected[i] = $scope.PARENTNETWORKTYPE[0];
                        }
         } 
		  this.NewNetwk = true;
          /*if (this.OrchType == 'TOSCA 1.1') {
                 this.NewNetwk = false;
         }*/
	 
	 console.log("possibleInterfaces");
	 console.log(this.possibleInterfaces);
	 
	 this.possibleNumbersOfNICs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	 console.log("Interfaces");
	 console.log(this.Interfaces);
	 
     

         this.MGMT_NETWORK_TOOLTIP = TOOLTIPS.MGMT_NETWORK_TOOLTIP;
         this.MGMT_TYPE_NETWORK_TOOLTIP = TOOLTIPS.MGMT_TYPE_NETWORK_TOOLTIP;    
	 this.AD_NETWORK_TOOLTIP = TOOLTIPS.AD_NETWORK_TOOLTIP;
	 this.NETWORK_INTERFACE = TOOLTIPS.NETWORK_INTERFACE;
	 this.ETHERNET_TYPE = TOOLTIPS.ETHERNET_TYPE;

	 const lastIndex = this.possibleNumbersOfNICs[this.possibleNumbersOfNICs.length-1]-1;
	 //alert(lastIndex)
	 var prelastIndex = this.possibleNumbersOfNICs[this.possibleNumbersOfNICs.length -1] -19;

	 this.enumarated = new Array(lastIndex + 1);

         this.isOSM = function() {
            if(this.OrchType == 'OSM 3.0'){
               return true;
            }
           else{
              return false;
           } 
         };

         this.isMgmtNwt = function(){
		if(this.OrchType == 'Heat' || this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.0' || this.OrchType == 'Ovf'){
			return false;
		}
		else{
			return true;
		}
	}
	 this.isOS_Subnet = function(){
              if((this.VIMType == 'OpenStack') &&
                        (this.OrchType == 'Heat' || this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.0' )){
                 return true;
              }
              else{
                 return false;
              }
          }
     
         this.isOS_Cloudify = function() {
            if((this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.0') && (this.VIMType == 'OpenStack')){
               return true;
            }
           else{
              return false;
           } 
         };
         this.isVCD_Cloudify = function() {
            if((this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.0' || this.OrchType == 'Ovf') && (this.VIMType == 'vCloud Director')){
               return true;
            }
           else{
              return false;
           }
         } 
		 
 this.isVCD_Ovf = function() {
            if((this.OrchType == 'Ovf') && (this.VIMType == 'vCloud Director')){
               return true;
            }
           else{
              return false;
           }
         } 
	 $scope._localIndices = angular.copy(this.indices);

	 for (let i = 0; i < lastIndex+1; ++i) {
		 this.NICshow[i] = true;
	 }

	 for (let index = lastIndex; index >= prelastIndex; index--) {
		 this.NICshow[this.indices[index]] = this.numberOfNICs > index;
	 }
	
	 if (this.OrchType == 'OSM 3.0' || this.OrchType == 'RIFT.ware 5.3'){	
		 this.NIC_PLACEHOLDER = ['Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network', 'Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network'];
		
	 } else{
		 this.NIC_PLACEHOLDER = ['Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network','Enter Network'];
          if((this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.0') && (this.VIMType == 'OpenStack')){
	 	 this.SUBNET_PLACEHOLDER = ['Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet','Enter Subnet'];
	  }
	 }
     
	 this.INTERFACE_PLACEHOLDER = "Select Type";
	 this.INTERFACE_TOOLTIP= TOOLTIPS.NIC_INTERFACE_TOOLTIP;
         this.MGMT_PLACEHOLDER = "MGMT Network";
         this.MGMT_Subnet_PLACEHOLDER = "MGMT Subnet"

     angular.element(document).ready(() => {
       jQuery('.sortable').sortable().bind('sortupdate', () => {
         const temp = angular.copy(this.indices);
         jQuery('.sortable input').each(function (index, input) {
             temp[index] = +jQuery(input).attr('data-index');
         });

         $scope.$apply(function(){
           this.indices = temp;
           $scope._localIndices = angular.copy(this.indices);
         });
       });
     });

     $scope.$watch(() => {
       $scope.maxNicsError = false;
       if(isNaN(this.numberOfNICs) || this.numberOfNICs > this.possibleNumbersOfNICs.length){
                $scope.maxNicsError = true;
        }
       
       for (let i = 0; i < lastIndex+1; ++i) {
       this.NICshow[i] = true;
     }

       prelastIndex = this.numberOfNICs || 0;
       for(let index = lastIndex; index >= prelastIndex; index--) {
         this.NICshow[$scope._localIndices[index]] = this.numberOfNICs > index;
       }
      
	
     });
      
      this.forms = {};
      this.formSubmit = false;
      // ########
      dataService.setSubmitCallback( function () {
      this.formSubmit = true;

      var isValid = this.forms.nicDefinitionForm.$valid;
      this.mgmtValid = true;
      if(this.isMgmtNwt() && ((typeof this.mgmtNetwork == 'undefined') || (this.mgmtNetwork ==""))){
          this.mgmtValid = false;
	}
	  var validCnt = 0;
	  if(this.numberOfNICs <= this.possibleNumbersOfNICs.length){ 
	  	for (i = 0; i < this.numberOfNICs; i++) {
			if(this.forms.nicDefinitionForm[i].$valid){
				validCnt++;
			}
		}
           } else{ isValid = false; }

	 
       this.errorCnt = 0;
       if(this.isOS_Subnet()){
       		for (i = 0; i < this.numberOfNICs; i++) { 
			if(this.Interfaces[i] && ((typeof this.Subnet[i] == 'undefined') || (this.Subnet[i] == ""))){
				this.errorCnt++;		   	

				//}else if (){
		}
		}

	   } 

	   
	   if(this.isVCD_Cloudify()){
		   /*
			Edge_Gateway : this.Edge_Gateway,
                 Network_Name : this.Network_Name,
                 Static_end : this.Static_end,
                 Static_Start : this.Static_Start,
                 Static_Range : this.Static_Range,
                 Netmask : this.Netmask,
                 Gateway_IP : this.Gateway_IP,
                 DNS1 : this.DNS1,
                 DNS2 : this.DNS2,
                 //DNS : this.DNS,
                 DNS_Suffix : this.DNS_Suffix,
                 DHCP_Start : this.DHCP_Start,
                 DHCP_End : this.DHCP_End,
		   
		   */
		   //alert(" In isVCD_Cloudify");
		    
		   for (i = 0; i < this.numberOfNICs; i++) { 
		   
			if (this.Interfaces[i]){
					if((typeof this.Edge_Gateway[i] == 'undefined') || (this.Edge_Gateway[i] == "")) {
						this.errorCnt++;	  		
					}
					
					if(((typeof this.DNS_Suffix[i] == 'undefined') || (this.DNS_Suffix[i] == ""))) {
						this.errorCnt++;		   		
					}
					
					if((typeof this.Static_Start[i] == 'undefined') || (this.Static_Start[i] == "")) {
						this.errorCnt++;	  		
					}
					
					if(((typeof this.Static_end[i] == 'undefined') || (this.Static_end[i] == ""))) {
						this.errorCnt++;		   		
					}
					
					if((typeof this.DNS1[i] == 'undefined') || (this.DNS1[i] == "")) {
						this.errorCnt++;	  		
					}
					
					if(((typeof this.DNS2[i] == 'undefined') || (this.DNS2[i] == ""))) {
						this.errorCnt++;		   		
					}
					
					if((typeof this.DHCP_Start[i] == 'undefined') || (this.DHCP_Start[i] == "")) {
						this.errorCnt++;	  		
					}
					
					if(((typeof this.DHCP_End[i] == 'undefined') || (this.DHCP_End[i] == ""))) {
						this.errorCnt++;		   		
					}
					if((typeof this.Netmask[i] == 'undefined') || (this.Netmask[i] == "")) {
						this.errorCnt++;	  		
					}
					
					if(((typeof this.Gateway_IP[i] == 'undefined') || (this.Gateway_IP[i] == ""))) {
						this.errorCnt++;		   		
					}
					
			
			}
			
			
		   }
	   }
	   
	   if(this.isVCD_Ovf()){
		   
		   
		   for (i = 0; i < this.numberOfNICs; i++) { 
		   
			    if((typeof this.Edge_Gateway[i] == 'undefined') || (this.Edge_Gateway[i] == "")) {
						this.errorCnt++;	  		
				}
				if((typeof this.Netmask[i] == 'undefined') || (this.Netmask[i] == "")) {
						this.errorCnt++;	  		
				}
					
				if((typeof this.Static_Start[i] == 'undefined') || (this.Static_Start[i] == "")) {
						this.errorCnt++;	  		
				}
					
				if(((typeof this.Static_end[i] == 'undefined') || (this.Static_end[i] == ""))) {
						this.errorCnt++;		   		
				}
				
		   }
		   
	   }
	   
	   if( (isValid || (this.numberOfNICs == validCnt++)) && this.mgmtValid && (this.errorCnt == 0)){
	   	isValid = true ;
	   }
	  //alert(isValid)

      

	
      if( isValid ) {
		  
                for (i = 0; i < this.indices.length; i++) {

                        if(this.NICs[i] && this.numberOfNICs > 0){
                                this.Interfaces[i] = this.Interfaces[i];
                                this.Subnet[i] = this.Subnet[i];

                        }
                        else{
                                this.Interfaces[i] = "";
                                this.Subnet[i] = "";
                        }

                }

		 
		for (i = 0; i < this.indices.length; i++) {
		
			if(this.NICs[i] && this.numberOfNICs > 0){
				this.NICs[i] = this.NICs[i];

			}
			else{
				this.NICs[i] = "";
			}
			
		}
		
		for (i = 0; i < this.indices.length; i++) {
		
			if(this.NICs[i] && this.numberOfNICs > 0){
				
				$scope.EthernetTypeSelected[i] = $scope.EthernetTypeSelected[i] ;
			}
			else
			{
				$scope.EthernetTypeSelected[i] = "";
				
			}

			if(!this.isMgmtNwt()){
				$scope.EthernetTypeSelected[i] = "";
			}
			
		}
	
                for (i = 0; i < this.indices.length; i++) {

                        if(this.NICs[i] && this.numberOfNICs > 0){

                                $scope.ParentNetworkTypeSelected[i] = $scope.ParentNetworkTypeSelected[i] ;
                        }
                        else
                        {
                                $scope.ParentNetworkTypeSelected[i] = "";

                        }
                }
	
		for (i = 0; i < this.indices.length; i++) {
	       		 if(this.NICs[i] && this.numberOfNICs > 0){
				
				$scope.NetworksTypeSelected[i] = $scope.NetworksTypeSelected[i] ;
			}
			else
			{
				$scope.NetworksTypeSelected[i] = "";
				
			}
			if(!this.isMgmtNwt()){
                                $scope.NetworksTypeSelected[i] = ""; 
                        }

			
		}
		
                 if(!this.isMgmtNwt()){
                         $scope.mgmtNetworkEthernetTypeSelected  = "";
                        }
		
		const config = {
                 numberOfNetworks: this.numberOfNICs,
                 Networks: this.NICs,
				 NewNetwork: this.Interfaces,
                 Subnet: this.Subnet,
                 NetworkIndices: $scope._localIndices,
                 mgmtNetwork : this.mgmtNetwork,
                 SubnetCidr : this.SubnetCidr,
                 EthernetType : $scope.EthernetTypeSelected,
				 NetworksType : $scope.NetworksTypeSelected,
                 mgmtNetworkEthernetType : $scope.mgmtNetworkEthernetTypeSelected,
                 create_mgmt_network : this.createMgmtNetwork,
                 Edge_Gateway : this.Edge_Gateway,
                 Network_Name : this.Network_Name,
                 Static_end : this.Static_end,
                 Static_Start : this.Static_Start,
                 Static_Range : this.Static_Range,
                 Netmask : this.Netmask,
                 Gateway_IP : this.Gateway_IP,
                 DNS1 : this.DNS1,
                 DNS2 : this.DNS2,
                 //DNS : this.DNS,
                 DNS_Suffix : this.DNS_Suffix,
                 DHCP_Start : this.DHCP_Start,
                 DHCP_End : this.DHCP_End,
		 OrgVdc_Network : this.OrgVdc_Network,
		 OrgVdcNetwork : this.OrgVdcNetwork,
                 Parent_Network : this.Parent_Network,
                 ParentNetwork_Type : $scope.ParentNetworkTypeSelected

       };

        dataService.setNETC( config);
      }
	   console.log(dataService.getNetworkConfiguration());
	    console.log(isValid);
      return isValid;
    }.bind(this));
   }
};
