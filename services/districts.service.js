const { log } = require('debug');
const districtsModel = require('../models/districts.model')

exports.getAll = async () => {
    try{
        const districts = await districtsModel.find({});
        return districts
    }
    catch(err){
        console.log(err)
    }
}

exports.getdistrictsById = async (id) => {
    try{
        const districts = await districtsModel.findById(id);
        return districts
    }
    catch(err){
        console.log(err)
    }
}

exports.adddistricts = async (name,idprovinces) => {
    try{
        let districtsMoi = new districtsModel({
            TenQuanHuyen: name,
            tinhThanhId: idprovinces
        })
    
        return await districtsMoi.save((err) => {
            if(err){
                console.log('Add districts fail!');
            }else{
                console.log('Add districts success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.updatedistrictsById = async (id, values) => {
    await districtsModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.deletedistrictsById = async (id) => {
    await districtsModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}