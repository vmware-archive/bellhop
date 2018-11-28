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

from flask import Flask, render_template, send_from_directory
from flask import request
from flask_cors import CORS, cross_origin
from werkzeug.datastructures import ImmutableMultiDict
from generate_blueprint import create_blueprint_package, create_multivdu_blueprint_package, convert_payload_to_json,cleanup
from database import db_check_credentials,db_user_signup,db_generate_newpassword
from prefixmiddleware import PrefixMiddleware
import logging
from logging.handlers import RotatingFileHandler
from werkzeug import secure_filename
from sendemail import sendMail,draft_mail_text
from config import db_config, get_config_param

import os
import json
import database
import pprint
from flask import jsonify

app = Flask(__name__)
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/backend')
app.config['UPLOAD_FOLDER'] = '/tmp/uploads/'
CORS(app, supports_credentials=True)

@app.route('/login',methods=['GET','POST'])

@cross_origin(origin='*')

def login_page():
  if request.data == "":
     return "false"
  credentials = json.loads(request.data)
  if db_check_credentials(credentials['username'] ,credentials['password']) == False:
        print(credentials['username'] ,credentials['password'],credentials['session_key']) 
        print ("Found UP")
        return jsonify({"Status":"Error","Message":"User does not exist in the database"})
  elif  db_check_credentials(credentials['username'] ,credentials['password']) == "Incorrect Password":
        return jsonify({"Status":"Error","Message":"Password provided is incorrect" })
  elif  db_check_credentials(credentials['username'] ,credentials['password']) == "Connection Failed":
        return jsonify({"Status":"Error","Message":"Login failed.Failure to connect to database" })
  return jsonify({"Status":"Success","Message":"user is authenticated"})

@app.route('/signup', methods=['GET', 'POST'])

def signup():
  pprint.pprint("received signup request")
  print("Request Data:%s",request.data)
  credentials = json.loads(request.data)
  pprint.pprint(credentials)
  status = db_user_signup(credentials['username'],credentials['password'],credentials['emailaddress'])
  print(status)
  if(status == "True" ):
      if get_config_param('database.ini','Email','enablesendemail') == False :
         print "Email Functionality Disabled"
         return jsonify({"Status": "Success", "Message":"User Registration Succeeded.Email Functionality is Disabled.User can login with new credentials"})
      mail_text = draft_mail_text("User Registration",credentials['username'],credentials['password'])
      print "signup:",mail_text
      if sendMail([credentials['emailaddress']],"VNF Onboarding User Registration",mail_text) == False:
         return jsonify({"Status":"Error","Message":"User Registration Succeeded.Email Delivery Failed.User can login with new credentials"}) 
      return jsonify({"Status" :"Success","Message" : "User Registration Successful.Email containing credentials has been sent to the user." })
  elif status == "Connection Failed":
     return jsonify({"Status":"Error", "Message": "User Registration Failed.Failure to connect to database"})
  else:
      return jsonify({"Status":"Error","Message":"User Registration Failed. Username or Email-id already exists"})

@app.route('/generate', methods=['GET', 'POST'])


def generate():
    inputs = request.get_json()
    print("Inputs Received: %s\n",inputs)
    pprint.pprint(request.headers)
    pprint.pprint(request.headers['Authorization'])
    pprint.pprint(request.headers['Username'])
    inputs['params']['username'] = request.headers['Username']
    inputs['params']['session_key'] = request.headers['Authorization'] 
    output_file, workdir = create_blueprint_package(inputs)
    print("backend:workdir=%s\n",workdir)
    resp = send_from_directory(directory=os.path.dirname(workdir),
                               filename=os.path.basename(output_file),
                               as_attachment=True,
                               attachment_filename=os.path.basename(output_file))
    cleanup(os.path.dirname(workdir))
    return resp

@app.route('/upload', methods=['GET', 'POST'])

def upload():
   print("Received upload request")
   pprint.pprint(request.headers) 
   pprint.pprint(request.headers['Authorization']) 
   pprint.pprint(request.headers['username']) 
   username = request.headers['username']
   session_key = request.headers['Authorization']
   
   pprint.pprint(request.data)
   pprint.pprint(request.files)
   # Get the name of the uploaded files
   uploaded_files = request.files.getlist("file")
   pprint.pprint(uploaded_files)
   user_dir = ''
   for file in uploaded_files:
      if file:
	 # Make the filename safe, remove unsupported chars
          filename = secure_filename(file.filename)
          if not os.path.isdir(app.config['UPLOAD_FOLDER']):
             os.mkdir(upload_dir)

          user_dir = os.path.join(app.config['UPLOAD_FOLDER'],username)
          session_dir = os.path.join(user_dir,session_key)
          print(user_dir)
          print(session_dir)
          if not os.path.isdir(user_dir):
             os.mkdir(user_dir)
	  if not os.path.isdir(session_dir):
   	     os.mkdir(session_dir)
         
	  file.save(os.path.join(session_dir, filename))
 
   return 'file uploaded successfully'


@app.route('/forgetpassword', methods=['GET', 'POST'])

def forgetpassword():
   print "Received forgetpassword request",request.data
   inputs = inputs = request.get_json()
   print "Forgetpassword",inputs
   status = db_generate_newpassword(inputs,False)
   print "status=", status
   if status == 1:
      print "forgetpassword:user does not exist", status
      return jsonify({"Status":"Error","Message":"Cannot generate password. User does not exist"})
   elif status == "Connection Failed":
      return jsonify({"Status":"Error", "Message": "Cannot generate passwod.Failure to connect to database"})      
   elif status == 0:
      if get_config_param('database.ini','Email','enablesendemail') == False :
         print "Email Functionality Disabled"
         status = db_generate_newpassword(inputs)
         if status == 0:
            return jsonify({"Status": "Error", "Message":"Generated new password.Email Functionality is Disabled.So Password is set to default i.e. password@123"})
      mail_text = ""
      if inputs['username']:
         print "after updating password",inputs
         mail_text = draft_mail_text("Forget Password",inputs['username'],inputs['password'])
      print "forget password:",mail_text
      if sendMail([inputs['emailaddress']],"VNF Onboarding New Password",mail_text) == False:
         status = db_generate_newpassword(inputs)
         if status == 0:  
           return jsonify({"Status":"Error","Message":"New Password set for user.Email Delivery Failed.So Password is set to default i.e. password@123"})
      return jsonify({"Status":"Success","Message":"New Password generated for user. Email containing credentials has been sent to the user"})



   
@app.route('/multivdu_blueprint', methods=['POST'])

def multivdu_blueprint():
  if request.method == 'POST':
     print "Received POST request to generate Multi-VDU Blueprint with data= {}".format(request.data)
     print "We arrived correct"
     inputs = json.loads(request.data)
     print "inputs:",inputs
     inputs['username'] = request.headers['Username']
     inputs['session_key'] = request.headers['Authorization']
     print "inputs:",inputs
     output_file, workdir = create_multivdu_blueprint_package(inputs)
     resp = send_from_directory(directory=os.path.dirname(workdir),
                           filename=os.path.basename(output_file),
                           as_attachment=True,
                           attachment_filename=os.path.basename(output_file))
     cleanup(os.path.dirname(workdir))
     return resp
  else:
     print "Invalid request. Has to be POST"
     return
   

if __name__ == "__main__":
    formatter = logging.Formatter(
        "[%(asctime)s] {%(pathname)s:%(lineno)d} %(levelname)s - %(message)s")
    handler = RotatingFileHandler('vnf_backend.log', maxBytes=1000000000000, backupCount=1)
    handler.setLevel(logging.INFO)
    handler.setFormatter(formatter)
    app.logger.addHandler(handler) 
    app.logger.setLevel(logging.INFO)
    app.run(host='0.0.0.0', port=5000)
#    app.run(host='0.0.0.0', port=5000, debug=True)
