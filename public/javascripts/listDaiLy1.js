import { convertToDDMMYYYY, convertToYYYYMMDD } from './convert.js'
import {
    fetchAPI,
    fetchAndShowData
} from './fetch.js'
import { getSendMailPersonal, getSendMailOrganization, 
    getSendMailFindPersonal, getSendMailFindOrganization } from './sendMail.js'
import { onSubmitCaNhan, onSubmitDoanhNghiep } from './validate.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')
const approvedStatus = document.querySelector('#approvedStatus')
const approvedStatusDN = document.querySelector('#approvedStatusDN')
const pendingFindStatus = document.querySelector('#pendingFindStatus')
const pendingFindStatusDN = document.querySelector('#pendingFindStatusDN')

const url = 'http://localhost:3000/'


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
            html += `<tr ${(cts.trangThai == 0 || cts.trangThai == 9) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
            ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItem" class="select-smart-sign-Find" value="${cts._id}" onchange="checkSelectAllFind()"></td>` : '<td></td>'}
            <td>${(cts.trangThai == 0) ? 'Dự thảo'
            : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                           data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                               Gửi thông tin thuê bao
                           </button>`
                    : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
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
                                : ''}</td></td>
            ${(cts.trangThai == 0 || cts.trangThai == 9) ? `<td><button type="button" data-id="${cts._id}" class="btn btn-action btn-info btn-edit-personal">Sửa</button></td>` : '<td></td>'}
            <td scope="row">${index + 1}</td>
            <td><p>${cts._id}</p></td>
            <td>${cts.hoTenNguoiDK}</td>
            <td>${cts.soCMT}</td>
            <td>${cts.MSTCaNhan}</td>
            <td>${cts.tenGoiDichVu}</td>
            <td>${cts.thoiHan}</td>
            <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td>${cts.nguoiThucHien}</td>
            <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td>${(cts.yKienDaiLy) ? cts.yKienDaiLy : ''}</td>
            <td>${(cts.yKienVina) ? cts.yKienVina : ''}</td>
          </tr>`

            pendingFindStatus.innerHTML = html

        })

        openEdit()
        getSendMailFindOrganization()
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
            html += `<tr ${(cts.trangThai == 0 || cts.trangThai == 9) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
            ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItemOrg" class="select-smart-sign-Org-Find" value="${cts._id}" onchange="checkSelectAllOrgFind()"></td>` : '<td></td>'}
            <td>${(cts.trangThai == 0) ? 'Dự thảo'
            : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                           data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                               Gửi thông tin thuê bao
                           </button>`
                    : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
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
                                : ''}</td></td>
            ${(cts.trangThai == 0 || cts.trangThai == 9) ? `<td><button type="button" data-id="${cts._id}" class="btn btn-action btn-info btn-edit-organization">Sửa</button></td>` : '<td></td>'}
            <td scope="row">${index + 1}</td>
            <td><p>${cts._id}</p></td>
            <td>${cts.tenGD}</td>
            <td>${cts.giayPhepDKKD}</td>
            <td>${cts.MST}</td>
            <td>${cts.tenGoiDichVu}</td>
            <td>${cts.thoiHan}</td>
            <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td>${cts.nguoiThucHien}</td>
            <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
            <td>${(cts.yKienDaiLy) ? cts.yKienDaiLy : ''}</td>
            <td>${(cts.yKienVina) ? cts.yKienVina : ''}</td>
          </tr>`

            pendingFindStatusDN.innerHTML = html

        })

        openEditDN()
        getSendMailOrganization()
    } else {
        pendingFindStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }


}


async function getCTSCaNhan() {
    try {
        //get cts from daily2
        const urlList1 = url + `api/digital-certificate/personal/agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/personal/getPendingByUserId`
        const options = {
            method: 'GET'
        }
        const CTSCaNhanByAgency = await fetchAPI(urlList1, options)
        const CTSCaNhanBySelf = await fetchAPI(urlList2, options)
        const data = [...CTSCaNhanByAgency, ...CTSCaNhanBySelf]
        if (data.length != 0) {
            $('#paginPersonal').pagination({
                dataSource: data,
                callback: function (data, pagination) {
                    // template method of yourself
                    showPending(data);
                },
                pageSize: 5
            })
        } else {
            showPending(data)
        }


    } catch (err) {
        console.log(err)
    }
}
getCTSCaNhan()
async function showPending(data) {
    let html = ''
    const services = await getServices()
    if (data.length != 0) {
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html += `<tr ${(cts.trangThai == 0 || cts.trangThai == 9) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
           ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItem" class="select-smart-sign" value="${cts._id}" onchange="checkSelectAll()"></td>` : '<td></td>'}
           <td>${(cts.trangThai == 0) ? 'Dự thảo'
                    : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                        : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                   data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                       Gửi thông tin thuê bao
                                   </button>`
                            : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
                                       padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                       <button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                       data-id="${cts._id}">
                                           Gửi lại
                                       </button>`
                                : (cts.trangThai == 4) ? 'Chờ duyệt lần 2'
                                    : (cts.trangThai == 9) ? '<p style="color:tomato;">Đã từ chối duyệt</p>'
                                        : ''}</td></td>
           ${(cts.trangThai == 0 || cts.trangThai == 9) ? `<td><button type="button" data-id="${cts._id}" class="btn btn-action btn-info btn-edit-personal">Sửa</button></td>` : '<td></td>'}
           <td scope="row">${index + 1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
           <td>${(cts.yKienDaiLy) ? cts.yKienDaiLy : ''}</td>
           <td>${(cts.yKienVina) ? cts.yKienVina : ''}</td>
         </tr>`
            pendingStatus.innerHTML = html

        })
        openEdit()
        getSendMailPersonal()
    } else {
        pendingStatus.innerHtml = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }


}


async function getServices() {
    try {
        const res = await fetch('http://localhost:3000/api/services')
        const services = await res.json()
        return services
    } catch (err) {
        console.log(err)
    }
}
async function openEdit() {

    // Get the modal
    const modal = document.getElementById("modalEditCertificatePersonal");

    // Get the button that opens the modal
    const btns = document.querySelectorAll('.btn-edit-personal')

    // Get the <span> element that closes the modal
    const btnCancel = document.querySelectorAll(".btn-cancel");
    // When the user clicks the button, open the modal
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault()
            const urlCer = url + `api/digital-certificate/personal/${btn.dataset.id}`
            const options = {
                method: 'GET'
            }
            const cts = await fetchAPI(urlCer, options)

            document.querySelector('#hoTenNguoiDK').value = cts.hoTenNguoiDK
            document.querySelector('#MSTCaNhan').value = cts.MSTCaNhan
            document.querySelector('#soCMT').value = cts.soCMT
            document.querySelector('#ngayCapCMT').value = convertToYYYYMMDD(cts.ngayCapCMT)
            document.querySelector('#noiCapCMT').value = cts.noiCapCMT
            document.querySelector('#email').value = cts.email
            document.querySelector('#soDienThoai').value = cts.soDienThoai
            document.querySelector('#diaChi').value = cts.diaChi
            document.querySelector('#tenCongTy').value = cts.tenCongTy
            document.querySelector('#nganhNghe').value = cts.nganhNghe
            document.querySelector('#chucVu').value = cts.chucVu
            document.querySelector('#MSTCongTy').value = cts.MSTCongTy
            document.querySelector('#nguoiThucHien').value = cts.nguoiThucHien
            document.querySelector('#tinhThanh').childNodes.forEach(province=>{
                if(cts.tinhThanh == province.value) {
                    province.setAttribute('selected',true)
                }
            })
            await getQuanHuyen(cts.tinhThanh)
            document.querySelector('#quanHuyen').childNodes.forEach(district => {
                if (cts.quanHuyen == district.value) {
                    district.setAttribute('selected', true)
                }
            })
            document.querySelector('#services').childNodes.forEach(service => {
                if (cts.goiCTSId == service.value) {
                    service.setAttribute('selected', true)
                }
            })
            document.querySelector('#thoiHan').value = cts.thoiHan
            document.querySelector('#gia').value = cts.gia
            document.querySelector('#id').value = cts._id
            if (cts.fileHoSo.length != 0) {
                document.querySelector('#documentPersonal').innerHTML = `
                <a href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">${cts.fileHoSo}</a>`
            } else {
                document.querySelector('#documentOrganization').innerHTML = `<p>Chưa đủ</p>`
            }
        

            modal.style.opacity = "1";
            modal.style.display = "block"
            onSubmitCaNhan()
        })
    })
    // When the user clicks on <span> (x), close the modal
    btnCancel.forEach(btn => {
        btn.onclick = function (e) {
            modal.style.opacity = "0"
            setTimeout(() => {
                modal.style.display = "none";
            }, 450)
        }
    })



}

async function getCTSDoanhNghiep() {
    try {
        const urlList1 = url + `api/digital-certificate/organization/agency1`
        const urlList2 = url + `api/digital-certificate/organization/getPendingByUserId`
        const options = {
            method: 'GET'
        }
        const CTSDoanhNghiepByAgency = await fetchAPI(urlList1, options)
        const CTSDoanhNghiepBySelf = await fetchAPI(urlList2, options)
        const data = [...CTSDoanhNghiepByAgency, ...CTSDoanhNghiepBySelf]
        if (data.length != 0) {
            $('#paginOrganization').pagination({
                dataSource: data,
                callback: function (data, pagination) {
                    // template method of yourself
                    showPendingDN(data);
                },
                pageSize: 5
            })
        } else {
            showPendingDN(data)
        }



    } catch (err) {
        console.log(err)
    }
}
getCTSDoanhNghiep()
async function showPendingDN(data) {
    let html = ''
    if (data.length != 0) {
        const services = await getServices()
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html += `<tr ${(cts.trangThai == 0 || cts.trangThai == 9) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
            ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItemOrg" class="select-smart-sign-Org" value="${cts._id}" onchange="checkSelectAllOrg()"></td>` : '<td></td>'}
           <td>${(cts.trangThai == 0) ? 'Dự thảo'
                    : (cts.trangThai == 1) ? 'Chờ duyệt lần 1'
                        : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                   data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                       Gửi thông tin thuê bao
                                   </button>`
                            : (cts.trangThai == 3) ? `<p style="color:green;font-size:13px;line-height: 15px;
                                       padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                       <button type="button" class="btn btn-action btn-primary btn-sendMail" 
                                       data-id="${cts._id}">
                                           Gửi lại
                                       </button>`
                                : (cts.trangThai == 4) ? 'Chờ duyệt lần 2'
                                    : (cts.trangThai == 9) ? '<p style="color:tomato;">Đã từ chối duyệt</p>'
                                        : ''}</td></td>
           ${(cts.trangThai == 0 || cts.trangThai == 9) ? `<td><button type="button" data-id="${cts._id}" class="btn btn-action btn-info btn-edit-organization">Sửa</button></td>` : '<td></td>'}
           <td scope="row">${index + 1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.tenGD}</td>
           <td>${cts.giayPhepDKKD}</td>
           <td>${cts.MST}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
           <td>${(cts.yKienDaiLy) ? cts.yKienDaiLy : ''}</td>
           <td>${(cts.yKienVina) ? cts.yKienVina : ''}</td>
         </tr>`
            pendingStatusDN.innerHTML = html

        })
        openEditDN()
        getSendMailOrganization()
    } else {
        pendingStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }

}

async function openEditDN() {

    // Get the modal
    const modal = document.getElementById("modalEditCertificateOrganization");

    // Get the button that opens the modal
    const btns = document.querySelectorAll('.btn-edit-organization')

    // Get the <span> element that closes the modal
    const btnCancel = document.querySelectorAll(".btn-cancelDN");
    // When the user clicks the button, open the modal
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault()
            const urlCer = url + `api/digital-certificate/organization/${btn.dataset.id}`
            const options = {
                method: 'GET'
            }
            const cts = await fetchAPI(urlCer, options)

            document.querySelector('#tenGD').value = cts.tenGD
            document.querySelector('#MST').value = cts.MST
            document.querySelector('#giayPhepDKKD').value = cts.giayPhepDKKD
            document.querySelector('#ngayCapGiayPhepDKKD').value = convertToYYYYMMDD(cts.ngayCapGiayPhepDKKD)
            document.querySelector('#diaChiDN').value = cts.diaChi
            document.querySelector('#soCMTDN').value = cts.soCMT
            document.querySelector('#ngayCapCMTDN').value = convertToYYYYMMDD(cts.ngayCapCMT)
            document.querySelector('#noiCapCMTDN').value = cts.noiCapCMT
            document.querySelector('#emailGD').value = cts.emailGD
            document.querySelector('#soDienThoaiCongTy').value = cts.soDienThoaiCongTy
            document.querySelector('#hoTenChuDoanhNghiepDN').value = cts.hoTenChuDoanhNghiep
            document.querySelector('#emailChuDoanhNghiep').value = cts.emailGD
            document.querySelector('#soDienThoaiChuDoanhNghiep').value = cts.soDienThoaiCongTy
            document.querySelector('#congTyMe').value = cts.congTyMe
            document.querySelector('#chucVuDN').value = cts.chucVu
            document.querySelector('#nguoiThucHienDN').value = cts.nguoiThucHien

            if(cts.camKet == true){document.querySelector('#camKet').setAttribute('checked',true)}
            document.querySelector('#tinhThanhDN').childNodes.forEach(province=>{
                if(cts.tinhThanh == province.value) {
                    province.setAttribute('selected',true)
                }
            })
            await getQuanHuyen(cts.tinhThanh)
            document.querySelector('#quanHuyenDN').childNodes.forEach(district => {
                if (cts.quanHuyen == district.value) {
                    district.setAttribute('selected', true)
                }
            })
            document.querySelector('#servicesDN').childNodes.forEach(service => {
                if (cts.goiCTSId == service.value) {
                    service.setAttribute('selected', true)
                }
            })
            document.querySelector('#thoiHanDN').value = cts.thoiHan
            document.querySelector('#giaDN').value = cts.giaCuoc
            document.querySelector('#idDN').value = cts._id
            if (cts.fileHoSo.length != 0) {
                document.querySelector('#documentOrganization').innerHTML = `
                <a href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">${cts.fileHoSo}</a>`
            } else {
                document.querySelector('#documentOrganization').innerHTML = `<p>Chưa đủ</p>`
            }
            modal.style.opacity = "1";
            modal.style.display = "block"
            onSubmitDoanhNghiep()
        })
    })
    // When the user clicks on <span> (x), close the modal
    btnCancel.forEach(btn => {
        btn.onclick = function (e) {
            modal.style.opacity = "0"
            setTimeout(() => {
                modal.style.display = "none";
            }, 450)
        }
    })

}

async function getCTSCaNhanApproved() {
    try {
        //get cts from daily2
        const urlList1 = url + `api/digital-certificate/personal/approved-agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/personal/getApprovedByUserId`
        const options = {
            method: 'GET'
        }
        const CTSCaNhanByAgency = await fetchAPI(urlList1, options)
        const CTSCaNhanBySelf = await fetchAPI(urlList2, options)
        const data = [...CTSCaNhanByAgency, ...CTSCaNhanBySelf]
        if (data.length != 0) {
            $('#paginPersonalApproved').pagination({
                dataSource: data,
                callback: function (data, pagination) {
                    // template method of yourself
                    showApprovedPersonal(data);
                },
                pageSize: 5
            })
        } else {
            showApprovedPersonal(data)
        }

    } catch (err) {
        console.log(err)
    }
}
getCTSCaNhanApproved()
async function showApprovedPersonal(data) {
    let html = ''
    if (data.length != 0) {
        const services = await getServices()
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html += `<tr style="background:#cfebff">
            <td><a class="btn btn-action btn-info" href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">Xem</a></td>
            <td scope="row">${index + 1}</td>
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

    } else {
        approvedStatus.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }

}
async function getCTSDoanhNghiepApproved() {
    try {
        //get cts from daily2
        const urlList1 = url + `api/digital-certificate/organization/approved-agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/organization/getApprovedByUserId`
        const options = {
            method: 'GET'
        }
        const CTSCaNhanByAgency = await fetchAPI(urlList1, options)
        const CTSCaNhanBySelf = await fetchAPI(urlList2, options)
        const data = [...CTSCaNhanByAgency, ...CTSCaNhanBySelf]
        if (data.length != 0) {
            $('#paginOrgApproved').pagination({
                dataSource: data,
                callback: function (data, pagination) {
                    // template method of yourself
                    showApprovedOrg(data);
                },
                pageSize: 5
            })
        } else {
            showApprovedOrg(data)
        }



    } catch (err) {
        console.log(err)
    }
}
getCTSDoanhNghiepApproved()
async function showApprovedOrg(data) {
    let html = ''
    if (data.length != 0) {
        const services = await getServices()
        data.forEach((cts, index) => {
            services.forEach(service => {
                if (cts.goiCTSId == service._id) {
                    cts = { ...service, ...cts }
                }
            })
            html += `<tr style="background:#cfebff">
            <td><a class="btn btn-action btn-info" href="/uploads/fileHoSo/${cts.fileHoSo}" target="_blank">Xem</a></td>
            <td scope="row">${index + 1}</td>
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

    } else {
        approvedStatusDN.innerHTML = '<td colspan="13"><h4>Hiện không có dữ liệu</h4></td>'
    }

}
async function getQuanHuyen(id) {
    try {
        if (!quanHuyenEl) {
            return
        }
        const res = await fetch('http://localhost:3000/api/districts')
        const data = await res.json()
        let quanHuyenHtml = ''
        data.forEach(district => { if(district.tinhThanhID == id){
            quanHuyenHtml +=`<option value="${district._id}">${district.TenQuanHuyen}</option>`
        }})
        quanHuyenEl.innerHTML += quanHuyenHtml
        quanHuyenDNEl.innerHTML += quanHuyenHtml
    }catch(err){
        console.log(err)
    }

}

