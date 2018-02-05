
//var apiPath='http://127.0.0.1:8000/unigift/syncmobile_eon_bKashNew_amount/';

//var apiPath='http://127.0.0.1:8000/unigift/syncmobile/';

var apiPath='http://w02.yeapps.com/unigift/syncmobile_2018/'
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

function backClick(){
	$(".errorChk").text("");
	$(".errorMsg").text("");
	$("#login_error").text("");
}

function homePageReload(){
	location.reload();
}
function login() {
	url="#login";					
	$.mobile.navigate(url);
	
}
function homePage() {
	$(".errorChk").text("");
	$(".errorMsg").text("");
	url="#menuPage";					
	$.mobile.navigate(url);
	
}

function pageOutlet(){
	url="#pageOutlet";					
	$.mobile.navigate(url);
}

function Redeem(){	
	var mInfo=localStorage.memInfo;
	var mStr=mInfo.split('-')
	var mobileNo=mStr[0];
	
	var redMobile=$("#redMobile").val();
	
	if (redMobile !=""){
		redMobile=redMobile
	}else{
		redMobile=mobileNo
	}
	
	if (redMobile.length==13){
		//alert (apiPath+'search_mobRedeem?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&redMobile='+redMobile)
		$.ajax({
			type:'POST',
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
		$(".errorMsg").html("PleaseSelect Que/Enter Mobile No");
	}	
}


function giftSave(){
			$(".errorMsg").text("");
			$("#Gift_image").show();
			$("#saveButtonGift").hide();
			
			var memMb=localStorage.memRedMob;
			var memNM=localStorage.memRedName
			var memPoint=localStorage.memPoint;
			var checkId=$("input[name='checkId']:checked").val();
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
					giftPointC=giftPointC+(parseInt(giftPoint)*parseInt(qtyNameValue))
					submitRedeem=submitRedeem+giftId+'<fdfd>'+giftName+'<fdfd>'+giftPoint+'<fdfd>'+qtyNameValue+'<rdrd>'						
				}
			
	       		localStorage.submitRedeem=submitRedeem
			}
		
		if (checkId=='Yes'){
			if (giftPointC <= parseInt(memPoint) & parseInt(giftPointC)>0){
				//alert (apiPath+'redeemComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitRedeem='+encodeURIComponent(submitRedeem)+'&memPoint='+localStorage.memPoint+'&memNM='+memNM+'&memMb='+memMb)
				 $.ajax({
					type:'POST',
					url:apiPath+'redeemComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitRedeem='+encodeURIComponent(submitRedeem)+'&memPoint='+localStorage.memPoint+'&memNM='+memNM+'&memMb='+memMb,
				
					success: function(result) {
						if (result!='Failed'){	
						
							$("#Gift_image").hide();
							$("#saveButtonGift").show();
							
							url="#giftGiven";					
							$.mobile.navigate(url);
						}else{
							$(".errorMsg").text("Failed");
							$("#Gift_image").hide();
							$("#saveButtonGift").show();
						}
					
					}      
				 
				  });
					
			}else{
				$(".errorMsg").text("Point should be greater than Gift Point");
				$("#Gift_image").hide();
				$("#saveButtonGift").show();
			}
		}else{
			$(".errorMsg").text("Please Confirm");
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
	
	var mPhoneNo=$("#redMobile").val();
	
	var phone=$("#mMobile").val();
		
	if (phone !=""){
		if (phone.length < 13 ){
			mMobile='88'+phone
		}else{
			mMobile=phone
		}
	}
	if(mPhoneNo !=""){
		if (mPhoneNo.length < 13 ){
			mMobile='88'+mPhoneNo
		}else{
			mMobile=mPhoneNo
		}
	}
	
	if (mMobile.length==13 ){	
		//alert (apiPath+'search_mob?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&mMobile='+mMobile)
		$.ajax({
			type:'POST',
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
					localStorage.memPoint=mem_point;
					$("#mMobile").val(Mobile);
					$("#prMem").html(localStorage.memInfo);
					$("#prPoint").html(localStorage.memPoint);
										
					$(".errorMsg").html("");
					url="#ProductList";					
					$.mobile.navigate(url);					
				}

			},
			 error: function(result) {
			 }
		});
	}else{
		$(".errorMsg").html("Please Select Que/Enter Mobile No");
	}
}		
function productShowPage (){
	url="#ProductListShow";					
	$.mobile.navigate(url);	
}

<!-------------- Product Stock Start --------------->
function productStockPage (){
	url="#StockListShow";					
	$.mobile.navigate(url);	
}

<!-------------- Product Stock End --------------->

<!---------------------------------- Add to Cart product List Start----------->
function addCartproduct(){
	$('#addCartprodctPage').html(localStorage.outlet)
	
	$("#prMemCart").html(localStorage.memInfo);
	$("#prPointCart").html(localStorage.memPoint);
	
	url="#ProductList";					
	$.mobile.navigate(url);	
	}
//	prodctPage
//	addCartprodctPage
<!-------------------------------------------->	
function selcetCartCat(){
	var catValue=$("#catListAddCart").val();
	
	prodctStr=localStorage.prodctStr
	prodctListStr=prodctStr.split('<rdrd>');
	var prdctAddCartShow=''
	for (i=0; i<prodctListStr.length-1; i++){
	 var cartName="CName_"+i.toString()
	 var pNameID="pNameID_"+i.toString()
	 var cat = prodctListStr[i].split('|')[2]
	 pShowList=prodctListStr[i].split('|')
	 var pShow=pShowList[0]+'|'+pShowList[3]
	 if (catValue=="ALL"){
		prdctAddCartShow=prdctAddCartShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="addCartProductQueNew('+i+')" type="number" id="'+cartName+'"   name="'+cartName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
		  
	 }else{
		 if (cat==catValue){
			prdctAddCartShow=prdctAddCartShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="addCartProductQueNew('+i+')" type="number" id="'+cartName+'"   name="'+cartName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
		 }
	 }
	}
	 
	 localStorage.prdctAddCartShow=prdctAddCartShow
	 var item_combo_id_ob=$('#item_combo_id_cart');
									
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctAddCartShow);
	item_combo_id_ob.listview("refresh");

}

<!---------------------------------------------------------------->

function addCartProductQueNew(i){
	$('#prodctQList').html(localStorage.outlet)
	$("#prMSave").html(localStorage.memInfo);
	$("#prSPoint").html(localStorage.memPoint);
	
	var cartName="CName_"+i.toString()
	var pNameID="pNameID_"+i.toString()
	
	var cartqNameValue=$("#"+cartName).val()
	var pNameIDValue=$("#"+pNameID).val()
	var submitAddCartget=localStorage.submitAddCart
	
	if (parseInt(cartqNameValue)>0)	{
		var qtyName=cartName
		var pdNameID=pNameID

		var strShow=pNameIDValue		
		strList=strShow.split('|')	
				
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
		
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+cartqNameValue+'<fdfd>'+point+'<rdrd>'
		
		if (submitAddCartget.indexOf(prdctID+'<fdfd>') !=-1){
			submitAddCartList=submitAddCartget.split('<rdrd>')
			for (i=0; i<submitAddCartList.length-1; i++){
				strShow = 	submitAddCartList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitAddCart=submitAddCartget.replace(strShow,addProduct)
				}
			}
		}else{
			submitAddCart=submitAddCartget+addProduct
		}
		
	}else{
		var qtyName=cartName
		var pdNameID=pNameID
		var strShow=pNameIDValue		
		cartqNameValue=0		
		strList=strShow.split('|')			
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
		
		var pShow=prdctName+'|'+rate+'|'+ category
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+cartqNameValue+'<fdfd>'+point+'<rdrd>'
		
		if (submitAddCartget.indexOf(prdctID+'<fdfd>') !=-1){
			submitAddCartList=submitAddCartget.split('<rdrd>')
			for (i=0; i<submitAddCartList.length-1; i++){
				strShow = 	submitAddCartList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitAddCart=submitAddCartget.replace(strShow)
				}
				
			}
			
		}
	}
		
	localStorage.submitAddCart=submitAddCart
		
	
}
	
<!-------------------------------------------------------------------------------->	

function productAddCartQue(){
	var prdctAddCartShow=''
	
	var submitAddCartG=localStorage.submitAddCart
	
	var submitAddCart=submitAddCartG.replace('undefined<rdrd>','')
	
	submitAddCartList=submitAddCart.split('<rdrd>')
	
	for (i=0; i<submitAddCartList.length-1; i++){
		
		strShow = 	submitAddCartList[i]		
		if 	(strShow.length > 0){
			strList=strShow.split('<fdfd>')			
			var	prdctName = strList[0]
			var	prdctID = strList[1]
			var	category = strList[2]
			var	rate = strList[3]
			var point= strList[5]
			var cartqNameValue= strList[4]
			var pShow=prdctName+'|'+rate+'|'+ category+'|'+ point
			if (parseInt(cartqNameValue)>0)	{
			
			prdctAddCartShow=prdctAddCartShow+'<tr> <td width="50px" style="background-color:#FFEAF4" align="center">'+cartqNameValue+'</td><td style="background-color:#CEF">'+pShow+'</td></tr>'
			}
		}
		localStorage.prdctAddCart=prdctAddCartShow

		$("#add_cart_Que_combo_id").empty()
		$("#add_cart_Que_combo_id").append(localStorage.prdctAddCart);
				
	}
	if (localStorage.prdctAddCart!=''){
		$("#purchase_image_new").hide()
		$("#purchaseBtn").show()
		
		$("#errorChkAddCartpurchase").html('')
		url="#CartPQueList";					
		$.mobile.navigate(url);	
	}
}

<!----------------------------------------------------->

function addCartPurchaseDataSave(){
	 $("#purchase_image").show();
	 $("#addCartPurchaseBtn").hide();
	 
	 
	 var memInfo=localStorage.memInfo;
	 var memNameMob=memInfo.split('-');
	 var memMobile=memNameMob[0];
	 var memName=memNameMob[1];
	 
	 
	 var memPoint=localStorage.memPoint;
	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
     var outletName=outletNameId[1];
	 var submitStrAddCart=localStorage.submitAddCart
	 submitStrAddCart=submitStrAddCart.replace('undefined<rdrd>','') 

	// alert(apiPath+'addCartPurchase_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrAddCart='+encodeURIComponent(submitStrAddCart)+'&memPoint='+localStorage.memPoint+'&memName='+memName+'&memMobile='+memMobile)

	$.ajax({
		type:'POST',
		url:apiPath+'addCartPurchase_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrAddCart='+encodeURIComponent(submitStrAddCart)+'&memPoint='+localStorage.memPoint+'&memName='+memName+'&memMobile='+memMobile,
	
        success: function(result4) {
			if (result4!='Failed'){
				localStorage.radioMem=memName+'|'+memMobile	
				var radioMem=localStorage.radioMem
				var radioMemMobile=radioMem.split('|')[1]
				$("#redMobile").val(radioMemMobile);
							
				localStorage.submitAddCart=''
				localStorage.prdctAddCart=''
				
				
				$("#purchase_image").hide();
				$("#addCartPurchaseBtn").show();	
				url="#submitPage";					
				$.mobile.navigate(url);		
			}else{
				$("#errorChkpurchase").html('Sorry Network not available');
				$("#purchase_image").hide();
	 			$("#addCartPurchaseBtn").show();
				
			}
		}      
 
	  });
	}	
	
<!---------------------------------- Add to Cart product List End----------->

function product(){
	$('#prodctPage').html(localStorage.outlet)
	url="#ProductList";					
	$.mobile.navigate(url);	
}
	
<!----------------- Product Stock -18/12/17 --------------------->

function productStockQueNew(i){
	
	$('#prodctStockQList').html(localStorage.outlet)
	var sQName="SqName_"+i.toString()
	
	var pNameID="pNameID_"+i.toString()
	
	var sqNameValue=$("#"+sQName).val()
	var pNameIDValue=$("#"+pNameID).val()
	
	var submitStockget=localStorage.submitStock
	
	if (parseInt(sqNameValue)>0){
		var qtyName=sQName
		var pdNameID=pNameID

		var strShow=pNameIDValue		
		strList=strShow.split('|')	
				
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
	
		
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+point+'<fdfd>'+sqNameValue+'<rdrd>'
		
		if (submitStockget.indexOf(prdctID+'<fdfd>') !=-1){
			submitStockList=submitStockget.split('<rdrd>')
			for (i=0; i<submitStockList.length-1; i++){
				strShow = 	submitStockList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitStock=submitStockget.replace(strShow,addProduct)
				}
			}
		}else{
			submitStock=submitStockget+addProduct
		}
		
	}else {
		var qtyName=sQName
		var pdNameID=pNameID
		var strShow=pNameIDValue		
		sqNameValue=0		
		strList=strShow.split('|')			
		var	prdctName = strList[0]
		var	prdctID = strList[1]
		var	category = strList[2]
		var	rate = strList[3]
		var	point = strList[4]
		
		var pShow=prdctName+'|'+rate+'|'+ category
		var addProduct=prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+point+'<fdfd>'+sqNameValue+'<rdrd>'
		
	
		if (submitStockget.indexOf(prdctID+'<fdfd>') !=-1){
			submitStockList=submitStockget.split('<rdrd>')
			for (i=0; i<submitStockList.length-1; i++){
				strShow = 	submitStockList[i]				
				strList=strShow.split('<fdfd>')			
				var	prdctIDS = strList[1]
				if (prdctID==prdctIDS){
					submitStock=submitStockget.replace(strShow)
				}
				
			}
			
		}
	}
		localStorage.submitStock=submitStock
	
}

<!------------------- Product Stock -18/12/17 -------------------------->

function productQue(){
	url="#ProductList";					
	$.mobile.navigate(url);	
		
	//alert (localStorage.submitPurchase)
	//var prdctShow=''
	/*var prdctShow='<table style=" width:100%;">'
	
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
			
			prdctShow=prdctShow+'<tr style="height:70px;"> <td width="50px" style="background-color:#FFEAF4" align="center">'+qNameValue+'</td><td style="background-color:#CEF">'+pShow+'</td></tr>'
			}
		}
		localStorage.prdctShowCart=prdctShow+'</table>'

		$("#item_Que_combo_id").empty()
		$("#item_Que_combo_id").append(localStorage.prdctShowCart);
		
	}
	//alert (localStorage.prdctShowCart)
	if (localStorage.prdctShowCart!=''){
		$("#purchase_image").hide()
		$("#purchaseBtn").show()
		
		$("#errorChkpurchase").html('')
		url="#ProductQueList";					
		$.mobile.navigate(url);	
	}*/
}

<!-------------- Product Stock -18/12/17 ------------->

function productStockQue(){
	var prdctShowStock=''
	var submitStockG=localStorage.submitStock
	var submitStock=submitStockG.replace('undefined<rdrd>','')
	
	submitStockList=submitStock.split('<rdrd>')
	
	for (i=0; i<submitStockList.length-1; i++){
		
		strShow = 	submitStockList[i]	
		//alert (strShow)		
		if 	(strShow.length > 0){
			strList=strShow.split('<fdfd>')			
			var	prdctName = strList[0]
			var	prdctID = strList[1]
			var	category = strList[2]
			var	rate = strList[3]
			var point= strList[4]
			var sqNameValue= strList[5]
			var pShow=prdctName+'|'+rate+'|'+ category+'|'+ point
			
			if (parseInt(sqNameValue)>0)	{
			
			prdctShowStock=prdctShowStock+'<tr><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+sqNameValue+'</td></tr>'
			}
		}
		localStorage.prdctStockCart=prdctShowStock

		$("#stock_Que_combo_id").empty()
		$("#stock_Que_combo_id").append(localStorage.prdctStockCart);
		
	}
	if (localStorage.prdctStockCart!=''){
		$("#stockBtn").show()
		
		$("#errorChkStock").html('')
		url="#ProductStockQueList";					
		$.mobile.navigate(url);	
	}
}

<!-------------- Product Stock -18/12/17 -------------->

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
			type:'POST',
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
						
						
						outletShow=outletShow+'<label class="ui-btn ui-shadow ui-corner-all" style="border-color:#CBE4E4;" onClick="checkRadioVal('+i+')"><input id="radioMem_'+i+'" type="radio" name="radio_mem"  value="'+memName+'|'+memMob+'" >'+memName+'|'+memMob+'</label>'
					}
					
					memStrListFinal=memStrFinal.split('<rd>')
					for (j=0; j<memStrListFinal.length-1; j++){	
						
						i=i+1
						memMobFinal=memStrListFinal[j].split('<fd>')[0]
						memNameFinal=memStrListFinal[j].split('<fd>')[1]
						
						outletShow=outletShow+'<label class="ui-btn ui-shadow ui-corner-all" style="background-color:#FFFFC6;  border-color:#CBE4E4;" onClick="checkRadioVal('+i+');"><input id="radioMem_'+i+'" type="radio" name="radio_mem"  value="'+memNameFinal+'|'+memMobFinal+'" >'+memNameFinal+'|'+memMobFinal+'</label>'

					}
					localStorage.queMem=outletShow;
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
	localStorage.radioMem="";
	$("#redMobile").val("");
	//var radioMem=($("input:radio[name='radio_mem']:checked").val())	
	var radioMemGet="#radioMem_"+i;
	$(radioMemGet).attr('checked', true) 
	var radioMem=$(radioMemGet).val();
	localStorage.radioMem=radioMem	
	var radioMemMobile=radioMem.split('|')[1]
	$("#redMobile").val(radioMemMobile);
	$("#redMobile").attr("disabled", "disabled"); 
	
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

	}else{
		$("#queMem").html(localStorage.queMem);
	}
}
/*function purchaseDataSave(){
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
			
			<!--$("#button_show").html(' <a data-role="button"    onClick="PurchaseDone()" >Purchase & CheckOut</a>');-->
			
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
	*/
<!----------------- Product Stock -18/12/17 --------------->

function stockDataSave(){

	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
     var outletName=outletNameId[1];
	 var submitStrStock=localStorage.submitStock
	
	 submitStrStock=submitStrStock.replace('undefined<rdrd>','') 
	// alert(apiPath+'stock_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrStock='+encodeURIComponent(submitStrStock))

	$.ajax({
		type:'POST',
		url:apiPath+'stock_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrStock='+encodeURIComponent(submitStrStock),
	
        success: function(result3) {
			if (result3!='Failed'){

				localStorage.submitStock=''
				localStorage.prdctStockCart=''
				
				$(".errorChkStock").html("Submitted Successfully");
				$("#stockBtn").hide();
				<!------------------------->
				url="#menuPage";					
				$.mobile.navigate(url);	
				
				$("#sTripBtn").show();
				$("#queBtn").show();
				$("#pListBtn").show();
				$("#pStockBtn").show();	
			}else{
				$("#errorChkStock").html('Failed');
//				
	 			$("#stockBtn").show();
				
				}
		}      
 
	  });
	  
	}	

<!----------------Product Stock -18/12/17 ---------------->		
function PurchaseDone(){
	//localStorage.pStr="";	
	var outletShow=localStorage.outlet
	var outletIDN=outletShow.split('|');
	var IdOutlet=outletIDN[0];
	
	var memPhone=$("#redMobile").val();	
	var mMobile=$("#mMobile").val();
		
	if (mMobile !=""){
		if (mMobile.length < 13 ){
			memMob='88'+mMobile
		}else{
			memMob=mMobile
		}
	}
	if (memPhone !=""){
		if (memPhone.length < 13 ){
			memMob='88'+memPhone
		}else{
			memMob=memPhone
		}
	}
	
		//alert(apiPath+'search_purchase?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob);
		$.ajax({
			type:'POST',
			url:apiPath+'search_purchase?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+IdOutlet+'&memMob='+memMob,
		
			success: function(result) {
				resultStr=result.split('<SYNCDATA>');
				//alert(resultStr[1]);
				if (resultStr[0]=='FAILED1'){
					$(".errorMsg").text('Invalid User');
					url="#ProductList";
				}else if(resultStr[0]=='FAILED2'){
					$(".errorMsg").text('Required Product');
					url="#ProductList";
				}else if(resultStr[0]=='FAILED3'){
					$(".errorMsg").text('Invalid Mobile No');
					url="#ProductList";	
				}else{
				//if (resultStr[0]=='SUCCESS'){	
					var prStr=resultStr[1]
					var Mobile=resultStr[2]
					var name=resultStr[3]
					var point_valueS=resultStr[4]
					//alert (prStr)
					prList=prStr.split('<rd>')
					var prdctShow='<table style="width:100%;">'
					var pStr=''
					 //alert(prStr)
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
						
						 prdctShow=prdctShow+'<tr style="height:70px"><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center"><input type="number" id="'+qQty+'"   name="'+qQty+'" style="width:80px; height:30px;font-size:18px;" value="'+product_qty+'">'+'</td></tr>' 
						
						pStr=pStr+pID+'<fd>'+pName+'<fd>'+product_qty+'<fd>'+product_point+'<fd>'+product_rate+'<fd>'+category+'<rd>'
					}//for
				prdctShow=prdctShow+'</table>'
				
				localStorage.pFinal=prdctShow
				
				localStorage.pStr=pStr
				localStorage.prdctShowCart=prdctShow
								
				$("#purchaseShow").html(localStorage.pFinal);
								
				$("#prRedMemP").html(outletShow);
				$("#prRedMemNameP").html(name+'|'+Mobile);
				$("#prRedPointP").html(point_valueS);
				$("#prRedMemPS").html(outletShow);
				$("#prRedMemNamePS").html(name+'|'+Mobile);
				$("#prRedPointPS").html(point_valueS);
				
				$(".errorMsg").text('');
				url="#RedeemList";					
				$.mobile.navigate(url);
			}//if  
			
			}//success
		  });//ajax
		
}	

function ConfirmPage(){
	var prStr=localStorage.pStr;
	prList=prStr.split('<rd>')
	var prdctShow='<table style=" width:100%;">'
	var pStr=''
	var totalPoint=0;
	
	for (i=0; i<prList.length-1; i++){
		 prSingle=prList[i]
		 var pID		=prSingle.split('<fd>')[0]
		 var pName		=prSingle.split('<fd>')[1]
		 var product_qty=prSingle.split('<fd>')[2]
		 var product_point=prSingle.split('<fd>')[3]
		 var product_rate =prSingle.split('<fd>')[4]
		 var category	  =prSingle.split('<fd>')[5]
		 var qQty="qQty_"+i;
		 var pShow=pName+'|'+product_rate+'|'+ category;
		//alert(product_qty+'-'+product_point);
		 var qty=$("#"+qQty).val();
		 //alert (qty)
		 if (parseInt(qty)>0){
			 //alert (qty)
			 prdctShow=prdctShow+'<tr style="height:70px;"><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+qty+'</td></tr>' 
			 pStr=pStr+pID+'<fd>'+pName+'<fd>'+qty+'<fd>'+product_point+'<fd>'+product_rate+'<fd>'+category+'<rd>'
			 totalPoint=totalPoint+(parseInt(qty)*parseInt(product_rate))
			 //totalPoint=totalPoint+(parseInt(product_point))
			// alert(totalPoint);
		 }
			
	}//for
	prdctShow=prdctShow+'</table>'
	//alert (TotalProductPoint)
	localStorage.TotalProductPoint=totalPoint
	localStorage.pStrFinal=prdctShow
	//localStorage.pStr=pStr
	
	$("#TotalProPoint").html('Purchase Point:   '+totalPoint);
	
	//totalPointAdd=parseInt(localStorage.totalPrePointShow) + parseInt(localStorage.TotalProductPoint);
	
	//$("#TotalProductPointShow").html('Total Point:	'+localStorage.totalPrePointShow +' + '+ localStorage.TotalProductPoint);
	
	//$("#totalAllPoint").html('=	  '+totalPointAdd);
	
	
	$("#purchaseFinalShow").html(localStorage.pStrFinal);
	$("#errorChk").html('');
	$("#savedGiftError").html('');
	$("#payCombTextDiv").hide();
		
	$("#purchaseF_image").hide()
	$("#saveButton").show()	
	$("#errorChkpurchaseF").html('')
	
	//$("#selectedItem").empty()
	
	//localStorage.selectedProductShow="";
	//localStorage.submitPurchase="";
	
	url="#ConfirmPageSave";					
	$.mobile.navigate(url);	
	}
function setTextPay(){
	var payMode=$("#payComb").val();
	if (payMode=='BKash'){$("#payCombTextDiv").show();}else{$("#payCombTextDiv").hide();}
	
}

function finalPurchaseSave(){ 
	 $("#errorChkpurchaseF").html('');
	 $(".errorChk").html('');
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
	 //var clkbox=$("#clkbox").val();
	 //alert(prPhotoName+'-'+prPhotoPath)
	 var errorLog=0
	 var bkashAmount=0
	 
	 if ((payComb=='BKash') && (localStorage.bStatus!='Yes')){
	 	 
		 errorLog=1
		 
	 }
	 
	 if (payComb=='BKash'){
	 	 
		 bkashAmount=localStorage.bkashAmount;
		 
	 } 
////	  
	//alert(apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName)
	if (errorLog==0){
		if(prPhotoName!=''){	
			$.ajax({
				type:'POST',
				url:apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName+'&BT_id='+BT_id+'&bkashAmount='+bkashAmount,
			
				success: function(result2) {
			
					if (result2=='Success'){
						 localStorage.selectedProductShow="";
						 localStorage.submitPurchase="";
						  
						 $("#BKashNo").val('')
						 $("#prPhotoName").val('')
						 $("#prPhoto").val('')
						 $("#myImage").html('')
						 
						localStorage.radioMem=memberName+'|'+memmobileNo	
						var radioMem=localStorage.radioMem
						var radioMemMobile=radioMem.split('|')[1]
						//alert ('Test')
						$("#redMobile").val(radioMemMobile);
						 
						$("#BKashNo").val('');
						$("#BT_id").val('');
						
						$("#purchaseF_image").hide()
						$("#saveButton").show();
						
						$("#errorChkpurchaseF").html('');
	 					$(".errorChk").html('');
						
						url="#checkedOut";					
						$.mobile.navigate(url);	
					}else{
						$("#purchaseF_image").hide()
						$("#saveButton").show()	
						$("#errorChkpurchaseF").html('Failed')
					}
				}      
			
			  });
			}else{
				$("#purchaseF_image").hide()
				$("#saveButton").show()
				$(".errorChk").html('Please Confirm Image')
			}
	}else{
	
		$("#purchaseF_image").hide()
	 	$("#saveButton").show()
		$("#errorChkpurchaseF").html('Please Confirm BKash transaction ID')
	}
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

	
function login_user() {
		$(".errorMsg").html("");
		var cm_id=$("#cm_id").val();
		var cm_pass=$("#cm_pass").val();
		
		var currentDate = new Date()
		var day = currentDate.getDate();if(parseInt(day)<10) {day="0" + day};
		var month = currentDate.getMonth() + 1;if(parseInt(month)<10) {month="0" +month};
		var year = currentDate.getFullYear()
		var today=  year + "-" + month + "-" + day
		
		if (cm_id=="" || cm_id==undefined || cm_pass=="" || cm_pass==undefined){
			$(".errorMsg").html("Required ID  and password");	
		 }else{
			
			$("#login_image").show();
			$("#loginButton").hide();
			localStorage.cid='UNILEVER';
			localStorage.cm_id=cm_id;
			localStorage.cm_pass=cm_pass;
			//localStorage.synced='NO'
			//$(".errorMsg").html("Login in progress. Please wait...");

			
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
					
				}
				
			//	 	
//    	    if(localStorage.cm_pass!=cm_id || localStorage.cm_pass!=cm_pass){
//					
//		            $(".errorMsg").html("Wrong UserId/Name and password combination");	
//				}
	        //alert (apiPath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code)
			
			$.ajax({
				 type: 'POST',
				 url: apiPath+'check_user?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code,
				 success: function(result) {	
				 		
						if (result==''){
							$("#login_image").hide();
							$("#loginButton").show();
							$("#login_error").html('Sorry Network not available');
						}else{
							var resultArray = result.split('<SYNCDATA>');			
							if (resultArray[0]=='FAILED'){
								$("#login_error").html('Failed');
								$("#login_image").hide();
								$("#loginButton").show();
							}
							if (resultArray[0]=='SUCCESS'){
								
								localStorage.last_sync_date=today
								//alert (localStorage.last_sync_date)
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
								localStorage.selectedProductShow=''
								localStorage.singleCatagoriSubmit=''
								
								<!------------ Product Stock -18/12/17------->
								localStorage.submitStock=''
								localStorage.prdctStockCart=''
								
								<!------------ Product Stock -18/12/17------->
																
								<!------------ Add to Cart ------->
								
								localStorage.submitAddCart=''
								localStorage.prdctAddCart=''
								
								<!------------  Add to Cart ------->
								
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
								
						<!----------------- Product Stock -18/12/17 -------------->
						
						        var rpt_rep_ob1=$("#catgoryList_stock");
								rpt_rep_ob1.empty();	 
								rpt_rep_ob1.append(catList);
						
						
						<!----------------- Product Stock -18/12/17 -------------->	
														
						<!----------------- Add To Cart -------------->
						
						        var rpt_rep_ob1=$("#catListAddCart");
								rpt_rep_ob1.empty();	 
								rpt_rep_ob1.append(catList);
						
						
						<!----------------- Add To Cart -------------->	
						
															
															
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
								<!------------ Product Stock -18/12/17-------->
								 var prdctShowStock=''
								<!------------ Product Stock -18/12/17-------->
								
								<!---------------- Add to Cart ---------------->
								 var prdctAddCartShow=''
								<!---------------- Add to Cart ---------------->
								
								 
								 for (i=0; i<prodctListStr.length-1; i++){
									 var qName="qName_"+i.toString()
									 var pNameID="pNameID_"+i.toString()
									 var sQName="SqName_"+i.toString()
									 
									 var cartName="CName_"+i.toString()
									 
									 pShowList=prodctListStr[i].split('|')
									 //alert(pShowList)
									 var pShow=pShowList[0]+'|'+pShowList[3]
									  									 
					prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td><input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'" name="'+pNameID+'" value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'    
									 									 
					 prdctShowList=prdctShowList+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>'                              
									
					<!------------ Product Stock -18/12/17--------> 
													 
					 prdctShowStock=prdctShowStock+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table width="500px"><tr><td align="left" >'+pShow+'</td> <td align="left" width="50px"><input onKeyUp="productStockQueNew('+i+')" type="number" id="'+sQName+'"   name="'+sQName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td></tr></table></li>'
													 
					 <!------------ Add to Cart -------->
					 
					 prdctAddCartShow=prdctAddCartShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>   <input onKeyUp="addCartProductQueNew('+i+')" type="number" id="'+cartName+'"   name="'+cartName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+pShow+'</td></tr></table></li>'									
									
						<!------------ Add to Cart-------->		    
								  
								 }
								     
								     localStorage.prdctShow=prdctShow
									 localStorage.prdctShowList=prdctShowList
									 
									 //-----Product Stock----18/12/17
									 localStorage.prdctShowStock=prdctShowStock
								
									 //-----Product Stock----18/12/17	 
							        //----- Add to Cart 
									 localStorage.prdctAddCartShow=prdctAddCartShow
									 //----- Add to Cart 
									
									var item_combo_id_ob=$('#item_combo_id');
									item_combo_id_ob.empty()
									item_combo_id_ob.append(prdctShow);
									
									var item_combo_id_ob_S=$('#item_combo_id_S');
									item_combo_id_ob_S.empty()
									item_combo_id_ob_S.append(prdctShowList);
									
									//-----Product Stock----18/12/17
									var item_combo_id_ob_stock=$('#item_combo_id_stock');
									item_combo_id_ob_stock.empty()
									item_combo_id_ob_stock.append(prdctShowStock);
									//------Product Stock---------18/12/17
									//-----Add to Cart ----
									
									var item_combo_id_ob_cart=$('#item_combo_id_cart');
									item_combo_id_ob_cart.empty()
									item_combo_id_ob_cart.append(prdctAddCartShow);
									
									//------Add to Cart---------
									
								//$(".errorMsg").html("");
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
	
		 }//else
		 
		 
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
	localStorage.selectedProductShow=''
	localStorage.singleCatagoriSubmit=''
	<!--------- Product Stock -18/12/17 ------------>
	localStorage.submitStock=''
	localStorage.prdctStockCart=''
	<!---------- Product Stock -18/12/17 ----------->
		
	<!--------- Add to Cart ------------>
	localStorage.submitAddCart=''
	localStorage.prdctAddCart=''
	<!----------  Add to Cart  ----------->
	
	localStorage.queMem	=''
	localStorage.radioMem =''
	localStorage.pFinal=''
	localStorage.pStr=''
	localStorage.TotalProductPoint=''
	localStorage.pStrFinal=''
	menuSearch()
	location.reload();
}

function proCatSelect(id){
	$(".errorMsg").html('');
	url="#ProductListDetails";					
	$.mobile.navigate(url);
	
	var proCat=id;	
	var prodctStr=localStorage.prodctStr;
	
	var prodctListStr=prodctStr.split('<rdrd>');
	var prdctShow=''
	for (i=0; i<prodctListStr.length-1; i++){
	 var qName="qName_"+i.toString()
	 var pNameID="pNameID_"+i.toString()
	 var cat = prodctListStr[i].split('|')[2]
	 pShowList=prodctListStr[i].split('|')
	 var pShow=pShowList[0]+'|'+pShowList[3]
	 
	 if (cat==proCat){
			prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'" name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td class="auto_break">'+pShow+'</td></tr></table></li>'    
		 }
	}
	localStorage.prdctShow=prdctShow
	var item_combo_id_ob=$('#item_combo_id');									
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctShow);
	item_combo_id_ob.listview("refresh");
	
} 

function productQueNew(i){
	$('#prodctQList').html(localStorage.outlet)
	$("#prMSave").html(localStorage.memInfo);
	$("#prSPoint").html(localStorage.memPoint);
	
	var qName="qName_"+i.toString()
	var pNameID="pNameID_"+i.toString()
	var qNameValue=$("#"+qName).val()
	//alert(qNameValue)
	var pNameIDValue=$("#"+pNameID).val()
	//alert (localStorage.submitPurchase)
	var submitPurchaseget=localStorage.submitPurchase;
	
	//alert(submitPurchaseget);
	
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
		}else{
			submitPurchase=submitPurchaseget+addProduct
			}
		
		//submitPurchase=submitPurchaseget+prdctName+'<fdfd>'+prdctID+'<fdfd>'+category+'<fdfd>'+rate+'<fdfd>'+qNameValue+'<fdfd>'+point+'<rdrd>'
		
		}else {
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
					strShow =submitPurchaseList[i]				
					strList=strShow.split('<fdfd>')			
					var	prdctIDS = strList[1]
					if (prdctID==prdctIDS){
						submitPurchase=submitPurchaseget.replace(strShow)
					}
				}
			}
		}
		
		localStorage.submitPurchase=submitPurchase;
		localStorage.selectedProductShow=submitPurchase;
		localStorage.singleCatagoriSubmit=submitPurchase;
}


function selectedProductShow(){		
	//var prdctShow=''
	/*var prdctShow='<table style="width:100%;"><tr><td><strong>Product</strong></td><td><strong>Qty</strong></td></tr>'
	//var submitPurchaseG=localStorage.submitPurchase
	var submitPurchaseG=localStorage.selectedProductShow;
	var submitPurchase=submitPurchaseG.replace('undefined<rdrd>','')
	
	submitPurchaseList=submitPurchase.split('<rdrd>')
	
	for (i=0; i<submitPurchaseList.length-1; i++){
		strShow = 	submitPurchaseList[i]		
		if 	(strShow.length > 0){
			strList=strShow.split('<fdfd>')			
			var	prdctName = strList[0]
			var	prdctID = strList[1]
			var	category = strList[2]
			var	rate = strList[3]
			var point= strList[5]
			var qNameValue= strList[4]
			var pShow=prdctName+'|'+rate+'|'+ category+'|'+ point
			if (parseInt(qNameValue)>0){
			
			prdctShow=prdctShow+'<tr id="+prdctID[1]+" style="height:70px; background-color:#CEF;"><td>'+pShow+'</td> <td width="30px"  align="center">'+qNameValue+'</td></tr>'
			}
		}
		localStorage.selectedProductShow=prdctShow+'</table>'
		
		$("#selectedItem").html(localStorage.selectedProductShow);
	}*/
	
<!--=========================-->	
	
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
	 var submitStrPurchase=localStorage.submitPurchase;
	 //var submitStrPurchase=localStorage.singleCatagoriSubmit;
	 submitStrPurchase=submitStrPurchase.replace('undefined<rdrd>','') 

	$.ajax({
		type:'POST',
		url:apiPath+'purchase_submit?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&submitStrPurchase='+encodeURIComponent(submitStrPurchase)+'&memPoint='+localStorage.memPoint+'&memName='+memName+'&memMobile='+memMobile,
	
        success: function(result2) {
			if (result2!='Failed'){
				localStorage.radioMem=memName+'|'+memMobile	
				var radioMem=localStorage.radioMem
				var radioMemMobile=radioMem.split('|')[1]
				
				$("#redMobile").val(radioMemMobile);
				
				<!--$("#button_show").html(' <a data-role="button"    onClick="PurchaseDone()" >Purchase & CheckOut</a>');-->
				
				//localStorage.submitPurchase='';
				//localStorage.singleCatagoriSubmit='';
				//localStorage.prdctShowCart='';
				
				$("#purchase_image").hide();
				$("#purchaseBtn").show();	
				url="#ProductList";					
				$.mobile.navigate(url);		
			}else{
				$("#errorChkpurchase").html('Sorry Network not available');
				$("#purchase_image").hide();
	 			$("#purchaseBtn").show();
				
				}
		}      
 
	  });
	
<!--/*=========================*/-->	

	/*if (memMobile!=""){
		
		$.ajax({
			type:'POST',
			url:apiPath+'search_purchase?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&memMob='+memMobile,
		
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
					
					prList=prStr.split('<rd>')
					var prdctShow='<table style="width:100%;">'
					var pStr=''
					for (i=0; i<prList.length-1; i++){
						 prSingle=prList[i]
						 var pID		  =prSingle.split('<fd>')[0]
						 var pName		  =prSingle.split('<fd>')[1]
						 var product_qty  =prSingle.split('<fd>')[2]
						 var product_point=prSingle.split('<fd>')[3]
						 var product_rate =prSingle.split('<fd>')[4]
						 var category	  =prSingle.split('<fd>')[5]
						 var qQty="qQty_"+i
	
						 var pShow=pName+'|'+product_rate+'|'+ category
						
						 prdctShow=prdctShow+'<tr style="height:70px"><td style="background-color:#CEF">'+pShow+'</td> <td width="50px" style="background-color:#FFEAF4" align="center">'+product_qty+'</td></tr>' 
						
						pStr=pStr+pID+'<fd>'+pName+'<fd>'+product_qty+'<fd>'+product_point+'<fd>'+product_rate+'<fd>'+category+'<rd>'
							
					}//for
				prdctShow=prdctShow+'</table>'
				
				localStorage.selectedProductShow=prdctShow+'</table>'
				$("#selectedItem").html(localStorage.selectedProductShow);
				
			}//if      
			}//success
		  });//ajax
		
	}else{
		$(".errorMsg").html('Please Check Your network');
	}
*/



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
			prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="width:100%; border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>' 
		}else{
			if (cat==catValue){
				prdctShow=prdctShow+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table><tr><td>'+pShow+'</td></tr></table></li>'                              
		 	}
		}
	}
	var item_combo_id_ob=$('#item_combo_id_S');
								
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctShow);
	item_combo_id_ob.listview("refresh");
}

//--------------------------Product Stock ------------------
function selcetCat_stock(){
	var catValue=$("#catgoryList_stock").val();
	
	//alert (localStorage.prdctShow)
	prodctStr=localStorage.prodctStr
	prodctListStr=prodctStr.split('<rdrd>');
	var prdctShowStock=''
	//alert (localStorage.prodctStr)
	for (i=0; i<prodctListStr.length-1; i++){
	 var sQName="SqName_"+i.toString()
	 var pNameID="pNameID_"+i.toString()
	 var cat = prodctListStr[i].split('|')[2]
	 pShowList=prodctListStr[i].split('|')
	 var pShow=pShowList[0]+'|'+pShowList[3]
	// alert (cat)
	 if (catValue=="ALL"){
		// alert('aa')
	 	//prdctShow=prdctShow+'<table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+prodctListStr[i]+'</td></tr></table>' 
		prdctShowStock=prdctShowStock+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table width="500px"><tr><td align="left">'+pShow+'</td> <td align="left" width="50px"><input onKeyUp="productStockQueNew('+i+')" type="number" id="'+sQName+'"   name="'+sQName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td></tr></table></li>'    
									 
		<!--<td><input  type="number"  style="width:50px"></td>	-->						 
		
		  
	 }
	 else{
		  //alert('bb')
		 if (cat==catValue){
		 	//prdctShow=prdctShow+'<table><tr><td> <input onKeyUp="productQueNew('+i+')" type="number" id="'+qName+'"   name="'+qName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td><td>'+prodctListStr[i]+'</td></tr></table>'
			prdctShowStock=prdctShowStock+'<li class="ui-btn ui-shadow " style="border-bottom-style:solid; border-color:#CBE4E4;border-bottom-width:thin"><table width="500px"><tr><td align="left">'+pShow+'</td> <td align="left" width="50px"><input onKeyUp="productStockQueNew('+i+')" type="number" id="'+sQName+'"   name="'+sQName+'" style="width:50px"><input type="hidden" id="'+pNameID+'"   name="'+pNameID+'"  value="'+prodctListStr[i]+'"></td></tr></table></li>'    
		 }
	 }
	 //alert (prdctShowStock)
	}
	//alert (localStorage.prodctStr)
	//alert (localStorage.prdctShow)
	 
	// localStorage.prdctShow=prdctShow
	 var item_combo_id_ob=$('#item_combo_id_stock');
									
	item_combo_id_ob.empty()
	item_combo_id_ob.append(prdctShowStock);
	item_combo_id_ob.listview("refresh");
	 
	// $("#prdctShow").html(localStorage.prdctShow)
//	 $("#item_combo_id").empty()
//	 $("#item_combo_id").append(localStorage.prdctShow);
	

}


//------------------------- Product Stock --------------------


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
	  }else if(genderComb=="" || genderComb==0){
			$(".errorChk").text("Please select Gender");		
	  /*}else if(ageRange=="" || ageRange==0){
			$(".errorChk").text("Please select Age");*/
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
					
					
				//$(".errorChk").text("Submitted Successfully");
				
				$("#memButton").show();		
			}
          
		}      
	  
	  });
	 product()
	  }
	  
}

//========================BKash=====================
function bKashConfirm(){
	 
	 var BKashNo=$("#BKashNo").val()
	 var BT_id=$("#BT_id").val()
	 var pathHit='http://w02.yeapps.com/unigift/syncmobile_eon_bKashNew_amount/'
	  	 
//	 var pathHit='http://127.0.0.1:8000/unigift/syncmobile_eon_bKashNew_amount/'
	 
	 var outletShow=localStorage.outlet
	 var outletNameId=outletShow.split('|');
	 var outletId=outletNameId[0];
////	  
	//alert(apiPath+'purchaseComplete?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&outletName='+outletName+'&finalData='+encodeURIComponent(finalData)+'&memberName='+memberName+'&memmobileNo='+memmobileNo+'&payComb='+payComb+'&BKashNo='+BKashNo+'&prPhotoName='+prPhotoName)
	//alert (pathHit+'bKashConfirm')	
	//alert ('test')	
	$.ajax({
		type:'POST',
		url:pathHit+'httpTest?cid='+localStorage.cid+'&cm_id='+localStorage.cm_id+'&cm_pass='+localStorage.cm_pass+'&sync_code='+localStorage.sync_code+'&outletId='+outletId+'&BT_id='+BT_id,
	
		success: function(result2) {
			//alert (result2)
			if (result2!=''){
				
				//$("#bkashConfirmBtn").show();
				
				trID=(result2.split('<trxId>')[1]).split('</trxId>')[0]
				status=result2.split('<trxStatus>')[1].split('</trxStatus>')[0]
				if (result2.indexOf('<amount>')==-1){amount=0}
				else{amount=result2.split('<amount>')[1].split('</amount>')[0]}
				//alert (trID)	
				//alert (trID)
				//alert (amount)	
				//trID=BT_id
				//amount=localStorage.TotalProductPoint
				
				status='0000'
				localStorage.bkashAmount=amount
				//alert (trID+'    '+BT_id)
				if  (trID==BT_id.toUpperCase()){
					//alert ('test')
				//if (trID==BT_id){
					//alert ('Yes')
					localStorage.bStatus='Yes'
					$("#errorChkpurchaseF").html('Confirmed BKash Transaction')
				}
				else{
					//alert ('No')
					localStorage.bStatus='No'
					$("#errorChkpurchaseF").html('Please Confirm BKash Transaction ID')
				}
				
				}
			
			else{
				$("#purchaseF_image").hide()
				$("#saveButton").show()	
				localStorage.bStatus='No'
				$("#errorChkpurchaseF").html('Please Confirm BKash Transaction ID')
			}
		},
		error: function(result2) {
				//alert ('test')
		 		$("#purchaseF_image").hide()
				$("#saveButton").show()	
				localStorage.bStatus='No'
				$("#errorChkpurchaseF").html('Please Confirm BKash Transaction ID')
		}
	  });
	  
	
	}	
	