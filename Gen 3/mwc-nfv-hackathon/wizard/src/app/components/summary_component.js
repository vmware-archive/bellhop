/*#############################################################################
##
# Copyright 2017-2018 VMware Inc.
# This file is part of VNF-ONboarding
# All Rights Reserved.
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
 
##
 
############################################################################ */

module.exports = {
  template: require('../templates/summary.html'),
  controller: function (dataService, $scope ) {
    "ngInject";

    dataService.setSubmitCallback(function () {
      return true;
    });
	
	 const config_vnf = dataService.getVnfDefinition();
	 this.numberOfVMs = config_vnf.numberOfVMs;
	 this.VMsIndices = config_vnf.VMsIndices;
	 
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
	
    this.inputs = dataService.generateInputs();
	console.log(this.inputs);
	
	console.log("i am here");
	console.log(this.inputs.params[0].scripts);

    this.inputsNames = {
      'env_type': 'VIM Type',
      'vnf_type': 'VNF Type',
      'orch_type': 'Orchestrator Type',
      'vnf_name': 'VNF Name',
      'vnfd_name': 'VNF Name',
      'image_id': 'Image',
      'vnf_description': 'VNF Description',
      'flavor': 'Flavor ID',
      'flavorname': 'Flavor Name',
      'cpu': 'vCPU',
      'ram': 'RAM (MB)',
      'disk': 'Disk',
      'numa_affinity' : 'Numa Affinity',
      'memory_reservation':'Memory Reservation',
      'latency_sensitivity':'Latency Sensitivity',
      'number_numa_node' : 'Number of Numa Nodes',
      'config': 'Configure Script url',
      'create': 'Create Script url',
      'delete': 'Delete Script url',
      'mgmt_network':'Management Network',
      'SubnetCidr':'Management Subnet Cidr',
      'mgmt_network_ethernet_type' : 'Mgmt Network Ethernet Type',
      'Network1_name': 'Network 1',
      'Network2_name': 'Network 2',
      'Network3_name': 'Network 3',
      'Network4_name': 'Network 4',
      'Network5_name': 'Network 5',
      'Network6_name': 'Network 6',
      'Network7_name': 'Network 7',
      'Network8_name': 'Network 8',
      'Network9_name': 'Network 9',
      'Network10_name': 'Network 10',
      'Network11_name': 'Network 11',
      'Network12_name': 'Network 12',
      'Network13_name': 'Network 13',
      'Network14_name': 'Network 14',
      'Network15_name': 'Network 15',
      'Network16_name': 'Network 16',
      'Network17_name': 'Network 17',
      'Network18_name': 'Network 18',
      'Network19_name': 'Network 19',
      'Network20_name': 'Network 20',
      'NetworkInterface1_name' : 'Enabled Network Interface 1',
      'NetworkInterface2_name' : 'Enabled Network Interface 2',
      'NetworkInterface3_name' : 'Enabled Network Interface 3',
      'NetworkInterface4_name' : 'Enabled Network Interface 4',
      'NetworkInterface5_name' : 'Enabled Network Interface 5',
      'NetworkInterface6_name' : 'Enabled Network Interface 6',
      'NetworkInterface1_name' : 'Enabled Network Interface 1',
      'NetworkInterface2_name' : 'Enabled Network Interface 2',
      'NetworkInterface3_name' : 'Enabled Network Interface 3',
      'NetworkInterface4_name' : 'Enabled Network Interface 4',
      'NetworkInterface5_name' : 'Enabled Network Interface 5',
      'NetworkInterface6_name' : 'Enabled Network Interface 6',
      'NetworkInterface1_name' : 'Enabled Network Interface 1',
      'NetworkInterface2_name' : 'Enabled Network Interface 2',
      'NetworkInterface3_name' : 'Enabled Network Interface 3',
      'NetworkInterface4_name' : 'Enabled Network Interface 4',
      'NetworkInterface5_name' : 'Enabled Network Interface 5',
      'NetworkInterface6_name' : 'Enabled Network Interface 6',
      'NetworkInterface5_name' : 'Enabled Network Interface 5',
      'NetworkInterface6_name' : 'Enabled Network Interface 6',
      'create_mgmt_network':     'Create Management Network',
      'Create Network1': 'Create Network 1',
      'Create Network2': 'Create Network 2',
      'Create Network3': 'Create Network 3',
      'Create Network4': 'Create Network 4',
      'Create Network5': 'Create Network 5',
      'Create Network6': 'Create Network 6',
      'Create Network7': 'Create Network 7',
      'Create Network8': 'Create Network 8',
      'Create Network9': 'Create Network 9',
      'Create Network10': 'Create Network 10',
      'Create Network11': 'Create Network 11',
      'Create Network12': 'Create Network 12',
      'Create Network13': 'Create Network 13',
      'Create Network14': 'Create Network 14',
      'Create Network15': 'Create Network 15',
      'Create Network16': 'Create Network 16',
      'Create Network17': 'Create Network 17',
      'Create Network18': 'Create Network 18',
      'Create Network19': 'Create Network 19',
      'Create Network20': 'Create Network 20',
      'subnet_cidr' :	  'Management Subnet Cidr',
      'Subnet_Network1': 'Subnet Cidr 1',
      'Subnet_Network2': 'Subnet Cidr 2',
      'Subnet_Network3': 'Subnet Cidr 3',
      'Subnet_Network4': 'Subnet Cidr 4',
      'Subnet_Network5': 'Subnet Cidr 5',
      'Subnet_Network6': 'Subnet Cidr 6',
      'Subnet_Network7': 'Subnet Cidr 7',
      'Subnet_Network8': 'Subnet Cidr 8',
      'Subnet_Network9': 'Subnet Cidr 9',
      'Subnet_Network10': 'Subnet Cidr 10',
      'Subnet_Network11': 'Subnet Cidr 11',
      'Subnet_Network12': 'Subnet Cidr 12',
      'Subnet_Network13': 'Subnet Cidr 13',
      'Subnet_Network14': 'Subnet Cidr 14',
      'Subnet_Network15': 'Subnet Cidr 15',
      'Subnet_Network16': 'Subnet Cidr 16',
      'Subnet_Network17': 'Subnet Cidr 17',
      'Subnet_Network18': 'Subnet Cidr 18',
      'Subnet_Network19': 'Subnet Cidr 19',
      'Subnet_Network20': 'Subnet Cidr 20',    
          

      'Edge_Gateway_Network1': 'Edge Gateway 1',
      'Edge_Gateway_Network2': 'Edge Gateway 2',
      'Edge_Gateway_Network3': 'Edge Gateway 3',
      'Edge_Gateway_Network4': 'Edge Gateway 4',
      'Edge_Gateway_Network5': 'Edge Gateway 5',
      'Edge_Gateway_Network6': 'Edge Gateway 6',
      'Edge_Gateway_Network7': 'Edge Gateway 7',
      'Edge_Gateway_Network8': 'Edge Gateway 8',
      'Edge_Gateway_Network9': 'Edge Gateway 9',
      'Edge_Gateway_Network10': 'Edge Gateway 10',
      'Edge_Gateway_Network11': 'Edge Gateway 11',
      'Edge_Gateway_Network12': 'Edge Gateway 12',
      'Edge_Gateway_Network13': 'Edge Gateway 13',
      'Edge_Gateway_Network14': 'Edge Gateway 14',
      'Edge_Gateway_Network15': 'Edge Gateway 15',
      'Edge_Gateway_Network16': 'Edge Gateway 16',
      'Edge_Gateway_Network17': 'Edge Gateway 17',
      'Edge_Gateway_Network18': 'Edge Gateway 18',
      'Edge_Gateway_Network19': 'Edge Gateway 19',
      'Edge_Gateway_Network20': 'Edge Gateway 20',    


      'Static_Range1': 'Static Range 1',
      'Static_Range2': 'Static Range 2',
      'Static_Range3': 'Static Range 3',
      'Static_Range4': 'Static Range 4',
      'Static_Range5': 'Static Range 5',
      'Static_Range6': 'Static Range 6',
      'Static_Range7': 'Static Range 7',
      'Static_Range8': 'Static Range 8',
      'Static_Range9': 'Static Range 9',
      'Static_Range10': 'Static Range 10',
      'Static_Range11': 'Static Range 11',
      'Static_Range12': 'Static Range 12',
      'Static_Range13': 'Static Range 13',
      'Static_Range14': 'Static Range 14',
      'Static_Range15': 'Static Range 15',
      'Static_Range16': 'Static Range 16',
      'Static_Range17': 'Static Range 17',
      'Static_Range18': 'Static Range 18',
      'Static_Range19': 'Static Range 19',
      'Static_Range20': 'Static Range 20',    


      'Netmask_Network1': 'Netmask 1',
      'Netmask_Network2': 'Netmask 2',
      'Netmask_Network3': 'Netmask 3',
      'Netmask_Network4': 'Netmask 4',
      'Netmask_Network5': 'Netmask 5',
      'Netmask_Network6': 'Netmask 6',
      'Netmask_Network7': 'Netmask 7',
      'Netmask_Network8': 'Netmask 8',
      'Netmask_Network9': 'Netmask 9',
      'Netmask_Network10': 'Netmask 10',
      'Netmask_Network11': 'Netmask 11',
      'Netmask_Network12': 'Netmask 12',
      'Netmask_Network13': 'Netmask 13',
      'Netmask_Network14': 'Netmask 14',
      'Netmask_Network15': 'Netmask 15',
      'Netmask_Network16': 'Netmask 16',
      'Netmask_Network17': 'Netmask 17',
      'Netmask_Network18': 'Netmask 18',
      'Netmask_Network19': 'Netmask 19',
      'Netmask_Network20': 'Netmask 20',    


      'Gateway_IP_Network1': 'Gateway IP 1',
      'Gateway_IP_Network2': 'Gateway IP 2',
      'Gateway_IP_Network3': 'Gateway IP 3',
      'Gateway_IP_Network4': 'Gateway IP 4',
      'Gateway_IP_Network5': 'Gateway IP 5',
      'Gateway_IP_Network6': 'Gateway IP 6',
      'Gateway_IP_Network7': 'Gateway IP 7',
      'Gateway_IP_Network8': 'Gateway IP 8',
      'Gateway_IP_Network9': 'Gateway IP 9',
      'Gateway_IP_Network10': 'Gateway IP 10',
      'Gateway_IP_Network11': 'Gateway IP 11',
      'Gateway_IP_Network12': 'Gateway IP 12',
      'Gateway_IP_Network13': 'Gateway IP 13',
      'Gateway_IP_Network14': 'Gateway IP 14',
      'Gateway_IP_Network15': 'Gateway IP 15',
      'Gateway_IP_Network16': 'Gateway IP 16',
      'Gateway_IP_Network17': 'Gateway IP 17',
      'Gateway_IP_Network18': 'Gateway IP 18',
      'Gateway_IP_Network19': 'Gateway IP 19',
      'Gateway_IP_Network20': 'Gateway IP 20',    
  
  
      'DNS_Network1': 'DNS 1',
      'DNS_Network2': 'DNS 2',
      'DNS_Network3': 'DNS 3',
      'DNS_Network4': 'DNS 4',
      'DNS_Network5': 'DNS 5',
      'DNS_Network6': 'DNS 6',
      'DNS_Network7': 'DNS 7',
      'DNS_Network8': 'DNS 8',
      'DNS_Network9': 'DNS 9',
      'DNS_Network10': 'DNS 10',
      'DNS_Network11': 'DNS 11',
      'DNS_Network12': 'DNS 12',
      'DNS_Network13': 'DNS 13',
      'DNS_Network14': 'DNS 14',
      'DNS_Network15': 'DNS 15',
      'DNS_Network16': 'DNS 16',
      'DNS_Network17': 'DNS 17',
      'DNS_Network18': 'DNS 18',
      'DNS_Network19': 'DNS 19',
      'DNS_Network20': 'DNS 20',    
     
           
      'DNS_Suffix_Network1': 'DNS_Suffix 1',
      'DNS_Suffix_Network2': 'DNS_Suffix 2',
      'DNS_Suffix_Network3': 'DNS_Suffix 3',
      'DNS_Suffix_Network4': 'DNS_Suffix 4',
      'DNS_Suffix_Network5': 'DNS_Suffix 5',
      'DNS_Suffix_Network6': 'DNS_Suffix 6',
      'DNS_Suffix_Network7': 'DNS_Suffix 7',
      'DNS_Suffix_Network8': 'DNS_Suffix 8',
      'DNS_Suffix_Network9': 'DNS_Suffix 9',
      'DNS_Suffix_Network10': 'DNS_Suffix 10',
      'DNS_Suffix_Network11': 'DNS_Suffix 11',
      'DNS_Suffix_Network12': 'DNS_Suffix 12',
      'DNS_Suffix_Network13': 'DNS_Suffix 13',
      'DNS_Suffix_Network14': 'DNS_Suffix 14',
      'DNS_Suffix_Network15': 'DNS_Suffix 15',
      'DNS_Suffix_Network16': 'DNS_Suffix 16',
      'DNS_Suffix_Network17': 'DNS_Suffix 17',
      'DNS_Suffix_Network18': 'DNS_Suffix 18',
      'DNS_Suffix_Network19': 'DNS_Suffix 19',
      'DNS_Suffix_Network20': 'DNS_Suffix 20',    
          
      'DHCP_Range_Network1': 'DHCP_Range 1',
      'DHCP_Range_Network2': 'DHCP_Range 2',
      'DHCP_Range_Network3': 'DHCP_Range 3',
      'DHCP_Range_Network4': 'DHCP_Range 4',
      'DHCP_Range_Network5': 'DHCP_Range 5',
      'DHCP_Range_Network6': 'DHCP_Range 6',
      'DHCP_Range_Network7': 'DHCP_Range 7',
      'DHCP_Range_Network8': 'DHCP_Range 8',
      'DHCP_Range_Network9': 'DHCP_Range 9',
      'DHCP_Range_Network10': 'DHCP_Range 10',
      'DHCP_Range_Network11': 'DHCP_Range 11',
      'DHCP_Range_Network12': 'DHCP_Range 12',
      'DHCP_Range_Network13': 'DHCP_Range 13',
      'DHCP_Range_Network14': 'DHCP_Range 14',
      'DHCP_Range_Network15': 'DHCP_Range 15',
      'DHCP_Range_Network16': 'DHCP_Range 16',
      'DHCP_Range_Network17': 'DHCP_Range 17',
      'DHCP_Range_Network18': 'DHCP_Range 18',
      'DHCP_Range_Network19': 'DHCP_Range 19',
      'DHCP_Range_Network20': 'DHCP_Range 20',    
          
      'Network1_type' : 'Network Type 1',
      'Network2_type' : 'Network Type 2',
      'Network3_type' : 'Network Type 3',
      'Network4_type' : 'Network Type 4',
      'Network5_type' : 'Network Type 5',
      'Network6_type' : 'Network Type 6',
      'Network7_type' : 'Network Type 7',
      'Network8_type' : 'Network Type 8',
      'Network9_type' : 'Network Type 9',
      'Network10_type' : 'Network Type 10',
      'Network11_type' : 'Network Type 11',
      'Network12_type' : 'Network Type 12',
      'Network13_type' : 'Network Type 13',
      'Network14_type' : 'Network Type 14',
      'Network15_type' : 'Network Type 15',
      'Network16_type' : 'Network Type 16',
      'Network17_type' : 'Network Type 17',
      'Network18_type' : 'Network Type 18',
      'Network19_type' : 'Network Type 19',
      'Network20_type' : 'Network Type 20',
      'Ethernet1_type' : 'Ethernet Type 1',
      'Ethernet2_type' : 'Ethernet Type 2',
      'Ethernet3_type' : 'Ethernet Type 3',
      'Ethernet4_type' : 'Ethernet Type 4',
      'Ethernet5_type' : 'Ethernet Type 5',
      'Ethernet6_type' : 'Ethernet Type 6',
      'Ethernet7_type' : 'Ethernet Type 7',
      'Ethernet8_type' : 'Ethernet Type 8',
      'Ethernet9_type' : 'Ethernet Type 9',
      'Ethernet10_type' : 'Ethernet Type 10',
      'Ethernet11_type' : 'Ethernet Type 11',
      'Ethernet12_type' : 'Ethernet Type 12',
      'Ethernet13_type' : 'Ethernet Type 13',
      'Ethernet14_type' : 'Ethernet Type 14',
      'Ethernet15_type' : 'Ethernet Type 15',
      'Ethernet16_type' : 'Ethernet Type 16',
      'Ethernet17_type' : 'Ethernet Type 17',
      'Ethernet18_type' : 'Ethernet Type 18',
      'Ethernet19_type' : 'Ethernet Type 19',
      'Ethernet20_type' : 'Ethernet Type 20',
      'nic1_name': 'NIC 1',
      'nic2_name': 'NIC 2',
      'nic3_name': 'NIC 3',
      'nic4_name': 'NIC 4',
      'nic5_name': 'NIC 5',
      'nic6_name': 'NIC 6',
      'Interfaces1_name' : 'Enabled Interface 1',
      'Interfaces2_name' : 'Enabled Interface 2',
      'Interfaces3_name' : 'Enabled Interface 3',
      'Interfaces4_name' : 'Enabled Interface 4',
      'Interfaces5_name' : 'Enabled Interface 5',
      'Interfaces6_name' : 'Enabled Interface 6'
    };
      }
};
