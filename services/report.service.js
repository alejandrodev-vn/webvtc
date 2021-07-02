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
            typeReport, agency, 
            dateBegin, dateEnd, status, services
            ) => {
    try {
        if(typeof agency == 'string'){
            let result = {}
            if (typeReport == '' || typeReport == '0') {
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
                                createdBy:agency
                        
                            })
                        if(canhan.length!=0){
                            result.canhan = canhan
                        }
                        if(doanhnghiep.length!=0){
                            result.doanhnghiep = doanhnghiep
                        }
                        return result
                
            }else if(typeReport == '2'){
                let canhan = await CTSCaNhanModel.find(
                    {
                        goiCTSId: services,
                        ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                        trangThai: 7,
                        createdBy:agency
                        
                    })
                let doanhnghiep = await CTSDoanhNghiepModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: status,
                            createdBy:agency,
                         
                    })
                    if(canhan.length!=0){
                        result.canhan = canhan
                    }
                    if(doanhnghiep.length!=0){
                        result.doanhnghiep = doanhnghiep
                    }
                    return result
            }
        }else if(typeof agency == 'object'){
            if(agency.role ==0){
                
                let result = {}
                if (typeReport == '' || typeReport == '0') {
                        let canhan = await CTSCaNhanModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status
                                
                                
                            })
                        let doanhnghiep = await CTSDoanhNghiepModel.find(
                                {
                                    goiCTSId: services,
                                    ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                    trangThai: status,
                             
                            })
                            if(canhan.length!=0){
                                result.canhan = canhan
                            }
                            if(doanhnghiep.length!=0){
                                result.doanhnghiep = doanhnghiep
                            }
                            return result
                    
                }else if(typeReport == '2'){
                    let canhan = await CTSCaNhanModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: 7,
                            
                        })
                    let doanhnghiep = await CTSDoanhNghiepModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status,
                            
                        })
                        if(canhan.length!=0){
                            result.canhan = canhan
                        }
                        if(doanhnghiep.length!=0){
                            result.doanhnghiep = doanhnghiep
                        }
                        return result
                }
            }else if(agency.role ==1 || agency.role == 2){
                let listUser = []
                agency.listAgency.forEach(user=>{
                    let temp = {createdBy: user._id}
                    listUser.push(temp)
                })
                let result = {}
                if (typeReport == '' || typeReport == '0') {
                        let canhan = await CTSCaNhanModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status,
                                $or: listUser
                            })
                        let doanhnghiep = await CTSDoanhNghiepModel.find(
                                {
                                    goiCTSId: services,
                                    ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                    trangThai: status,
                                    $or: listUser,
                                  
                            })
                            if(canhan.length!=0){
                                result.canhan = canhan
                            }
                            if(doanhnghiep.length!=0){
                                result.doanhnghiep = doanhnghiep
                            }
                            return result
                    
                }else if(typeReport == '2'){
                    let canhan = await CTSCaNhanModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: 7,
                            $or: listUser
                            
                        })
                    let doanhnghiep = await CTSDoanhNghiepModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status,
                                $or: listUser,
                              
                        })
                        if(canhan.length!=0){
                            result.canhan = canhan
                        }
                        if(doanhnghiep.length!=0){
                            result.doanhnghiep = doanhnghiep
                        }
                        return result
                }
            }else if(agency.role ==3){
                let result = {}
                if (typeReport == '' || typeReport == '0') {
                        let canhan = await CTSCaNhanModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status,
                                createdBy:agency.listAgency
                            })
                        let doanhnghiep = await CTSDoanhNghiepModel.find(
                                {
                                    goiCTSId: services,
                                    ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                    trangThai: status,
                                    createdBy:agency.listAgency,
                                  
                            })
                            if(canhan.length!=0){
                                result.canhan = canhan
                            }
                            if(doanhnghiep.length!=0){
                                result.doanhnghiep = doanhnghiep
                            }
                            return result
                    
                }else if(typeReport == '2'){
                    let canhan = await CTSCaNhanModel.find(
                        {
                            goiCTSId: services,
                            ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                            trangThai: 7,
                            createdBy:agency.listAgency,
                            
                        })
                    let doanhnghiep = await CTSDoanhNghiepModel.find(
                            {
                                goiCTSId: services,
                                ngayTao: { $gt: new Date(dateBegin), $lt: new Date(dateEnd) },
                                trangThai: status,
                                createdBy:agency.listAgency,
                              
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

