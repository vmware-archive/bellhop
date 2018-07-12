

# bellhop

## Overview

One of the greatest barriers to adoption of NFV today is the ability to bring in the functionality of various Virtualized Network Functions (VNFs) in to the NFV architecture.

## Try it out

A. Download latest code base

    On a Linux system make a directory e.g. mkdir vnf_onboardding
    Navigate to that directory
    Execute command ‘git init’
    Execute command "git clone https://github.com/vanlittle/VNF-Onboarding.git"
    Change directory to "VNF-Onboarding/" . Latest code should be available in "Gen\ 3"
    Copy "Gen\ 3" contents to a directory where application will be deployed.

B. Run “npm install” from “mwc-nfv-hackathon/wizard”

    In case of problems you can try:

    nodejs node_modules/node-sass/scripts/install.js

    npm rebuild node-sass

    In case , “npm install” fails with error

    “ npm ERR! No compatible version found: gulp@4.0.0-alpha.2 “

    Change gulp version in “mwc-nfv-hackathon/wizard/package.json” to 4.0.0

C. Install Postgresql Database

    sudo apt-get update
    sudo apt-get install postgresql postgresql-contrib

D. Configure Database settings

1.Access a Postgres prompt

$ sudo -u postgres psql postgres

2.Change Password for "postgres" user postgres=# \password Enter new password: Enter it again: postgres=#
E. Update username and password in the “database.ini” file located at ‘mwc-nfv-hackathon/backend/

     [postgresql]
     host=localhost
     dbname=postgres
     user=
     password=
     [vnf_onboarding]
     dbname=vnf_onboarding_tool_db
     host=localhost
     user=
     password=
     [Details]
     table=vnf_onboarding_tool_users 
     **  if “user” in [vnf_onboarding] section different than default postgres user then user needs to **
    **be created manually**

F. Install Python requirements

**Install requirements**
  pip install -r mwc-nfv-hackathon/req.txt



### Prerequisites

* nodejs (4.8.7 – preferred) and npm (5.6.0 – preferred) are installed on the Ubuntu machine
* System/VM with Ubuntu 16.04 or comprable linux install

### Build & Run
To deploy the web UI, use the following procedure: https://github.com/vmware/bellhop/wiki#g-start-application


## Documentation
See the project wiki for more information and examples at https://github.com/vmware/bellhop/wiki

## Releases & Major Branches
Current release is Gen 3

## Contributing

The bellhop project team welcomes contributions from the community. If you wish to contribute code and you have not
signed our contributor license agreement (CLA), our bot will update the issue when you open a Pull Request. For any
questions about the CLA process, please refer to our [FAQ](https://cla.vmware.com/faq). For more detailed information,
refer to [CONTRIBUTING.md](CONTRIBUTING.md).

## License
Apache 2.0. See LICENSE.txt
