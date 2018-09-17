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
const FLAVORS = require('../config/flavors.json');
const OS_NETWORKS = require('../config/openstack_networks.json');
const VCD_NETWORKS = require('../config/vcd_networks.json');
const VNF_TYPES = require('../config/vnf_types.json');

module.exports = function ($http) {
  "ngInject";

  let _vnfConfiguration = {};
  let _vnfDefinition = {};
  let _nicDefinition = {};
  let __epaDefinition ={};
  let _scriptsDefinition = {};
  let _scripts = {};
  let _username = '';
  let _session_key = '';

  const _vnfTypes = VNF_TYPES;
  const _vCPUs_ovf = [1, 2, 4, 8, 16,32,64,128];
  const _vCPUs = [1, 2, 4, 8, 16,32];
  const _RAMs = [1, 2, 4, 8, 16, 32, 64, 128];
  const _RAMs_ovf = [1, 2, 4, 8, 16, 32, 64, 128, 256,512,1024,2048,4096,6128];
  const _Flavors = FLAVORS;
  const _VcdNetworks = VCD_NETWORKS;
  const _OsNetworks = OS_NETWORKS;
  
  this.populateVMData = function(numberOfVMs) {
   
	for (let i = 0; i < numberOfVMs; i++){
	}
   
 };

  this.populateData = function() {
	  
   _vnfDefinition = {
      VIMType: 'vCloud Director',
      OrchType: 'OSM 3.0',
      OType: 'T.1',
      VNFType: 'vRouter',
      VNFDescription: '',
      VNFDname:'',  
      numberOfVMs : 1 ,
      VMsIndices : [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
      possibleNumbersOfVMs : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    };
	 
	 
    _vnfConfiguration = {
      
      ImageIndices: [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],	  
      vCPU: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      RAM: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      Disk: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  Huge_pages: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      VMDK: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      Image: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      Flavor: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      flavorname: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','','']
    };
	
	 _networkConfiguration = {
          numberOfNetworks: 1,
	  mgmtNetwork:'',
	  SubnetCidr:'',
	  mgmtNetworkEthernetType:'',
          Networks: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  NewNetwork:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  Subnet:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  Edge_Gateway:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Network_Name:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Static_Range:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Static_Start:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Static_end:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Netmask:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          Gateway_IP:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          DNS1:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          DNS2:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          DNS_Suffix:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          DHCP_Start:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          DHCP_End:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  OrgVdc_Network:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  OrgVdcNetwork:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  Parent_Network:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  Network_Type:['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type','Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type','Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type','Select Type','Select Type'],
	  ParentNetwork_Type:['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          NetworkIndices: [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
	  NetworksType: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
	  EthernetType: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
          create_mgmt_network : false
    };
	
    _nicDefinition = {
      numberOfNICs: ['', '', '', '', '','','', '', '', '', '','','', '', '', '', '','','',''],
      NICs: [['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''],['', '', '', '', '',''],['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''],['', '', '', '', '',''],['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''], ['', '', '', '', '',''],['', '', '', '', '',''],['', '', '', '', '',''],['', '', '', '', '','']],
	  Interfaces:[['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'], ['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type'],['Select Type', 'Select Type', 'Select Type', 'Select Type', 'Select Type','Select Type']],
      NICsIndices: [0, 1, 2, 3, 4, 5,6,7,8,9]
    };
   
     _epaDefinition = {
      NumaAffinity: [false, false, false, false, false,false,false, false, false, false, false,false,false, false, false, false, false,false,false,false],
	  MemoryReservation: [false, false, false, false, false,false,false, false, false, false, false,false,false, false, false, false, false,false,false,false],
	  LatencySensitivity: [false, false, false, false, false,false,false, false, false, false, false,false,false, false, false, false, false,false,false,false],
	  NumberNumaNode:[1,1,1, 1, 1,1,1,1,1, 1, 1,1,1,1,1, 1, 1,1,1,1],
	  SRIOVInterfaces:['', '', '', '', ''],
	  SRIOVInterfacesIndices:[1, 2, 3, 4, 5],
      Huge_Pages: [false, false, false, false, false,false,false, false, false, false, false,false,false, false, false, false, false,false,false,false]
    };

    _scripts = {
		
      'create': [
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', 
						value: ''
					  }, 
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  },
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', 
						value: ''
					  }, 
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  },
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', 
						value: ''
					  }, 
					  {
						text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  },
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }, 
					  { text: "Create Script",
						tooltip: TOOLTIPS.CREATE,
						id: 'create_url',
						name: 'create', value: ''
					  }
	  ],
      'configure':[ 
					  {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  }, {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },
					  {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  }, {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  } ,
					  {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  }, {
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  },{
						text: "Configure Script",
						tooltip: TOOLTIPS.CONFIGURE,
						id: 'configure_url',
						name: 'configure', value: ''
					  } 
	  ],
      'delete': [
					  {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  }, {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },
					  {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  }, {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },
					  {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  }, {
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  },{
						text: "Delete Script ",
						tooltip: TOOLTIPS.DELETE,
						id: 'delete_url',
						name: 'delete', value: ''
					  }
	  ]
    };

    let _scriptsDefinition = {};
	
	_gitUpload ={
		
	  UploadGit: false
	}
  };

  
  this.populateData();

  this.update = function () {
    return true;
  };

  this.setSubmitCallback = function (callback) {
    this.update = callback;
  };

  this.getScripts = function () {
    return _scripts;
  };

  this.setSelectBlueprint = function (select_blueprint) {
    _vnfSelectBlueprint = select_blueprint;
  };
  
  this.setVNFD = function (vnf) {
    _vnfDefinition = vnf;
  };
  this.setVNFC = function (vnf) {
    _vnfConfiguration = vnf;
  };
  this.setNETC = function (nets) {
    _networkConfiguration = nets;
  };
  
   
  this.setNICs = function (nics) {
    _nicDefinition = nics;
  };
  
  this.setEPA = function (epa) {
    _epaDefinition = epa;
  };
  this.setScripts = function (scripts) {
    _scriptsDefinition = scripts;
  };

  this.setgitUpload = function (uploadData) {
    _gitUpload = uploadData;
  };
  
  this.getgitUpload = function () {
    return _gitUpload;
  };
  
  this.getVnfDefinition = function () {
    return _vnfDefinition;
  };
  this.getNicDefintion = function () {
    return _nicDefinition;
  };
  this.getEpaDefintion = function () {
    return _epaDefinition;
  };
  this.getScriptsDefinition = function () {
    return _scriptsDefinition;
  };
  this.getVCPUs = function () {
    return _vCPUs;
  };
  this.getVCPUs_ovf = function () {
    return _vCPUs_ovf;
  };
  this.getRAMs = function () {
    return _RAMs;
  };
  this.getRAMs_ovf = function () {
    return _RAMs_ovf;
  };
  this.getFlavors = function () {
    return _Flavors;
  };
  this.getOsNetworks = function () {
    return _OsNetworks;
  };
  this.getVcdNetworks = function () {
    return _VcdNetworks;
  };
 
  this.getVNFTypes = function () {
    return _vnfTypes;
  };
  this.getVnfConfiguration = function () {
    return _vnfConfiguration;
  };
  this.getNetworkConfiguration = function () {
    return _networkConfiguration;
  };
  
  this.setusername = function(username) {
    //console.log(username);
    _username = username;
 };

 this.setsessionkey = function(session_key) {
   //console.log(session_key);
   _session_key = session_key;
 };


  this.sendData = function (callback) {
    $http({
      method: 'POST',
      url: 'http://' + location.hostname + ':5000' + '/backend' + '/multivdu_blueprint',
      responseType: 'arraybuffer',
      headers: {'Authorization': _session_key,'username': _username},	
      data: this.generateInputs()
    }).then(function successCallback(response) {
      var name = _vnfDefinition.VNFType + '-' + _vnfDefinition.VIMType + '-' +  _vnfDefinition.VNFDname + '.zip'
      callback(response.data, name);
    }, function errorCallback(response) {
      console.error(response);
    });
  };

  this.generateInputs = function () {
    const inputs = {
	  vim_params :{
		env_type: _vnfDefinition.VIMType,
                orch_type: _vnfDefinition.OrchType,
                vnf_type: _vnfDefinition.VNFType,
                vnfd_name: _vnfDefinition.VNFDname,
                vnf_description: _vnfDefinition.VNFDescription,
		mgmt_network: _networkConfiguration.mgmtNetwork,
		subnet_cidr: _networkConfiguration.SubnetCidr,
                create_mgmt_network : _networkConfiguration.create_mgmt_network,
		mgmt_network_ethernet_type : _networkConfiguration.mgmtNetworkEthernetType,
		git_upload : _gitUpload.UploadGit 
	  },
	  
      params: []
    };
	
	for (let i = 0; i <_networkConfiguration.Networks.length; i++){
		  if (_networkConfiguration.Networks[i].trim()){
			inputs.vim_params['Network' + (_networkConfiguration.NetworkIndices[i] + 1) + '_name'] = _networkConfiguration.Networks[i].trim();
		  }
		}
		
	for (let i = 0; i <_networkConfiguration.NewNetwork.length; i++){
		  if (_networkConfiguration.NewNetwork[i]){
			  inputs.vim_params['Create Network' + ( i + 1 ) ] = _networkConfiguration.NewNetwork[i];
		  }
		}
		
	for (let i = 0; i <_networkConfiguration.OrgVdcNetwork.length; i++){
		  if (_networkConfiguration.OrgVdc_Network[i]){
			  inputs.vim_params['Parent_OrgVdc_Network' + ( i + 1 ) ] = _networkConfiguration.OrgVdc_Network[i];
		  }
		}
	
	for (let i = 0; i <_networkConfiguration.OrgVdcNetwork.length; i++){
		  if (_networkConfiguration.OrgVdcNetwork[i]){
			  inputs.vim_params['Connect_OrgVdcNetwork' + ( i + 1 ) ] = _networkConfiguration.OrgVdcNetwork[i];
		  }
		}
	
	
	for (let i = 0; i <_networkConfiguration.Subnet.length; i++){
		  if (_networkConfiguration.Subnet[i]){
			  inputs.vim_params['Subnet_Network' + ( i + 1 ) ] = _networkConfiguration.Subnet[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Edge_Gateway.length; i++){
		  if (_networkConfiguration.Edge_Gateway[i]){
			  inputs.vim_params['Edge_Gateway_Network' + ( i + 1 ) ] = _networkConfiguration.Edge_Gateway[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.DNS_Suffix.length; i++){
		  if (_networkConfiguration.DNS_Suffix[i]){
			  inputs.vim_params['DNS_Suffix_Network' + ( i + 1 ) ] = _networkConfiguration.DNS_Suffix[i];
		  }
		}


/*	for (let i = 0; i <_networkConfiguration.DNS.length; i++){
		  if (_networkConfiguration.DNS[i]){
			  inputs.vim_params['DNS_Network' + ( i + 1 ) ] = _networkConfiguration.DNS[i];
		  }
		}
*/
	for (let i = 0; i <_networkConfiguration.DNS1.length; i++){
		  if (_networkConfiguration.DNS1[i]){
			  inputs.vim_params['DNS1_Network' + ( i + 1 ) ] = _networkConfiguration.DNS1[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.DNS2.length; i++){
		  if (_networkConfiguration.DNS2[i]){
			  inputs.vim_params['DNS2_Network' + ( i + 1 ) ] = _networkConfiguration.DNS2[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Gateway_IP.length; i++){
		  if (_networkConfiguration.Gateway_IP[i]){
			  inputs.vim_params['Gateway_IP_Network' + ( i + 1 ) ] = _networkConfiguration.Gateway_IP[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Netmask.length; i++){
		  if (_networkConfiguration.Netmask[i]){
			  inputs.vim_params['Netmask_Network' + ( i + 1 ) ] = _networkConfiguration.Netmask[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Network_Name.length; i++){
		  if (_networkConfiguration.Network_Name[i]){
			  inputs.vim_params['Network_Name_Network' + ( i + 1 ) ] = _networkConfiguration.Network_Name[i];
		  }
		}


	for (let i = 0; i <_networkConfiguration.Static_Range.length; i++){
		  if (_networkConfiguration.Static_Range[i]){
			  inputs.vim_params['Static_Range' + ( i + 1 ) ] = _networkConfiguration.Static_Range[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Static_Start.length; i++){
		  if (_networkConfiguration.Static_Start[i]){
			  inputs.vim_params['Static_Range_Start_Ip' + ( i + 1 ) ] = _networkConfiguration.Static_Start[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.Static_end.length; i++){
		  if (_networkConfiguration.Static_end[i]){
			  inputs.vim_params['Static_Range_End_Ip' + ( i + 1 ) ] = _networkConfiguration.Static_end[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.DHCP_Start.length; i++){
		  if (_networkConfiguration.DHCP_Start[i]){
			  inputs.vim_params['DHCP_Start_Network' + ( i + 1 ) ] = _networkConfiguration.DHCP_Start[i];
		  }
	}

	for (let i = 0; i <_networkConfiguration.DHCP_End.length; i++){
		  if (_networkConfiguration.DHCP_End[i]){
			  inputs.vim_params['DHCP_End_Network' + ( i + 1 ) ] = _networkConfiguration.DHCP_End[i];
		  }
	}

	for (let i = 0; i <_networkConfiguration.NetworksType.length; i++){
		  if (_networkConfiguration.NetworksType[i]){
			  inputs.vim_params['Network' + ( i + 1 ) + '_type' ] = _networkConfiguration.NetworksType[i];
		  }
		}

	for (let i = 0; i <_networkConfiguration.EthernetType.length; i++){
		  if (_networkConfiguration.EthernetType[i]){
			  inputs.vim_params['Ethernet' + ( i + 1 ) + '_type' ] = _networkConfiguration.EthernetType[i];
		  }
		}

	 for (let i = 0; i <_networkConfiguration.Parent_Network.length; i++){
                  if (_networkConfiguration.Parent_Network[i]){
                          inputs.vim_params['Parent_Network' + ( i + 1 ) ] = _networkConfiguration.Parent_Network[i];
                  }
                }
	
	 for (let i = 0; i <_networkConfiguration.ParentNetwork_Type.length; i++){
                  if (_networkConfiguration.ParentNetwork_Type[i]){
                          inputs.vim_params['ParentNetwork' + ( i + 1 ) + '_type' ] = _networkConfiguration.ParentNetwork_Type[i];
                  }
                }
	
	for (let v = 0; v < _vnfDefinition.numberOfVMs; v++){
		vm_params = {
			image_id: _vnfConfiguration.Image[v],
			flavor: _vnfConfiguration.Flavor[v],
			flavorname: _vnfConfiguration.flavorname[v],
			//cpu: _vCPUs[_vnfConfiguration.vCPU[v]],
			cpu: _vnfConfiguration.vCPU[v],
			disk: _vnfConfiguration.Disk[v],
			//VMDK: _vnfConfiguration.VMDK[v],
			//huge_pages: _epaDefinition.Huge_Pages[v],
			ram: _vnfConfiguration.RAM[v] * 1024,
			numa_affinity : _epaDefinition.NumaAffinity[v],
			memory_reservation: _epaDefinition.MemoryReservation[v],
			latency_sensitivity : _epaDefinition.LatencySensitivity[v],
			number_numa_node: _epaDefinition.NumberNumaNode[v],
			scripts: _scriptsDefinition
		}
		if (_vnfDefinition.OrchType == 'Ovf' ){
		  vm_params['huge_pages'] =  _epaDefinition.Huge_Pages[v];
	          vm_params['VMDK'] = _vnfConfiguration.VMDK[v];
                }
			
		for (let i = 0; i <_nicDefinition.NICs[v].length; i++){
		  if (_nicDefinition.NICs[v][i].trim()){
			vm_params['nic' + (_nicDefinition.NICsIndices[i] + 1) + '_name'] = _nicDefinition.NICs[v][i].trim();
		  }
		}
		
		for (let i = 0; i <_nicDefinition.Interfaces[v].length; i++){
		  if (_nicDefinition.Interfaces[v][i].trim()){
			  vm_params['Interfaces' + ( i + 1 ) + '_name' ] = _nicDefinition.Interfaces[v][i].trim();
		  }
		}
		inputs['params'].push(vm_params)
	}

	console.log("data service");
        console.log(inputs);
	console.log("data service");
    return inputs;
  };
};
