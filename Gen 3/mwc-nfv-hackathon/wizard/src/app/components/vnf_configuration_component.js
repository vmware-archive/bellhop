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
  template: require('../templates/vnf_configuration.html'),
  controller: function ( dataService,authService, $scope) {
    "ngInject";

    this.FORM_SUBMIT_CLASS = 'submit';
    this.NO_CLASS = '';
    this.VCD_NAME = 'vCloud Director';
    this.OPENSTACK_NAME = 'OpenStack';
    this.CUSTOM_FLAVOR = "auto"; 
    this.TOSCA_NAME = "TOSCA 1.1"; 
    this.OSM_NAME = 'OSM 3.0';
    this.OVF_NAME = 'Ovf';
    this.RIFT_NAME = 'RIFT.ware 5.3';
    this.DISABLED_FORM_GROUP = 'form-group disabled';
    this.FORM_GROUP = 'form-group';
    this.INPUT_PLACEHOLDER = "Type here";
    this.VIM_TOOLTIP = TOOLTIPS.VIM_TOOLTIP
    this.ORCH_TOOLTIP = TOOLTIPS.ORCH_TOOLTIP
    this.VNF_TOOLTIP = TOOLTIPS.VNF_TOOLTIP;
    this.VNF_DESCRIPTION_TOOLTIP = TOOLTIPS.VNF_DESCRIPTION_TOOLTIP;
    this.VNFD_NAME_TOOLTIP = TOOLTIPS.VNFD_NAME_TOOLTIP;
    this.IMAGE_TOOLTIP = TOOLTIPS.IMAGE;
    this.DISK_TOOLTIP = TOOLTIPS.DISK;
    this.FLAVOR_TOOLTIP = TOOLTIPS.FLAVOR_TOOLTIP;
    this.FLAVOR_NAME_TOOLTIP = TOOLTIPS.FLAVOR_NAME_TOOLTIP;
    this.VMDK_TOOLTIP = TOOLTIPS.VMDK_TOOLTIP;
	
	/*this.BusType = ['IDE','LSI Logic Parallel(SCSI)','LSI Logic SAS(SCSI)','BusLogic Parallel(SCSI)','Paravirtual','SATA'];
	this.SCSI_BusNumber = [0,1,2,3];
	this.SATA_BusNumber = [0,1,2,3];
	this.IDE_BUSNumeber = [0,1];
	
	this.MAX_SCSI_UnitNumber = 16;
	this.MAX_SATA_UnitNumber = 30;
	this.SCSI_UnitNumber = []
	this.SATA_UnitNumber = []
	this.IDE_UnitNumeber = 1;
	
	this.NumDisk = new Array(16);
	for (i = 0; i < this.numberOfVMs; i++) {
		this.NumDisk[i] = 1;
	}
	
	//for (i = 0; i < this.numberOfVMs; i++) {	
		for (var u = 0; u < this.MAX_SCSI_UnitNumber; u++) {
			this.SCSI_UnitNumber [u] = u;
		}
	//}
	
	//for (i = 0; i < this.numberOfVMs; i++) {	
		for (var u = 0; u < this.MAX_SATA_UnitNumber; u++) {
			this.SATA_UnitNumber [u] = u;
		}
	//}
	
	 */

	//vnf VMs
	
	const vm_config = dataService.getVnfDefinition();
	this.numberOfVMs = vm_config.numberOfVMs;
	this.VMsIndices = vm_config.VMsIndices;
	this.VIMType = vm_config.VIMType
	this.OrchType = vm_config.OrchType
	console.log(this.VMsIndices);
	console.log(this.numberOfVMs);
	console.log(vm_config);
	
	this.VIMTypeSelected = this.VIMType;
	this.OrchTypeSelected = this.OrchType ;
	
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
	
	this.isVCD = function() {
      return this.VIMTypeSelected === this.VCD_NAME;
    };
	
	 this.isOVF = function() {
      return this.OrchTypeSelected === this.OVF_NAME;
    };
	
	// VNF configuration
    var config = dataService.getVnfConfiguration();
	
	 //Image array
	this.Image = config.Image;
	this.indices = config.ImageIndices;
	this.DiskIndices = config.DiskIndices;
	
	//Availability_zone	
	/*this.Availability_zone = config.Availability_zone
	for (let d = 0; d <this.Availability_zone.length; d++){
			     
		this.Availability_zone[d] = this.Availability_zone[d] || '';
	}*/
	
	
	//Huge pages
	this.Huge_pages = config.Huge_pages
    for (let d = 0; d <this.Huge_pages.length; d++){
        this.Huge_pages[d] = this.Huge_pages[d];
    }
	// CPU 
	if(this.isVCD() && this.isOVF() ) {  
		this.vCPUs = dataService.getVCPUs_ovf();
	} else {
		
		this.vCPUs = dataService.getVCPUs();
	}
	
	this.vCPU = config.vCPU;
	this.vCPUSelected = this.vCPU;
	for (let c = 0; c <this.vCPU.length; c++){
			     
		this.vCPUSelected[c] = this.vCPU[c] || 1;	  
	}
    
    
	//RAM
	//this.RAMs = dataService.getRAMs();
	if(this.isVCD() && this.isOVF() ) {  
		this.RAMs = dataService.getRAMs_ovf();
	} else {
		
		this.RAMs = dataService.getRAMs();
	}
	this.RAM = config.RAM;
	this.RAMSelected = this.RAM;
	for (let r = 0; r <this.RAM.length; r++){
			     
		this.RAMSelected[r] = this.RAM[r] || '1';	  
	}
    
	// Flavor
        this.Flavors = dataService.getFlavors();
	this.Flavor = config.Flavor
	this.FlavorSelected = this.Flavor;
	for (let fl = 0; fl <this.Flavor.length; fl++){
			     
		this.FlavorSelected[fl] = this.Flavor[fl] || this.Flavors[Object.keys(this.Flavors)[0]];	  
	}
   
    this.flavorname = config.flavorname;
	
	
	//number of disk dispaly 
	
	//Disk
	this.Disk = config.Disk
	for (i = 0; i < this.numberOfVMs; i++) {
		for (let d = 0; d <this.Disk[i].length; d++){
					 
			this.Disk[i][d] = this.Disk[i][d] || 16;
		}
	}
    // VMDK 
	this.VMDK = config.VMDK
    /*for (i = 0; i < this.numberOfVMs; i++) {
		for (let d = 0; d <this.VMDK.length; d++){
        this.VMDK[i][d] = this.VMDK[i][d];
		}
    }*/
	
	this.Diskshow = new Array(this.DiskIndices);
	for (var i = 0; i < this.DiskIndices; i++) {
		this.Diskshow [i] = new Array(this.DiskIndices);
	}
	
	
	/*this.NICs = config.NICs;
	this.NetworkSelected = this.NICs;
	for (var i = 0; i < this.numberOfVMs; i++) {
		for (let n = 0; n <this.NICs.length; n++){
					 
			this.NetworkSelected[i][n] = this.NICs[i][n] || this.Networks[Object.keys(this.Networks)[0]];	  
		}
	}*/
	
	this.BusType = config.BusType;

	this.BusTypeSelected = this.BusType;
	
	
	this.UnitNumer = config.UnitNumer;
	this.UnitNumerSelected = this.UnitNumer;
	
	this.BusNumer = config.BusNumer;
	this.BusNumerSelected = this.BusNumer;
	
	for (var i = 0; i < this.numberOfVMs; i++) {
			
		for (var b = 0; b < this.BusType[i].length ; b++) {
		  this.BusTypeSelected[i][b] = this.BusTypeSelected[i][b] || "Select Bus Type"
	
		}
	
	}
	
	for (var i = 0; i < this.numberOfVMs; i++) {
			
		for (var b = 0; b < this.BusNumer[i].length ; b++) {
		  this.BusNumerSelected[i][b] = this.BusNumerSelected[i][b] || 'Bus No.'
	
		}
	
	}
	
	for (var i = 0; i < this.numberOfVMs; i++) {
			
		for (var b = 0; b < this.UnitNumer[i].length ; b++) {
		  this.UnitNumerSelected[i][b] = this.UnitNumerSelected[i][b] || 'Unit No.'
	
		}
	
	}
	
	this.NumDisk = config.numberOfDisks;
	
		
	this.BusTypeList = dataService.getBusTypeList();
	this.SCSI_BusNumber = dataService.getSCSI_SATA_BusNumber();
	this.SATA_BusNumber = dataService.getSCSI_SATA_BusNumber();
	this.IDE_BUSNumeber = dataService.getIDE_BusNumeber();
	
	this.SCSI_UnitNumber = dataService.getSCSI_UnitNumber();
	this.SATA_UnitNumber = dataService.getSATA_UnitNumber();
	this.IDE_UnitNumer   = dataService.getIDE_UnitNumeber();
	
	
		
	/*for (i = 0; i < this.numberOfVMs; i++) {
		
		this.NumDisk[i] = this.NumDisk[i] || 1 ;
		
		for (nd = 0; nd < this.NumDisk[i]; nd++) {
						
			this.BusTypeSelected[i][nd] = this.BusType[i][nd] || this.BusTypeList[0];
			this.UnitNumerSelected[i][nd] = this.UnitNumer[i][nd] || this.SCSI_UnitNumber[0]; 
			this.BusNumerSelected[i][nd] =  this.BusNumer[i][nd] || this.SCSI_BusNumber[0];
			//alert("I m aher")
		}
	}*/
	
	
	
	/*console.log(this.SATA_UnitNumber);
	console.log(this.SCSI_UnitNumber);
	this.BusTypeSelected = [new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
	this.UnitNumer =[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
	this.BusNumer =[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
	
	this.UnitNumerSelected =[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
	this.BusNumerSelected =[new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10),new Array(10)];
	 
	
	 for (i = 0; i < this.numberOfVMs; i++) {
		for (nd = 0; nd < this.NumDisk[i]; nd++) {
			this.BusTypeSelected[i][nd] = 'LSI Logic Parallel(SCSI)'
			this.UnitNumerSelected[i][nd] =  this.SCSI_BusNumber[0]
			this.BusNumerSelected[i][nd] =  this.SCSI_UnitNumber[0];
		}
	}
	*/
	this.BusNumerList = new Array(this.numberOfVMs);
	this.UnitNumerList = new Array(this.numberOfVMs);
	for (i = 0; i < this.numberOfVMs; i++) {
		this.BusNumerList[i] =[new Array(this.NumDisk[0])];
		this.UnitNumerList[i] =[new Array(this.NumDisk[0])];
	}
	console.log("Start");
	console.log(this.BusTypeSelected);
	console.log(this.UnitNumerSelected);
	console.log(this.BusNumerSelected);
	console.log("end");
	 $scope.$watch(() => {
		
		for (i = 0; i < this.numberOfVMs; i++) {
				this.Diskshow[i] = [];
			for (j = 0; j < this.NumDisk[i]; j++) {
				this.Diskshow[i][j] = true;
				}
				
			console.log("Diskshow")	
			console.log(this.Diskshow)
		}
		
		for (i = 0; i < this.numberOfVMs; i++) {
			for (nd = 0; nd < this.NumDisk[i]; nd++) {
				
				//if(this.BusTypeSelected[i][nd] == 'IDE' ){alert(this.BusTypeSelected[i][nd])}
				
				if(this.BusTypeSelected[i][nd] =="" || this.BusTypeSelected[i][nd] =='Select Bus Type'){
					
					this.BusNumerList[i][nd] =  ['Bus No.']
					this.UnitNumerList[i][nd] =  ['Unit No.'];
				}
				
				if(this.BusTypeSelected[i][nd] === 'LSI Logic Parallel(SCSI)' || this.BusTypeSelected[i][nd] =='LSI Logic SAS(SCSI)' || this.BusTypeSelected[i][nd] =='BusLogic Parallel(SCSI)' || this.BusTypeSelected[i][nd] =='Paravirtual'){
					this.BusNumerList[i][nd]=  this.SCSI_BusNumber
					this.UnitNumerList[i][nd] =  this.SCSI_UnitNumber;
					//alert("in SCSI")
				}else if(this.BusTypeSelected[i][nd] === 'SATA' ){
					 this.BusNumerList[i][nd] =  this.SATA_BusNumber 
					 this.UnitNumerList[i][nd] =  this.SATA_UnitNumber;
					 //alert("in SATA")
				}else if(this.BusTypeSelected[i][nd] === 'IDE' ){
					this.BusNumerList[i][nd] = this.IDE_BUSNumeber
					this.UnitNumerList[i][nd] = this.IDE_UnitNumer ;
					//alert("in IDE")
					//this.IDE_UnitNumeber = 1;
				}  
			}	
			
		}
		
	 });
	 
		
	 
    this.forms = {};
    this.formSubmit = false;
    this.isOS_Subnet = function(){
	if((this.VIMType == 'OpenStack') && (this.OrchType == 'Heat' || this.OrchType == 'Cloudify 3.4' || this.OrchType == 'Cloudify 4.2' )){
               return true;
            }
           else{
              return false;
           }
    }    
    this.isOS_Heat = function() {
            if((this.OrchType == 'Heat' ) && (this.VIMType == 'OpenStack')){
               return true;
            }
           else{
              return false;
           }
         };

    

    this.isVCDClass = function() {
      return this.isVCD() ? this.FORM_GROUP : this.DISABLED_FORM_GROUP;
    };

    this.isOpenStack = function() {
      return this.VIMTypeSelected === this.OPENSTACK_NAME;
    };

    this.isOpenStackClass = function() {
      return this.isOpenStack() ? this.FORM_GROUP : this.DISABLED_FORM_GROUP;
    };

    this.isOpenStackOSMClass = function() {
      return ((this.isOpenStack()) &&(this.isOSM() || this.isRIFT()))? this.FORM_GROUP : this.DISABLED_FORM_GROUP;
    };
   
    this.isOSM = function() {
      return this.OrchTypeSelected === this.OSM_NAME;
    };

   

    this.isRIFT = function() {
      return this.OrchTypeSelected === this.RIFT_NAME || this.OrchTypeSelected === 'RIFT.ware 6.1';
    };
    
    this.isOVF_VCDClass = function(index) {
        if(this.isVCD() &&(this.OrchTypeSelected == 'OVF')){
            return this.FORM_GROUP;
        }
        else{
            return this.DISABLED_FORM_GROUP;
        }
    };
 
    this.isOSM_VCDClass = function(index) {
        if((this.FlavorSelected[index] == "auto") &&(this.isOpenStack()) &&(this.OrchTypeSelected == 'TOSCA 1.1')){
            return this.FORM_GROUP;
        }
        else{
            return ((this.isOSM())|| (this.isRIFT()) || (this.isVCD())) ? this.DISABLED_FORM_GROUP : this.FORM_GROUP;
        }
    };
    
    this.isOSM_TOSCA_CUSTOM_FLAVOR_Class = function(index) {
        if((this.FlavorSelected[index] == "auto") &&(this.isOpenStack()) &&(this.OrchTypeSelected == 'TOSCA 1.1' || this.OrchTypeSelected == 'Cloudify 3.4' || this.OrchTypeSelected == 'Cloudify 4.2'|| this.OrchTypeSelected == 'Heat' )){
	     return this.FORM_GROUP
        }
        else{
           return this.DISABLED_FORM_GROUP;
        }
    };
    
    this.isOSM_or_VCD_Class = function(index) {
        if((this.FlavorSelected[index] == "auto") &&(this.isOpenStack()) &&(this.OrchTypeSelected == 'TOSCA 1.1' || this.OrchTypeSelected == 'Cloudify 3.4' || this.OrchTypeSelected == 'Cloudify 4.2'|| this.OrchTypeSelected == 'Heat' )){
	     return this.FORM_GROUP
        }
        else{
           return ((this.isOSM())|| (this.isRIFT()) || (this.isVCD())) ? this.FORM_GROUP : this.DISABLED_FORM_GROUP;
        }
    };
    this.isOSM_or_VCD_and_NONE_Class = function(index) {
        if((this.FlavorSelected[index] == "auto") &&(this.isOpenStack()) &&(this.OrchTypeSelected == 'TOSCA 1.1' || this.OrchTypeSelected == 'Cloudify 3.4' || this.OrchTypeSelected == 'Cloudify 4.2'|| this.OrchTypeSelected == 'Heat' )){
	     return this.FORM_GROUP
        }
        else if (this.isVCD() && this.OrchTypeSelected != 'Ovf'){
           return this.FORM_GROUP;
        }
        else{
           return ((this.isOSM())|| (this.isRIFT()) || (this.isVCD() && this.OrchTypeSelected != 'Heat')) ? this.FORM_GROUP : this.DISABLED_FORM_GROUP;
        }
    };
    
    this.isDISK_RAM_CPU = function(){
      if(this.isVCD() || (this.isOpenStack() && (this.isOSM() || this.isRIFT()))){
          return true;
        }
        else{
            return false;
        }
    }


   
	
    this.isCUSTOM_FLAVOR = function(index) {
        if(this.FlavorSelected[index] == "auto"){     
            return true;
        }
        else{
            return false;
        }
    };
    this.isOSM_And_VCD = function() {
        return ((this.isOSM() || this.isRIFT()) && (this.isVCD())) ? true : false;
    };
    this.onVNFTypeChange = function(newValue) {
      this.vnfDescription = newValue;
    };

    this.uploadfilename = function(filename) {
        this.uploadfile = filename; 
        util.print("FileName = " + this.uploadfile); 
    };
	
		
    dataService.setSubmitCallback( function () {
      this.formSubmit = true;

      var isValid = this.forms.vnfDefinitionForm.$valid;
	  //alert(isValid)
	  isValid = true;
	  
	  this.validCnt = 0 ;
	  for (i = 0; i < this.numberOfVMs; i++) {
		  
		  //alert(this.Image[i]);
		  if( (typeof this.Image[i] == 'undefined') || (this.Image[i] =="")){
			  
			  this.validCnt++;
		  }
			  
		 /* }else if ((typeof this.Disk[i] == 'undefined') || (this.Disk[i] =="") || (this.Disk[i] == 0)|| isNaN(this.Disk[i]))
                  {
                      this.validCnt++;
          }else if ((this.OrchTypeSelected == 'Ovf') && ((typeof this.VMDK[i] == 'undefined') || (this.VMDK[i] =="") || (this.VMDK[i] == 0))){
                      this.validCnt++;
                  } */
				  
		 if(this.OrchTypeSelected == 'Ovf'){
			 
			 for (let d = 0; d < this.NumDisk[i]; d++){
					 
				 
					if ((typeof this.Disk[i][d] == 'undefined') || (this.Disk[i][d] =="") || (this.Disk[i][d] == 0)|| isNaN(this.Disk[i][d]))
					{
						this.validCnt++;
					}else if ((typeof this.VMDK[i][d] == 'undefined') || (this.VMDK[i][d] =="") || (this.VMDK[i][d] == 0)){
						
						this.validCnt++;
					}else if((typeof this.BusTypeSelected[i][d] == 'undefined') || (this.BusTypeSelected[i][d] == "") || (this.BusTypeSelected[i][d] === 'Select Bus Type')){ 
						//if((this.BusTypeSelected[i][nd] !== 'LSI Logic Parallel(SCSI)' || this.BusTypeSelected[i][nd] =='LSI Logic SAS(SCSI)' || this.BusTypeSelected[i][nd] =='BusLogic Parallel(SCSI)' || this.BusTypeSelected[i][nd] =='Paravirtual' || this.BusTypeSelected[i][nd] === 'SATA' || this.BusTypeSelected[i][nd] === 'IDE')){ 
						//if((typeof this.BusTypeSelected[i][d] == 'undefined') || (this.BusTypeSelected[i][nd] == "") || (this.BusTypeSelected[i][nd] === 'Select Bus Type')){
						//alert(this.BusTypeSelected[i][d]);
						//alert(this.BusNumerSelected[i][d]);
						//alert(this.UnitNumerSelected[i][d]);
						this.validCnt++
						
					}else if((typeof this.BusNumerSelected[i][d] == 'undefined') || (this.BusNumerSelected[i][d] =="") || this.BusNumerSelected[i][d] === 'Bus No.'){
						
						this.validCnt++
						
					}else if((typeof this.UnitNumerSelected[i][d] == 'undefined') || this.UnitNumerSelected[i][d] =="" || this.UnitNumerSelected[i][d] ==='Unit No.'){
						
						this.validCnt++
						
					}
					
				
			}
			 
			 
			 
		 }else{
			 
			 for (let d = 0; d < this.NumDisk[i]; d++){
					 
				 
					if ((typeof this.Disk[i][d] == 'undefined') || (this.Disk[i][d] =="") || (this.Disk[i][d] == 0)|| isNaN(this.Disk[i][d]))
					{
						this.validCnt++;
					}
					
				
			}
			 
		 }		  
				
		
	  }
	  
	  console.log("M hare ");
	  
	  console.log(this.validCnt);
	  
	  
	  if(this.validCnt){
		  isValid = false;
	  }	  
	  
	  console.log(this.validCnt);
	  
	  console.log("M ahe");
	 // isValid = true;
      if( isValid ) {
		  
		  
		if(this.VIMTypeSelected == 'vCloud Director' || (this.VIMTypeSelected == 'OpenStack' &&  (this.OrchTypeSelected == 'OSM 3.0' || this.OrchTypeSelected == 'RIFT.ware 5.3' || this.OrchTypeSelected == 'RIFT.ware 6.1'))) {
		        for (let cf = 0; cf <this.Flavor.length; cf++){
			    if(this.Flavor[cf] == 'auto'){			
				this.Flavor[cf] = this.Flavors[Object.keys(this.Flavors)[0]];	  
			    }
			}
			this.FlavorSelected = this.Flavor;
			this.flavorname = ['', '', '', '', '',''];
		}
		for (let fl = 0; fl <this.Flavor.length; fl++){
			if((this.FlavorSelected[fl] != 'auto' && ( this.VIMTypeSelected == 'OpenStack' &&  (this.OrchTypeSelected == 'TOSCA 1.1' || this.OrchTypeSelected == 'Cloudify 3.4' || this.OrchTypeSelected == 'Cloudify 4.2' || this.OrchTypeSelected == 'Heat')))){
				this.Disk[fl] = this.Disk[fl] || '10';
				this.RAMSelected[fl] = this.RAM[fl] || '1';
				this.vCPUSelected[fl] = this.vCPU[fl] || '0';	 
				this.flavorname[fl] = "";
			}
		}

		for (i = 0; i < this.numberOfVMs; i++) {		
		     if(this.vCPUSelected[i] == 'None'){ 
			this.vCPUSelected[i] = 1;
		      }
	
		}	
		var config = {
			Availability_zone: this.Availability_zone,      
		        Image: this.Image,
			vCPU: this.vCPUSelected,
			RAM: this.RAMSelected,
			Disk: this.Disk,
			VMDK: this.VMDK,
			Huge_pages: this.Huge_pages,
			Flavor: this.FlavorSelected,
			flavorname: this.flavorname,
			BusType : this.BusTypeSelected,
			UnitNumer : this.UnitNumerSelected,
			BusNumer :this.BusNumerSelected,
			numberOfDisks : this.NumDisk,
			ImageIndices : this.indices,
			DiskIndices : this.DiskIndices			
			
		};
		//console.log(config);
        dataService.setVNFC( config);
		console.log("getVnfConfiguration");
		console.log(dataService.getVnfConfiguration());
      }

      return isValid;
    }.bind(this));
  }
};
