
//새창 열기 모뮬
function NewWindow(mypage,myname,w,h,scroll)
{ 
	var win_w = (screen.width-w)/2; 
	var win_h = (screen.height-h)/2; 
	win_w	= 100;
	win_h	= 100;
	var settings ='height='+h+','; 
	settings +='width='+w+','; 
	settings +='top='+win_w+','; 
	settings +='left='+win_h+','; 
	settings +='scrollbars='+scroll+','; 
	settings +='resizable=yes,'; 
	settings +='menubar=no,'; 
	settings +='toolbar=no'; 
	win=window.open(mypage,myname,settings); 
} 

// 오직 숫자만 입력 -- 스타일에 ime-mode:disabled 필요 onKeyUp
function fncOnlyNumber(objtext1) 
{
	var inText = objtext1.value;
	var ret;
		
	for (var i = 0; i < inText.length; i++) 
	{
		ret = inText.charCodeAt(i);
		if (!((ret > 47) && (ret < 58)))  
		{
			objtext1.value=inText.replace(inText.charAt(i),"");
			objtext1.focus();
			return false;
		}
	}
	return true;
}

function fncCheckSecurityNumber() {
	var jumin1 = document.getElementById('c_jumin1');
	var jumin2 = document.getElementById('c_jumin2');
	var securityNumber = jumin1.value.split('').concat(jumin2.value.split(''));

	if(jumin2.value === '') {
		return;
	}

	//유효성 체크
	if(!Jumin_chk(securityNumber)) {
		jumin2.value = '';
		alert('잘못된 주민등록 번호 입니다.');
	}
}

// 글자수만큼 자동 다음포커스 이동 (onKeyup)
function fncNextFocus(obj, limitLength, form_name, nextcol) 
{
	var frm=eval("document.all."+form_name);
	if(obj.value.length == limitLength) 
	{
		next_c="frm."+nextcol+".focus();"
		eval(next_c);
	}
}

//숫자, 콤마, 하이픈, 데쉬만 입력체크 - 스타일에 ime-mode:disabled 필요 onKeyUp
function fncOnlyNum(objtext1) 
{
	var inText = objtext1.value;
	var ret;
		
	for (var i = 0; i < inText.length; i++) 
	{
		ret = inText.charCodeAt(i);
		
		if (!((ret > 42) && (ret < 58)) ) 
		{
			objtext1.value=inText.replace(inText.charAt(i),"");
			objtext1.focus();
			return false;
		}
	}
	return true;
}


//	원하는 문자만 제거
function fncReplaceCheck(objtxt, repChar) 
{
	for (; objtxt.value.indexOf(repChar) != -1 ;) 
	{ 
		objtxt.value = objtxt.value.replace(repChar,"")
	}

	return objtxt.value;
}


function FocusColor(This) { This.style.backgroundColor = "#FFF4DA"; }
function BlurColor(This) { This.style.backgroundColor = "#FFFFFF";}


//엔터체크 (onKeyup="enter_chk('frm_login','passwd');")
function EnterNextFocus(form_name,nextcol)
{
	var frm=eval("document.all."+form_name);
	if(event.keyCode == 13)
	{
		next_c="frm."+nextcol+".focus();"
		eval(next_c);
	}
}  

// 주민등록번호 체크
function Jumin_chk(securityNumber)
{
	var compare = [2,3,4,5,6,7,8,9,2,3,4,5];

	var N = compare.reduce(function(acc, val, idx) {
		return acc += parseInt(securityNumber[idx], 10) * val;
	}, 0);

	var lastSecurityNumber = parseInt(securityNumber[securityNumber.length - 1], 10);

	var checkSum = (11 - (N % 11)) % 10;

	return (lastSecurityNumber === checkSum);
}


//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
function sample4_execDaumPostcode(Target1, Target2, Target3) {
	new daum.Postcode({
		popupName : 'daum_address',
		oncomplete: function(data) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;

			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				//법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}


			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			document.getElementById(Target1).value = data.postcode1; //5자리 새우편번호 사용
			document.getElementById(Target2).value = data.postcode2;
			document.getElementById(Target3).value = fullAddr;

			//document.getElementById(Target3).value = data.jibunAddress;

			// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
			if(data.autoRoadAddress) {
				//예상되는 도로명 주소에 조합형 주소를 추가한다.
				var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
				//document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

			} else if(data.autoJibunAddress) {
				var expJibunAddr = data.autoJibunAddress;
				//document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

			} else {
				//document.getElementById('guide').innerHTML = '';
			}
		}
	}).open();
}


function fnc_custom_regist(form_name)
{
	var frm = document.getElementById(form_name);

	if(frm.c_jumin2 && frm.c_jumin2.value=="")
	{
		alert("주민등록번호를 입력해 주세요!");
		frm.c_jumin2.focus();
		return;
	}
	
	if(frm.c_name.value=="")
	{
		alert("고객명을 입력해 주세요!");
		frm.c_name.focus();
		return;
	}

	if(frm.c_address.value=="")
	{
		alert("검색버튼을 눌러 주소 정보를 입력해주세요!");
		frm.c_address.focus();
		return;
	}	

	if(frm.c_tel22.value=="" || frm.c_tel23.value=="")
	{
		alert("휴대폰번호를 입력해 주세요!");
		frm.c_tel22.focus();
		return;
	}
	

	if(frm.g_auth.value=="")
	{
		alert("본인여부를 선택해 주세요!");
		frm.g_auth.focus();
		return;
	}
	
	if(frm.c_email1 && frm.c_email1.value=="")
	{
		alert("이메일 주소를 입력해 주세요!");
		frm.c_email1.focus();
		return;
	}

	if(frm.c_email2 && frm.c_email2.value=="")
	{
		alert("이메일 주소를 입력해 주세요!");
		frm.c_email2.focus();
		return;
	}

	if(frm.c_tel2_type.value=="")
	{
		alert("휴대폰 통신사를 선택해 주세요!");
		frm.c_tel2_type.focus();
		return;
	}




	if(frm.g_payment_method[0].checked==true)
	{
		if(frm.g_bank_cd.value=="0")
		{
			alert("은행을 선택해 주세요!");
			frm.g_bank_cd.focus();
			return;
		}
		if(frm.g_bank_no.value=="")
		{
			alert("계좌번호를 입력해 주세요");
			frm.g_bank_no.focus();
			return;
		}
		if(frm.g_bank_holder.value=="")
		{
			alert("예금주명을 입력해 주세요!");
			frm.g_bank_holder.focus();
			return;
		}

	}

	if(frm.g_sp_giftcard_code.value==="0") {
		alert("사은품 상품권 종류를 선택해 주세요!");
		frm.g_sp_gitcard_code.focus();
		return;
	}

	if(frm.g_sp_bank_code.value=="0")
	{
		alert("사은품 은행을 선택해 주세요!");
		frm.g_sp_bank_code.focus();
		return;
	}
	if(frm.g_sp_bank_acount.value=="")
	{
		alert("사은품 계좌번호를 입력해 주세요");
		frm.g_sp_bank_acount.focus();
		return;
	}
	if(frm.g_sp_bank_holder.value=="")
	{
		alert("예금주명을 입력해 주세요!");
		frm.g_sp_bank_holder.focus();
		return;
	}

	if(frm.board_internet && frm.board_internet.value=="")
	{
		alert("인터넷 상품을 선택해 주세요!");
		frm.board_internet.focus();
		return;
	}

	if(frm.board_tv && frm.board_tv.value=="")
	{
		alert("TV 상품을 선택해 주세요!");
		frm.board_tv.focus();
		return;
	}
	

	if(frm.board_tel && frm.board_tel.value=="")
	{
		alert("전화 상품을 선택해 주세요!");
		frm.board_tel.focus();
		return;
	}
	

	if(frm.board_settop && frm.board_settop.value=="")
	{
		alert("셋탑박스를 선택해 주세요!");
		frm.board_settop.focus();
		return;
	}

	if(frm.board_wifi && frm.board_wifi.value=="")
	{
		alert("와이파이를 선택해 주세요!");
		frm.board_wifi.focus();
		return;
	}

	if(frm.telephone_carrier_move_chk && frm.telephone_carrier_move_chk.value=='true')
	{
		if(frm.g_move_company.value=="")
		{
			alert("기존통신사를 선택해 주세요!");
			frm.g_move_company.focus();
			return;
		}

		if(frm.g_move_tel1.value=="")
		{
			alert("기존전화번호를 입력해 주세요!");
			frm.g_move_tel1.focus();
			return;
		}


		if(frm.g_move_auth.value=="")
		{
			alert("번호이동 인증방식을 선택해 주세요!");
			frm.g_move_auth.focus();
			return;
		}

		if(frm.g_move_no.value=="")
		{
			alert("번호이동 인증번호를 입력해 주세요!");
			frm.g_move_no.focus();
			return;
		}
		

	}

	if(frm.p_vendor && frm.p_vendor.value=="")
	{
		alert("가입회사를 선택해 주세요!");
		frm.p_vendor.focus();
		return;
	}

	if(frm.p_product)
	{
		var checked = false;
		var i=0;

		for( i=0 ; i<frm.p_product.length; i++) {
			if(frm.p_product[i].checked) {
				checked = true;
				break;
			}
		}
		
		frm.p_product.forEach(function(itemBox) {
			if(itemBox.checked) {
				checked = true;
			}	
		});

		if(!checked) {
			alert("가입상품을 선택해 주세요!");
			frm.p_product[0].focus();
			return;
		}
	}


	if(frm.w_agree.checked==false)
	{
		alert("약관에 동의 하셔야 합니다.");
		frm.w_agree.focus();
		return;
	}
	frm.submit();
}

function event_style_view(form_name,chk)	
{
	var frm = document.getElementById(form_name);
		
	if(chk=="A")
	{
		document.getElementById("style_view_10").style.display = "none";
		document.getElementById("style_view_11").style.display = "none";
		document.getElementById("style_view_12").style.display = "none";
		document.getElementById("style_view_13").style.display = "none";
		document.getElementById("style_view_14").style.display = "none";
		document.getElementById("style_view_15").style.display = "none";



		if(frm.g_payment_method[0].checked==true)
		{
			document.getElementById("style_view_10").style.display = "block";	
			document.getElementById("style_view_10").style.display = "";	

			document.getElementById("style_view_11").style.display = "block";	
			document.getElementById("style_view_11").style.display = "";	

			document.getElementById("style_view_12").style.display = "block";	
			document.getElementById("style_view_12").style.display = "";	

		}

		if(frm.g_payment_method[1].checked==true)
		{
			document.getElementById("style_view_13").style.display = "block";	
			document.getElementById("style_view_13").style.display = "";	

			document.getElementById("style_view_14").style.display = "block";	
			document.getElementById("style_view_14").style.display = "";	

			document.getElementById("style_view_15").style.display = "block";	
			document.getElementById("style_view_15").style.display = "";	

		}	
	}

	if(chk=="B")
	{
		document.getElementById("style_view_01").style.display = "none";
		document.getElementById("style_view_02").style.display = "none";
		document.getElementById("style_view_03").style.display = "none";


		if(frm.telephone_carrier_move_chk.value=='true')
		{
			document.getElementById("style_view_01").style.display = "block";	
			document.getElementById("style_view_01").style.display = "";	

			document.getElementById("style_view_02").style.display = "block";	
			document.getElementById("style_view_02").style.display = "";	

			document.getElementById("style_view_03").style.display = "block";	
			document.getElementById("style_view_03").style.display = "";	
		}	
	}
}



//(동일항목 체크)
function g_custom_copy(form_name,chk)
{
	var frm = document.getElementById(form_name);


	if(chk.checked==true)
	{
		frm.g_bank_holder.value=frm.c_name.value;
		frm.g_card_holder.value=frm.c_name.value;
	}
	else
	{
		frm.g_bank_holder.value="";
		frm.g_bank_jumin1.value="";
	}
}


function fnc_consult_regist(form_name)
{   	
	var frm	= document.getElementById(form_name);

   	if(frm.c_m_name.value=="")
   	{
		alert("이름(상호)을 입력하십시오")
		frm.c_m_name.focus();
		return;
   	}	

   	if(frm.c_m_htel1.value=="")
   	{
		alert("연락처를 입력하십시오")
		frm.c_m_htel1.focus();
		return;
   	}	

	/*
   	if(frm.consult_date.value=="")
   	{
		alert("상담가능시간을  입력하십시오")
		frm.consult_date.focus();
		return;
   	}
	*/
	
	if(frm.w_agree.checked==false)
	{
		alert("약관에 동의 하셔야 합니다.");
		frm.w_agree.focus();
		return;
	}

	frm.submit();
}


// 사은품 계좌 등록 (동일항목 체크)
function g_sp_bank_copy(form_name,chk)
{
	var frm = document.getElementById(form_name);
	

	if(chk.checked==true)
	{
		c_bank_cd_val = frm.g_bank_cd.value;

		g_sp_bank_code_length		= frm.g_sp_bank_code.length;

		for(i=0; i<g_sp_bank_code_length;i++)
		{		
			if(frm.g_sp_bank_code.options[i].value==c_bank_cd_val)
			{
					frm.g_sp_bank_code.options[i].selected=true;
			}
		}

		frm.g_sp_bank_acount.value=frm.g_bank_no.value;
		frm.g_sp_bank_holder.value=frm.g_bank_holder.value;
	}
	else
	{
		//사은품 정보를 지운다.
		frm.g_sp_bank_code.options[0].selected=true;
		frm.g_sp_bank_acount.value="";
		frm.g_sp_bank_holder.value="";
	}
}


/* 이메일 스크립트 */
function SetEmailTail(emailValue) 
{
	var emailTail = document.getElementById("c_email2");
	
	if (emailValue == "notSelected")
		return;
	else if ( emailValue == "etc" ) {
		emailTail.readOnly = false;
		emailTail.value = "";
		emailTail.focus();
	} else {
		emailTail.readOnly = true;
		emailTail.value = emailValue;
	}
}