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
    fro = get_config_param('database.ini','Email','mailfrom')
    if fro == False:
       print "mailfrom param is not set"
       return False
    print "sendMail",fro
    server = get_config_param('database.ini','Email','emailserver')
    if server == False:
       print "emailserver param is not set"
       return False
    print "sendMail:",server
    
    return _sendMail(to, fro, subject, text,server)
 

def _sendMail(to, fro, subject, text, server="localhost"):
    assert type(to)==list

    msg = MIMEMultipart()
    msg['From'] = fro
    msg['To'] = COMMASPACE.join(to)
    msg['Date'] = formatdate(localtime=True)
    msg['Subject'] = subject

    msg.attach( MIMEText(text) )
    print "_sendMail:msg", msg

    status = False
    username = get_config_param('database.ini','Email','username')
    password = get_config_param('database.ini','Email','password')
    port = int(get_config_param('database.ini','Email','port'))
    if port == False:
       print "parameter port is not set"
       return False

    smtp = None
    try:
      smtp = smtplib.SMTP(server,port)
      status = True
    except Exception as e:
        print(e)
        status = False
    finally:
      if status == False:
         print "error in smtp connection"
         return status  

    try:
       print "set debug level for smtp"
       smtp.set_debuglevel(True)

       # identify yourself, and get supported features
       smtp.ehlo()

       # start tls for security 
       if smtp.has_extn('STARTTLS'):
          print "TLS Supported"
          #starttls and check if it succeeded
          if smtp.starttls()[0] == 220:
             print "starttls succeeded"
          #return in case starttls is supported and fails
          else:
            print "starttls failed"
            status = False
            return
          smtp.ehlo() # re-identify ourselves over TLS connection
       
       if username != False and password != False:
          smtp.login(username,password)
       sendStatus = smtp.sendmail(fro, to, msg.as_string() )
       print "sendStatus=",sendStatus
       if sendStatus:
          print "Receipient refused"
          status = False
          return
       print "send email succeeded"
       status = True
    except Exception as e: 
        print(e)
        print "failed to send mail"
        status = False
        return
    finally:
       if smtp is not None:
          smtp.quit()
       return status


if __name__ == '__main__':
    #Example:
    mail_text = draft_mail_text("User Registration","dummy","dummy")
    sendMail([mailid],'mydevsystem',mail_text)

