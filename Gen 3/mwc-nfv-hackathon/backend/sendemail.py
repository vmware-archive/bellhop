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

import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email.Utils import COMMASPACE, formatdate
from email import Encoders
from config import db_config, get_config_param
import os


def draft_mail_text(purpose,username,password):
    mail_text = ""
    if(purpose == "User Registration"):
      print "draft_mail_text:", purpose
      mail_text = "Dear User, \n Your Registration for VNF Onboarding is successful.\n Please find your credentials below \n\n\n\t username:  "  + username + "\n\t password:  "  + password + "\n\n\n\n" + " Thanks, \n VNF Onboarding Team"
    elif (purpose == "Forget Password"):
      print "draft_mail_text:",purpose
      mail_text = "Dear User , \n Your Password has been reset.\n Please use following password to login \n\n\n\n\t password: "+ password + "\n\n\n\n" + "Thanks, \n VNF Onboarding Team"
    return mail_text

def sendMail (to,subject,text):
    fro = get_config_param('database.ini','Email','domainname')
    print "sendMail",fro
    server = get_config_param('database.ini','Email','emailserver')
    print "sendMail:",server
    
    return _sendMail(to, fro, subject, text,server)
 

def _sendMail(to, fro, subject, text, server="localhost"):
    assert type(to)==list
    #assert type(files)==list


    msg = MIMEMultipart()
    msg['From'] = fro
    msg['To'] = COMMASPACE.join(to)
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject

    msg.attach( MIMEText(text) )
    print "_sendMail:msg", msg

    #for file in files:
    #    part = MIMEBase('application', "octet-stream")
    #    part.set_payload( open(file,"rb").read() )
    #    Encoders.encode_base64(part)
    #    part.add_header('Content-Disposition', 'attachment; filename="%s"'
    #                   % os.path.basename(file))
    #    msg.attach(part)
    status = None
    username = get_config_param('database.ini','Email','username')
    password = get_config_param('database.ini','Email','password')

    try:
       smtp = smtplib.SMTP(server)
       if username != False and password != False:
          smtp.login(username,password)
       smtp.sendmail(fro, to, msg.as_string() )
       smtp.close()
       print "send email succeeded"
       status = True
    except:
        print "failed to send mail"
        status = False
    finally:
       return status


if __name__ == '__main__':
    #db_check_credentials("admin","admin")
    #db_user_signup('admin','admin', 'admin@vmware.com')
    #Example:
    mail_text = draft_mail_text("Forget Password","kishor","kishor")
    #sendMail(['maSnun <nandkumarj@vmware.com>'],'mydevsystem',mail_text)
    #mailid = "nandkumarj@vmware.com"
    mailid = "nandakishor.joshi@capgemini.com"
    #mailid = "abc@abcdy.com"
    sendMail([mailid],'mydevsystem',"debugmail from vnf onboarding")

