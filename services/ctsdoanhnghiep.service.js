const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.getAll = async () => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.find({});
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}

exports.getById= async (id) => {
    try{
        const CTSDoanhNghiep = await CTSDoanhNghiepModel.findById(id);
        return CTSDoanhNghiep
    }
    catch(err){
        console.log(err)
    }
}

exports.createNew= async (values) => {
    try{
        let NewCTSDoanhNghiep = new CTSDoanhNghiepModel(values)
        return NewCTSDoanhNghiep.save((err) => {
            if(err){
                console.log('Add CTS failed! b:' + err);
            }else{
                console.log('Add CTS success!');
            }
        })
    }
    catch(err){
        console.log(err)
    }

}
exports.update = async (id, values) => {
    await CTSDoanhNghiepModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.delete = async (id) => {
    await CTSDoanhNghiepModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}