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


var _store_bts = function() {
	var r = {
		
		vars : {
			},
			
		callbacks : {
		init : {
			onSuccess : function()	{
				app.u.dump('BEGIN app.ext.buysafe_guarantee.onSuccess');
				},
			onError : function()	{
			app.u.dump('BEGIN app.ext.store_navcats.callbacks.init.onError');
				}
			},

		startExtension : {
			onSuccess : function(){
				app.u.dump("BEGIN _store_bts.startExtension.onSuccess.");
				app.ext.store_navcats.calls.appNavcatDetailMax.init('.shop-by-brand',{'callback':'getChildData','extension':'store_navcats','parentID':'brandCategories','templateID':'categoryListTemplateThumb'},'passive');
			},
			onError : function(){}
				}
			} //r object.
		}
	return r;
	}