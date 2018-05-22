function day(day){
  return day/10 >= 1 ? day : '0' + day
}
var tools = {
     //返回年月日时分
     returnAllTime:(nowtime)=>{
        let date = new Date(nowtime);
        return  date.getFullYear() + '-' + day((date.getMonth() + 1)) + '-' + day(date.getDate()) + ' ' + day(date.getHours()) + ':' + day(date.getMinutes()) + ':' + day(date.getSeconds());
     },
     //返回年月日
     returnYearMonth:(nowtime)=>{
       var date = new Date(nowtime);
       return  date.getFullYear() + '-' + day((date.getMonth() + 1)) + '-' + day(date.getDate());

     },
     returnTime:(nowtime)=>{
     	let date = new Date(nowtime);
     	return  date.getFullYear() + '-' + day((date.getMonth() + 1)) + '-' + day(date.getDate()) + ' ' + day(date.getHours()) + ':' + day(date.getMinutes());
     }
}
