const CTSCaNhanModel = require('../models/ctscanhan.model')

exports.getAll = async () => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.find({});
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}

exports.getCTSCaNhanById = async (id) => {
    try{
        const CTSCaNhan = await CTSCaNhanModel.findById(id);
        return CTSCaNhan
    }
    catch(err){
        console.log(err)
    }
}

exports.createNewCTSCaNhan = async (values) => {
    try{
        let NewCTSCaNhan = new CTSCaNhanModel(values)
        return NewCTSCaNhan.save((err) => {
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
exports.updateCTSCaNhan = async (id, values) => {
    await CTSCaNhanModel.findByIdAndUpdate({_id:id},values, function(err){
        if(err){
            console.log('Update failed!')
        }else console.log('Update success!')
    })
}


exports.deleteCTSCaNhanById = async (id) => {
    await CTSCaNhanModel.findByIdAndDelete({_id: id}, (err) => {
        if(err){
            console.log('Delete fail!');
        }else{
            console.log('Delete success!');
        }
    })
}