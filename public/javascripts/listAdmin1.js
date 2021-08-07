import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
import { getSendMailPersonal, getSendMailOrganization } from './sendMail.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')
const approvedStatus = document.querySelector('#approvedStatus')
const approvedStatusDN = document.querySelector('#approvedStatusDN')
const pendingFindStatus = document.querySelector('#pendingFindStatus')
const pendingFindStatusDN = document.querySelector('#pendingFindStatusDN')

import { url } from './constants'


async function getFind() {
    try {
        const btn = document.getElementById("getFind")
        btn.addEventListener('click', async (e) => {
            e.preventDefault()
            var loaiCTS = document.querySelector('#findCTS').value
            var TenGD = document.querySelector('#findTenGD').value
            var NgayKT = document.querySelector('#findDateKT').value
            var NgayTN = document.querySelector('#findDateTN').value
            var CMTND = document.querySelector('#findCMTND').value
            var tinhThanh = document.querySelector('#findTinhThanh').value
            var trangThai = document.querySelector('#findTrangThai').value
            if (TenGD.length == 0 && NgayTN.length == 0 && NgayKT.length == 0
                && CMTND.length == 0 && tinhThanh.length == 0 && trangThai.length == 0) {
                alert('vui lòng nhập yêu cầu tìm kiếm...')
                return
            }
            if (loaiCTS == 'canhan') {
                const urlListFind = url + `api/digital-certificate/find?findMYC=&findMKH=&findCMTND=${CMTND}&findTinhThanh=${tinhThanh}&findDateTN=${NgayTN}&findTrangThai=${trangThai}&findTenGD=${TenGD}&findGiayPhepDKKD=&findCTS=canhan&findDateKT=${NgayKT}`
                const options = {
                    method: 'GET'
                }
                const data = await fetchAPI(urlListFind, options)
                if (data && data.length != 0) {
                    $('#paginFindPersonal').pagination({
                        dataSource: data,
                        callback: function (data, pagination) {
                            // template method of yourself
                            showFindCTSCaNhan(data);
                        },
                        pageSize: 5
                    })
                } else {
                    showFindCTSCaNhan(data)
                }
            } else {
                const urlListFind = url + `api/digital-certificate/find?findMYC=&findMKH=&findCMTND=${CMTND}&findTinhThanh=${tinhThanh}&findDateTN=${NgayTN}&findTrangThai=${trangThai}&findTenGD=${TenGD}&findGiayPhepDKKD=&findCTS=doanhnghiep&findDateKT=${NgayKT}`
                const options = {
                    method: 'GET'
                }
                const data = await fetchAPI(urlListFind, options)
                if (data && data.length != 0) {
                    $('#paginFindOrganization').pagination({
                        dataSource: data,
                        callback: function (data, pagination) {
                            // template method of yourself
                            showFindCTSDoanhNghiep(data);
                        },
                        pageSize: 5
                    })
                } else {
                    showFindCTSDoanhNghiep(data)
                }
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}
getFind()
async function showFindCTSCaNhan(data) {
    let html = ''
    const services = await getServices()
    if (data.length != 0) {
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html += `<tr style="background:#cfebff">
            <td>${(cts.trangThai==1 || cts.trangThai==4)
                ? `<button class="btn btn-action btn-info btn-handle-personal" data-id="${cts._id}">Xử lý</button>` : ''}</td>
            <td style="color:firebrick">${(cts.trangThai == 0) ? 'Dự thảo'
            : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                            data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                Gửi thông tin thuê bao
                            </button>`
                    : (cts.trangThai == 3) ? `<p style="color:tomato;font-size:13px;line-height: 15px;
                                padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                <button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                data-id="${cts._id}">
                                    Gửi lại
                                </button>`
                                : (cts.trangThai == 4) ? 'Chờ duyệt lần 2'
                                : (cts.trangThai == 5) ? '<p style="color:green;">Đã duyệt lần 2</p>'
                                : (cts.trangThai == 6) ? '<p style="color:green;">Đã ký HĐ</p>'
                                : (cts.trangThai == 7) ? '<p style="color:green;">Đã cấp CTS</p>'
                                    : (cts.trangThai == 9) ? '<p style="color:tomato;">Đã từ chối duyệt</p>'
                                        : ''}</td>
            <td scope="row">${index+1}</td>
            <td>${cts._id}</td>
            <td>${cts.hoTenNguoiDK}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.MSTCaNhan}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
            <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td></td>
            <td></td>
         </tr>`
            pendingFindStatus.innerHTML = html
            handleRequest()
            getSendMailPersonal()

        })
    } else {
        pendingFindStatus.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }


}
async function showFindCTSDoanhNghiep(data) {
    let html = ''
    
    const services = await getServices()
    if (data.length != 0) {
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html+=`<tr style="background:#cfebff">
            <td>${(cts.trangThai == 1 || cts.trangThai == 4) 
                ? `<button class="btn btn-action btn-info btn-handle-organization" data-id="${cts._id}">Xử lý</button>` : ''}</td>
            <td style="color:firebrick">${(cts.trangThai == 0) ? 'Dự thảo'
            : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                            data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                Gửi thông tin thuê bao
                            </button>`
                    : (cts.trangThai == 3) ? `<p style="color:tomato;font-size:13px;line-height: 15px;
                                padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                <button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                data-id="${cts._id}">
                                    Gửi lại
                                </button>`
                                : (cts.trangThai == 4) ? 'Chờ duyệt lần 2'
                                : (cts.trangThai == 5) ? '<p style="color:green;">Đã duyệt lần <2/p>'
                                : (cts.trangThai == 6) ? '<p style="color:green;">Đã ký HĐ</p>'
                                : (cts.trangThai == 7) ? '<p style="color:green;">Đã cấp CTS</p>'
                                    : (cts.trangThai == 9) ? '<p style="color:tomato;">Đã từ chối duyệt</p>'
                                        : ''}</td>   
            <td scope="row">${index+1}</td>
            <td>${cts._id}</td>
            <td>${cts.tenGD}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.MST}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
            <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td></td>
            <td></td>
         </tr>`

            pendingFindStatusDN.innerHTML = html
            handleRequestDN()
            getSendMailOrganization()
        })
    } else {
        pendingFindStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }


}
async function getCTSCaNhan(){
    try{
        const urlList = url + `api/admin/digital-certificate/personal`
        const options = {
            method: 'GET'
        }
        const data = await fetchAPI(urlList, options)
        if(data.length!=0){
            $('#paginPersonal').pagination({
                dataSource: data,
                callback: function(data, pagination) {
                    // template method of yourself
                    showPending(data);
                },
                pageSize: 5
            })
            
        }else{
            showPending(data)
        }
     
       
    }catch(err){
        console.log(err)
    }
}
getCTSCaNhan()

async function getCTSDoanhNghiep(){
    try{
        const urlList = url + `api/admin/digital-certificate/organization`
        const options = {
            method: 'GET'
        }
        const data = await fetchAPI(urlList, options)
        if(data.length!=0){
            $('#paginOrganization').pagination({
                dataSource: data,
                callback: function(data, pagination) {
                    // template method of yourself
                    showPendingDN(data);
                },
                pageSize: 5    
            })
        }else{
            showPendingDN(data)
        }
    
        
       
    }catch(err){
        console.log(err)
    }
}
getCTSDoanhNghiep()

async function getCTSCaNhanApproved(){
    try{
        const urlList = url + `api/admin/digital-certificate/personal-approved`
        const options = {
            method: 'GET'
        }
        const data = await fetchAPI(urlList, options)
        if(data.length!=0){
            $('#paginPersonalApproved').pagination({
                dataSource: data,
                callback: function(data, pagination) {
                    // template method of yourself
                    showApprovedPersonal(data);
                },
                pageSize: 5    
            })
        }else{
            showApprovedPersonal(data)
        }
    
        
       
    }catch(err){
        console.log(err)
    }
}
getCTSCaNhanApproved()
async function getCTSDoanhNghiepApproved(){
    try{
        const urlList = url + `api/admin/digital-certificate/organization-approved`
        const options = {
            method: 'GET'
        }
        const data = await fetchAPI(urlList, options)
        if(data.length!=0){
            $('#paginOrgApproved').pagination({
                dataSource: data,
                callback: function(data, pagination) {
                    // template method of yourself
                    showApprovedOrg(data);
                },
                pageSize: 5    
            })
        }else{
            showApprovedOrg(data)
        }
    
        
       
    }catch(err){
        console.log(err)
    }
}
getCTSDoanhNghiepApproved()
async function showPending(data){
    let html = ''
    if(data.length!=0){
        const services = await getServices()
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
            html+=`<tr style="background:#cfebff">
            <td>${(cts.trangThai == 1 || cts.trangThai == 4) 
                ? `<button class="btn btn-action btn-info btn-handle-personal" data-id="${cts._id}">Xử lý</button>` :  ''}</td>
            <td style="color:firebrick">${(cts.trangThai == 1) ? 'Chờ duyệt lần 1'
            : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                    data-id="${cts._id}">
                                        Gửi thông tin thuê bao
                                    </button>`
            : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
                                    padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                    <button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                    data-id="${cts._id}">
                                    Gửi lại
                                    </button>`
            : (cts.trangThai == 4) ? 'Chờ duyệt lần 2' : ''}</td>
            <td scope="row">${index+1}</td>
            <td>${cts._id}</td>
            <td>${cts.hoTenNguoiDK}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.MSTCaNhan}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
            <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td></td>
            <td></td>
         </tr>`
        })
        pendingStatus.innerHTML = html
        handleRequest()
        getSendMailPersonal()

    }else{
        pendingStatus.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }
    
}

async function showPendingDN(data){
    let html = ''
    if(data.length!=0){
        const services = await getServices()
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
            html+=`<tr style="background:#cfebff">
            <td>${(cts.trangThai == 1 || cts.trangThai == 4) 
                ? `<button class="btn btn-action btn-info btn-handle-organization" data-id="${cts._id}">Xử lý</button>`: ''}</td>
            <td style="color:firebrick">${(cts.trangThai == 1) ? 'Chờ duyệt lần 1'
            : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMailOrg" 
                                    data-id="${cts._id}">
                                        Gửi thông tin thuê bao
                                    </button>`
            : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
                                    padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                    <button type="button" class="btn btn-action btn-primary btn-sendMailOrg" 
                                    data-id="${cts._id}">
                                    Gửi lại
                                    </button>`
            : (cts.trangThai == 4) ? 'Chờ duyệt lần 2' : ''}</td>
            <td scope="row">${index+1}</td>
            <td>${cts._id}</td>
            <td>${cts.tenGD}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.MST}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
            <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td></td>
            <td></td>
         </tr>`
        })
        pendingStatusDN.innerHTML = html
        handleRequestDN()
        getSendMailOrganization()

    }else{
        pendingStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }
  
}
async function showApprovedPersonal(data){
    let html = ''
    if(data.length!=0){
        const services = await getServices()
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
            html+=`<tr style="background:#cfebff">
            <td><a class="btn btn-action btn-info" href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">Xem</a></td>
            <td scope="row">${index+1}</td>
            <td style="color:firebrick">Đã duyệt lần 2</td>
            <td>${(cts.trangThai == 5) ? 'Chưa cấp' : 'Đã cấp CTS'}</td>
            <td>${cts._id}</td>
            <td>${cts.hoTenNguoiDK}</td>
            <td style="color:firebrick">${cts.soCMT}</td>
            <td style="color:firebrick">${cts.soCMT}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.thoiHan}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
        
         </tr>`
        })
        approvedStatus.innerHTML = html

    }else{
        approvedStatus.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }
    
}
async function showApprovedOrg(data){
    let html = ''
    if(data.length!=0){
        const services = await getServices()
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
            html+=`<tr style="background:#cfebff">
            <td><a class="btn btn-action btn-info" href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">Xem</a></td>
            <td scope="row">${index+1}</td>
            <td style="color:firebrick">Đã duyệt lần 2</td>
            <td>${(cts.trangThai == 5) ? 'Chưa cấp' : 'Đã cấp CTS'}</td>
            <td>${cts._id}</td>
            <td>${cts.tenGD}</td>
            <td style="color:firebrick">${cts.soCMT}</td>
            <td style="color:firebrick">${cts.MST}</td>
            <td style="color:firebrick">${cts.tenGoiDichVu}</td>
            <td style="color:firebrick">${cts.thoiHan}</td>
            <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td style="color:firebrick">${cts.nguoiThucHien}</td>
        
         </tr>`
        })
        approvedStatusDN.innerHTML = html

    }else{
        approvedStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }
    
}

async function getServices(){
    try{
        const res = await fetch(`${url}api/services`)
        const services = await res.json()
        return services
    }catch(err){
        console.log(err)
    }
}
async function handleRequest(){
    
        // Get the modal
        const modal = document.getElementById("modalCertificatePersonal");
        const title = document.getElementById("titleModalPersonal");

        // Get the button that opens the modal
        const btnHandles = document.querySelectorAll('.btn-handle-personal')
    
        // Get the <span> element that closes the modal
        const btnCancel = document.querySelectorAll(".btn-cancel");
        // When the user clicks the button, open the modal
        btnHandles.forEach(btn=>{
            btn.addEventListener('click', async (e)=>{
                e.preventDefault()
                const urlCer = url + `api/digital-certificate/personal/${btn.dataset.id}` 
                const options = {
                    method:'GET'
                }
                const cts = await fetchAPI(urlCer, options)
                const urlProvinces = url + `api/provinces/${cts.tinhThanh}` 
                const urlDistricts = url + `api/districts/${cts.quanHuyen}` 
                const urlServices = url + `api/services/${cts.goiCTSId}`
                const province = await fetchAPI(urlProvinces, options)
                const district = await fetchAPI(urlDistricts, options)
                const service = await fetchAPI(urlServices, options)

                if(cts.trangThai == 1){
                    title.innerHTML = 'Xử lý yêu cầu phê duyệt lần 1'
                }else if(cts.trangThai == 4){
                    title.innerHTML = 'Xử lý yêu cầu phê duyệt lần 2'
                }
                document.querySelector('#hoTenNguoiDK').value = cts.hoTenNguoiDK
                document.querySelector('#MSTCaNhan').value = cts.MSTCaNhan
                document.querySelector('#soCMT').value = cts.soCMT
                document.querySelector('#ngayCapCMT').value = cts.ngayCapCMT
                document.querySelector('#noiCapCMT').value = cts.noiCapCMT
                document.querySelector('#email').value = cts.email
                document.querySelector('#soDienThoai').value = cts.soDienThoai
                document.querySelector('#diaChi').value = cts.diaChi
                document.querySelector('#tenCongTy').value = cts.tenCongTy
                document.querySelector('#nganhNghe').value = cts.nganhNghe
                document.querySelector('#chucVu').value = cts.chucVu 
                document.querySelector('#MSTCongTy').value = cts.MSTCongTy
                document.querySelector('#tinhThanh').value = province.TenTinhThanh
                document.querySelector('#quanHuyen').value = district.TenQuanHuyen
                document.querySelector('#maPhieuYC').value = service._id
                document.querySelector('#goiCTS').value = service.tenGoiDichVu
                document.querySelector('#thoiHan').value = service.thoiHan
                document.querySelector('#id').value = cts._id
                if(cts.fileHoSo.length!=0){
                    document.querySelector('#documentPersonal').innerHTML = `
                    <tr>
                        <td scope="col"><input type="checkbox" name="selectDocPersonal" id="fileHoSo"></td>
                        <td>1</td>
                        <td>Hồ sơ khách hàng</td>
                        <td><a href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">${cts.fileHoSo}</a></td>
                        <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
                        <td>${cts.nguoiThucHien}</td>
                    </tr>`
                }else{
                    document.querySelector('#documentPersonal').innerHTML = `<tr><td>Chưa đủ</td></</tr>`
                }
                modal.style.opacity = "1";
                modal.style.display = "block"
           

            })
        })
      // When the user clicks on <span> (x), close the modal
      btnCancel.forEach(btn=>{
        btn.onclick = function(e) {
            modal.style.opacity = "0"
            setTimeout(()=>{modal.style.display = "none";
                },450)
        }
    })      
  
}

async function handleRequestDN(){
    
    // Get the modal
    const modal = document.getElementById("modalCertificateOrganization");
    const title = document.getElementById("titleModalOrganization");

    // Get the button that opens the modal
    const btnHandles = document.querySelectorAll('.btn-handle-organization')

    // Get the <span> element that closes the modal
    const btnCancel = document.querySelectorAll(".btn-cancelDN");
    // When the user clicks the button, open the modal
    btnHandles.forEach(btn=>{
        btn.addEventListener('click', async (e)=>{
            e.preventDefault()
            const urlCer = url + `api/digital-certificate/organization/${btn.dataset.id}` 
            const options = {
                method:'GET'
            }
            const cts = await fetchAPI(urlCer, options)
            const urlProvinces = url + `api/provinces/${cts.tinhThanh}` 
            const urlDistricts = url + `api/districts/${cts.quanHuyen}` 
            const urlServices = url + `api/services/${cts.goiCTSId}`
            const province = await fetchAPI(urlProvinces, options)
            const district = await fetchAPI(urlDistricts, options)
            const service = await fetchAPI(urlServices, options)

            if(cts.trangThai == 1){
                title.innerHTML = 'Xử lý yêu cầu phê duyệt lần 1'
            }else if(cts.trangThai == 4){
                title.innerHTML = 'Xử lý yêu cầu phê duyệt lần 2'
            }
            document.querySelector('#tenGD-DN').value = cts.tenGD
            document.querySelector('#MST-DN').value = cts.MST
            document.querySelector('#giayPhepDKKD-DN').value = cts.giayPhepDKKD
            document.querySelector('#ngayCap-DN').value = cts.ngayCapGiayPhepDKKD
            document.querySelector('#diaChi-DN').value = cts.diaChi
            document.querySelector('#tinhThanh-DN').value = province.TenTinhThanh
            document.querySelector('#quanHuyen-DN').value = district.TenQuanHuyen
            document.querySelector('#emailGD-DN').value = cts.emailGD
            document.querySelector('#soDienThoai-DN').value = cts.soDienThoaiCongTy
            document.querySelector('#hoTen-DN').value = cts.hoTenChuDoanhNghiep
            document.querySelector('#chucVu-DN').value = cts.chucVu
            document.querySelector('#soCMTND-DN').value = cts.soCMT 
            document.querySelector('#ngayCapCMTND-DN').value = cts.ngayCapCMT
            document.querySelector('#noicap-DN').value = cts.noiCapCMT
            document.querySelector('#email-DN').value = cts.emailGD
            document.querySelector('#maPhieuYC-DN').value = service._id
            document.querySelector('#goiCTS-DN').value = service.tenGoiDichVu
            document.querySelector('#thoiHan-DN').value = service.thoiHan
            document.querySelector('#idOrg').value = cts._id
            if(cts.fileHoSo.length!=0){
                document.querySelector('#documentOrganization').innerHTML = `
                <tr>
                    <td scope="col"><input type="checkbox" name="selectDocOrganization" id="fileHoSoDN"></td>
                    <td>1</td>
                    <td>Hồ sơ khách hàng</td>
                    <td><a href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">${cts.fileHoSo}</a></td>
                    <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
                    <td>${cts.nguoiThucHien}</td>
                </tr>`
            }else{
                document.querySelector('#documentOrganization').innerHTML = `<tr><td>Chưa đủ</td></</tr>`
            }
          
            modal.style.opacity = "1";
            modal.style.display = "block"
        })
    })
    // When the user clicks on <span> (x), close the modal
        btnCancel.forEach(btn=>{
            btn.onclick = function(e) {
                e.preventDefault()
                modal.style.opacity = "0"
                setTimeout(()=>{modal.style.display = "none";
                    },450)
            }
        })


}
