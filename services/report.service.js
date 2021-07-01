const { log } = require('debug');
const CTSCaNhanModel = require('../models/ctscanhan.model')
const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.reportByMST = async (mst) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({MSTCaNhan:mst});
        if(CTSCaNhan.length!=0){
            return CTSCaNhan[0]
        }
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({MST:mst});
        if(CTSDoanhNghiep.length!=0){
            return CTSDoanhNghiep[0]
        }
        return {}
    }
    catch(err){
        console.log(err)
    }
}

exports.getById = async (id) => {
    try{
        const result = await CTSCaNhanModel.findById(id);
        return result
    }
    catch(err){
        console.log(err)
    }
}

