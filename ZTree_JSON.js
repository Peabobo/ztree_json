function buildZtreeChildren(jsonobj){
    var rootNode=[]
    for(key in jsonobj){
        var obj ={}
        if(typeof(jsonobj[[key]]) =='object'){
            obj.name=key;
            obj.children=buildZtreeChildren(jsonobj[key]);
            rootNode.push(obj)
        }else{
            obj.name=key+":"+jsonobj[key];
            rootNode.push(obj)
        }
    }
	
    return rootNode;
}
/*function buildZtreeChildren(jsonobj){
    var rootNode=[]
    for(key in jsonobj){
        var obj ={}
        if(typeof(jsonobj[[key]]) =='object'){
            obj.name=key;
            obj.children=buildZtreeChildren(jsonobj[key]);
            rootNode.push(obj)
        }else{
            obj.name="<input value='"+key+"'/>"+":"+jsonobj[key];
            rootNode.push(obj)
        }
    }
	删除一行注释，新加一个标签
    	新建一个分支
    return rootNode;
}*/
$.jsonBuildZtree =function(data){
    var ZtreeJson=[{name:'JSON',children:[]}]
    if(typeof(data)=='object'){
        ZtreeJson[0].children=buildZtreeChildren(data);
        return ZtreeJson
    }else{
        try{
            throw err = new Error('该数据不是json');
        }catch(e){

        }
    }
}

$.zTreefromatJson= function(zTree){
    var onde=zTree.getNodes();
    var json=zTreefromatJson(onde[0].children);
    return zTreefromatJson(onde[0].children);
}

function zTreefromatJson(node){
    var obj;
    var prefix=node[0].name;
    var jsontype='0';//0:{},1:[];
    if(!isNaN(prefix)){
        console.log(1);
        obj =new Array();
    }else if(prefix.indexOf(":")!=-1 && !isNaN(prefix.split(":")[0])){
        console.log(2);
        obj =new Array();
    }else{
        console.log(3)
        obj ={};
        jsontype='1';
    }
    for (key in node){
        var key,val;
        var name=node[key].name;
        var children=node[key].children;
        if(typeof(children) =='object'){
            key=name;
            val=zTreefromatJson(children);
        }else{
            var nameArray=name.split(":");
            key=nameArray[0];
            val=nameArray[1];

        }
        console.log(key)
        console.log(val)
        if(jsontype=='0'){//数组
            obj.push(val);
        }else{
            obj[key]=val;
        }

    }
    return obj;
}
