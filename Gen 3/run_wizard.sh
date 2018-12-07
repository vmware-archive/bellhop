#!/bin/bash
#########################################################################
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

###########################################################################

# check for running backend services
vnf_onboarding_backend_app_pids=(`ps -ef | grep vnf_onboarding_backend_app | grep -v grep | awk '{print $2}'`)
if (( ${#vnf_onboarding_backend_app_pids[@]} )); then
    echo -e "vnf onboarding backend service is running..\n pids = " ${vnf_onboarding_backend_app_pids[@]} 1>&2
    echo -e "clean already running backend service processes....\n\n" 1>&2
    for pid in "${vnf_onboarding_backend_app_pids[@]}"
    do
      :
      echo "kill process =" $pid 1>&2
      kill -9 $pid
   done
else
   echo -e "vnf onboarding backend service  not running...\n\n" 1>&2
fi

# start up backend service
cd mwc-nfv-hackathon/backend
if [ "$?" = "0" ]; then
    echo -e  "starting vnf onboarding backend service...\n\n" 1>&2
    gunicorn -c python:gunicorn_config wsgi_gunicorn:vnf_onboarding_backend_app &
    if [ "$?" -ne "0" ]; then
	echo "Failed to backend service" 1>&2
	exit "$?" 
    fi
else
    echo "Cannot change directory!" 1>&2
    exit 1
fi

sleep 1
echo -e "vnf onboarding backend service started...\n\n"

echo -e "starting vnf onboarding frontend app...\n\n"


cd ../wizard
if [ "$?" = "0" ]; then
    echo VMware1! | sudo -S npm run build
    if [ "$?" -ne "0" ]; then
	echo "Failed to run npm build command:" 1>&2
	exit "$?" 
    fi
    echo VMware1! | sudo -S npm run serve
    if [ "$?" -ne "0" ]; then
	echo "Failed to run npm serve command:" 1>&2
	exit "$?" 
    fi
else
	echo "Cannot change directory!" 1>&2
	exit 1
fi

