/**
 * @param refId  : table  codeRef  refId
 * @param target : HTML select tag 
 * Ajax 取得 Json Array 例 : 
 * 			{"areas":[{"refmetaid":"taiwanCity","subcodevalueetc":"112","subcodevalue":"北投區","subcodesort":100,"refid":"臺北市","subcodeid":"北投區","seq":1}]} 
 */
function updateAreaOption(refId,target){
	$.ajax({
		  url: "/admin/app/admin/CodeRef/find/findByRefId?refId="+refId,
		  dataType: "json",
		  success: function(data) {
			
		    var areas, index, select, area;

		    // Get the raw DOM object for the select box
		    select = document.getElementById(target);

		    // Clear the old options
		    select.options.length = 0;

		    // Load the new options
		    areas = data.areas; // Or whatever source information you're working with
		    for (index = 0; index < areas.length; ++index) {
		    	area = areas[index];
		        select.options.add(new Option(area.subcodevalue, area.seq));
		    }
		  }
		});
}
