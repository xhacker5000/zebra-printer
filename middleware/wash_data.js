var WashData = {};

WashData.wash_data = [
    {
        index: "q",
        value: '轻柔手洗'
    },
    {
        index: "15",
        value: "专业维护",
    },
    {
        index: "16",
        value: "水洗产品"
    },
    {
        index: "17",
        value: "冷水冲洗"
    },
    {
        index: "18",
        value: "反面水洗"
    },
    {
        index: "19",
        value: "专业水洗"
    },
    {
        index:"20",
        value:"反面熨烫"
     },
     {
        index:"21",
        value:"远离火源"
     },
     {
        index:"28",
        value:"分开洗涤"
     },
     {
        index:"29",
        value:"相似颜色一起水洗"
     },
     {
        index:"30",
        value:"加入吸色布一起水洗"
     },
     {
        index:"31",
        value:"用羊毛织物程序"
     },
     {
        index:"32",
        value:"不要再太阳下暴晒晾干"
     },
     {
        index:"33",
        value:"不可拧干"
     },
     {
        index:"34",
        value:"清洗前去除毛皮"
     },
     {
        index:"39",
        value:"请勿自然干燥"
     },
     {
        index:"40",
        value:"仅用蒸汽熨烫"
     },
     {
        index:"41",
        value:"用湿巾擦拭"
     },
     {
        index:"42",
        value:"只可按压"
     }
]

WashData.get_all_data = function(){
    var total_wash_data = []
    for(let i=1; i< 43; i++){
        var single_wash = this.get_wash_notice(i);
        total_wash_data.push(single_wash);
    }
    return total_wash_data;
}

WashData.get_wash_notice = function(index){
    
    for(let i=0; i< WashData.wash_data.length; ++i){
        var single_wash = WashData.wash_data[i];
        if(index == single_wash.index){
            single_wash.type  = 0;
            return single_wash
        }
    }
    return {
        type:1,
        index:""+index,
        value:index+".bmp",        
    }
}

module.exports = WashData;