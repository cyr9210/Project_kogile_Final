(function($){
	//검색 관련 js
	console.log("========");
	console.log("common js");
	
	nowDate();

	function yesNo(){
		var a = confirm("초대하시겠습니까?");
		if(a==true){
			alert("초대됐습니다.");
		}
		else{
			alert("초대가 취소됐습니다.");	
			return false;
		}
	}
	//검색리스트 json
	var searchListService = (function() {
		
		function searchList(param, callback, error) {
			
			var search = param.search;
			
			$.getJSON("/invite/searchList/" + search + ".json", 
		
			function(data) {
				if (callback) {
					callback(data);
				}
			}).fail(function(xhr, status, err) {
				if (error) {
					error();
				}
			});
		}
		
		//searchPjt
		function searchPjt(param, callback, error) {
			
			var search = param.search;
			var total_m_no = param.total_m_no;
			
			$.getJSON("/invite/searchPjt/" + search + "/" + total_m_no + ".json" , 
		
			function(data) {
				if (callback) {
					callback(data);
				}
			}).fail(function(xhr, status, err) {
				if (error) {
					error();
				}
			});
		}
		return {
			searchList : searchList,
			searchPjt : searchPjt
		};
		

	})();
	
	
	var isSearch = false;
	
	$("input[name=search]").on('focusin', function(){
		isSearch =true;
	})
	//검색 리스트 이벤트
	$("input[name=search]").on('focusout', function(e){
		
		var searchValue = $('input[name=search]').val();
		var totValue = $('#rw').attr('value');
		
		
		searchListService.searchList({search:searchValue}, function(list){
			console.log(list);
			
			var value = '';
			
			for(var i = 0; i<list.length; i++){
				
				value += `<input class="btn btn-default" type="button" value="${list[i].name} (${list[i].mail})" 
				 name="searchList" id="searchList" data-content="${list[i].no}"/></p>`;
				
			}
			//value3 = `<div>검색결과 창을 닫으시려면 돋보기아이콘을 한번 더 클릭해주세요.<div>`;
			
			value = value;
			
			$('#btn-search').attr("data-content", value);	
		})
		
		/*searchListService.searchPjt({search:searchValue, total_m_no:totValue}, function(list){
		
			console.log("pjtList : " + list);
			
			var value = '';
			value += '<hr>'
			
			for(var i = 0; i<list.length; i++){
				
				value += `<input class="btn btn-default" type="button" value="${list[i].pjt_title}" 
				 name="searchPjt" id="searchPjt" data-content="${list[i].pjt_no}"/></p>`;
				
				
			}
			value3 = `<hr><div>검색결과 창을 닫으시려면 돋보기아이콘을 한번 더 클릭해주세요.<div>`;
			
			value = value + value3;
			
			$('#btn-search').attr("data-content", value);	
		
		});*/
	});
	//팝오버 정의
	$('#btn-search').popover({
		html : true,
		placement : 'bottom'
	})
	//팝오버 이벤트
	$("#btn-search").on('click', function(e) {
		var searchValue = $('input[name=search]').val();
		
		if(searchValue == "" || searchValue==null){
			alert("검색값을 입력해주세요.");
			$(this).popover('hide');															//but 첫페이지로 이동하는 버그 발생..
			return;
		} else{
			$(this).popover();
		}
							
	});
	
		//알림 리스트 JSON
		console.log("========");
		console.log("notice test");

		var noticeService = (function() {

			function notice(param, callback, error) {

				var notice = param.total_m_no;
				
				$.getJSON("/notice/noticeList/" + notice + ".json", 
			
				function(data) {
					if (callback) {
						callback(data);
					}
				}).fail(function(xhr, status, err) {
					if (error) {
						error(err);
					}
				});
			}
			
			function ntcUpdate(notice, callback, error){
				
				$.ajax({
					type : 'post',
					url : '/notice/ntcUpdate',
					data : JSON.stringify(notice),
					contentType : "application/json; charset=uft-8",
					success : function(result, status, xhr){
						if(callback){
							callback(result);
						}
					},
					error : function(xhr, status, er) {
						if (error) {
							error(er);
							
						}
					}
					})
			}
			return {
				notice : notice,
				ntcUpdate : ntcUpdate
			};
		})();
		

		//알림 setInterval
		
		
		setInterval(function(){
			printNotice();
			
		}, 5000);
		
		function printNotice(){
			//var before = $('#noticeLength').html();
			var a=0;
			
			var noticeValue = $('#rw').attr('value');
			console.log('noticeValue :' + noticeValue);
			
			noticeService.notice(noticeValue, function(list){
				console.log('list값 : ' + list[0].flag);
				
				for(var i=0; i<list.length; i++){
				if(list[i].flag===1){
					a++;
					
				}
				}
				console.log('a값 : ' + a);
				
				//document.createElement('#noticeLength')
				$('#noticeLength').html(a);
				
				if(a==0){
					//$('#noticeLength').remove();
					$('#noticeLength').html(0);
					//$('span').empty('#noticeLength');
				}
				
			});
				
			};
			
		
		
			//알림 리스트 이벤트
		$("#alertsDropdown").on('click', function(e){
			
			/*$('.fas.fa-bell.fa-fw.blinking').css('-webkit-animation', 'none');
			$('.fas.fa-bell.fa-fw.blinking').css('-moz-animation', 'none');
			$('.fas.fa-bell.fa-fw.blinking').css('animation', 'none');*/
			
			
			var noticeValue = $('#rw').attr('value');
			var noticeUL = $("#notice3");
			
			
				noticeService.ntcUpdate(
						{total_m_no:noticeValue, flag:0}
						,
						function(result){
							
						});
			
			
			noticeService.notice({total_m_no:noticeValue}, function(list){
				console.log(list);
				var value = '';
				
				if(list==null || list.length==0){
					noticeUL.html("");
					
					return;
				}
				
				for(var i = 0; i<list.length; i++){
					value += "<p id='noticeList' class='dropdown-item notice_list'>"+ list[i].ntc_cont + " " + list[i].day + "</p>";
					value += `<input type="hidden" value="${list[i].flag}" class="ntcUpdate" id="ntcUpdate"/>`;
					//value += "<p>" + list[i].ntc_cont + " " + list[i].day + "</p>";
					
				}
				
				noticeUL.html(value);
			})
			
			
		});
		
		$(document).on('click', '#alertsDropdown', function(){
		
			var noticeValue = $('#rw').attr('value');
		
				});
		
		console.log("=============");
		console.log("invite test");
		//초대 서비스 함수
		var inviteService = (function() {
	
			//초대 리스트 추가 JSON
			function add(invite, callback, error){
				console.log("add invite.......");
				
				$.ajax({
					type : 'post',
					url : '/invite/new',
					data : JSON.stringify(invite),
					contentType : "application/json; charset=uft-8",
					success : function(result, status, xhr){
						if(callback){
							callback(result);
						}
					},
					error : function(xhr, status, er) {
						if (error) {
							error(er);
							
						}
					}
					})
			}
			//초대 삭제 json
			function sub(invite, callback, error){
				console.log("add invite.......");
				
				$.ajax({
					type : 'post',
					url : '/invite/delete',
					data : JSON.stringify(invite),
					contentType : "application/json; charset=uft-8",
					success : function(result, status, xhr){
						if(callback){
							callback(result);
						}
					},
					error : function(xhr, status, er) {
						if (error) {
							error(er);
							
						}
					}
					})
			}
			
			//초대 목록 JSON처리 
			function invite(param, callback, error) {
				
				var invite = param.pjt_no;
				
				$.getJSON("/invite/inviteList/", 
				
				function(data) {
					if (callback) {
						callback(data);
					}
				}).fail(function(xhr, status, err) {
					if (error) {
						error();
					}
				});
			}
			return {
				add : add,
				sub, sub,
				invite : invite
			};
		})();
		
		//초대 리스트 추가 이벤트
	$(document).on("click", "#searchList", function(){
		console.log("===========");
		console.log("ADD TEST");
		
		var a = confirm("초대하시겠습니까?");
		
		if(a==true){
		
		var pjtValue = $('#rw2').attr('value');
		var totValue = $(this).attr('data-content');
		
		
		$('.invList').each(function(index, item){
			invTot = $(this).attr('data-content');
			
			
			console.log("invTot : " + invTot);
			console.log("index : " + index);
			console.log("item : " + item );
			
			for(i=0; i<=index; i++){
				if(totValue == invTot){
					alert("이미 초대된 상대입니다.")
					return false;
				}
			}
			
			
		});
		
		//var totValue = 2;
		console.log("pjtValue : " + pjtValue);
		//console.log("totValue : " + totValue);

		//console.log("invTot : " + invTot);

		inviteService.add(
				{pjt_no:pjtValue, total_m_no:totValue}
				,
				function(result){
					
				});
		if(pjtValue == null){
			alert("해당 페이지에선 초대 할  수 없습니다.");
			return false;
		}
		
//			리다이렉트처리
			var pjt_no = $('#rw2').attr('value');
			window.location.href = 'http://localhost:8082/kogile/main?pjt_no='+pjt_no;
		
		}
		else{
			alert("초대가 취소됐습니다.");	
			return false;
		}
		
	});
	
	$(document).on("click", "#delete", function(){
		
		var a = confirm("프로젝트를 나가시겠습니까?");
		
		if(a==true){
		var pjtValue = $('#rw2').attr('value');
		var totValue = $('#rw').attr('value');
		
		console.log("pjtValue : " + pjtValue);
		console.log("totValue : " + totValue);
		
		inviteService.sub({pjt_no:pjtValue, total_m_no:totValue});
		
		window.location.href = 'http://localhost:8082/kogile/startPage';
		
		alert("프로젝트를 나갔습니다.");
		
		}else{
			alert("나가기를 취소했습니다.");
			return false;
		}
		
		});
	
//	초대목록 처리
		$(document).ready(function(){
			//var noticeValue = ;
			
			var inviteValue = $('#rw2').attr('value');
			var inviteUL = $("#pjname");
			
			inviteService.invite({pjt_no:inviteValue}, function(list){
				
				var value = '';
				
				if(list==null || list.length==0){
					inviteUL.html("");
					
					return;
				}
				
				for(var i = 0; i<list.length; i++){
					value += '<span class= "invList" data-content="'+list[i].total_m_no+'">'+' ' + list[i].name.substring(list[i].name.length-2)+ '</span>';
					
				}
				
				inviteUL.html(value);
			})
		
		});

		
		
//		채팅창 띄우기
		$("#messagesDropdown").on("click", function() {
			window.open("/Chatting", "", "width=356, height=450");
			return false;
		})
		
		// 현재 시간 구하기
		function nowDate() {
		
		var Now = new Date();

		var NowTime = Now.getFullYear();

		NowTime += '-' + (Now.getMonth() + 1);

		NowTime += '-' + Now.getDate();

		time = $('#nowTime').html(NowTime);
		
		return time;
		}
		//image upload thumbnail
		$('#btn_profilePic').on('click', function(e){
			var formData = new FormData();
			var inputFile = $("input[name=uploadProfile]");
			var files = inputFile[0].files;
			
			console.log(files);
			
			if(!checkExtension(files[0].name, files[0].size)){
				return false;
			}
			
			formData.append("uploadProfile", files[0]);
						
			console.log(formData);
			
			$.ajax({
				processData : false,
				contentType : false,
				data : formData,
				type : 'POST',
				url : '/kogile/project/profilePic'
			}).then(function(res){
				alert("프로필 사진이 저장되었습니다.");
			})
		})
		
		function checkExtension(filename, filesize){
			var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
			var maxSize = 20971520;
			
			if(filesize >= maxSize){
				alert("파일 사이즈 초과");
				return false;
			}
			if(regex.test(filename)){
				alert("해당 종류의 파일은 업로드 할 수 없습니다.");
				return false;
			}
			return true;
		}
	
})(jQuery);

//	
//	$(function(){
//		
//		
//		$("#btn-search").on('click', function(e) {
//			event.stopPropagation();
//			
//			 
//			var searchValue = $('input[name=search]').val();
//			
//			if(searchValue == "" || searchValue==null){
//				alert("검색값을 입력해주세요.");
//				target.removeEventListenter('input[name=search]', this); //이벤트 제거하여 popover이벤트 막기. 
//																			//but 첫페이지로 이동하는 버그 발생..
//				return;
//			} else{
//				$(function(){
//					$('[data-toggle="popover"]').popover({
//						html : true,
//						placement : 'bottom'
//					});
//					
//				});			
//			}
//								
//		});
//		
//	});
//
//	// 채팅창띄우기.
//	$("#messagesDropdown").on("click", function() {
//		window.open("/Chatting", "", "width=356, height=450");
//		return false;
//	})