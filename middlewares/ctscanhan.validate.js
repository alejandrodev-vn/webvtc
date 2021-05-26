const {check} = require('express-validator');
module.exports.validateCTSCaNhan = () => {
    return [ 
      check('email', 'Email không được trống').not().isEmpty(),
      check('soDienThoai', 'Số điện thoại không được trống').not().isEmpty(),
      check('hoTenNguoiDK', 'Họ tên người đăng ký không được trống').not().isEmpty(),
      check('soCMT', 'Số CMTND/Hộ chiếu không được trống').not().isEmpty(),
      check('noiCapCMT', 'Nơi cấp CMTND/Hộ chiếu không được trống').not().isEmpty(),
      check('ngayCapCMT', 'Ngày cấp CMTND/Hộ chiếu không được trống').not().isEmpty(),
      check('diaChi', 'Địa chỉ không được trống').not().isEmpty(),
      check('tinhThanh', 'Tỉnh thành không được trống').not().isEmpty(),
      check('quanHuyen', 'Quận Huyện không được trống').not().isEmpty(),
      check('goiCTSId', 'Vui lòng chọn gói giao dịch').not().isEmpty(),
      check('thoiHan', 'Thời hạn sử dụng không được trống').not().isEmpty(),
      check('gia', 'Giá cước không được trống').not().isEmpty(),
      check('nguoiThucHien', 'Người thực hiện không được trống').not().isEmpty(),
    ]; 
  }
