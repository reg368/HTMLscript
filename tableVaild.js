/**
 * 驗證 <table> --> <td>  內的 input or select 欄位是否有輸入值
 * 若沒有值會在<td>內加上提醒訊息
 * 
 * 例 : <input name="name" type="text" must="true"> 
 *      must="true" 的element就會進入檢查判斷
 *       
 * @param target  :  目標table 
 * @param complete : 驗證完成call back method. 傳入 isValid 告知是否合格 
 * 
 * 例: 
 * 	validation('#formTable',function (isVaild){
 *  	if(isVaild){
 *  		//do something
 *  	}else{
 *  		//do something
 *  	}
 *  });								
 */
function validation(target,complete){
	
	var isValid = true;
	var error = "<span style='color : red;' id='error'>(此欄位不得為空值)</span>";
	
	$(target+' tr').each(function() {
		
		$(this).find("td").each(function(){
			
			$(this).children("#error").remove();
			var td = $(this);
			var isAppend = false;
			
			
			$(this).find("input").each(function(){
				
				var type =  $(this).attr("type");
				var must =  $(this).attr("must");
				
				if(must == 'true'){
					
					var value = ''
					
					if (type == 'radio'){
						
						var name =  $(this).attr("name");
						value = $("input[name='"+name+"']:checked").val()						
						
					}else{
						value =  $(this).val();
					}
					
					if(value == '' || value == null){
						isValid = false;
						if(!isAppend){
							td.append(error);
							isAppend = true;
						}
					}
					
				}
			});//input
			
			$(this).find("select").each(function(){
				
				var must =  $(this).attr("must");
				
				if(must == 'true'){

				var value =  $(this).val();
				
				if(value == '' || value == null){
					isValid = false;
					if(!isAppend){
						td.append(error);
						isAppend = true;
					}
				  }
				}
			});//select

			
		});//td
		
	});//tr
	
	complete(isValid);
}



/**
 * 驗證 <table> --> <td>  內的 input or select 欄位是否有輸入值
 * 若沒有值會顯示alert 訊息
 * 
 * 例 : <input name="name" type="text" must="true" item="姓名"> 
 *      must="true" 的element就會進入檢查判斷
 *      item="姓名" 如果檢核沒有值,會抓取此項目的字顯示alert訊息
 *      			例 : 以下項目填寫不完整，請檢查後再送出 : 姓名
 *      
 *      item名稱重複只會 跳出alert一次
 * 例:  <input name="phone1" type="text" must="true" item="家用電話">
 * 		<input name="phone2" type="text" must="true" item="家用電話">
 * 		執行 alert('以下項目填寫不完整，請檢查後再送出 : 家用電話')
 * 
 * 
 *      <input name="phone1" type="text" must="true" item="家用電話">
 * 		<input name="phone2" type="text" must="true" item="手機電話">
 * 		執行 alert('以下項目填寫不完整，請檢查後再送出 : 家用電話') 
 *           alert('以下項目填寫不完整，請檢查後再送出 : 手機電話') 
 *       
 *       
 * @param target  :  目標table 
 * @param complete : 驗證完成call back method. 傳入 isValid 告知是否合格 
 * 
 * 例: 
 * 	validation('#formTable',function (isVaild){
 *  	if(isVaild){
 *  		//do something
 *  	}else{
 *  		//do something
 *  	}
 *  });								
 */
function validationWithAlertItem(target,complete){
	
	var isValid = true;
	var alertItem = {};
	
	$(target+' tr').each(function() {
		
		$(this).find("td").each(function(){
		
			var td = $(this);
			
			$(this).find("input").each(function(){
				
				var type =  $(this).attr("type");
				var must =  $(this).attr("must");
				var item =  $(this).attr("item");
				
				if(must == 'true'){
					
					var value = ''
					
					if (type == 'radio'){
						
						var name =  $(this).attr("name");
						value = $("input[name='"+name+"']:checked").val()						
						
					}else{
						value =  $(this).val();
					}
					
					if(value == '' || value == null){
						isValid = false;
						alertItem[item]	= true;
					}
				}
			});//input
			
			$(this).find("select").each(function(){
				
				var must =  $(this).attr("must");
				var item =  $(this).attr("item");
				
				if(must == 'true'){

				var value =  $(this).val();
				
				if(value == '' || value == null){
					isValid = false;
					alertItem[item]	= true;
				  }
				}
			});//select

			
		});//td
		
	});//tr

	if(!isValid){
		for(var item in alertItem){
			alert('以下項目填寫不完整，請檢查後再送出 : '+item);
		}
	}
	
	complete(isValid);
}
