/* **************************************************************

   Copyright 2011 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */

/*
An extension for acquiring and displaying 'lists' of categories.
The functions here are designed to work with 'reasonable' size lists of categories.
*/


var bonding_buysafe = function() {
	var r = {
		
		vars : {
			"dependAttempts" : 0,  //used to count how many times loading the dependencies has been attempted.
			"dependencies" : ['myRIA'] //a list of other extensions (just the namespace) that are required for this one to load
			},

////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


		callbacks : {
			init : {
				onSuccess : function()	{
					myControl.util.dump('BEGIN myControl.ext.bonding_buysafe.onSuccess');
/*
To keep this extension as self-contained as possible, it loads it's own script.
the callback is handled in the extension loader. It will handle sequencing for the most part.
The addTriggers will re-execute if this script isn't loaded until it has finished loading.
*/
					loadScript('https://seal.buysafe.com/private/rollover/rollover.js');
					return true; //return false if extension won't load for some reason (account config, dependencies, etc).
					},
				onError : function()	{
	//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
	//you may or may not need it.
					myControl.util.dump('BEGIN myControl.ext.store_navcats.callbacks.init.onError');
					}
				},

			addTriggers : {
				onSuccess : function(){

// myControl.util.dump("BEGIN bonding_buysafe.addTriggers.onSuccess.");

//make sure that not only has myRIA been loaded, but that the createTemplateFunctions has executed
if(myControl.ext.myRIA && myControl.ext.myRIA.template && myControl.ext.myRIA.template.productTemplate && typeof WriteBuySafeKickers == 'function' && typeof buySAFE == 'object')	{

//http://developer.buysafe.com/bsg_overview.php
//http://www.buysafe.com/web/general/kickerpreview.aspx
buySAFE.Hash = 'g%2FwH7bQU7HMu67gk2iwEMHPEc9N9c29oDrTM9mtbThtMQluxcBQRkBNmDfJSDKxoD0OxKsqCmMjoV5nWXnt8VQ%3D%3D'; //ADD HASH HERE.

if(buySAFE.Hash.length > 0)	{
	
	WriteBuySafeKickers(); //the showContent function may have already executed prior to addTriggers getting executed, so write seals.
	WriteBuySafeSeal("BuySafeSealSpan", "GuaranteedSeal"); //adds 'global' seal, probably to a corner.

//writes the kickers.
	myControl.ext.myRIA.template.productTemplate.onCompletes.push(function(P) {WriteBuySafeKickers();})
	myControl.ext.myRIA.template.cartTemplate.onCompletes.push(function(P) {WriteBuySafeKickers();})
					
	myControl.ext.store_checkout.checkoutCompletes.push(function(P){
		myControl.util.dump("BEGIN bonding_buysafe code pushed on store_checkout.checkoutCompletes");
		var order = myControl.data['order|'+P.orderID].cart;
		buySAFE.Guarantee.order = P.orderID;
		buySAFE.Guarantee.subtotal = order['data.order_subtotal'];
//		buySAFE.Guarantee.total = order['data.order_total'];  //doesn't say 'required' in docs, but noticed it in DOM
		buySAFE.Guarantee.email = order['data.bill_email'];
		myControl.util.dump(" -> buySAFE.Guarantee: "); myControl.util.dump(buySAFE.Guarantee);
//the buysafe guarantee function has an onload event, which doesn't get triggered in the app framework
//the bs_r.onLoad = 1 will tell buysafe to NOT wait for the onload and trigger immediately. 
//the value passed into the function MUST be "javascript" for this to work.
		bs_R.fOnLoad = 1; 
		WriteBuySafeGuarantee("JavaScript");
		}); // end .push

	}
else	{
	myControl.util.dump("WARNING! buySAFE.Hash not set/valid ["+buySAFE.Hash+"]");
	}
						}
					else	{
						setTimeout(function(){myControl.ext.bonding_buysafe.callbacks.addTriggers.onSuccess()},250);
						}

					},
				onError : function(){}
				}
			} //r object.
		}
	return r;
	}