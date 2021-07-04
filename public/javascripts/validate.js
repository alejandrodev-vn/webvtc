const isNumeric = (str) => {
    if (typeof str != "string") return false 
    return !isNaN(str) &&   
           !isNaN(parseFloat(str)) 
  }
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const onSubmitCaNhan = () =>{
    const btnSubmit = document.querySelector('#submitEditCaNhan')
    btnSubmit.onclick = (e) => {
        e.preventDefault();
        const hoTenNguoiDK = document.querySelector('#hoTenNguoiDK').value
        if(hoTenNguoiDK.length==0){
            return alert('Vui lòng nhập họ tên')
        }
        const MSTCaNhan = document.querySelector('#MSTCaNhan').value
        if(MSTCaNhan.length==0){
            return alert('Vui lòng nhập mã số thuế')
        } else if(MSTCaNhan.length!=10){
            return alert('Vui lòng nhập đúng định dạng Mã số thuế')
        }else if(!isNumeric(MSTCaNhan)){
            return alert('Vui lòng nhập đúng định dạng Mã số thuế')
        }
        const soCMT = document.querySelector('#soCMT').value
        if(soCMT.length==0){
            return alert('Vui lòng nhập số CMTND/CC')
        }else if(!isNumeric(soCMT)){
            return alert('Vui lòng nhập đúng định dạng CMTND/CC')
        }
        const ngayCapCMT = document.querySelector('#ngayCapCMT').value
        if(ngayCapCMT.length==0){
            return alert('Vui lòng chọn ngày cấp CMNT/CC')
        }
        const noiCapCMT = document.querySelector('#noiCapCMT').value
        if(noiCapCMT.length==0){
            return alert('Vui lòng chọn nơi cấp CMNT/CC')
        }
        const email = document.querySelector('#email').value
        if(email.length==0){
            return alert('Vui lòng nhập Email')
        }
        if(!validateEmail(email)){
            return alert('Vui lòng nhập đúng định dạng Email')
        }
        const soDienThoai = document.querySelector('#soDienThoai').value
        if(soDienThoai.length==0){
            return alert('Vui lòng nhập Số điện thoại')
        } else if(soDienThoai.length!=10){
            return alert('Vui lòng nhập đúng định dạng Số điện thoại')
        }else if(!isNumeric(soDienThoai)){
            return alert('Vui lòng nhập đúng định dạng Số điện thoại')
        }
        const diaChi = document.querySelector('#diaChi').value
        if(diaChi.length==0){
            return alert('Vui lòng nhập địa chỉ')
        }
        const tinhThanh = document.querySelector('#tinhThanh').value
        if(tinhThanh.length==0){
            return alert('Vui lòng chọn Tỉnh thành')
        }
        const quanHuyen = document.querySelector('#quanHuyen').value
        if(quanHuyen.length==0){
            return alert('Vui lòng chọn Quận huyện')
        }
        const services = document.querySelector('#services').value
        if(services.length==0){
            return alert('Vui lòng chọn Gói dịch vụ')
        }
        const thoiHan = document.querySelector('#thoiHan').value
        if(thoiHan.length==0){
            return alert('Thời hạn không được trống')
        }
        const gia = document.querySelector('#gia').value
        if(gia.length==0){
            return alert('Giá không được trống')
        }
        alert('Cập nhật thành công!')
        document.querySelector('#formEditCaNhan').submit()
        

    }
}
const onSubmitDoanhNghiep = () =>{
    const btnSubmit = document.querySelector('#submitEditDoanhNghiep')
    console.log(btnSubmit)
    btnSubmit.onclick = (e) => {
        e.preventDefault();
        const tenGD = document.querySelector('#tenGD').value
        if(tenGD.length==0){
            return alert('Vui lòng nhập Tên giao dịch')
        }
        const MST = document.querySelector('#MST').value
        if(MST.length==0){
            return alert('Vui lòng nhập mã số thuế')
        } else if(MST.length!=10){
            return alert('Vui lòng nhập đúng định dạng Mã số thuế')
        }else if(!isNumeric(MST)){
            return alert('Vui lòng nhập đúng định dạng Mã số thuế')
        }
        const giayPhepDKKD = document.querySelector('#giayPhepDKKD').value
        if(giayPhepDKKD.length==0){
            return alert('Vui lòng nhập giấy phép DKKD')
        }
        const ngayCapGiayPhepDKKD = document.querySelector('#ngayCapGiayPhepDKKD').value
        if(ngayCapGiayPhepDKKD.length==0){
            return alert('Vui lòng chọn ngày cấp Giấy phép DKKD')
        }     
    
        const emailGD = document.querySelector('#emailGD').value
        if(emailGD.length==0){
            return alert('Vui lòng nhập Email giao dịch')
        }
        if(!validateEmail(emailGD)){
            return alert('Vui lòng nhập đúng định dạng Email giao dịch')
        }
        const soDienThoai = document.querySelector('#soDienThoaiCongTy').value
        if(soDienThoai.length==0){
            return alert('Vui lòng nhập Số điện thoại tổ chức')
        } else if(soDienThoai.length!=10){
            return alert('Vui lòng nhập đúng định dạng Số điện thoại tổ chức')
        }else if(!isNumeric(soDienThoai)){
            return alert('Vui lòng nhập đúng định dạng Số điện thoại tổ chức')
        }
        const diaChi = document.querySelector('#diaChiDN').value
        if(diaChi.length==0){
            return alert('Vui lòng nhập địa chỉ')
        }
        const tinhThanh = document.querySelector('#tinhThanhDN').value
        if(tinhThanh.length==0){
            return alert('Vui lòng chọn Tỉnh thành')
        }
        const quanHuyen = document.querySelector('#quanHuyenDN').value
        if(quanHuyen.length==0){
            return alert('Vui lòng chọn Quận huyện')
        }
        const soCMT = document.querySelector('#soCMTDN').value
        if(soCMT.length==0){
            return alert('Vui lòng nhập số CMTND/CC')
        }else if(!isNumeric(soCMT)){
            return alert('Vui lòng nhập đúng định dạng CMTND/CC')
        }
        const ngayCapCMT = document.querySelector('#ngayCapCMTDN').value
        if(ngayCapCMT.length==0){
            return alert('Vui lòng chọn ngày cấp CMNT/CC')
        }
        const noiCapCMT = document.querySelector('#noiCapCMTDN').value
        if(noiCapCMT.length==0){
            return alert('Vui lòng chọn nơi cấp CMNT/CC')
        }
        const services = document.querySelector('#servicesDN').value
        if(services.length==0){
            return alert('Vui lòng chọn Gói dịch vụ')
        }
        const thoiHan = document.querySelector('#thoiHanDN').value
        if(thoiHan.length==0){
            return alert('Thời hạn không được trống')
        }
        const gia = document.querySelector('#giaDN').value
        if(gia.length==0){
            return alert('Giá không được trống')
        }
        const camKet = document.querySelector('#camKet')
        if(!camKet.checked){
            return alert('Vui lòng xác nhận cam kết')
        }
        alert('Cập nhật thành công!')
        document.querySelector('#formEditDoanhNghiep').submit()
        

    }
}
export {
    onSubmitCaNhan,
    onSubmitDoanhNghiep
}