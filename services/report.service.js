const { log } = require('debug');
const CTSCaNhanModel = require('../models/ctscanhan.model')
const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.reportByMST = async (mst) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({MSTCaNhan:mst});
        if(CTSCaNhan.length!=0){
            return CTSCaNhan
        }
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({MST:mst});
        if(CTSDoanhNghiep.length!=0){
            return CTSDoanhNghiep
        }
        return []
    }
    catch(err){
        console.log(err)
    }
}
exports.reportByTokenId = async (tokenId) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({tokenId:tokenId});
        if(CTSCaNhan.length!=0){
            return CTSCaNhan
        }
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({tokenId:tokenId});
        if(CTSDoanhNghiep.length!=0){
            return CTSDoanhNghiep
        }
        return []
    }
    catch(err){
        console.log(err)
    }
}
exports.reportBySerialNumber = async (serialNumber) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({serialNumber:serialNumber});
        if(CTSCaNhan.length!=0){
            return CTSCaNhan
        }
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({serialNumber:serialNumber});
        if(CTSDoanhNghiep.length!=0){
            return CTSDoanhNghiep
        }
        return []
    }
    catch(err){
        console.log(err)
    }
}
exports.getReport = async (
            typeReport, agency, actionBy, 
            dateBegin, dateEnd, status, services
            ) => {
    try {
        let result = {}
        if (typeReport == '' || typeReport == '0') {
            if(status!='9'){
                let canhan = await CTSCaNhanModel.find(
                    {
                        goiCTSId: services,
                        ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                        trangThai: status,
                        createdBy:agency
                        
                    })
                let doanhnghiep = await CTSDoanhNghiepModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: status,
                            createBy:agency,
                            $or: [
                                {action1By: actionBy},
                                {action2By: actionBy},
                                {action3By: actionBy},
                                {action4By: actionBy},
                                {action5By: actionBy},
                                {action6By: actionBy},
                                {action7By: actionBy}
                            ]
                    })
                    if(canhan.length!=0){
                        result.canhan = canhan
                    }
                    if(doanhnghiep.length!=0){
                        result.doanhnghiep = doanhnghiep
                    }
                    return result
                    
            }else if(status=='9'){
                let canhan = await CTSCaNhanModel.find(
                    {
                        goiCTSId: services,
                        ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                        trangThai: status,
                        createBy:agency,
                        $or: [
                            {action1By: actionBy},
                            {action2By: actionBy},
                            {action3By: actionBy},
                            {action4By: actionBy},
                            {action5By: actionBy},
                            {action6By: actionBy},
                            {action7By: actionBy}
                        ],
                        isRefuse:true
                    })
                let doanhnghiep = await CTSDoanhNghiepModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: status,
                            createBy:agency,
                            $or: [
                                {action1By: actionBy},
                                {action2By: actionBy},
                                {action3By: actionBy},
                                {action4By: actionBy},
                                {action5By: actionBy},
                                {action6By: actionBy},
                                {action7By: actionBy}
                            ],
                            isRefuse:true
                    })
                    if(canhan.length!=0){
                        result.canhan = canhan
                    }
                    if(doanhnghiep.length!=0){
                        result.doanhnghiep = doanhnghiep
                    }
                    return result
            }
            
        }
    }
    catch (err) {
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

