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
