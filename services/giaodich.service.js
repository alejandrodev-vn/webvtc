const { log } = require('debug');
const giaodichModel = require('../models/giaodich.model');

exports.getAll = async() =>{
    try{
        const giaoDich = await giaodichModel.find({});
        return giaoDich
    }
    catch(err){
        consolog(err)
    }
}
exports.getById = async (id) =>{
    try{
        const giaoDich = await giaodichModel.findById(id)
        return giaoDich
    }
    catch(err){
        console.log(err)
    }
}
exports.getByUser = async (id) =>{
    try{
        const giaoDich = await giaodichModel.find({userId:id})
        return giaoDich
    }
    catch(err){
        console.log(err)
    }
}
exports.creatNew = async(values) =>{
    try{
        let giaoDichNew= new giaodichModel({
            userId: values.userId,
            content: values.content,
            money: values.money,
            tenGD: values.tenGD,
            date:Date.now()
        })
        return await giaoDichNew.save((err) => {
            if(err){
                console.log('add giaodich fail!'+ err )
            }else{
                console.log('add giaodich success!')
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
