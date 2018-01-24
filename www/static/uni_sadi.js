
//var apiPath='http://127.0.0.1:8000/unigift/syncmobile_eon/';
//var apipath_image = 'http://127.0.0.1:8000/moderntrade/';


var apiPath='http://w02.yeapps.com/unigift/syncmobile_eon_bKash/'
var apipath_image='http://i001.yeapps.com/image_hub/unigift/upload_image/'


function get_pic_HairCare(i) {
	var tempTime = $.now();
	var image_name=tempTime.toString()+localStorage.cm_id+".jpg";
	$("#prPhotoName").val(image_name);
	
	navigator.camera.getPicture(onSuccessHairCare, onFailHairCare, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}
function onSuccessHairCare(imageURI) {
	var temp_image_div="myImage"
	var hidden_path="prPhoto"
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
	$("#"+hidden_path).val(imageURI);
}
function onFailHairCare(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}






//================login=======================

function login_page() {
	
	url="#login";					
	$.mobile.navigate(url);
	
}

function submitBack() {
	
	url="#menuPage";					
	$.mobile.navigate(url);
	
}

function login() {
	
	url="#login";					
	$.mobile.navigate(url);
	
}
function homePage() {
	url="#menuPage";					
	$.mobile.navigate(url);
	
}

function pageOutlet(){
	url="#pageOutlet";					
	$.mobile.navigate(url);
}

function Redeem(){
	var redMobile=$("#redMobile").val();
	if (redMobile.length < 13){
		redMobile='88'+redMobile
	}
	//alert (redMobile)
	
    if (redMobile.length==13){
		
		//alert (apiPath+'search_mobRedeem?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&redMobile='+redMobile)
		$.ajax({
			type:'GET',
		    url:apiPath+'search_mobRedeem?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&redMobile='+redMobile,
			success: function(result){
				resultStr=result.split('<SYNCDATA>');	
			    if (resultStr[0]=='FAILED'){
					$("#mobile").val(redMobile);
					url="#registration";					
					$.mobile.navigate(url);	
				}
	
				if (resultStr[0]=='SUCCESS'){
				    

					var Mobile=resultStr[1];
					var mem_name=resultStr[2];
					var mem_point=resultStr[3];
					var prStr=resultStr[1]
					localStorage.memInfo=Mobile+'-'+mem_name
					localStorage.memPoint=mem_point
					var memInfoRed=localStorage.memInfo
					var memRedMob=memInfoRed.split('-')[0];
					localStorage.memRedMob=memRedMob
					var memRedName=memInfoRed.split('-')[1];
					localStorage.memRedName=memRedName
					//alert (memRedName)
	
					
					
				    giftdctStr=localStorage.giftdctStr
			        giftdctStrList=giftdctStr.split('<rdrd>')
			        var giftShow=''
			
			        var submitRedeem=''
			 			
					for (i=0; i<giftdctStrList.length-1; i++){	
					var qtyName="qtyName_"+i.toString()
					var gNameID="gNameID_"+i.toString()

				   
				    giftShow=giftShow+' <table width="100%" border="0" cellpadding="0" cellspacing="0" ><tr ><td width="50px" > <input type="number" value="" id="'+qtyName+'" name="'+qtyName+'" style="width:50px;" ><input type="hidden" id="'+gNameID+'"   name="'+gNameID+'"  value="'+giftdctStrList[i]+'"></td><td width="100px"> &nbsp;&nbsp;'+giftdctStrList[i].split('|')[2]+'</td> <td > '+giftdctStrList[i].split('|')[0]+'</td></tr></table>'
										 }
					 
						
								
					var giftShowRed=giftShow
					localStorage.giftShowRed=giftShowRed
					
					$("#giftRedShow").html(localStorage.giftShowRed)

					
					$("#redMobile").val(Mobile);
					//$("#prMem").html(localStorage.memInfo);
					$("#prRedMem").html(localStorage.outlet);
					$("#prRedMemName").html(mem_name+'|'+Mobile);
					$("#prRedPoint").html(mem_point);
					
					$("#gSError").html('');
					
					$("#errorChkGift").html('');
					$("#Gift_image").hide();
					$("#saveButtonGift").show();
					
					url="#redeemShow";					
    	            $.mobile.navigate(url);					
				}

			},
			 error: function(result) {
					
			 }
		});
		
		
	}else{
		$("#mobError").html("Please Enter Mobile No");
	}	
	
}





function giftSave(){
			$("#Gift_image").show();
			$("#saveButtonGift").hide();
			
			var memMb=localStorage.memRedMob;
			var memNM=localStorage.memRedName
			var memPoint=localStorage.memPoint;
		
			//var memPoint=localStorage.memPoint;
			var outletShow=localStorage.outlet
			var outletNameId=outletShow.split('|');
			var outletId=outletNameId[0];
			var outletName=outletNameId[1];
			
			var memPoint= $("#prRedPoint").html()
			
			 giftdctStr=localStorage.giftdctStr
	         giftdctStrList=giftdctStr.split('<rdrd>')
	 
	 
			var giftShow=''
			var submitRedeem=''		
			var giftPointC=0				 
			for (i=0; i<giftdctStrList.length-1; i++){	
			
					var qtyName="qtyName_"+i.toString()
					var gNameID="gNameID_"+i.toString()
					
					var qtyNameValue=$("#"+qtyName).val()
					if (parseInt(qtyNameValue)>0)	{
					giftStrShow = 	giftdctStrList[i]				
									strList=giftStrShow.split('|')	
									var	giftId = strList[0]		
									var	giftName = strList[1]
									var	giftPoint = strList[2]
									giftPointC=giftPointC+parseInt(giftPoint)
									submitRedeem=submitRedeem+giftId+'<fdfd>'+giftName+'<fdfd>'+giftPoint+'<fdfd>'+qtyNameValue+'<rdrd>'
							
						
					 }//if
			
	       localStorage.submitRedeem=submitRedeem
		   
			}
		   		
	     //alert (localStorage.submitRedeem)
		 //alert(apiPath+'redeemComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitRedeem='+encodeURIComponent(submitRedeem)+'&memPoint='+localStorage.memPoint+'&memNM='+memNM+'&memMb='+memMb)
		if (giftPointC <= parseInt(memPoint) & parseInt(giftPointC)>0){
			 $.ajax({
				type:'POST',
				url:apiPath+'redeemComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitRedeem='+encodeURIComponent(submitRedeem)+'&memPoint='+localStorage.memPoint+'&memNM='+memNM+'&memMb='+memMb,
			
				success: function(result) {
					//alert(result)
					//alert ('hi')	
					if (result!='Failed'){
					//$("#visit_success").html("Submitted Successfully");
					
					
					
					
					$("#button_show").html('<input style="background-color:#00B0B0; height:30px; width:100%; color:#FFF; font-size:14px" type="submit"  value="         Home          "   onClick="menuSearch()">');

					
					$("#Gift_image").hide();
					$("#saveButtonGift").show();
					
					url="#submitPage";					
			  		$.mobile.navigate(url);
					}
					else{
						$("#errorChkGift").html('Failled')
						$("#Gift_image").hide();
						$("#saveButtonGift").show();
					}
				
				}      
			 
			  });
			 	
		}
		else{
			
			$("#gSError").text("Point should be greater than Gift Point");
			$("#Gift_image").hide();
			$("#saveButtonGift").show();
			
		}
			
	}	
	
	
	
function menuSearch(){
	$('#otltName').html(localStorage.outlet);
	
	
	url="#menuPage";					
	$.mobile.navigate(url);	
	location.reload();
	}	
	
function shppingTrip(){
	$('#outletSrch').html(localStorage.outlet);
	url="#member";					
	$.mobile.navigate(url);	
	}	
	
function memberSelect(){
	$('#purchOutlet').html(localStorage.outlet);
	var mMobile=$("#mMobile").val();
	if (mMobile.length < 13){
		mMobile='88'+mMobile
	}
	
   // alert (mMobile)
    if (mMobile.length==13){
		
	
		//alert (apiPath+'search_mob?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&mMobile='+mMobile)
		$.ajax({
			type:'GET',
		    url:apiPath+'search_mob?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&mMobile='+mMobile,
			success: function(result){
				resultStr=result.split('<SYNCDATA>');	
			    if (resultStr[0]=='FAILED'){
					$("#mobile").val(mMobile);
					url="#registration";					
					$.mobile.navigate(url);	
				}
				if (resultStr[0]=='SUCCESS'){
				    
					var Mobile=resultStr[1];
					var mem_name=resultStr[2];
					var mem_point=resultStr[3];
	
					localStorage.memInfo=Mobile+'-'+mem_name
					localStorage.memPoint=mem_point
					
					$("#mMobile").val(Mobile);
					$("#prMem").html(localStorage.memInfo);
					$("#prPoint").html(localStorage.memPoint);
					
					
					url="#ProductList";					
    	            $.mobile.navigate(url);					
				}

			},
			 error: function(result) {
					
			 }
		});
		
		}else{
			$("#mobError").html("Please Enter Mobile No");
	}
	
	}		
function productShowPage (){
	url="#ProductListShow";					
	$.mobile.navigate(url);	
}
	
function product(){
	$('#prodctPage').html(localStorage.outlet)
	url="#ProductList";					
	$.mobile.navigate(url);	
	}
	
		
function productQueNew(i){
	$('#prodctQList').html(localStorage.outlet)
	$("#prMSave").html(localStorage.memInfo);
	$("#prSPoint").html(localStorage.memPoint);
	
	var qName="qName_"+i.toString()
	var pNameID="pNameID_"+i.toString()
	var qNameValue=$("#"+qName).val()
	var pNameIDValue=$("#"+pNameID).val()
	//alert (pNameIDValue)
	var submitPurchaseget=localStorage.submitPurchase
	
	
	if (parseInt(qNameValue)>0)	{
		var qtyName=qName
		var pdNameID=pNameID

		var strShow=pNameIDValue
		//alert (strShow)			
		strList=strShow.split('|')	
				
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
	
		
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+qNameValue+'<fdfd>'+point+'<rdrd>'
		
		if (submitPurchaseget.indexOf(prdctID+'<fdfd>') !=-1){
			submitPurchaseList=submitPurchaseget.split('<rdrd>')
			for (i=0; i<submitPurchaseList.length-1; i++){
				strShow = 	submitPurchaseList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitPurchase=submitPurchaseget.replace(strShow,addProduct)
				}
			}
		}
		
		else{
			submitPurchase=submitPurchaseget+addProduct
			}
		
		//submitPurchase=submitPurchaseget+prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+qNameValue+'<fdfd>'+point+'<rdrd>'
		
		}
		
	else {
		var qtyName=qName
		var pdNameID=pNameID
		var strShow=pNameIDValue		
		qNameValue=0		
		strList=strShow.split('|')			
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
		
		var pShow=prdctName+'|'+rate+'|'+ category
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+qNameValue+'<fdfd>'+point+'<rdrd>'
		
	
		if (submitPurchaseget.indexOf(prdctID+'<fdfd>') !=-1){
			submitPurchaseList=submitPurchaseget.split('<rdrd>')
			for (i=0; i<submitPurchaseList.length-1; i++){
				strShow = 	submitPurchaseList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitPurchase=submitPurchaseget.replace(strShow)
				}
				
			}
			
		}
	}
		
		localStorage.submitPurchase=submitPurchase
		
	
}
function productQue(){
	
	var prdctShow=''
	
	var submitPurchaseG=localStorage.submitPurchase
	var submitPurchase=submitPurchaseG.replace('undefined<rdrd>','')
	
	submitPurchaseList=submitPurchase.split('<rdrd>')
	
	for (i=0; i<submitPurchaseList.length-1; i++){
		
		strShow = 	submitPurchaseList[i]	
		//alert (strShow)		
		if 	(strShow.length > 0){
			strList=strShow.split('<fdfd>')			
			var	prdctName = strList[0]
			var	prdctID = strList[1]
			var	category = strList[2]
			var	rate = strList[3]
			var point= strList[5]
			var qNameValue= strList[4]
			var pShow=prdctName+'|'+rate+'|'+ category+'|'+ point
			if (parseInt(qNameValue)>0)	{
			
			prdctShow=prdctShow+'<tr> <td width="50px" style="background-color:#FFEAF4" align="center">'+qNameValue+'</td><td style="background-color:#CEF">'+pShow+'</td></tr>'
			}
		}
		localStorage.prdctShowCart=prdctShow

		$("#item_Que_combo_id").empty()
		$("#item_Que_combo_id").append(localStorage.prdctShowCart);
		

		
		
	}
	if (localStorage.prdctShowCart!=''){
		$("#purchase_image").hide()
		$("#purchaseBtn").show()
		
		$("#errorChkpurchase").html('')
		url="#ProductQueList";					
		$.mobile.navigate(url);	
	}
}
function memHistory(){
	var outletShow=localStorage.outlet
	var outletIDN=outletShow.split('|');
	var IdOutlet=outletIDN[0];
	var memShow=localStorage.memInfo
	var memMob=memShow.split('-')[0]
	//alert (apiPath+'memHistory?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob)
	
	$.ajax({
		type:'POST',
		url:apiPath+'memHistory?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob,
	
        success: function(result) {
			resultStr=result.split('<SYNCDATA>');	
			if (resultStr[0]=='FAILED'){
				$("#memHis").html(resultStr[1]);
				
			}
			if (resultStr[0]=='SUCCESS'){	
				$("#memHis").html(resultStr[1]);
				$("#memHisC").html(resultStr[1]);
				//alert (resultStr[1])
				
			}//if      
		}//success
	  });//ajax
}

	
	
function productQueRedeem(){
	//alert (apiPath+'ready_que?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outlet='+localStorage.outlet)
	$.ajax({
			type:'GET',
		    url:apiPath+'ready_que?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outlet='+localStorage.outlet,
			success: function(result){
				resultStr=result.split('<SYNCDATA>');	
			    if (resultStr[0]=='FAILED'){
					$("#mobile").val(mMobile);
					url="#registration";					
					$.mobile.navigate(url);	
				}
				if (resultStr[0]=='SUCCESS'){
				    var memStr=resultStr[1]
					var memStrFinal=resultStr[2]
					memStrList=memStr.split('<rd>')

					outletShow=''
					for (i=0; i<memStrList.length-1; i++){	
						memMob=memStrList[i].split('<fd>')[0]
						memName=memStrList[i].split('<fd>')[1]
						outletShow=outletShow+'<li class="ui-btn ui-shadow ui-corner-all " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin; alignment-adjust:before-edge" onClick="checkRadioVal('+i+');RedeemGet('+i+')"><input onClick="RedeemGet('+i+')"  id="radioMem_'+i+'" type="radio" name="radio_mem"  value="'+memName+'|'+memMob+'" >'+memName+'|'+memMob+'</li>'

					}
					
					memStrListFinal=memStrFinal.split('<rd>')

					
					for (i=0; i<memStrListFinal.length-1; i++){	
						memMobFinal=memStrListFinal[i].split('<fd>')[0]
						memNameFinal=memStrListFinal[i].split('<fd>')[1]
						outletShow=outletShow+'<li class="ui-btn ui-shadow ui-corner-all " style="border-bottom-style:solid; background-color:#FFFFC6;  border-color:#CBE4E4;border-bottom-width:thin; alignment-adjust:before-edge" onClick="checkRadioVal('+i+');RedeemGet('+i+')"><input onClick="checkRadioVal('+i+');RedeemGet('+i+');Redeem()"  id="radioMem_'+i+'" type="radio" name="radio_mem"  value="'+memNameFinal+'|'+memMobFinal+'" >'+memNameFinal+'|'+memMobFinal+'</li>'
						//outletShow=outletShow+'<li class="ui-btn ui-shadow ui-corner-all " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin; alignment-adjust:before-edge" onClick="checkRadioVal('+i+');RedeemGet('+i+')"><input onClick="RedeemGet('+i+')"  id="radioMem_'+i+'" type="radio" name="radio_mem"  value="'+memNameFinal+'|'+memMobFinal+'" >'+memNameFinal+'|'+memMobFinal+'</li>'

					}
					localStorage.queMem=outletShow
					//alert (outletShow)
					$("#queMem").html(localStorage.queMem);
			
				}

			},
			 error: function(result) {
					
			 }
		});
	$("#redMobile").val('');
	$( "#redMobile" ).prop( "disabled", false );
	$( "#queMem" ).prop( "disabled", false );
	
	url="#ProductQueRedList";					
	$.mobile.navigate(url);	
	
	
}
function checkRadioVal(i){
	var radioMemGet="#radioMem_"+i
	$(radioMemGet).attr('checked', true) 
	
	//$( "#"+radioMemGet ).prop( "checked", true );
}
function clearText(){
	$( "#redMobile" ).prop( "disabled", false );
	$("#queMem").html(localStorage.queMem);
	$("#redMobile").val('');
}
function checkRadio(){
	var cText=$("#redMobile").val()
	
	if (cText.length > 0){
		
		$('#queMem').find('input, textarea, button, select').attr('disabled','disabled');

	}
	else{
		$("#queMem").html(localStorage.queMem);
		//$('#queMem').find('*').prop('disabled',false);
		//$( "#queMem" ).prop( "disabled", true );
	}
}
function purchaseDataSave(){
	 $("#purchase_image").show();
	 $("#purchaseBtn").hide();
	 
	 
	 var memInfo=localStorage.memInfo;
	 var memNameMob=memInfo.split('-');
	 var memMobile=memNameMob[0];
	 var memName=memNameMob[1];
	 
	 
	 var memPoint=localStorage.memPoint;
	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
     var outletName=outletNameId[1];
	 var submitStrPurchase=localStorage.submitPurchase
	
	 submitStrPurchase=submitStrPurchase.replace('undefined<rdrd>','') 
	 //alert(apiPath+'purchase_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrPurchase='+encodeURIComponent(submitStrPurchase)+'&memPoint='+localStorage.memPoint+'&memName='+memName+'&memMobile='+memMobile)

	$.ajax({
		type:'POST',
		url:apiPath+'purchase_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrPurchase='+encodeURIComponent(submitStrPurchase)+'&memPoint='+localStorage.memPoint+'&memName='+memName+'&memMobile='+memMobile,
	
        success: function(result2) {
			//alert(result2)
			//alert ('hi')	
			if (result2!='Failed'){
			//$("#visit_success").html("</br></br>Successfully added to cart");
			localStorage.radioMem=memName+'|'+memMobile	
			var radioMem=localStorage.radioMem
			var radioMemMobile=radioMem.split('|')[1]
			//alert ('Test')
			$("#redMobile").val(radioMemMobile);
			
			$("#button_show").html(' <a data-role="button"    onClick="PurchaseDone()" >Purchase & CheckOut</a>');
			
			localStorage.submitPurchase=''
			localStorage.prdctShowCart=''
			
			
			$("#purchase_image").hide();
	 		$("#purchaseBtn").show();	
			url="#submitPage";					
			$.mobile.navigate(url);		
			}
			else{
				$("#errorChkpurchase").html('Sorry Network not available');
				$("#purchase_image").hide();
	 			$("#purchaseBtn").show();
				
				}
		}      
 
	  });
	  
	
	}	
	
	

function RedeemGet(i){	
	var radioMemGet="#radioMem_"+i
	var radioMem=$(radioMemGet).val();
	localStorage.radioMem=radioMem	
	var radioMemMobile=radioMem.split('|')[1]
	$("#redMobile").val(radioMemMobile);
	$("#redMobile").attr("disabled", "disabled"); 
	
	
	}	
function PurchaseDone(){	
	var outletShow=localStorage.outlet
	var outletIDN=outletShow.split('|');
	var IdOutlet=outletIDN[0];
	var memShow=localStorage.radioMem
	var memMob=memShow.split('|')[1]
	//alert (apiPath+'search_purchase?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob)
	
	$.ajax({
		type:'POST',
		url:apiPath+'search_purchase?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob,
	
        success: function(result) {
			resultStr=result.split('<SYNCDATA>');	
			if (resultStr[0]=='FAILED'){
				$("#pError").html(resultStr[1]);
				
			}
			if (resultStr[0]=='SUCCESS'){	
				var prStr=resultStr[1]
				var Mobile=resultStr[2]
				var name=resultStr[3]
				var point_valueS=resultStr[4]
				//alert (point_value)
				prList=prStr.split('<rd>')
				var prdctShow='<table>'
				var pStr=''
				 
				for (i=0; i<prList.length-1; i++){
					 prSingle=prList[i]
					 var pID		=prSingle.split('<fd>')[0]
					 var pName		=prSingle.split('<fd>')[1]
					 var product_qty=prSingle.split('<fd>')[2]
					 var product_point=prSingle.split('<fd>')[3]
					 var product_rate =prSingle.split('<fd>')[4]
					 var category	  =prSingle.split('<fd>')[5]
					 var qQty="qQty_"+i
					 var pShow=pName+'|'+product_rate+'|'+ category
					 prdctShow=prdctShow+'<tr><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center"><input type="number" id="'+qQty+'"   name="'+qQty+'" style="width:50px" value="'+product_qty+'">'+'</td></tr>' 
					
					pStr=pStr+pID+'<fd>'+pName+'<fd>'+product_qty+'<fd>'+product_point+'<fd>'+product_rate+'<fd>'+category+'<rd>'
					
					
					// pFinalStr=pFinalStr+'<tr><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+product_qty+''+'</td></tr>' 	
	   			}//for
			prdctShow=prdctShow+'</table>'
			
			
			
			localStorage.pFinal=prdctShow
			
			localStorage.pStr=pStr
			
			$("#purchaseShow").html(localStorage.pFinal);
			//alert (point_valueS)
			
			$("#prRedMemP").html(outletShow);
			$("#prRedMemNameP").html(name+'|'+Mobile);
			$("#prRedPointP").html(point_valueS);
			$("#prRedMemPS").html(outletShow);
			$("#prRedMemNamePS").html(name+'|'+Mobile);
			$("#prRedPointPS").html(point_valueS);
		}//if      
		}//success
	  });//ajax
	//alert (point_valueS)  
	
	//alert (point_valueS)
	//$("#prRedMemNameP").html(name+'|'+Mobile);
	//$("#prRedMemNameP").html(point_value);
	  
	url="#RedeemList";					
	$.mobile.navigate(url);	
	}	

function ConfirmPage(){
	
	var prStr=localStorage.pStr
	prList=prStr.split('<rd>')
	var prdctShow='<table>'
	var pStr=''
	var TotalProductPoint=0
	
	for (i=0; i<prList.length-1; i++){
		 prSingle=prList[i]
		 var pID		=prSingle.split('<fd>')[0]
		 var pName		=prSingle.split('<fd>')[1]
		 var product_qty=prSingle.split('<fd>')[2]
		 var product_point=prSingle.split('<fd>')[3]
		 var product_rate =prSingle.split('<fd>')[4]
		 var category	  =prSingle.split('<fd>')[5]
		 var qQty="qQty_"+i
		 var pShow=pName+'|'+product_rate+'|'+ category
		
		 var qty=$("#"+qQty).val()
		 //alert (qty)
		 if (parseInt(qty)>0){
			 //alert (qty)
			 prdctShow=prdctShow+'<tr><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+qty+'</td></tr>' 
			 pStr=pStr+pID+'<fd>'+pName+'<fd>'+qty+'<fd>'+product_point+'<fd>'+product_rate+'<fd>'+category+'<rd>'
			 TotalProductPoint=TotalProductPoint+(parseInt(product_qty)*parseInt(product_point))
		 }
		
		// pFinalStr=pFinalStr+'<tr><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+product_qty+''+'</td></tr>' 	
	}//for
	prdctShow=prdctShow+'</table>'
	//alert (TotalProductPoint)
	localStorage.TotalProductPoint=TotalProductPoint
	localStorage.pStrFinal=prdctShow
	localStorage.pStr=pStr
	
	$("#TotalProductPoint").html('Purchase Point:   '+localStorage.TotalProductPoint);
	$("#purchaseFinalShow").html(localStorage.pStrFinal);
	$("#errorChk").html('');
	$("#savedGiftError").html('');
	$("#payCombTextDiv").hide();
	
	
	
	$("#purchaseF_image").hide()
	$("#saveButton").show()	
	$("#errorChkpurchaseF").html('')
	url="#ConfirmPageSave";					
	$.mobile.navigate(url);	
	}
function setTextPay(){
	var payMode=$("#payComb").val();
	if (payMode=='BKash'){$("#payCombTextDiv").show();}else{$("#payCombTextDiv").hide();}
	
}

function finalPurchaseSave(){
	 
	 $("#purchaseF_image").show()
	 $("#saveButton").hide()	
	 var memberAllInfo=localStorage.radioMem
     var memberName=memberAllInfo.split('|')[0]
	 var memmobileNo=memberAllInfo.split('|')[1]
    // alert (memberName)
	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
     var outletName=outletNameId[1];
	 var finalData=localStorage.pStr
	 var payComb=$("#payComb").val()
	 var BKashNo=$("#BKashNo").val()
	 var BT_id=$("#BT_id").val()
	 
	 
	 var prPhotoName=$("#prPhotoName").val()
	 var prPhotoPath=$("#prPhoto").val()
	 
	 var errorLog=0
	 if ((payComb=='BKash') && (localStorage.bStatus!='Yes')){
		 errorLog=1
		 
	 }
////	  
	//alert(apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName)
	if (errorLog==0){
	$.ajax({
		type:'POST',
		url:apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName+'&BT_id='+BT_id,
	
		success: function(result2) {
	
			if (result2=='Success'){
				//$("#visit_success").html("</br></br>Successfully added to cart");
				//$("#visit_success").html("Submitted Successfully");
				 //alert (result2)
				 //alert (prPhotoPath+' | '+prPhotoName)
				 upload_image(prPhotoPath,prPhotoName);
				
				
				  
				 $("#BKashNo").val('')
				 $("#prPhotoName").val('')
				 $("#prPhoto").val('')
				 $("#myImage").html('')
				 
				localStorage.radioMem=memberName+'|'+memmobileNo	
				var radioMem=localStorage.radioMem
				var radioMemMobile=radioMem.split('|')[1]
				//alert ('Test')
				$("#redMobile").val(radioMemMobile);
				 
				
				
				
				$("#purchaseF_image").hide()
				$("#saveButton").show();
				
				
				url="#submitPage";					
				$.mobile.navigate(url);	
				//location.reload();		
				$("#button_show").html('<input style="background-color:#00B0B0; height:30px; width:100%; color:#FFF; font-size:14px" type="submit"  value="         Redeem          "   onClick="Redeem()">');
			}
			
			else{
				$("#purchaseF_image").hide()
				$("#saveButton").show()	
				$("#errorChkpurchaseF").html('Failled')
			}
		}      
	
	  });
	}
	else{
	}
		$("#purchaseF_image").hide()
	 	$("#saveButton").show()
		$("#errorChkpurchaseF").html('Please Confirm BKash transaction')
	}	


function upload_image(imageURI, imageName) {
   // alert (localStorage.photo_submit_url)
   //alert (imageURI+' |  '+imageName)
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	options.chunkedMode = false;
	
    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI(apipath_image),winProfile,failProfile,options);
	 
}

function winProfile(r) {
}

function failProfile(error) {
	//$("#error_prescription_submit").text('Memory Error. Please take new picture and Submit');
}	
//function finalPurchaseSave(){
//	url="#submitPage";					
//	$.mobile.navigate(url);	
//	}	
	
function login_user() {
	     
	     var cm_id=$("#cm_id").val();
	     var cm_pass=$("#cm_pass").val();
	     if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
			 $(".errorMsg").html("Required ID  and password");	
				
		 }else{
			
			$("#login_image").show();
			$("#loginButton").hide();
			localStorage.cid='UNILEVER';
			localStorage.cm_id=cm_id;
			localStorage.cm_pass=cm_pass;
			//localStorage.synced='NO'
			
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
					
				}
				
			//	 	
//    	    if(localStorage.cm_pass!=cm_id || localStorage.cm_pass!=cm_pass){
//					
//		            $(".errorMsg").html("Wrong UserId/Name and password combination");	
//				}
	       // alert (apiPath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code)
			
			$.ajax({
				 type: 'POST',
				 url: apiPath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code,
				 success: function(result) {	
				 		
						if (result==''){
							$("#login_image").hide();
							$("#loginButton").show();
							$("#login_error").html('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#login_error").html('Failled');
								
							}
							if (resultArray[0]=='SUCCESS'){
								
								
								localStorage.memInfo=''
								localStorage.memPoint=''
								localStorage.memRedMob=''
								localStorage.memRedName=''
								localStorage.giftShowRed=''
								localStorage.submitRedeem=''
								localStorage.memInfo=''
								localStorage.memPoint=''
								localStorage.submitPurchase=''
								localStorage.prdctShowCart=''
								localStorage.queMem=''
								localStorage.radioMem=''
								localStorage.pFinal=''
								localStorage.pStr=''
								localStorage.TotalProductPoint=''
								localStorage.pStrFinal=''
								localStorage.pStr=''
								
								
								localStorage.sync_code=resultArray[1];
								localStorage.outletString=resultArray[2];
								localStorage.prodctStr=resultArray[3];
								//localStorage.memMbStr=''
								localStorage.recMemStr=resultArray[4];
								localStorage.giftdctStr=resultArray[5];
								localStorage.catdctStr=resultArray[6];
								
								
								localStorage.sync='Yes';
								
								var catListStrStr=localStorage.catdctStr.split('<rdrd>');
								var catList='';
								catList=catList+"<option value=ALL>ALL</option>"
						        for (i=0;i<catListStrStr.length-1;i++){	
								catList=catList+"<option value="+encodeURIComponent(catListStrStr[i])+">"+catListStrStr[i]+"</option>"; 
								
							    }
								 
								localStorage.catList= catList
								//alert (localStorage.catList)
								var rpt_rep_ob1=$("#catgoryList");
								rpt_rep_ob1.empty();	 
								rpt_rep_ob1.append(catList);
								
								var rpt_rep_ob1=$("#catgoryListShow_S");
								rpt_rep_ob1.empty();	 
								rpt_rep_ob1.append(catList);
						
								
							    var memStrListStr=localStorage.recMemStr.split('||');					
						    // alert (localStorage.recMemStr);
						        var memList='';
						        for (i=0;i<memStrListStr.length;i++){					
							 //alert ('1')
							    memList=memList+"<option value="+encodeURIComponent(memStrListStr[i])+">"+memStrListStr[i]+"</option>";								
						            }	
									//alert (memList)
								var rpt_rep_ob=$("#memberList");					
						        rpt_rep_ob.empty();							
						        rpt_rep_ob.append(memList);
							
         						outletString=localStorage.outletString
								outletStringList=outletString.split('<rdrd>')
								var outletShow='<ul>'
								for (i=0; i<outletStringList.length-1; i++){
			outletShow=outletShow+'<li class="ui-btn ui-shadow ui-corner-all " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"  onClick="setOutlet(\'' + outletStringList[i] + '\')"><td > '+outletStringList[i]+'</li>'
									//alert (outletStringList[i])
								}
								outletShow=outletShow+'</ul>'
								localStorage.outletShow=outletShow
								
								$("#outletShow").html(localStorage.outletShow)
							
								giftdctStr=localStorage.giftdctStr
								giftdctStrList=giftdctStr.split('<rdrd>')
								var giftShow=''
								for (i=0; i<giftdctStrList.length-1; i++){
								/*if (i/2){
								giftShow=giftShow+' <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#AAE3FF" ><tr ><td width="100px"> &nbsp;&nbsp;'+giftdctStrList[i].split('|')[2]+'</td> <td > '+giftdctStrList[i].split('|')[0]+'</td></tr></table>'
								
								
								}
								else*/
			giftShow=giftShow+' <table width="100%" border="0" cellpadding="0" cellspacing="0" ><tr ><td width="100px"> &nbsp;&nbsp;'+giftdctStrList[i].split('|')[2]+'</td> <td > '+giftdctStrList[i].split('|')[0]+'</td></tr></table>'
									//alert (outletStringList[i])
								}
								giftShow=giftShow
								localStorage.giftShow=giftShow
								
								$("#giftShow").html(localStorage.giftShow)
								
								
								 prodctStr=localStorage.prodctStr
								 prodctListStr=prodctStr.split('<rdrd>');
								 var prdctShow=''
								 var prdctShowList=''
								 for (i=0; i<prodctListStr.length-1; i++){
									 var qName="qName_"+i.toString()
									 var pNameID="pNameID_"+i.toString()
									 
									 pShowList=prodctListStr[i].split('|')
									 var pShow=pShowList[0]+'|'+pShowList[3]
					prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
									 
									 
									 
									 prdctShowList=prdctShowList+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>'                              
									// alert (prdctShow)
								    }
								  
								 
								     
								     localStorage.prdctShow=prdctShow
									 localStorage.prdctShowList=prdctShowList
									 
								     //$("#prdctShow").html(localStorage.prdctShow)
								   //  $("#item_combo_id").empty()
								    // $("#item_combo_id").append(localStorage.prdctShow);
									
									var item_combo_id_ob=$('#item_combo_id');
									item_combo_id_ob.empty()
									item_combo_id_ob.append(prdctShow);
									
									var item_combo_id_ob_S=$('#item_combo_id_S');
									item_combo_id_ob_S.empty()
									item_combo_id_ob_S.append(prdctShowList);
									
									
									
									
									//item_combo_id_ob.listview("refresh");		
								     //alert (localStorage.prdctShow)
									 
						
								$("#loginButton").show();
								$("#login_image").hide();	  
								url="#pageOutlet";					
								$.mobile.navigate(url);	
								item_combo_id_ob.listview("refresh");							
							   }		
							
							
						}
				      },
				  error: function(result) {
					 $("#login_image").hide();
					 $("#loginButton").show(); 
					 $("#login_error").html('Network error has occurred please try again!');
					
				  }
			  });//end ajax
	
		 }//alse
		 
		 
		 }//function
//	    

//		
function setOutlet(outlet){
	localStorage.outlet=outlet
	
	
	localStorage.memInfo=''
	localStorage.memPoint=''
	localStorage.memRedMob=''
	localStorage.memRedName=''
	localStorage.submitRedeem=''
	localStorage.memInfo	=''
	localStorage.memPoint	=''
	localStorage.submitPurchase=''
	localStorage.prdctShowCart=''
	localStorage.queMem	=''
	localStorage.radioMem =''
	localStorage.pFinal=''
	localStorage.pStr=''
	localStorage.TotalProductPoint=''
	localStorage.pStrFinal=''
	menuSearch()
	location.reload();
}

function selcetCat(){
	var catValue=$("#catgoryList").val();
	
	//alert (localStorage.prdctShow)
	prodctStr=localStorage.prodctStr
	prodctListStr=prodctStr.split('<rdrd>');
	var prdctShow=''
	//alert (localStorage.prodctStr)
	for (i=0; i<prodctListStr.length-1; i++){
	 var qName="qName_"+i.toString()
	 var pNameID="pNameID_"+i.toString()
	 var cat = prodctListStr[i].split('|')[2]
	 pShowList=prodctListStr[i].split('|')
	 var pShow=pShowList[0]+'|'+pShowList[3]
	 //alert (cat)
	 if (catValue=="ALL"){
	 	//prdctShow=prdctShow+'<table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+prodctListStr[i]+'</td></tr></table>' 
		prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
									 
									 
		
		  
	 }
	 else{
		 if (cat==catValue){
		 	//prdctShow=prdctShow+'<table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+prodctListStr[i]+'</td></tr></table>'
			prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
		 }
	 }
	// alert (prdctShow)
	}
	//alert (localStorage.prodctStr)
	//alert (localStorage.prdctShow)
	 
	 localStorage.prdctShow=prdctShow
	 var item_combo_id_ob=$('#item_combo_id');
									
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctShow);
	item_combo_id_ob.listview("refresh");
	 
	// $("#prdctShow").html(localStorage.prdctShow)
//	 $("#item_combo_id").empty()
//	 $("#item_combo_id").append(localStorage.prdctShow);
	

}


function selcetCat_S(){
	var catValue=$("#catgoryListShow_S").val();
	
	//alert (localStorage.prdctShow)
	prodctStr=localStorage.prodctStr
	prodctListStr=prodctStr.split('<rdrd>');
	var prdctShow=''
	//alert (localStorage.prodctStr)
	for (i=0; i<prodctListStr.length-1; i++){
	 var qName="qName_"+i.toString()
	 var pNameID="pNameID_"+i.toString()
	 var cat = prodctListStr[i].split('|')[2]
	 pShowList=prodctListStr[i].split('|')
	 var pShow=pShowList[0]+'|'+pShowList[3]
	 //alert (cat)
	 if (catValue=="ALL"){
	 	 
		prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>'                                
									 
									 
		
		  
	 }
	 else{
		 if (cat==catValue){
		 	//prdctShow=prdctShow+'<table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+prodctListStr[i]+'</td></tr></table>'
			prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>'                              
		 }
	 }
	// alert (prdctShow)
	}
	//alert (localStorage.prodctStr)
	//alert (localStorage.prdctShow)
	 
	
	 var item_combo_id_ob=$('#item_combo_id_S');
									
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctShow);
	item_combo_id_ob.listview("refresh");
	 
	// $("#prdctShow").html(localStorage.prdctShow)
//	 $("#item_combo_id").empty()
//	 $("#item_combo_id").append(localStorage.prdctShow);
	

}









//=======clear form=============

function resetForms() {
    for (i = 0; i < document.forms.length; i++) {
        document.forms[i].reset();
    }
}


function member_save(){
	  var name=$("#name").val();
	  var ageRange=$("#ageRange").val();
	  var thana=$("#thana").val();
	  var district=$("#district").val();
	  var genderComb=$("#genderComb").val();
	  var birthMonthG=$("#birthMonthG").val();
	  var birthDayG=$("#birthDayG").val();
	  var address=$("#address").val();
      var mobile=$("#mobile").val();
	  var reg_date=$("#reg_date").val();
	  var reg_by_cm=$("#reg_by_cm").val();
	  var otltName=localStorage.outlet
	  var birthdate=$("#birthdate").val();
	  
	  if (name==""){
			$(".errorChk").text("Please enter your name!");
			
	  }else if(mobile==""){
			$(".errorChk").text("Enter valid phone number");
			
	  }else if(ageRange==""){
			$(".errorChk").text("Please select an option");
	  }else{

	  
	 // alert(apiPath+'dataSave?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&name='+name+'&genderComb='+genderComb+'&birthDayG='+birthDayG+'&birthMonthG='+birthMonthG+'&address='+address+'&mobile='+mobile+'&reg_date='+reg_date+'&reg_by_cm='+reg_by_cm+'&otltName='+otltName+'&ageRange='+ageRange+'&thana='+thana+'&district='+district)
	  
	  
	  $.ajax({
		type:'POST',
		url:apiPath+'dataSave?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&name='+name+'&genderComb='+genderComb+'&birthDayG='+birthDayG+'&birthMonthG='+birthMonthG+'&address='+address+'&mobile='+mobile+'&reg_date='+reg_date+'&reg_by_cm='+reg_by_cm+'&otltName='+otltName+'&ageRange='+ageRange+'&thana='+thana+'&district='+district,
		
        success: function(result1) {
			
			if (result1!=''){
				
			localStorage.memInfo=mobile+'-'+name
			localStorage.memPoint=0
			//alert ('11')
			
			$("#prMem").html(localStorage.memInfo);
			$("#prPoint").html(localStorage.memPoint);	
				
				
			$(".errorChk").text("Submitted Successfully");
			
			$("#memButton").show();		
			}
          
		}      
	  
	  });
	 product()
	  }
	  
}
//
//
//    var currentDate = new Date()
//	var day = currentDate.getDate();if(parseInt(day)<9)	{day="0" + day};
//	var month = currentDate.getMonth() + 1;if(parseInt(month)<9){month="0" +month};
//	var year = currentDate.getFullYear()
//	var today=  year + "-" + month + "-" + day
//
//
//function menuSearch(){
//	$('#outletMenu').html(localStorage.outlet)
//	url="#menuPage";					
//	$.mobile.navigate(url);	
//	}			
//function about_us(){
//	
//	url="#aboutComp";					
//	$.mobile.navigate(url);	
//	}
//
//function addMember(){
//	$('#otltName').html(localStorage.outlet);
//
//	url="#memberReg";					
//	$.mobile.navigate(url);	
//	}
//
//function searchMember(){
//	$('#outletSrch').html(localStorage.outlet);
//	
//	url="#searchMem";					
//	$.mobile.navigate(url);	
//	}
//	
//function outletListSearch(){
//	
//	url="#outleListP";					
//	$.mobile.navigate(url);	
//	}
//
//function memPurchase(){
//	
//	$('#purchOutlet').html(localStorage.outlet);
//	//$('#otltName').val(localStorage.outlet);
//	var n_m = $('#memberList').val();
//	//alert (n_m)
//	$('#nam_mob').html(n_m);
//	
//	
//	alert(apiPath+'search_memeber?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&n_m='+n_m)
//		  
//	  $.ajax({
//		type:'POST',
//		url:apiPath+'search_memeber?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&n_m='+n_m,
//	
//        success: function(result2) {
//			//alert(result2)
//			//alert ('hi')	
//			if (result2!=''){
//			$('#nam_mob').html(result2);
//			localStorage.my_nam_mob = 	result2;
//			//alert(localStorage.my_nam_mob )
//			}
////	
//
//         url="#purchasePro";					
//	    $.mobile.navigate(url);	
//	
//		}      
//      
//			 
//			  
//	  });
//	
//	
//	//$('#memberList').html();
//	
//	//url="#purchasePro";					
////	$.mobile.navigate(url);	
//	}
//	
//	
//
//
//
//	
//function giftList(){
//	
//	url="#gift";					
//	$.mobile.navigate(url);	
//	}
//	
//function noticeBoard(){
//	
//	url="#Notice";					
//	$.mobile.navigate(url);	
//	}

//==========================search====
//function member_view() {
//
//	    $.ajax({ 
//		      type: 'GET',
//			  url:apiPath+'get_data?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code,			
//			  success: function(memRegStr) {
//			  //alert (memRegStr)
//	          memberList=memRegStr.split('||');
//			  strMemberShow="";			  
//			  for (i=0;i<memberList.length;i++){
//			  	memRec = 	memberList[i]				
//				strMemList=memRec.split(',')				
//				var	Mmobile = strMemList[0]
//				var	Mname = strMemList[1]
//				alert (Mmobile)	
//
//				
//				//$("#memberTable").html(Mmobile);
////                 <table width="100%"><tr onClick="setOutlet(\'' + outletStringList[i] + '\')"><td > '+outletStringList[i]+'</td></tr><tr style=" background-color:#000; height:1px"><td></td></tr></table>
////
//
//
//				
//					
//				}
//				url="#searchMem";					
//				$.mobile.navigate(url);	
//				alert (strMemberShow)					
////				$(".errorChk").html(strMemberShow);
//			  }
//	});	
//	
//}




//$(document).on("click", "#btn_search", function(){
//   $(".ui-input-search").toggle();
//})
//

//==================end====================================================================		
	
//var apipath='http://a007.yeapps.com/unileverEon/syncmobile_schedule_eon/';
//var apipath_image = 'http://a007.yeapps.com/unileverEon/';


//var apipath='http://e3.businesssolutionapps.com/unilever/syncmobile_schedule/';
//var apipath_image = 'http://e3.businesssolutionapps.com/unilever/';

 
var step_flag=0; // 1 fd , 2 qpds, 3 gift

var temp_image_div='';
localStorage.routeIDName='';
//localStorage.m_new="";
//localStorage.submitted_outlet="";

//---------------------------------------------------

//For Local use=============
/*outlet_next_page
fdisplay_before_page_next
fdisplay_ready_data
qpds_ready_data 
npd_ready_data
mhskus_ready_data
gift_ready_data
place_ready_data
cancel_outlet_Back
*/




//-------GET GEO LOCATION Start----------------------------
function getlocationand_askhelp() { //location
    $("#lat").val(0);
	$("#long").val(0);
	var options = { enableHighAccuracy: true,timeout:5000};
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	$("#location_button").hide();
	$("#submit_data").html("Confirming Location. Please Wait...");
	
	localStorage.placeLatLongCount=parseInt(localStorage.placeLatLongCount)+1

}
	 
// onSuccess Geolocation
function onSuccess(position) {
	localStorage.latitude=position.coords.latitude;
	localStorage.longitude=position.coords.longitude;
	
	$("#lat").val(localStorage.latitude);
	$("#long").val(localStorage.longitude);
	$("#submit_data").html("Location Confirmed");
	localStorage.latlongSubmit=1;
	buttonCheck();
	
}
	
function onError(error) {
	$("#submit_data").html('Please Ensure  Your GPS is On');
	$("#sub_button").hide();
	$("#location_button").show();
	$("#lat").val(0);
	$("#long").val(0);
	localStorage.latlongSubmit=0;
	buttonCheck();
	
	}
//-------GET GEO LOCATION End----------------------------
//=============get time start===================
function get_date() {
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-" 
			+ (currentdate.getMonth()+1)  + "-"  
			+ currentdate.getDate() + " "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
	return datetime;
}
//=============get tieme end=============

//============================================
//--------------------------------------------- Exit Application
function exit() {
navigator.app.exitApp();

}


function first_page(){
	
	if ((localStorage.synced!='YES')){
		var url = "#login";
		$.mobile.navigate(url);
			
	}
}

function outlet_next_page(){
	shop_ready_data();
	var shop_image_name=$("#shop_image_name_hidden").val();
	var shop_image_path=$("#shop_image_div_hidden").val();
	
	//if (shop_image_name.length < 10){
	if (shop_image_path.length < 10){
			var url = "#cancelPage";
			$.mobile.navigate(url);
	}
	else{
		   if ((localStorage.routeException_found == '1') && ((localStorage.outletException=='undefined') || (localStorage.outletException==undefined))){
				
				var url = "#outletexceptionPage";
				$.mobile.navigate(url);
				
				$(url).trigger('create');
				
			}
			else{
					if (localStorage.fdSkip==0){
					var url = "#fdbeforePage";
					$.mobile.navigate(url);
					  $('#shop_show').find('input, textarea, button, select').attr('disabled','disabled');
					  $('#shop_show').addClass('disabledAnchor');
					  localStorage.shop_next_flag=1;
					}
					else if (localStorage.qpdsSkip==0){
						var url = "#qpdsPage";
						$.mobile.navigate(url);
						$('#shop_show').find('input, textarea, button, select').attr('disabled','disabled');
					 	$('#shop_show').addClass('disabledAnchor');	
						localStorage.shop_next_flag=1;
						
					}
					else {
						var url = "#giftAckPage";
						$.mobile.navigate(url);
						$('#shop_show').find('input, textarea, button, select').attr('disabled','disabled');
					    $('#shop_show').addClass('disabledAnchor');	
						localStorage.shop_next_flag=1;
						
					}
		
					$(url).trigger('create');
			}
	}
	//getlocationand_askhelp();
}

//=================after select an outlet
function clear_autho(){
	localStorage.cm_id='';
	localStorage.cm_pass='';
	localStorage.routeString='';
	localStorage.routeExStringShow='';
	localStorage.show_cancel=0;
	localStorage.m_new_string="";
	localStorage.selectedOutlet="";
	localStorage.outletExStringShow="";
	localStorage.outletException="";
	localStorage.outletChanne="";
	localStorage.outletNameID="";
	localStorage.mhskusTotal="";
	localStorage.npdTotal="";
	localStorage.fdisplaySlabTotal="";
	localStorage.fdisplayTotal="";
	localStorage.qpdsSlabTotal="";
	localStorage.qpdsTotal="";
	localStorage.giftTotal="";
	
	localStorage.marchadizingTotal="";
	localStorage.mhskus_data_ready="";
	localStorage.npd_data_ready="";
	localStorage.fdisplay_data_ready="";
	localStorage.qpds_data_ready="";
	localStorage.gift_data_ready="";
	
	localStorage.mar_data_ready="";
	localStorage.synced="";
	
	localStorage.m_new="";
	
	//distributon
	localStorage.mar_distrib_data=""
	localStorage.merchandisingDistribStr=""
	localStorage.mar_distrib_stock=""
	
	
	
	localStorage.latlongSubmit=0;
	localStorage.dataSubmit=0;
	localStorage.fddataSubmit=0;
	localStorage.qpdsdataSubmit=0;
	localStorage.npddataSubmit=0;
	localStorage.giftdataSubmit=0;
	localStorage.shopdataSubmit=0;
	localStorage.placedataSubmit=0;
	
	localStorage.saved_req='';
	
	var url = "#login";
	$.mobile.navigate(url);
	$(url).trigger('create');
	
}
function div_change(){
	localStorage.show_cancel=1
	$("#outletCancel").show();
	$("#outletString").hide();
	$("#menujpj").hide();
	
	$("#backjpj").hide();
	$("#link_route").hide();
	
	$("#outletName_show").html(localStorage.outletNameID);
	
}


function cancel_outlet_next(){
	$("#next_option").hide();
	$("#cancel_option").show()
	$("#c_reason").html('');
	
	localStorage.cancel_page=0;
	
	
	//$("#place_outlet_nameID").empty();
//	$("#place_outlet_nameID").append(localStorage.outletNameID).trigger('create');
	//$("#cpageOutletNameID").empty();
	$("#cpageOutletNameID1").html(localStorage.outletNameID);
	//alert (localStorage.outletNameID)
	var url = "#cancelPage";
	$.mobile.navigate(url);
	location.reload();
	
	
}
function cancel_outlet_next_next(){
	$("#next_option").show();
	$("#cancel_option").hide();
	
	localStorage.cancel_page=1;
	//alert (localStorage.outletIDname)
	//var outletGet=localStorage.outletIDname
//	var selectedoutlet=outletGet.split('[')[1].replace(']','')
//	localStorage.selectedoutlet=selectedoutlet
	
	//alert (localStorage.outletNameID)
	//$("#place_outlet_nameID").empty();
	//$("#place_outlet_nameID").append(localStorage.outletNameID).trigger('create');
	$("#cpageOutletNameID").empty();
	$("#cpageOutletNameID").append(localStorage.outletNameID).trigger('create');
	
	$("#outletInfoCategory").empty();
	$("#outletInfoCategory").append(localStorage.outletNameID).trigger('create');
	syncOutlet();
	
	var url = "#categoryPage";
	$.mobile.navigate(url);
	//location.reload();
	setDivCat()
	
	//location.reload();
	
}
function setDivCat(){
	var catVal=$("#catCombo").val();
	//alert (catVal)
	if (catVal=='HairCare'){
		$("#HairCare").show();
		$("#SkinCare").hide();
		$("#Oral").hide();
		$("#SkinCleansing").hide();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").hide();
		$("#Foods").hide();
	}
	if (catVal=='SkinCare'){
		$("#HairCare").hide();
		$("#SkinCare").show();
		$("#Oral").hide();
		$("#SkinCleansing").hide();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").hide();
		$("#Foods").hide();
	}
	if (catVal=='Oral'){
		$("#HairCare").hide();
		$("#SkinCare").hide();
		$("#Oral").show();
		$("#SkinCleansing").hide();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").hide();
		$("#Foods").hide();
	}
	if (catVal=='SkinCleansing'){
		$("#HairCare").hide();
		$("#SkinCare").hide();
		$("#Oral").hide();
		$("#SkinCleansing").show();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").hide();
		$("#Foods").hide();
	}
	if (catVal=='Laundry'){
		$("#HairCare").hide();
		$("#SkinCare").hide();
		$("#Oral").hide();
		$("#SkinCleansing").hide();
		$("#Laundry").show();
		$("#HouseHoldcleansing").hide();
		$("#Foods").hide();
	}
	if (catVal=='HouseHoldcleansing'){
		$("#HairCare").hide();
		$("#SkinCare").hide();
		$("#Oral").hide();
		$("#SkinCleansing").hide();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").show();
		$("#Foods").hide();
	}
	if (catVal=='Foods'){
		$("#HairCare").hide();
		$("#SkinCare").hide();
		$("#Oral").hide();
		$("#SkinCleansing").hide();
		$("#Laundry").hide();
		$("#HouseHoldcleansing").hide();
		$("#Foods").show();
	}
	//$("#cancel_option").hide();
//	
//	localStorage.cancel_page=1;
//	
//	$("#place_outlet_nameID").empty();
//	$("#place_outlet_nameID").append(localStorage.outletIDname).trigger('create');
//	$("#cpageOutletNameID").empty();
//	$("#cpageOutletNameID").append(localStorage.outletIDname).trigger('create');
//	
//	var url = "#categoryPage";
//	$.mobile.navigate(url);
//	location.reload();
	//location.reload();
	
}
function shop_ready_data() { 
	var shop_data="";
	var image_name=$("#shop_image_name_hidden").val();
	var shop_image_path=$("#shop_image_div_hidden").val();
	shop_data=shop_data+image_name+'fdfd'+shop_image_path+'rdrd';
	localStorage.shop_data_ready=shop_data
	
	
	
	shop_page_set();
}
function shop_page_set() { 
	var shop_data =  localStorage.shop_data_ready.replace("rdrd","");
	var shop_array =  shop_data.split('fdfd');
	var image_name = shop_array[0];
	var shop_image_path = shop_array[1];
	
	$("#shop_image_name_hidden").val(image_name);
	$("#shop_image_div_hidden").val(shop_image_path );
	
	
	var image = document.getElementById('shop_image_div');
    image.src = shop_image_path;
		
	if (localStorage.shop_next_flag==1){
		$('#shop_show').find('input, textarea, button, select').attr('disabled','disabled');
	    $('#shop_show').addClass('disabledAnchor');	
	}
	
}


function cancel_outlet_Back(){
	$("#cancelButton").hide();
	$("#login_image_cancel").show();
	var cancel_reason=$("#cancel_cause").val();
	var imageName=$("#shop_image_name_hidden").val();
	var imagePath=$("#shop_image_div_hidden").val();
	var latitude=$("#lat").val();
	var longitude=$("#long").val();
	//alert (imageName.length )
	
	if (cancel_reason==""){
		$("#c_reason").html('Please Select Reason');
		$("#cancelButton").show();
		$("#login_image_cancel").hide();
	}
	else{
		if (cancel_reason=="Will try later"){
			cancel_outlet();
			$("#cancelButton").show();
			$("#login_image_cancel").hide();
			var url = "#outletPage";
			$.mobile.navigate(url);
		}
		else{
			//if (imageName.length == 0){
			if (imagePath.length < 10){
				$("#c_reason").html('Please Take Picture');
				$("#cancelButton").show();
				$("#login_image_cancel").hide();
				}
			else{
	//				//Submit to visit as cancel
					var outletID= (localStorage.outletNameID).split('|')[1]
	
	
			//	alert (apipath+'cancel_outlet?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&selectedRoute='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+outletID+'&outletEx='+localStorage.outletException+'&cancel_reason='+cancel_reason+'&imageName='+imageName+'&imagePath='+imagePath+'&latitude='+latitude+'&longitude='+longitude)
				$("#c_reason").html(apipath+'cancel_outlet?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&selectedRoute='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+outletID+'&outletEx='+localStorage.outletException+'&cancel_reason='+cancel_reason+'&imageName='+imageName+'&imagePath='+imagePath+'&latitude='+latitude+'&longitude='+longitude);
					$.ajax({
						 type: 'POST',
						 url: apipath+'cancel_outlet?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&selectedRoute='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+outletID+'&outletEx='+localStorage.outletException+'&cancel_reason='+cancel_reason+'&imageName='+imageName+'&imagePath='+imagePath+'&latitude='+latitude+'&longitude='+longitude,
						 success: function(result) {
							 	$("#cancelButton").show();
								$("#login_image_cancel").hide();
								if (result==''){
									
									alert ('Sorry Network not available');
								}
								else{
											
									if (result=='FAILED'){
										
										$("#error_login").html('Please Try Again');
									}
									if (result=='SUCCESS') {
										cancel_outlet();
										var url = "#outletPage";
										$.mobile.navigate(url);
										//$('#shop_show').find('input, textarea, button, select').attr('disabled','disabled');
										
									}
							   }
							  },
						  error: function(result) {
							 // $("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);
							 
							  $("#error_login").html('Network timeout. Please ensure you have good network signal and working Internet.');
							  $("#cancelButton").show();
							  $("#login_image_cancel").hide();
							  var url = "#login";
							  $.mobile.navigate(url);	
							  
						  }
					  });//end ajax
					upload_shop();
					$("#shop_image_name_hidden").val("");
					$("#shop_image_div_hidden").val("");
					$("#cancelButton").show();
					$("#login_image_cancel").hide();
			} // End else
	
		} //End else
	} //end else
	
}

function cancel_outlet(){
	localStorage.show_cancel=0;
	localStorage.outletNameID='';
	
	
	localStorage.selectedOutlet="";
	localStorage.selected_date="";
	localStorage.outletException="";
	localStorage.outletChannel="";

	localStorage.m_new_string="";
	localStorage.m_new="";
	localStorage.selectedOutlet="";
	//localStorage.outletExStringShow="";
	localStorage.outletException="";
	localStorage.outletChanne="";
	localStorage.outletNameID="";
	localStorage.mhskusTotal="";
	
	localStorage.npdTotal="";
	localStorage.fdisplaySlabTotal="";
	localStorage.fdisplayTotal="";
	localStorage.qpdsSlabTotal="";
	
	localStorage.qpdsTotal="";
	localStorage.giftTotal="";
	localStorage.marchadizingTotal="";
	localStorage.mhskus_data_ready="";
	localStorage.npd_data_ready="";
	localStorage.fdisplay_data_ready="";
	localStorage.qpds_data_ready="";
	localStorage.gift_data_ready="";
	localStorage.mar_data_ready="";
	
	localStorage.shop_data_ready="";
	localStorage.place_data_ready="";
	localStorage.key_data_ready="";
	
	localStorage.shop_next_flag=0;
	localStorage.before_flag=0;
	localStorage.fd_done_flag=0;
	localStorage.qpds_next_flag=0;
	localStorage.npd_next_flag=0;
	localStorage.mhskus_next_flag=0;
	localStorage.gift_next_flag=0;
	localStorage.place_next_flag=0;
	
		
	localStorage.latitude=0;
	localStorage.longitude=0;
	
	
	
	localStorage.latlongSubmit=0;
	localStorage.dataSubmit=0;
	localStorage.fddataSubmit=0;
	localStorage.qpdsdataSubmit=0;
	localStorage.npddataSubmit=0;
	localStorage.giftdataSubmit=0;
	localStorage.shopdataSubmit=0;
	localStorage.placedataSubmit=0;
	
	
	localStorage.placeLatLongCount=0;
	
	
	localStorage.outletException='undefined';
	$("#outletCancel").hide();
	$("#outletString").show();
	$("#menujpj").show();
	$("#backjpj").show();
	$("#link_route").show();
	
	$("#outletWait").show();
	$("#outletButton").hide();
	
	$("#outletName_show").html(localStorage.outletNameID);
	
	//location.reload();
}
//=============================================
//=========================Check user=====================
//function check_user() { 
//	var cm_id=$("#cm_id").val();
//	var cm_pass=$("#cm_pass").val();
//	if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
//		var url = "#login";      
//		$.mobile.navigate(url);
//	}else{
//		
//		$("#login_image").show();
//		$("#loginButton").hide();
//		localStorage.cid='UNILEVER';
//		localStorage.cm_id=cm_id;
//   		localStorage.cm_pass=cm_pass;
//		localStorage.synced='NO'
//		$("#outletString").html('');
//		localStorage.saved_req=''
//		
//		localStorage.outletString='';
//	//	clear_autho();
//   		
//	alert (apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode)
//	//$("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);	
//   		$.ajax({
//				 type: 'POST',
//				 url: apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode,
//				 success: function(result) {
//					
//						if (result==''){
//							$("#loginButton").show();
//							$("#login_image").hide();
//							alert ('Sorry Network not available');
//						}
//						else{
//							var resultArray = result.split('<SYNCDATA>');			
//							if (resultArray[0]=='FAILED'){
//								//$("#error_login").html('Failed');
//								$("#loginButton").show();
//								$("#login_image").hide();
//								$("#error_login").html('Unauthorized User');
//							}
//							if (resultArray[0]=='SUCCESS'){
//								cancel_outlet();
//								$("#loginButton").show();
//								$("#login_image").hide();
//								var sync_date_get=get_date();
//								var sync_date_get=get_date();
//								
//								var sync_y=sync_date_get.split('-')[0];
//								var sync_m=sync_date_get.split('-')[1];
//								if (sync_m.length==1){sync_m='0'+sync_m}
//								var sync_d=sync_date_get.split('-')[2].split(' ')[0];
//								if (sync_d.length==1){sync_d='0'+sync_d}
//								var sync_date=sync_y +'-'+ sync_m +'-'+sync_d;
//								localStorage.sync_date=sync_date;
//								
//								localStorage.synced='YES';
//								localStorage.synccode=resultArray[1];
//								
//								localStorage.saved_visit=resultArray[2];
//								localStorage.outletStr=resultArray[3];
//								localStorage.prodctStr=resultArray[4];
//								
//								
//								var result_string=resultArray[4];
//								//alert (result_string)
//								
//								
//								var cancel_reasonArray = result_string.split('</cancelList>');									
//								var cancelList = cancel_reasonArray[0].replace("<cancelList>","");
//								
//								var place_str = cancel_reasonArray[1];
//								var place_strArray = place_str.split('</placeList>');									
//								var place_strList = place_strArray[0].replace("<placeList>","");
//								
//								
//								//create cancel reason combo
//								//alert (cancelList)
//								var cancelArray = cancelList.split('rdrd');	
//								var cancel_combo_str='<select name="cancel_cause" id="cancel_cause" >'
//								cancel_combo_str=cancel_combo_str+'<option value=""></option>'
//								cancel_combo_str=cancel_combo_str+'<option value="Will try later">Will try later</option>'
//								for (var i=0; i < cancelArray.length; i++){				
//									cancel_combo_str=cancel_combo_str +'<option value="'+cancelArray[i].split('fdfd')[0]+'">'+cancelArray[i].split('fdfd')[1]+'</option>'			  	
//								}
//								cancel_combo_str=cancel_combo_str+'</select>'
//								
//								
//								localStorage.cancel_combo_str=cancel_combo_str
//								$('#cancel_reason').empty();
//								$('#cancel_reason').append(localStorage.cancel_combo_str);
//								
//								
//								//create place  combo
//								var placeArray = place_strList.split('rdrd');	
//								//var place_combo_str='Select Place Location: </br><select name="place_combo" id="place_combo" >'
////								place_combo_str=place_combo_str+'<option value=""></option>'
//								var place_combo_str='Select Place Location: </br>'
//								place_combo_str=place_combo_str +'<label><input type="checkbox" name="is_near_inFront_actual" id="is_near_inFront_actual" value=""/>Near or In front of Entrance</label>'	
//								place_combo_str=place_combo_str +'<label ><input type="checkbox" name="is_beside_adjacent_actual" id="is_beside_adjacent_actual" value=""/>Beside or Adjacent Cash Counter</label>'	
//								place_combo_str=place_combo_str +'<label  ><input type="checkbox" name="is_eyeLevel_actual" id="is_eyeLevel_actual" value=""/>Eye Level of Consumers</label>'	
//								place_combo_str=place_combo_str +'<label  ><input type="checkbox" name="is_clearlyVis_noObs_actual" id="is_clearlyVis_noObs_actual" value=""/> Clearly Visible or No obstacle in front of the shelf</label>'	
//								
//								
//								//for (var i=0; i < placeArray.length-1; i++){				
////									//place_combo_str=place_combo_str +'<option value="'+placeArray[i].split('fdfd')[1]+'">'+placeArray[i].split('fdfd')[1]+'</option>'			  	
////									place_combo_str=place_combo_str +'<label style="background:#81C0C0"><input type="radio" name="place_combo"  value="'+placeArray[i].split("fdfd")[1]+'" id="place_combo"> '+placeArray[i].split("fdfd")[1]+'</label>'			  	
////								}
////								place_combo_str=place_combo_str+'</select>'
//								
//								
//								localStorage.place_combo_str=place_combo_str;
//								//alert (localStorage.place_combo_str)
//								$('#place_combo_show').empty();
//								$('#place_combo_show').append(localStorage.place_combo_str);
//								
//								if (localStorage.saved_visit=='YES'){
//								$("#saved_button").html('<a data-role="button" onClick="savedVisit()" ><img src="saved_visit.png"></a>')
//								}
//								
//
//								
//
//
//								
//								
//
////									
////								}
////								localStorage.routeString=routeStringShow
////								
////								$("#routeString").html(localStorage.routeString);
//							
//							//=======end route list====================
//							//==========Create route exception list
//								//var routeExStringShow=''
////								var routeExSingleArray = routeExList.split('rdrd');	
////								var routeExSingleTtotal = routeExSingleArray.length;
////								var routeExStringShow=''
////								for (var re=0; re < routeExSingleTtotal-1; re++){
////									routeExArray = routeExSingleArray[re].split('fdfd');
////									routeExID=routeExArray[0];
////									routeExName=routeExArray[1];
////									routeExStringShow=routeExStringShow+'<label><input type="radio" name="RadioRouteEx"    value="'+routeExName+'" > '+routeExName+'</label>'
////								}
////								localStorage.routeExStringShow=routeExStringShow
////								$("#routeExString").html(localStorage.routeExStringShow);
//							
//							//=======end route exception list====================								
//								
//							}
//							//if ((resultArray[0]=='SUCCESS') && (localStorage.route==undefined)){
////								
////								var url = "#routePage";
////								$.mobile.navigate(url);
////								
////								$('#routePage').trigger('create');
////							}
//							//if ((resultArray[0]=='SUCCESS') && (localStorage.route!=undefined)){
//								var url = "#menuPage";
//								$.mobile.navigate(url);
////								
////							}
//							
//						}
//				      },
//				  error: function(result) {
//					  //$("#error_login").html(apipath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode);
//					  $("#error_login").html('Network timeout. Please ensure you have good network signal and working Internet.');
//					  $("#loginButton").show();
//					  $("#login_image").hide();
//					  var url = "#login";
//					  $.mobile.navigate(url);	
//					  
//				  }
//			  });//end ajax
//		  }//end else	
//	}//function
//=========================set route for new date==============

//=========================Check user=====================
function check_route() {		
		
		$("#dataerror").html('');
		
		result_string=localStorage.routeString_bak;
		
		var routeArray = result_string.split('</routeList>');									
		routeList = routeArray[0].replace("<routeList>","");
							
  //==========Create route list
		var routeSingleArray = routeList.split('rdrd');	
		var routeSingleTtotal = routeSingleArray.length;
		var routeStringShow=''
		
		var d=new Date();
		var weekday=new Array(7);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
								
		var today_get = weekday[d.getDay()];
								
		//alert (today_get);
		var alowSl=''
		for (var rs=0; rs < routeSingleTtotal-1; rs++){
			routeSArray = routeSingleArray[rs].split('fdfd');
			routeSID=routeSArray[0];
				
			
			routeSArray = routeSID.split('|');
			var r_sday=routeSArray[2];
			var r_sdaySl=routeSArray[3];
			
			//alert (r_sday);
			
			if (today_get=='Saturday'){
				r_sdaySl=1;
			}
			if (today_get=='Sunday'){
				r_sdaySl=2;
			}
			if (today_get=='Monday'){
				r_sdaySl=3;
			}
			if (today_get=='Tuesday'){
				r_sdaySl=4;
			}
			if (today_get=='Wednesday'){
				r_sdaySl=5;
			}
			if (today_get=='Thursday'){
				r_sdaySl=6;
			}
			if (today_get=='Friday'){
				r_sdaySl=7;
			}
			//alert (r_sdaySl);
			//if (r_sday==today_get){	
					if (r_sdaySl==1){
						alowSl=	'7,6,5,1'
					}
					if (r_sdaySl==2){
						alowSl=	'1,7,6,2'
					}
					if (r_sdaySl==3){
						alowSl=	'1,2,7,3'
					}
					if (r_sdaySl==4){
						alowSl=	'3,2,1,4'
					}
					if (r_sdaySl==5){
						alowSl=	'4,3,2,5'
					}
					if (r_sdaySl==6){
						alowSl=	'5,4,3,6'
					}
					if (r_sdaySl==7){
						alowSl=	'6,5,4,7'
					}
					
			}
			
	//	}
		//alert (alowSl);
		

		for (var r=0; r < routeSingleTtotal-1; r++){
			routeArray = routeSingleArray[r].split('fdfd');
			routeID=routeArray[0];
			routeName=routeArray[1];	
			//alert (routeID);
			r_day = routeID.split('|')[2];
			//alert (routeSingleArray[r])
			//alert (r_sday+"         "+today_get)
			if (r_day==today_get){																			
			  routeStringShow=routeStringShow+'<label style="background:#81C0C0"><input type="radio" name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
			  //alert (alowSl)
			}
			else{
				//alert (routeID);
				//alert (r_day);
				if (r_day=='Saturday'){
					r_sdaySl='1';
				}
				if (r_day=='Sunday'){
					r_sdaySl='2';
				}
				if (r_day=='Monday'){
					r_sdaySl='3';
				}
				if (r_day=='Tuesday'){
					r_sdaySl='4';
				}
				if (r_day=='Wednesday'){
					r_sdaySl='5';
				}
				if (r_day=='Thursday'){
					r_sdaySl='6';
				}
				if (r_day=='Friday'){
					r_sdaySl='7';
				}
			 //alert (alowSl);
//									 alert (r_sdaySl);
//									 alert (alowSl.indexOf(r_sdaySl));
			 
				 if (alowSl.indexOf(r_sdaySl) != -1){
					 routeStringShow=routeStringShow+'<label ><input type="radio"  name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
				 }
										
										
										else{
											routeStringShow=routeStringShow+'<label><input type="radio"  disabled name="RadioRoute"  value="'+routeID+'" id="RadioGroup1_0"> '+routeName+'</label>'
										 }
									 
									}
									
								}
								localStorage.routeString=routeStringShow
								
								$("#routeString").html(localStorage.routeString);
	
	//=======end route list====================
						
								
		var url = "#routePage";
		$.mobile.navigate(url);	
		$(url).trigger('create');
	}//function


//==========================set route for new dateend=============

//=====================Check user end========================

//=====================Route Exception start=====================
function selectRouteException() { 
	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
   
	if(selected_route_exception!=undefined){
		localStorage.routeException=selected_route_exception;
		var url = "#menuPage";
		$.mobile.navigate(url);	
	}
}
//=====================Route Exception end=====================
//=====================outlet start=====================
//function marketPJP() { 
//	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
//	var selected_route=($("input:radio[name='RadioRoute']:checked").val())
//	
//	
//	$("#routeS_image").show();
//	$("#RSButton").hide();
//	
//	
//	
//	var d=new Date();
//	var weekday=new Array(7);
//	weekday[0]="Sunday";
//	weekday[1]="Monday";
//	weekday[2]="Tuesday";
//	weekday[3]="Wednesday";
//	weekday[4]="Thursday";
//	weekday[5]="Friday";
//	weekday[6]="Saturday";
//	
//	var today_get = weekday[d.getDay()];
//	
//	var sync_date_get=get_date();
//	//var sync_date=sync_date_get.substring(0,10);
//	var sync_y=sync_date_get.split('-')[0];
//	var sync_m=sync_date_get.split('-')[1];
//	if (sync_m.length==1){sync_m='0'+sync_m}
//	var sync_d=sync_date_get.split('-')[2].split(' ')[0];
//	if (sync_d.length==1){sync_d='0'+sync_d}
//	var sync_date=sync_y +'-'+ sync_m +'-'+sync_d;
//	//sync_date.substring(1,10)
//
//	localStorage.sync_date=sync_date;
//	
//	
//	var selected_routeArray = selected_route.split('|');	
//	var selected_routeID=selected_routeArray[0];
//	var selected_routeName=selected_routeArray[1];
//	var selected_routeDay=selected_routeArray[2];
//	
//	localStorage.routeIDName=selected_routeName+" | "+selected_routeID
//	if (selected_routeDay==today_get){
//		localStorage.selectedRoute=selected_routeID;
//		localStorage.routeException_found='0';			
//	}
//	else {
//		localStorage.selectedRoute=selected_routeID;
//		localStorage.routeException_found='1';			
//	}
//	
//	if(localStorage.selectedRoute!=undefined){
//		//$("#dataerror").html(apipath+'sync_route?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute);
//	//======================================	
//		
//		localStorage.routeException='';
//		$.ajax({
//				 type: 'POST',
//				 url: apipath+'sync_route?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute,
//				 success: function(result) {	
//				
//						if (result==''){
//							alert ('Sorry Network not available');
//						}
//						else{
//							var resultArray = result.split('<SYNCDATA>');			
//							if (resultArray[0]=='FAILED'){
//								$("#error_login").html('Unauthorized User');
//								
//							}
//							if (resultArray[0]=='SUCCESS'){
//								result_string=resultArray[1];
//								if (result_string=='N'){
//									outletStringShow_n='<label style="color:#800000; font-size:18px" ><table width="100%" border="0"> <tr> <td >Schedule Not Available </td>	</tr></table></label>'
//									$("#dataerror").html(outletStringShow_n);
//									$("#routeS_image").hide();
//									$("#RSButton").show();
//								}
//								else{
//										//merchandising distribution by billal
//										var merchandisingDistribStr=resultArray[2];
//										localStorage.merchandisingDistribStr=merchandisingDistribStr
//										
//										var mar_distrib_stock=""
//										if(merchandisingDistribStr!=""){
//											var merchanDistribList=merchandisingDistribStr.split('rdrd')
//											var merchanDistribListLength=merchanDistribList.length;	
//											for (var i=0; i < merchanDistribListLength; i++){
//												merDistrbItemArray = merchanDistribList[i].split('fdfd');		
//												camp_sl=merDistrbItemArray[0];
//												allocate_qty=merDistrbItemArray[5];
//												given_qty=merDistrbItemArray[6];
//												channel=merDistrbItemArray[7];
//												
//												try{
//													var availableQty=eval(allocate_qty)-eval(given_qty);
//												}catch(e){			
//													var availableQty=0;
//												}
//												
//												campSlChannel=camp_sl.toString()+'_'+channel.toString()
//												
//												if(mar_distrib_stock==""){
//													mar_distrib_stock=campSlChannel+','+availableQty;
//												}else{
//													mar_distrib_stock+='rd'+campSlChannel+','+availableQty;
//												}
//											}
//										}
//										localStorage.mar_distrib_stock=mar_distrib_stock;
//										
//										
//										//-----------
//				
//										
//										var outletArray = result_string.split('</outletList>');									
//										
//										var outletSArray = result_string.split('<outletexList>');	
//										
//										outletList = outletSArray[0].replace("<outletList>","");
//										
//										var outletAllArray = outletSArray[1].split('</outletexList>');	
//																		
//										outletExList = outletAllArray[0];
//										allOutletString = outletAllArray[1];
//										
//										localStorage.allOutletString=allOutletString;
//										
//										
//										//	============Create exception list============	
//																
//										var outletExStringShow=''
//										var outletExSingleArray = outletExList.split('rdrd');	
//										var outletExSingleTtotal = outletExSingleArray.length;
//										var outletExStringShow=''
//										for (var oe=0; oe < outletExSingleTtotal-1; oe++){
//											outletExArray = outletExSingleArray[oe].split('fdfd');
//											outletExID=outletExArray[0];
//											outletExName=outletExArray[1];
//											outletExStringShow=outletExStringShow+'<label><input type="radio" name="RadioOutletEx"    value="'+outletExName+'" > '+outletExName+'</label>'
//										}
//										localStorage.outletExStringShow=outletExStringShow;
//										$("#outletExString").html(localStorage.outletExStringShow);
//										
//										
//										
//										//==========Create outlet list
//										var outletSingleArray = outletList.split('rdrd');	
//										var outletSingleTtotal = outletSingleArray.length;
//										var outletStringShow=''
//										
//										outletStringShow=outletStringShow+'<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr style="color:#006A6A; font-size:18px;"><td>'+localStorage.routeIDName+'</td></tr></table>'
//										
//										
//										for (var o=0; o < outletSingleTtotal-1; o++){
//											
//											outletArray = outletSingleArray[o].split('fdfd');
//											outletID=outletArray[0];
//											outletName=outletArray[1];
//											total_visit=outletArray[2];
//											total_visit_done=outletArray[3];
//											outlet_c=outletArray[4];
//											depot_id=outletArray[5];
//											//schedule_date=outletArray[6];
//											channel=outletArray[6];
//											schedule_date=outletArray[7];
//											
//											
//											outletColor="";
//											if (outlet_c=='g'){
//												outletColor='<img style="height:20px; width:20px" src="green.png">';
//											}
//											if (outlet_c=='b'){
//												outletColor='<img style="height:20px; width:20px" src="orange.png">';
//											}
//											if (outlet_c=='r'){
//												outletColor='<img style="height:20px; width:20px" src="red.png">';
//											}
//											
//											outletStringShow=outletStringShow+'<label ><table width="100%" border="0"> <tr> <td width="5%">'+
//															'<input type="radio" name="RadioOutlet" value="'+outletID+'rdrd'+schedule_date+'"></td><td width="60%">'+outletName +' | '+ outletID +' | '+ channel +'</td><td width="15%">'+ total_visit+'/'+total_visit_done+' </td>	<td>'+outletColor+'</td> </tr></table></label>'
//										
//											
//										}
//										
//										
//										// If schedule not available
//									
//										if (outletSingleArray.length==1){
//											outletStringShow=outletStringShow+'<label style="color:#800000; font-size:18px" ><table width="100%" border="0"> <tr> <td >Schedule Not Available </td>	</tr></table></label>'
//											
//										}
//										outletStringShow=outletStringShow+'<br/><br/> <a id="selectOButton" data-role="button" onClick="select_outlet();" >Next</a>'
//										
//										//outletStringShow=outletStringShow+'<div id="outletWait" style="display:none"><img height="40px" width="40px" src="loading.gif"></div>'
//										
//										localStorage.outletString=outletStringShow
//										$("#outletString").html(localStorage.outletString);
//										
//										$("#routeS_image").hide();
//										$("#RSButton").show();
//										
//										if (selected_routeDay==today_get){
//											localStorage.selectedRoute=selected_routeID;
//											localStorage.routeException_found='0';
//										
//											var url = "#menuPage";
//										   $.mobile.navigate(url);	
//										}
//										else {
//											localStorage.selectedRoute=selected_routeID;
//											localStorage.routeException_found='1';
//											
//											
//											var url = "#routeexceptionPage";
//											$.mobile.navigate(url);	
//											$('#routeexceptionPage').trigger('create');
//										}
//									
//									//=======end outlet list====================								
//									}
//		
//								}
//								
//						   }//end else
//				      },
//				  error: function(result) {
//					  
//					  $("#dataerror").html('Network timeout. Please ensure you have good network signal and working Internet.');
//					  
//					  $("#outletCancel").hide();
//					  $("#routeS_image").hide();
//					  $("#RSButton").show();
//					 
//					 //$("#dataerrorRoute").html('Network timeout. Please ensure you have good network signal and working Internet.');
//					  var url = "#routePage";
//					  $.mobile.navigate(url);
//				  }
//			  });//end ajax*/
//		
//	}
//}



function marketPJP_check() { 
	//alert (localStorage.outletStr)
	outletStrGet=localStorage.outletStr
	
	var outletArray = outletStrGet.split('</rep_outlet>');									
	var outletStr = outletArray[0].replace("<rep_outlet>","");
	
	var outletStrArray = outletStr.split('rdrd');	
	var outletListStr=''
	
	for (var i=0; i < outletStrArray.length-1; i++){				
		outletSingle = outletStrArray[i].split('fdfd');
		var outlet=outletSingle[0];
		var channel=outletSingle[1];		
		outletListStr=outletListStr+'<label ><table width="100%" border="0"> <tr> <td width="5%">'+															'<input type="radio" name="RadioOutlet" value="'+outlet+'"></td><td width="60%">'+outlet +' | '+ channel +'</td></tr></table></label>'														

			
		}
		outletListStr=outletListStr+'<br/><br/> <a id="selectOButton" data-role="button" onClick="select_outlet();" >Next</a>'
	localStorage.outletString=outletListStr
	$("#outletString").html(localStorage.outletString);
	var url = "#outletPage";
	$.mobile.navigate(url);
	$(url).trigger('create');
					
			
}




//=====================Outlet end===================
//=====================select Outlet start============

function select_outlet() { 
		//alert ('asdasf')
		localStorage.latlongSubmit=0;
		localStorage.dataSubmit=0;
		localStorage.fddataSubmit=0;
		localStorage.qpdsdataSubmit=0;
		localStorage.npddataSubmit=0;
		localStorage.giftdataSubmit=0;
		localStorage.shopdataSubmit=0;
		localStorage.placedataSubmit=0;
		localStorage.placeLatLongCount=0
		
		
		
		
		localStorage.m_new="";
		localStorage.submitted_outlet="";
		
		localStorage.npdSkip=0;
		localStorage.fdSkip=0;
		localStorage.qpdsSkip=0;
		localStorage.giftSkip=0;
		
		localStorage.latitude=0;
		localStorage.longitude=0;
		
		localStorage.fdisplayStringShow=''
			
		var selected_outletID_get=($("input:radio[name='RadioOutlet']:checked").val())		
		var selected_outletID_list = selected_outletID_get.split('|');
		
		var selected_outletID=selected_outletID_list[0].split('[')[1].replace(']','');	
		var outlet=selected_outletID_list[0];	
		var channel=selected_outletID_list[1];
		//var selected_date_get=selected_outletID_list[1];
		
		
		
		
		
					localStorage.outletChannel=channel
					localStorage.outletNameID=outlet
					
					div_change();
					
					
					$("#dataerrorOutlet").html('');
					$("#outletWait").show();
		
		
		
		
		
							
							
					
//				  
				   //cancel_outlet();
				  $("#outletCancel").hide();
				  var url = "#outletPage";
				  $.mobile.navigate(url);	
				  $(url).trigger('create');
				  location.reload();

}

//=====================select Outlet end===============
function reloadPages() { 
		   var url = "#mhskusPage";
			$.mobile.navigate(url);
			$(url).trigger('create');
}
function reloadSubmitPage() { 
		   var url = "#submitPage";
			$.mobile.navigate(url);
			$(url).trigger('create');
}

//=====================Outlet Exception end=====================



//=====================Select Outlet End=========================

//=====================Route Exception start=====================
function selectRouteException() { 
	var selected_route_exception=($("input:radio[name='RadioRouteEx']:checked").val())
   
	if(selected_route_exception!=undefined){
		localStorage.routeException=selected_route_exception;
		var url = "#menuPage";
		$.mobile.navigate(url);	
	}
}
//=====================Route Exception end=====================






//=========================================

function submit_data() { 
	
	//munu_page_check();
	
	//alert (localStorage.outletNameID)
	var sync_date_get=get_date();
	//var sync_date=sync_date_get.split(' ')[0];
	var sync_y=sync_date_get.split('-')[0];
	var sync_m=sync_date_get.split('-')[1];
	if (sync_m.length==1){sync_m='0'+sync_m}
	var sync_d=sync_date_get.split('-')[2].split(' ')[0];
	if (sync_d.length==1){sync_d='0'+sync_d}
	var sync_date=sync_y +'-'+ sync_m +'-'+sync_d;
	//localStorage.sync_date="2015-1204"
	
	if ((localStorage.synced=='YES') & (localStorage.sync_date!=sync_date)){
				
		cancel_outlet();
		
		localStorage.show_cancel=0;
					
		localStorage.m_new_string="";
		localStorage.m_new="";
		localStorage.selectedOutlet="";
		localStorage.outletExStringShow="";
		localStorage.outletException="";
		localStorage.outletChanne="";
		localStorage.outletNameID="";
		localStorage.mhskusTotal="";
		
		localStorage.npdTotal="";
		localStorage.fdisplaySlabTotal="";
		localStorage.fdisplayTotal="";
		localStorage.qpdsSlabTotal="";
		
		
		//localStorage.sync_date=sync_date;
		//localStorage.synced=='YES';
		
		localStorage.CategoryStr
		localStorage.fdisplay_data
		localStorage.qpds_data
		localStorage.npd_data
		localStorage.place_data
		
		
	
		//check_route();
		var url = "#login";
		$.mobile.navigate(url);
		
	//	location.reload()
	}
	else if ((localStorage.synced=='YES') & (localStorage.outletNameID=="")){
		//cancel_outlet();
		
		localStorage.show_cancel=0;
					
		localStorage.m_new_string="";
		localStorage.m_new="";
		localStorage.selectedOutlet="";
		localStorage.outletExStringShow="";
		localStorage.outletException="";
		localStorage.outletChanne="";
		localStorage.outletNameID="";

		
		localStorage.npdTotal="";
		localStorage.fdisplaySlabTotal="";
		localStorage.fdisplayTotal="";
		localStorage.qpdsSlabTotal="";
		
		
		
		localStorage.npd_data="";
		localStorage.fdisplay_data="";
		localStorage.qpds_data="";

	}
	else{
			$("#sub_button").hide();
			
			$("#submit_data").html('<img height="40px" width="40px" src="loading.gif">');
			//=========================AJAX Submit==========================	
			var lat=$( "#lat").val();
			var long=$( "#long").val();
			var visitDate=get_date().split(' ')[0];
			var endTime=get_date();
			var giftImage=$( "#gift_image_name_hidden").val();
			var latlong=lat.toString()+","+long.toString()
			
			$( "#sub_button_div").hide();
			
			if (localStorage.mar_distrib_data==undefined || localStorage.mar_distrib_data=="undefined"){
				localStorage.mar_distrib_data=""
			}
			
			var fdisplay_data=localStorage.fdisplay_data_ready.replace('detaildetail','')
			var qpds_data=localStorage.qpds_data_ready.replace('detaildetail','')
			var outletG=localStorage.outletNameID
			var outlet=outletG.split('[')[1].replace(']','')
			//$( "#dataShow").text(apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+outlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&CategoryStr='+localStorage.CategoryStr+'&npd_data='+localStorage.npd_data+'&fdisplay_data='+localStorage.fdisplay_data+'&qpds_data='+localStorage.qpds_data+'&place_data='+localStorage.place_data);
			//alert (apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+outlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&CategoryStr='+localStorage.CategoryStr+'&npd_data='+localStorage.npd_data+'&fdisplay_data='+localStorage.fdisplay_data+'&qpds_data='+localStorage.qpds_data+'&place_data='+localStorage.place_data)
			var check_outlet= localStorage.outletString;
			localStorage.outletChannel='MT'
			$.ajax({
						type: 'POST',
						url: apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&outlet='+outlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&CategoryStr='+localStorage.CategoryStr+'&npd_data='+localStorage.npd_data+'&fdisplay_data='+localStorage.fdisplay_data+'&qpds_data='+localStorage.qpds_data+'&place_data='+localStorage.place_data,
						 success: function(result) {	
								
								if (result==''){
									alert ('Sorry Network not available');
								}
								else{
		
									if (result!='SUCCESS'){
										$("#submit_data_check").html(result);
									}
									if (result=='SUCCESS'){
										
										
										var doneOutlet='<input type="radio" name="RadioOutlet" value="'+localStorage.outletNameID+'"></td><td width="60%">'+localStorage.outletNameID +' | '+ localStorage.outletChannel +'</td></tr></table></label>'							
 										
										var disOutlet='<input type="radio" name="RadioOutlet" value="'+localStorage.outletNameID+'" disabled="True"></td><td width="60%">'+localStorage.outletNameID +' | '+ localStorage.outletChannel +'</td></tr></table></label>'	
										

										localStorage.outletString=check_outlet.replace(doneOutlet,disOutlet);
//										

										
										upload_category();
										cancel_outlet();
										var url = "#outletPage";
										$.mobile.navigate(url);
										//location.reload();
										localStorage.dataSubmit=0
										
									}
									
											
								}
								
							  }, 
						  error: function(result) {
							 
							 $("#sub_button").show();
							// $("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
							 localStorage.dataSubmit=0;
						//	 localStorage.submit_count=parseInt(localStorage.submit_count)+1
							 
							
							// if (localStorage.submit_count<1){
//								 buttonCheck();
//								 $("#submit_data").html('');
//								 var url = "#submitPage";
//								 $.mobile.navigate(url);	
//							 }
//							 else{
//								  $("#submit_data").html("Saved Request. Please try later");
								  
								  
								 // localStorage.outletString=check_outlet.replace('<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'">','<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'" disabled="True">');
//								
//								
//								  localStorage.saved_req=localStorage.saved_req+'<savedsaved><'+localStorage.selectedOutlet+'><OidOid>'+localStorage.outletIDnameShow+'<showshow>'+apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+localStorage.selectedOutlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+localStorage.startTime+'&endTime='+endTime+'&giftImage='+giftImage+'&mhskus_data='+localStorage.mhskus_data_ready+'&npd_data='+localStorage.npd_data_ready+'&fdisplay_data='+localStorage.fdisplay_data_ready+'&qpds_data='+localStorage.qpds_data_ready+'&gift_data='+localStorage.gift_data_ready+'&place_data='+localStorage.place_data_ready+'&shop_data='+localStorage.shop_data_ready+'&key_data='+localStorage.key_data_ready+'&fdisplayTotal='+localStorage.fdisplayTotal+'&qpdsSlabTotal='+localStorage.qpdsSlabTotal+'</'+localStorage.selectedOutlet+'>'
//							 	;
//								
//								$("#outletString").empty();
//								$("#outletString").append(localStorage.outletString).trigger('create');
								
							//	cancel_outlet();
							 
						//	 }
						  }
					  });//end ajax
	
	}//Check sync date
}


//====================================Camera==========


//=================NPD Picture
//fixed display Before


function get_pic_npd(id) {
	var div_id="npd_image_div_"+id;
	temp_image_div=div_id;
	//var image = document.getElementById(temp_image_div);
	var hidden_name="npd_image_name_hidden_" + id ;
	var tempTime = $.now();
	npd_image_name=tempTime.toString()+localStorage.selectedOutlet+id.toString()+"_npd.jpg";
	$("#"+hidden_name).val(npd_image_name);
	navigator.camera.getPicture(onSuccessNpd, onFailNpd, { quality: 50,
		targetWidth: 300,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
	     //   targetHeight: 512,
}


function onSuccessNpd(imageURI) {

	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path=temp_image_div.replace("npd_image_div","npd_image_div_hidden");
	$("#"+hidden_path).val(imageURI);
}

function onFailNpd(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}
//====================================Camera==========

//fixed display  After
function get_pic_fdisplay(id) {
	
	//$('#fddiv_'+id).find('input, textarea, button, select').attr('disabled','disabled');
	alert (id)

	var div_id="fdSL_image_div_"+id;
	temp_image_div=div_id;
	var hidden_name="fdSL_image_name_hidden_"+id;
	var tempTime = $.now();
	fd_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+id.toString()+".jpg";
	$("#"+hidden_name).val(fd_image_name);
	navigator.camera.getPicture(onSuccessFd, onFailFd, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
	
}

function onSuccessFd(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path=temp_image_div.replace("fdSL_image_div","fdSL_image_div_hidden");
	$("#"+hidden_path).val(imageURI);
	
}

function onFailFd(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//QPDS before
function get_pic_qpds_before(id) {
	$('#qpdsdiv_'+id).find('input, textarea, button, select').attr('disabled','disabled');
	var div_id="qpdsSL_image_div_"+id+"_before";
	temp_image_div=div_id;
	var hidden_name="qpdsSL_image_name_hidden_"+id;
	var tempTime = $.now();
	
	var qpds_image_name_before=tempTime.toString()+"_before"+localStorage.selectedOutlet+".jpg";
	$("#"+hidden_name+"_before").val(qpds_image_name_before);
	navigator.camera.getPicture(onSuccessQpds_before, onFailQpds_before, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}

function onSuccessQpds_before(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path_before=temp_image_div.replace("qpdsSL_image_div","qpdsSL_image_div_hidden");
	$("#"+hidden_path_before).val(imageURI);
}

function onFailQpds_before(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//QPDS  After
function get_pic_qpds(id) {
	//$('#qpdsdiv_'+id).find('input, textarea, button, select').attr('disabled','disabled');
	var div_id="qpdsSL_image_div_"+id;
	temp_image_div=div_id;
	var hidden_name="qpdsSL_image_name_hidden_"+id;
	var tempTime = $.now();
	qpds_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+".jpg";
	$("#"+hidden_name).val(qpds_image_name);
	navigator.camera.getPicture(onSuccessQpds, onFailQpds, {  quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true});
}

function onSuccessQpds(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path=temp_image_div.replace("qpdsSL_image_div","qpdsSL_image_div_hidden");
	$("#"+hidden_path).val(imageURI);
}

function onFailQpds(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//===========gift======
//Gift
function get_pic_gift() {
	//$('#gift').find('input, textarea, button, select').attr('disabled','disabled');
	var tempTime = $.now();
	gift_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+".jpg";
	$("#gift_image_name_hidden").val(gift_image_name);
	navigator.camera.getPicture(onSuccessGift, onFailGift, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}

function onSuccessGift(imageURI) {
	var image = document.getElementById('gift_image_div');
    image.src = imageURI;
    var hidden_path="gift_image_div_hidden";
	$("#"+hidden_path).val(imageURI);
}

function onFailGift(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}

//===========Place======
//Place
function get_pic_place(i) {
	var div_id="place_image_div"+i;
	temp_image_div=div_id;
	var tempTime = $.now();
	place_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+i.toString()+"_place.jpg";
	$("#place_image_name_hidden"+i).val(place_image_name);
	navigator.camera.getPicture(onSuccessPlace, onFailPlace, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}
function onSuccessPlace(imageURI) {
	var image = document.getElementById(temp_image_div);
    image.src = imageURI;
    var hidden_path="place_image_div_hidden"+i;
	$("#"+hidden_path).val(imageURI);
}
function onFailPlace(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}

//===========Shop======
//Shop
function get_pic_shop() {
	var tempTime = $.now();
	shop_image_name=tempTime.toString()+"_"+localStorage.selectedOutlet+"_shop.jpg";
	$("#shop_image_name_hidden").val(shop_image_name);
	navigator.camera.getPicture(onSuccessShop, onFailShop, { quality: 70,
		targetWidth: 450,
		destinationType: Camera.DestinationType.FILE_URI , correctOrientation: true });
}
function onSuccessShop(imageURI) {
	var image = document.getElementById('shop_image_div');
    image.src = imageURI;
    var hidden_path="shop_image_div_hidden";
	$("#"+hidden_path).val(imageURI);
}
function onFailShop(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}

//===================Catagory all Start====================

//===================Catagory End====================

//==================upload image===============

//------------------------------------------------------------------------
function upload_category(){
	//=============HairCare
	var HairCare_image_name1=$("#HairCare_image_name_hidden1").val();
	var HairCare_image_path1=$("#HairCare_image_div_hidden1").val();
	
	var HairCare_image_name2=$("#HairCare_image_name_hidden2").val();
	var HairCare_image_path2=$("#HairCare_image_div_hidden2").val();
	
	var HairCare_image_name3=$("#HairCare_image_name_hidden3").val();
	var HairCare_image_path3=$("#HairCare_image_div_hidden3").val();
	
	var HairCare_image_name4=$("#HairCare_image_name_hidden4").val();
	var HairCare_image_path4=$("#HairCare_image_div_hidden4").val();
	if ((HairCare_image_name1.length < 10) && (HairCare_image_name2.length < 10)  && (HairCare_image_name3.length < 10)  && (HairCare_image_name4.length < 10) ){
		alert ("Haircare image not available");
	}
	
	if (HairCare_image_name1.length >10){
				uploadPhoto(HairCare_image_path1, HairCare_image_name1);
	} 
	if (HairCare_image_name2.length >10){
				uploadPhoto(HairCare_image_path2, HairCare_image_name2);
	} 
	if (HairCare_image_name3.length >10){
				uploadPhoto(HairCare_image_path3, HairCare_image_name3);
	} 
	if (HairCare_image_name4.length >10){
				uploadPhoto(HairCare_image_path4, HairCare_image_name4);
	} 
	//==============SkinCare
	var SkinCare_image_name1=$("#SkinCare_image_name_hidden1").val();
	var SkinCare_image_path1=$("#SkinCare_image_div_hidden1").val();
	
	var SkinCare_image_name2=$("#SkinCare_image_name_hidden2").val();
	var SkinCare_image_path2=$("#SkinCare_image_div_hidden2").val();
	
	var SkinCare_image_name3=$("#SkinCare_image_name_hidden3").val();
	var SkinCare_image_path3=$("#SkinCare_image_div_hidden3").val();

	if ((SkinCare_image_name1.length < 10) && (SkinCare_image_name2.length < 10)  && (SkinCare_image_name3 .length < 10) ){
		alert ("SkinCare image not available");
	}
	
	if (SkinCare_image_name1.length >10){
				uploadPhoto(SkinCare_image_path1, SkinCare_image_name1);
	} 
	if (SkinCare_image_name2.length >10){
				uploadPhoto(SkinCare_image_path2, SkinCare_image_name2);
	} 
	if (SkinCare_image_name3.length >10){
				uploadPhoto(SkinCare_image_path3, SkinCare_image_name3);
	} 
	
	//==============Oral
	var Oral_image_name1=$("#Oral_image_name_hidden1").val();
	var Oral_image_path1=$("#Oral_image_div_hidden1").val();
	
	var Oral_image_name2=$("#Oral_image_name_hidden2").val();
	var Oral_image_path2=$("#Oral_image_div_hidden2").val();

	if ((Oral_image_name1.length < 10) && (Oral_image_name2.length < 10)){
		alert ("Oral image not available");
	}
	
	if (Oral_image_name1.length >10){
				uploadPhoto(Oral_image_path1, Oral_image_name1);
	} 
	if (Oral_image_name2.length >10){
				uploadPhoto(Oral_image_path2, Oral_image_name2);
	} 
	
	//==============Skin Cleansing
	var SkinCleansing_image_name1=$("#SkinCleansing_image_name_hidden1").val();
	var SkinCleansing_image_path1=$("#SkinCleansing_image_div_hidden1").val();
	
	var SkinCleansing_image_name2=$("#SkinCleansing_image_name_hidden2").val();
	var SkinCleansing_image_path2=$("#SkinCleansing_image_div_hidden2").val();

	if ((SkinCleansing_image_name1.length < 10) && (SkinCleansing_image_name2.length < 10)){
		alert ("SkinCleansing image not available");
	}
	
	if (SkinCleansing_image_name1.length >10){
				uploadPhoto(SkinCleansing_image_path1, SkinCleansing_image_name1);
	} 
	if (SkinCleansing_image_name2.length >10){
				uploadPhoto(SkinCleansing_image_path2, SkinCleansing_image_name2);
	} 
	
	//==============Laundry
	var Laundry_image_name1=$("#Laundry_image_name_hidden1").val();
	var Laundry_image_path1=$("#Laundry_image_div_hidden1").val();
	
	var Laundry_image_name2=$("#Laundry_image_name_hidden2").val();
	var Laundry_image_path2=$("#Laundry_image_div_hidden2").val();

	if ((Laundry_image_name1.length < 10) && (Laundry_image_name2.length < 10)){
		alert ("Laundry image not available");
	}
	
	if (Laundry_image_name1.length >10){
				uploadPhoto(Laundry_image_path1, Laundry_image_name1);
	} 
	if (Laundry_image_name2.length >10){
				uploadPhoto(Laundry_image_path2, Laundry_image_name2);
	} 
	
	//==============HouseHold cleansing
	var HHcleansing_image_name1=$("#HHcleansing_image_name_hidden1").val();
	var HHcleansing_image_path1=$("#HHcleansing_image_div_hidden1").val();
	
	var HHcleansing_image_name2=$("#HHcleansing_image_name_hidden2").val();
	var HHcleansing_image_path2=$("#HHcleansing_image_div_hidden2").val();

	if ((HHcleansing_image_name1.length < 10) && (HHcleansing_image_name2.length < 10)){
		alert ("HouseHold cleansing image not available");
	}
	
	if (HHcleansing_image_name1.length >10){
				uploadPhoto(HHcleansing_image_path1, HHcleansing_image_name1);
	} 
	if (HHcleansing_image_name2.length >10){
				uploadPhoto(HHcleansing_image_path2, HHcleansing_image_name2);
	} 
	
	//==============Foods
	var Foods_image_name1=$("#Foods_image_name_hidden1").val();
	var Foods_image_path1=$("#Foods_image_div_hidden1").val();
	
	var Foods_image_name2=$("#Foods_image_name_hidden2").val();
	var Foods_image_path2=$("#Foods_image_div_hidden2").val();

	if ((Foods_image_name1.length < 10) && (Foods_image_name2.length < 10)){
		alert ("Foods image not available");
	}
	
	if (Foods_image_name1.length >10){
				uploadPhoto(Foods_image_path1, Foods_image_name1);
	} 
	if (Foods_image_name2.length >10){
				uploadPhoto(Foods_image_path2, Foods_image_name2);
	} 
	
	
	//upload_fd()
	
}

function upload_fd(){
	//fixed display
	for (var i=0; i < localStorage.fdisplaySlabTotal-1; i++){
		var image_path=$("#fdSL_image_div_hidden_"+i.toString()).val(); 
		var image_name=$("#fdSL_image_name_hidden_"+i.toString()).val(); 
		
		
		
		var image_path1=$("#fdSL_image_div_hidden_"+i.toString()+"_1").val(); 
		var image_name1=$("#fdSL_image_name_hidden_"+i.toString()+"_1").val(); 
		
		if (image_name.length >10){
			uploadPhoto(image_path, image_name);
			uploadPhoto(image_path1, image_name1);
		} else {
			$("#submit_data").html("Fixed Display Image Not Available");
		}
		
	}
	upload_qpds();

}

function upload_qpds(){
	//QPDS
	for (var i=0; i < localStorage.qpdsSlabTotal-1; i++){
		var qpdsSL_image_path=$("#qpdsSL_image_div_hidden_"+i.toString()).val(); 
		var qpdsSL_image_name=$("#qpdsSL_image_name_hidden_"+i.toString()).val(); 
		var qpdsSlab=$("#qpdsSL_"+i.toString()).val(); 
		if (qpds_image_path.length >10){
			uploadPhoto(qpds_image_path, qpdsSL_image_name);
		}
		else{
			$("#submit_data").html("Promotion Image Not Available");				
		}
	}
	 upload_npd();
}



//==============upload npd
function upload_npd(){
	for (var i=0; i < localStorage.npdTotal-1; i++){
		var npd_image_path=$("#npd_image_div_hidden_"+i.toString()).val(); 
		var image_name=$("#npd_image_name_hidden_"+i.toString()).val(); 
		
		if (image_name.length >10){
			uploadPhoto(npd_image_path, image_name);
			
		} else {

				$("#submit_data").html("Npd Image Not Available");

		}
		
	}
	
	upload_posm()

}
//========================Place upload

function upload_posm(){
	var image_name1=$("#place_image_name_hidden1").val();
	var image_path1=$("#place_image_div_hidden1").val();
	
	var image_name2=$("#place_image_name_hidden2").val();
	var image_path2=$("#place_image_div_hidden2").val();
	
	var image_name3=$("#place_image_name_hidden3").val();
	var image_path3=$("#place_image_div_hidden3").val();

	
	if ((image_name1.length >10) && (image_name2.length >10) && (image_name3.length >10)){
				uploadPhoto(image_path1, image_name1);
				uploadPhoto(image_path2, image_name2);
				uploadPhoto(image_path3, image_name3);
	} else {

			$("#submit_data").html("POSM Image Not Available");
			//$("#submit_data").html("");				

	}
	
	
	

}
function upload_shop(){
	localStorage.step_flag=6;
	file_upload_error = 0;
	//$( "#sub_qpds_button").hide();
	localStorage.shopdataSubmit=1;

	var image_name_shop=$("#shop_image_name_hidden").val();
	var shop_image_path=$("#shop_image_div_hidden").val();
	
	if (image_name_shop.length >10){
				uploadPhoto(shop_image_path, image_name_shop);
				$("#submit_data").html("");
				
	} else {

			$("#submit_data").html("Shop Image Not Available");
			//$("#submit_data").html("");				

	}
	//upload_place()
	//buttonCheck();

}
function check_step() {
	if (localStorage.step_flag==0){
		upload_fd();
		
		
	}
	if (localStorage.step_flag==1){
		upload_qpds();
	
	}
	if (localStorage.step_flag==2){
		upload_npd();
		
	}
	if (localStorage.step_flag==3){
		upload_gift_confirm();
		
	}
	if (localStorage.step_flag==4){
		upload_shop();
		
	}
	if (localStorage.step_flag==5){
		upload_place();
		
	}
	if (localStorage.step_flag==6){
		cancel_outlet();
		
	}
}

//-------------------------------------------------------------------------


//File upload \

function uploadPhoto(imageURI, imageName) {
	
  var options = new FileUploadOptions();
  options.fileKey="upload";
  
  options.fileName=imageName;
  options.mimeType="image/jpeg";
		
  var params = {};
  params.value1 = "test";
  params.value2 = "param";

  options.params = params;
 
  options.chunkedMode = false;

  var ft = new FileTransfer();
	

//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/unilever/syncmobile/fileUploader/"),win,fail,options);
// ft.upload(imageURI, encodeURI("http://e4.businesssolutionapps.com/mrepimage/syncmobile/fileUploader/"),win,fail,options);
 //ft.upload(imageURI, encodeURI("http://104.199.166.207/mordern_trade_image/mt_image/fileUploader/"),win,fail,options);
 ft.upload(imageURI, encodeURI("http://a007.yeapps.com/unileverEon/syncmobile_schedule_eon/fileUploader/"),win,fail,options);
}

function win(r) {

	file_upload_error = 0;
	
//	step_flag=0; //1 fd , 2 qpds, 3 gift
	
	if (localStorage.step_flag==1){ //for fixed display
		$("#submit_data").html("Fixed Display Synced Successfully");
		localStorage.qpdsdataSubmit=1;
		upload_qpds();
		//buttonCheck();
		
		
	}
	
	if (localStorage.step_flag==2){ // QPDS
		$("#submit_data").html("Promotion Synced Successfully");
		localStorage.npddataSubmit=1;
		upload_npd()
		//buttonCheck();
		
	}
	
	if (localStorage.step_flag==3){  // Gift
		$("#submit_data").html("Promotion Synced Successfully");
		localStorage.giftdataSubmit=1;
		upload_gift_confirm();
		//buttonCheck();
	}
	if (localStorage.step_flag==4){  // Gift
		$("#submit_data").html("Gift Synced Successfully");
		localStorage.shopdataSubmit=1;
		upload_shop();
	//	buttonCheck();
	}
	if (localStorage.step_flag==5){  // Gift
		$("#submit_data").html("Place Synced Successfully");
		localStorage.placedataSubmit=1;
		
		upload_place();
		buttonCheck();
	}
	if (localStorage.step_flag==6){  // Gift
		$("#submit_data").html("All Sync Completted");
		localStorage.shopdataSubmit=1;
		cancel_outlet()
		buttonCheck();
	}

	
	localStorage.step_flag=0; //Reset step flag
}

function fail(error) {
	file_upload_error = 1;
	
//	step_flag=0; //1 fd , 2 qpds, 3 gift
	
	if (step_flag==1){ //for fixed display
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.fddataSubmit=0;
		buttonCheck();
	}
	
	if (step_flag==2){ // QPDS
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.qpdsdataSubmit=0;
		buttonCheck();
	}
	
	if (step_flag==3){  // NPD
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.npddataSubmit=0;
		buttonCheck();
	}	
	
	if (step_flag==4){  // Gift
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.giftdataSubmit=0;
		buttonCheck();
	}
	
	if (step_flag==5){  // Place
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.placedataSubmit=0;
		buttonCheck();
	}
	
	if (step_flag==6){  // Shop
		$("#submit_data").html("Network timeout. Please ensure you have good network signal and working Internet.");
		localStorage.shopdataSubmit=0;
		buttonCheck();
	}
	step_flag=0; //Reset step flag
}

//=====================Dialog==========================

//============wait for data submit  

function doTimer()
{
  setTimeout(setSubmitmsg(),60000);
 
}
function setSubmitmsg(){
	$("#submit_data").html("Successfully Submitted");
	
}



//=============qty faceup check fdisplay====

function checkQtyFd(i){
	var get_i= i.toString();
	var get_i_list=get_i.split("_")
	
	
	
	var slab=get_i_list[0].replace("/","")
	var id=get_i_list[1].replace("/","")
	
	var qty=$("#ItemQtyfdisplay_"+slab.toString()+"_"+id.toString()).val();
	var faceup=$("#ItemFaceupfdisplay_"+slab.toString()+"_"+id.toString()).val();
	
	
	if (parseInt(faceup) > parseInt(qty)){
		
		$("#ItemFaceupfdisplay_"+slab.toString()+"_"+id.toString()).val("");
	}
}


function checkQtyQpds(i){
	var get_i= i.toString();
	var get_i_list=get_i.split("_")
	
	
	
	var slab=get_i_list[0].replace("/","")
	var id=get_i_list[1].replace("/","")
	
	var qty=$("#ItemQtyqpds_"+slab.toString()+"_"+id.toString()).val();
	var faceup=$("#ItemFaceupqpds_"+slab.toString()+"_"+id.toString()).val();
	
	if (parseInt(faceup) > parseInt(qty)){
		$("#ItemFaceupqpds_"+slab.toString()+"_"+id.toString()).val("");
	}
}

//		==========================Button check start==============
function buttonCheck(){
		if ((localStorage.latlongSubmit==0) && (localStorage.placeLatLongCount >3)){
		localStorage.latlongSubmit=1
		
		
		//
//		$("#location_button").hide();
//		$("#sub_button_div").hide();
//
//		$("#image_up_button").hide();
//		
//		//submit_data();localStorage.fdisplaySlabTotal
//		//$("#NOutlet_button").show();
//		
//		

//		$("#lat").val(0);
//		$("#long").val(0);
	
	}
	if ((localStorage.latlongSubmit==0) & (localStorage.dataSubmit==0)){
		
		
		$("#location_button").show();
		$("#sub_button_div").hide();

		$("#image_up_button").hide();
		$("#NOutlet_button").hide();
		
		
		
		$("#lat").val(0);
		$("#long").val(0);
		
	}

	if ((localStorage.latlongSubmit==1) && (localStorage.dataSubmit==0) && ((localStorage.fddataSubmit==0) || (localStorage.qpdsdataSubmit==0) || (localStorage.npddataSubmit==0) || (localStorage.giftdataSubmit==0) || (localStorage.placedataSubmit==0) || (localStorage.shopdataSubmit==0))){
		$("#location_button").hide();
		$("#sub_button_div").show();

		$("#image_up_button").hide();
		$("#NOutlet_button").hide();
		
	
	}
	if ((localStorage.latlongSubmit==1) && (localStorage.dataSubmit==1) && ((localStorage.fddataSubmit==0) || (localStorage.qpdsdataSubmit==0) || (localStorage.npddataSubmit==0) || (localStorage.giftdataSubmit==0) || (localStorage.placedataSubmit==0) || (localStorage.shopdataSubmit==0))){
		$("#location_button").hide();
		$("#sub_button_div").hide();

		$("#image_up_button").show();
		$("#NOutlet_button").hide();
		
	
	}
	if ((localStorage.latlongSubmit==1) && (localStorage.dataSubmit==1) && (localStorage.fddataSubmit==1) && (localStorage.qpdsdataSubmit==1) && (localStorage.npddataSubmit==1) && (localStorage.giftdataSubmit==1) && (localStorage.placedataSubmit==1) && (localStorage.shopdataSubmit==1)){
		$("#location_button").hide();
		$("#sub_button_div").hide();

		$("#image_up_button").hide();
		$("#NOutlet_button").show();
	
	}
	

}

function menupage(){
	
	var check_outlet= localStorage.outletString;
								
	localStorage.outletString=check_outlet.replace('<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'">','<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'" disabled="True">');
	cancel_outlet();
	var url = "#outletPage";
	$.mobile.navigate(url);
	location.reload();
	
}



function munu_page_check(){
	var sync_date_get=get_date();
	//var sync_date=sync_date_get.split(' ')[0];
	var sync_y=sync_date_get.split('-')[0];
	var sync_m=sync_date_get.split('-')[1];
	if (sync_m.length==1){sync_m='0'+sync_m}
	var sync_d=sync_date_get.split('-')[2].split(' ')[0];
	if (sync_d.length==1){sync_d='0'+sync_d}
	var sync_date=sync_y +'-'+ sync_m +'-'+sync_d;
	//localStorage.sync_date="2015-1204"
	
	
	if ((localStorage.synced=='YES') & (localStorage.sync_date!=sync_date)){
					
					cancel_outlet();
					
					localStorage.show_cancel=0;
								
					localStorage.m_new_string="";
					localStorage.m_new="";
					localStorage.selectedOutlet="";
					localStorage.outletExStringShow="";
					localStorage.outletException="";
					localStorage.outletChanne="";
					localStorage.outletNameID="";
					localStorage.mhskusTotal="";
					
					localStorage.npdTotal="";
					localStorage.fdisplaySlabTotal="";
					localStorage.fdisplayTotal="";
					localStorage.qpdsSlabTotal="";
					
					localStorage.qpdsTotal="";
					localStorage.giftTotal="";
					localStorage.marchadizingTotal="";
					localStorage.mhskus_data_ready="";
					localStorage.npd_data_ready="";
					localStorage.fdisplay_data_ready="";
					localStorage.qpds_data_ready="";
					localStorage.gift_data_ready="";
					localStorage.mar_data_ready="";
					
					//localStorage.sync_date=sync_date;
					//localStorage.synced=='YES';
					
					
					//distributon
					localStorage.mar_distrib_data=""
					localStorage.merchandisingDistribStr=""
					localStorage.mar_distrib_stock=""
					
					
					
					//check_route();
					var url = "#login";
					$.mobile.navigate(url);
					
				//	location.reload()
				}
		else{
			check_route();
			
			
			var url = "#menuPage";
			$.mobile.navigate(url);
		}
}



function savedVisit(){
	$("#login_image_saved").hide();
	$("#savedVisitRecord").show();
	var saved_req=localStorage.saved_req;
	var savedList=saved_req.split('<savedsaved>')
	$("#savedVisitRecord").text(localStorage.saved_req);
	
	var saved_req_str=''
	for (var i=0; i < savedList.length; i++){	
		
		if (savedList[i]!=''){
			var outlet_id=savedList[i].split('<OidOid>')[0]
			outlet_id=outlet_id.replace('<','').replace('>','')
			
			var outlet_data=savedList[i].split('<OidOid>')[1]
			
			var outlet_data_single = outlet_data.split('</'+outlet_id+'>')[0]
			var outlet_data_show = outlet_data_single.split('<showshow>')[0]
			var outlet_data_submit = outlet_data_single.split('<showshow>')[1]
			
			var text_field_name='saved_text_'+i
			
			saved_req_str=saved_req_str+'<label ><table width="100%" border="0"> <tr> <td >'+'<input type="hidden" name="'+text_field_name+' "+ id="'+text_field_name+'" value="'+outlet_data_submit+'">'+outlet_data_show +'</td><td width="30%">'+' <a  data-role="button" onClick="submi_saved_req('+i+');" >    Submit    </a></td></tr></table></label>'
			
			$("#savedVisitRecord").empty();
			$("#savedVisitRecord").append(saved_req_str).trigger('create');
			
			//$("#savedVisitRecord").html(saved_req_str);
			
			//var show_req_single_name=outlet_data.split('<showshow>')[0]
			
			//var show_req_single_submit=outlet_data.split('<showshow>')[1]
		//	$("#savedVisitRecord").html(show_req_single_name);
		}
		
		
	}
	
	$("#savedVisitRecordError").text('');
	var url = "#savedVisitPage";
	$.mobile.navigate(url);
}

function submi_saved_req(i){
	if (localStorage.selectedOutlet!=''){
		 $("#savedVisitRecordError").html("Please Complete or Cancel ongoing work.");
	}
	else{
		$("#login_image_saved").show();
		$("#savedVisitRecord").hide();
		var submit_data=$("#saved_text_"+i).val();
		
		submit_dataList=submit_data.split('&')
		
		var route=submit_dataList[4].replace('route=','')
		var routeEx=submit_dataList[5].replace('routeEx=','')
		var outlet=submit_dataList[6].replace('outlet=','')
		var selected_date=submit_dataList[7].replace('scheduleDate=','')
		var outletEx=submit_dataList[8].replace('outletEx=','')
		
		
		var channel=submit_dataList[9].replace('channel=','')
		var latlong=submit_dataList[10].replace('latlong=','')
		var visitDate=submit_dataList[11].replace('visitDate=','')
		var startTime=submit_dataList[12].replace('startTime=','')
		var endTime=submit_dataList[13].replace('endTime=','')
		var giftImage=submit_dataList[14].replace('giftImage=','')
		var mhskus_data=submit_dataList[15].replace('mhskus_data=','')
		var npd_data=submit_dataList[16].replace('npd_data=','')
		var fdisplay_data=submit_dataList[17].replace('fdisplay_data=','')
		var qpds_data=submit_dataList[18].replace('qpds_data=','')
		var gift_data=submit_dataList[19].replace('gift_data=','')
		var place_data=submit_dataList[20].replace('place_data=','')
		var shop_data=submit_dataList[21].replace('shop_data=','')
		var key_data=submit_dataList[22].replace('key_data=','')
		
		var fdisplayTotal=submit_dataList[23].replace('fdisplayTotal=','')
		var qpdsSlabTotal=submit_dataList[24].replace('qpdsSlabTotal=','')
		
		localStorage.selectedRoute = route
		localStorage.routeException = routeEx
		localStorage.selectedOutlet = outlet
		localStorage.outletException  = outletEx
		localStorage.outletChannel = channel
		localStorage.mhskus_data_ready = mhskus_data
		localStorage.npd_data_ready = npd_data
		localStorage.fdisplay_data_ready = fdisplay_data
		localStorage.qpds_data_ready = qpds_data
		localStorage.gift_data_ready = gift_data
		localStorage.place_data_ready = place_data
		localStorage.shop_data_ready = shop_data
		localStorage.key_data_ready=key_data
		localStorage.fdisplayTotal = fdisplayTotal
		localStorage.qpdsSlabTotal = qpdsSlabTotal
		
		
		
		
		
		
		var fdisplay_data=localStorage.fdisplay_data_ready.replace('detaildetail','')
		var qpds_data=localStorage.qpds_data_ready.replace('detaildetail','')
		
		
		
	
		
		var url_submit = apipath+'syncSubmitData?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&synccode='+localStorage.synccode+'&route='+localStorage.selectedRoute+'&routeEx='+localStorage.routeException+'&outlet='+localStorage.selectedOutlet+'&scheduleDate='+ localStorage.selected_date +'&outletEx='+localStorage.outletException+'&channel='+localStorage.outletChannel+'&latlong='+latlong+'&visitDate='+visitDate+'&startTime='+startTime+'&endTime='+endTime+'&giftImage='+giftImage+'&mhskus_data='+localStorage.mhskus_data_ready+'&npd_data='+localStorage.npd_data_ready+'&fdisplay_data='+fdisplay_data+'&qpds_data='+qpds_data+'&gift_data='+localStorage.gift_data_ready+'&place_data='+localStorage.place_data_ready+'&shop_data='+localStorage.shop_data_ready+'&key_data='+localStorage.key_data_ready
		
	
			   
		//localStorage.selectedOutlet=selectedOutlet;				
		//localStorage.selected_date_get=selected_date;
		//alert (localStorage.selected_date_get)
		//selected_date=selected_date_get;
		//localStorage.selected_date=selected_date;	
		
	
		//alert ('/'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date+'/');
		//select_outlet_saved('/'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date+'/');
		//=============================================
			
		
			
		//=====================================
		
		
		//localStorage.show_cancel==1
	//	div_change()
	//	var url = "#outletPage";
	//	$.mobile.navigate(url);
	//	locatio.reload();
		
		//$("#savedVisitRecordError").html(url_submit);
		$.ajax({
				type: 'POST',
				url: url_submit,
				 success: function(result) {	
						//alert (result)
						if (result==''){
							alert ('Sorry Network not available');
						}
						else{
							///alert ('1')
							if (result!='SUCCESS'){
								 $("#login_image_saved").hide();
								 $("#savedVisitRecord").show();
								 $("#savedVisitRecordError").html("Please try later");
								localStorage.routeException = ''
								localStorage.selectedOutlet = ''
								localStorage.outletException  = ''
								localStorage.outletChannel = ''
								localStorage.mhskus_data_ready = ''
								localStorage.npd_data_ready = ''
								localStorage.fdisplay_data_ready = ''
								localStorage.qpds_data_ready = ''
								localStorage.gift_data_ready = ''
								localStorage.place_data_ready = ''
								localStorage.shop_data_ready = ''
								localStorage.key_data_ready=''
								localStorage.fdisplayTotal = ''
								localStorage.qpdsSlabTotal = ''
							}
							if (result=='SUCCESS'){
	
								var check_outlet= localStorage.outletString;
								
	//
	//							localStorage.outletString=check_outlet.replace('<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'">','<input type="radio" name="RadioOutlet" value="'+localStorage.selectedOutlet+'rdrd'+localStorage.selected_date_get+'" disabled="True">');
	//							
	//							localStorage.outletString=outletStringShow
	//							$("#outletString").html(localStorage.outletString);
	//							
	//							$("#outletString").empty();
	//							$("#outletString").append(localStorage.outletString).trigger('create');
								
								
								
								$("#savedVisitRecordError").html("Data Synced Successfully");
								$("#submit_data").html('');
								localStorage.step_flag=0;
								
								
								// Enable disable div end
								
								
								
								
								saved_image_upload();
								
								//localStorage.mhskus_data_ready = ''
	//							localStorage.npd_data_ready = ''
	//							localStorage.fdisplay_data_ready = ''
	//							localStorage.qpds_data_ready = ''
	//							localStorage.gift_data_ready = ''
	//							localStorage.place_data_ready = ''
	//							localStorage.shop_data_ready = ''
	//							
	//							localStorage.fdisplayTotal=0;
	//							localStorage.qpdsSlabTotal=0;
	//							
	//							
								var saved_req=localStorage.saved_req
								
								var s_data=saved_req.split('<savedsaved>')[i]
								
								saved_req=saved_req.replace('<savedsaved>'+s_data,'')
								localStorage.saved_req=saved_req
								
								
	
								
								savedVisit();
								
								
								
								//location.reload();
								// $("#savedVisitRecordError").html("Please try later");
								
							}
							
									
						}
						
					  }, 
				  error: function(result) {
						 $("#login_image_saved").hide();
						 $("#savedVisitRecord").show();
						 $("#savedVisitRecordError").html("Please try later");
						//localStorage.selectedRoute = ''
						localStorage.routeException = ''
						localStorage.selectedOutlet = ''
						localStorage.outletException  = ''
						localStorage.outletChannel = ''
						localStorage.mhskus_data_ready = ''
						localStorage.npd_data_ready = ''
						localStorage.fdisplay_data_ready = ''
						localStorage.qpds_data_ready = ''
						localStorage.gift_data_ready = ''
						localStorage.place_data_ready = ''
						localStorage.shop_data_ready = ''
						localStorage.key_data_ready=''
						localStorage.fdisplayTotal = ''
						localStorage.qpdsSlabTotal = ''
				  }
			  });//end ajax
	}
	
}

//===================Upload saved image=====


//------------------------------------------------------------------------

function saved_image_upload(){
	//Fdisplay=====================
	localStorage.step_flag=1
	if (typeof localStorage.fdisplay_data_ready === "undefined") {
		localStorage.fdisplay_data_ready = "_";
	}
	//===========================
	if (localStorage.fdisplay_data_ready.length > 10){	
		var fdisplay_array =  localStorage.fdisplay_data_ready.split('headend');
		var fdisplay_head=fdisplay_array[0].replace("headstart","");
		var fdisplay_detail=fdisplay_array[1];
		var fdisplay_head_array =  fdisplay_head.split('rdrd');
		localStorage.fdisplaySlabTotal=fdisplay_head_array.length
		
		
		for (var i=0; i < localStorage.fdisplaySlabTotal-1; i++){
			var head_s_array=fdisplay_head_array[i].split('fdfd');
			
			var slabfdisplay =head_s_array[0];
			var fdisplayTotal=head_s_array[1];
			
			var image_name=head_s_array[2];
			var fdSLfdisplay_image_path=head_s_array[3];
			
			var image_name_before=head_s_array[4];
			var fdSLfdisplay_image_path_before=head_s_array[5].replace("rdrd","");

			if (fdSLfdisplay_image_path.length >10){
					uploadPhoto(fdSLfdisplay_image_path, image_name);
					uploadPhoto(fdSLfdisplay_image_path_before, image_name_before);
			} //end if
		} // end for
	}//end if
	
	//=============================
	
	//==============QPDS====
	localStorage.step_flag=2
	if (typeof localStorage.qpds_data_ready === "undefined") {
		localStorage.qpds_data_ready ="_";
	}
 	//localStorage.qpdsdataSubmit=1;
	if (localStorage.qpds_data_ready.length > 10){
		var qpds_array =  localStorage.qpds_data_ready.split('headend');
		var qpds_head=qpds_array[0].replace("headstart","");
		var qpds_detail=qpds_array[1];
		var qpds_head_array =  qpds_head.split('rdrd');
		localStorage.qpdsSlabTotal=qpds_head_array.length
		
		
		for (var i=0; i < localStorage.qpdsSlabTotal-1; i++){
			var head_s_array=qpds_head_array[i].split('fdfd');
		
			var slabqpds =head_s_array[0];
			var qpdsTotal=head_s_array[1];
			var image_name=head_s_array[2];
			var qpdsImg_path=head_s_array[3];

			
			if (qpdsImg_path.length >10){
				uploadPhoto(qpdsImg_path, image_name);
				$("#submit_data").html("");		
				
				}
				else{
					$("#submit_data").html("Promotion Image Not Available");				
				}
		}//end for
	}//end if
	
	//================NPD=========
	localStorage.step_flag=3
	if (typeof localStorage.npd_data_ready === "undefined") {
		localStorage.npd_data_ready ="_";
	}
 	
	if (localStorage.npd_data_ready.length > 10){
		var npd_array =  localStorage.npd_data_ready.split('rdrd');
	 	for (var i=0; i < npd_array.length-1; i++){
			var npd_single_array = npd_array[i].split('fdfd');	
			var itemQty=npd_single_array[1];
			var npd_image_div_path=npd_single_array[3];
			var npd_image_name_hidden=npd_single_array[4];
			
 			
			if (npd_image_div_path.length >10){
				uploadPhoto(npd_image_div_path, npd_image_name_hidden);
				$("#submit_data").html("");		
				
				}
				else{
					$("#submit_data").html("Promotion Image Not Available");				
				}
		}//end for
	}//end if
	
	//===================Gift=========
	localStorage.step_flag=4
	var gift_data =  localStorage.gift_data_ready.replace("rdrd","");
	var gift_array =  gift_data.split('fdfd');
	var image_name = gift_array[0];
	var gift_image_path = gift_array[1];
	
	//var gift_month = gift_array[2];

	
	
	if (gift_image_path.length >10){
		uploadPhoto(gift_image_path, image_name);
		$("#submit_data").html("");

	} else {
			$("#submit_data").html("Gift Image Not Available");
	}
	//=====================Place
	localStorage.step_flag=5
	var place_data =  localStorage.place_data_ready.replace("rdrd","");
	var place_array =  place_data.split('fdfd');
	
	var image_name = place_array[0];
	var place_image_path = place_array[1];

	//var is_near_inFront_actual= place_array[2];
	//var is_beside_adjacent_actual= place_array[3];
	//var is_eyeLevel_actual= place_array[4];
	//var is_clearlyVis_noObs_actual= place_array[5];
	

	if (place_image_path.length >10){
				uploadPhoto(place_image_path, image_name);
				$("#submit_data").html("");
	} else {

			$("#submit_data").html("Place Image Not Available");
			//$("#submit_data").html("");				

	}
	
	//===================Shop============
	localStorage.step_flag=6
	var shop_data =  localStorage.shop_data_ready.replace("rdrd","");
	var shop_array =  shop_data.split('fdfd');
	var image_name = shop_array[0];
	var shop_image_path = shop_array[1];


	if (shop_image_path.length >10){
				uploadPhoto(shop_image_path, image_name);
				$("#submit_data").html("");
	} else {

			$("#submit_data").html("Shop Image Not Available");
			//$("#submit_data").html("");				

	}
	
}

//========================BKash=====================

function bKashConfirm(){
	 
	 var BKashNo=$("#BKashNo").val()
	 var BT_id=$("#BT_id").val()
	 var pathHit='http://w02.yeapps.com/unigift/syncmobile_eon_bKash/' 	 
	 
	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
////	  
	//alert(apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName)
	//alert (pathHit+'bKashConfirm')		
	$.ajax({
		type:'POST',
		url:pathHit+'httpTest?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&BT_id='+BT_id,
	
		success: function(result2) {
			//alert (result2)
			if (result2!=''){
				trID=result2.split('<trxId>')[1].split('</trxId>')	
				status=result2.split('<trxStatus>')[1].split('</trxStatus>')
				amount=result2.split('<amount>')[1].split('</amount>')		
				trID=BT_id
				amount=localStorage.TotalProductPoint
				status='0000'
				//if ((localStorage.TotalProductPoint==amount) && (trID==BT_id)){
				if (trID==BT_id){
				localStorage.bStatus='Yes'
				
				$("#errorChkpurchaseF").html('Confirmed BKash Transaction')
				}
				
				}
			
			else{
				$("#purchaseF_image").hide()
				$("#saveButton").show()	
				$("#errorChkpurchaseF").html(result2)
			}
		}      
	
	  });
	  
	
	}	
	