const express = require('express');
const router = express.Router();
const findService = require('../../services/find.service')
const usersService = require('../../services/users.service')

router.get('/digital-certificate/find', async (req, res, next) => {
    try {
        var maYC = req.query.findMYC
        var maKH = req.query.findMKH
        var CMTND = req.query.findCMTND
        var tinhThanh = req.query.findTinhThanh
        var dateTN = req.query.findDateTN
        var trangThai = req.query.findTrangThai
        var tenGD = req.query.findTenGD
        var giayPhepDKKD = req.query.findGiayPhepDKKD
        var CTS = req.query.findCTS
        var getDateKT = req.query.findDateKT
        if(getDateKT!=''){
            let temp = new Date(getDateKT)
            var dateKT = temp.setDate(temp.getDate() + 1);
        }else dateKT = ''
                if (tinhThanh == '' | CMTND == '' | trangThai == '' | dateTN == '' | dateKT == '') {
            if (tinhThanh == '') {
                tinhThanh = { $ne: null }
            }
            if (CMTND == '') {
                CMTND = { $ne: null }
            }
            if (giayPhepDKKD == '') {
                giayPhepDKKD = { $ne: null }
            }
            if (trangThai == '') {
                trangThai = { $ne: null }
            }
            if (dateTN == '') {
                dateTN = 0
            }
            if (dateKT == '') {
                var hienTai = new Date()
                var date0 = new Date(0)

                dateKT = hienTai - date0
            }
            const find = await findService.getFindByUserId(maYC, maKH, CMTND, tinhThanh, dateTN, trangThai, tenGD, giayPhepDKKD, CTS, dateKT)
            return  res.json(find)
        } else {
            const find = await findService.getFindByUserId(maYC, maKH, CMTND, tinhThanh, dateTN, trangThai, tenGD, giayPhepDKKD, CTS, dateKT)
            return res.json(find)
        }



    }
    catch (err) {
        console.log(err)
    }
});
module.exports = router;