/**
 * table input 欄位轉換成 jsonArray<Obj> 物件
 * @param target
 * @returns JSON string 
 * 
 * 例 : 
 *  <table id="medicTable">
	<tr>
		<td>
			<input name="name" type="text" value="3">
		</td>
		<td>
			<input name="medicId" type="text" value="3">
		</td>
		<td>
			<input name="0" class="status" type="radio" value="Y" checked>啟用
		    <input name="0" class="status" type="radio" value="N">停用
		</td>
		<td>
			<input name="seq" type="hidden" value="-1">
			<input name='deptRefSeq' type='hidden' value="-1">
		</td>
	</tr>			
    </table>   
    
 * 	var jsonStr = genJson('#medicTable');
 *  //jsonStr = {"objs":[{"name":"3","medicId":"3","status":"Y","seq":"-1","deptRefSeq":"-1"}]}
 */
function genJson(target){
	
	 var objects = new Object();
	 var array = [];

	$(target+' tr').each(function() {

		var obj = {};
		var isInput = false;

		$(this).find("input").each(function(){
			isInput = true;
			var key =  $(this).attr("name");
			var value =  $(this).val();
			var type = $(this).attr("type");
			
			if(type == 'radio'){
				if($(this).prop("checked")){
					key =  $(this).attr("class");
					obj[key] = value;
				}	
			}else{
				obj[key] = value;
			}
		});
		
		if(isInput)
			array.push(obj);

	});
	
	objects.objs = array
	
	var jsonString = JSON.stringify(objects);
	
	return jsonString;
}
