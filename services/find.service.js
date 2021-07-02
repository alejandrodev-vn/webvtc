const CTSCaNhanModel = require('../models/ctscanhan.model')
const CTSDoanhNghiepModel = require('../models/ctsdoanhnghiep.model')

exports.getFindByUserId = async (
                            maYC, maKH, CMTND, tinhThanh, dateTN, 
                            trangThai, tenGD, giayPhepKD, CTS, dateKT,userId
                        ) => {
    try {
        if (CTS == 'canhan') {
            const find = await CTSCaNhanModel.find(
                {
                    hoTenNguoiDK: { $regex: tenGD, $options: 'i' },
                    tinhThanh: tinhThanh,
                    soCMT: CMTND,
                    ngayTao: { $gt: new Date(dateTN), $lt: new Date(dateKT) },
                    trangThai: trangThai
                })
            return find
        }
    }
    catch (err) {
        console.log(err)
    }
}