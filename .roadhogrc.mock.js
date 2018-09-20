
const fs=require('fs');
const path=require('path');

//设置mock路径  __dirname为node根路径
const mockPath=path.join(__dirname+'/mock');

const mock={};
fs.readdirSync(mockPath).forEach(file=>{
    //克隆文件对象
    Object.assign(mock,require('./mock/'+file));
});

module.exports=mock;
