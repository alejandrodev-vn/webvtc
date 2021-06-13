const {check} = require('express-validator');
module.exports.validateCTSDoanhNghiep = () => {
    return [ 
      check('tenGD', 'Tên Giao Dịch không được trống').not().isEmpty(),
      check('giayPhepDKKD', 'Giây phép DKKD không được trống').not().isEmpty(),
      check('ngayCapGiayPhepDKKD', 'Ngày cấp 1không được trống').not().isEmpty(),
      check('MST', 'Mã số thuế không được trống').not().isEmpty(),
      check('congTyMe', 'Công ty mẹ không được trống').not().isEmpty(),
      check('camKet', 'Vui lòng xác nhận cam kết').not().isEmpty(),
      check('diaChi', 'Địa chỉ không được trống').not().isEmpty(),
      check('tinhThanh', 'Tỉnh thành không được trống').not().isEmpty(),
      check('quanHuyen', 'Quận Huyện không được trống').not().isEmpty(),
      check('soDienThoaiCongTy', 'Số điện thoại công ty không được trống').not().isEmpty(),
      check('emailGD', 'Email giao dich không được trống').not().isEmpty(),
      check('hoTenChuDoanhNghiep', 'Họ tên chủ doanh nghiẹp không được trống').not().isEmpty(),
      check('emailGD', 'Họemailp không được trống').not().isEmpty(),
      check('soCMT', 'Số chứng minh thư không được trống').not().isEmpty(),
      check('noiCapCMT', 'nơi cấp chứng minh thư không được trống').not().isEmpty(),
      check('ngayCapCMT', 'Ngày cấp chứng minh thư không được trống').not().isEmpty(),
      check('goiCTSId', 'Vui lòng chọn gói giao dịch').not().isEmpty(),
      check('thoiHan', 'Thời hạn sử dụng không được trống').not().isEmpty(),
      check('giaCuoc', 'Giá cước không được trống').not().isEmpty(),
      check('nguoiThucHien', 'Người thực hiện không được trống').not().isEmpty(),
    ]; 
  }
