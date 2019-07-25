/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

'use strict';

require('dotenv').config({
  silent: true,
});

const express = require('express');
const router = express.Router();
const request = require('request');
const NaturalLanguageClassifierV1 = require('watson-developer-cloud/natural-language-classifier/v1');


// const NLC = require('watson-developer-cloud/natural-language-classifier/v1');
var classifierId = '2ef5ecx559-nlc-551'
var uname = process.env.NATURAL_LANGUAGE_CLASSIFIER_USERNAME
var pword = process.env.NATURAL_LANGUAGE_CLASSIFIER_PASSWORD

console.log("CLASSIFIER_ID:")
console.log(classifierId)

router.post('/', function(req, res, next) {
  classify(req, res);
});

function classify(req, res) {
  console.log("Classifying:")
  console.log(req.body);

  // var nlc = new NLC({username: uname, password: pword});

  var nlc = new NaturalLanguageClassifierV1({
    iam_apikey: '5Xq92e-OUEJz8sWDMWlMfgiF1sZP7sf75ob0aEQ8_lQE',
    url: 'https://gateway.watsonplatform.net/natural-language-classifier/api'
  });


  nlc.classify({
    text: req.body.text,
    classifier_id: classifierId
  }, function(err,response){
    if (err) {
      console.log(response)
      console.log(err)
    } else {
      console.log(response)
      res.json(response) 
      
    }
  })
} 



module.exports = router;
