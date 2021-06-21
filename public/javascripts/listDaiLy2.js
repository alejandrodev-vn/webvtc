import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
import { getSendMailPersonal, getSendMailOrganization } from './sendMail.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')
const approvedStatus = document.querySelector('#approvedStatus')
const approvedStatusDN = document.querySelector('#approvedStatusDN')
const url = 'http://localhost:3000/'

async function getCTSCaNhan(){
    try{
        const urlList = url + `api/digital-certificate/personal/getPendingByUserId`
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
async function showPending(data){
    let html = ''
    const services = await getServices()
    if(data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
           : (cts.trangThai == 1 ) ? 'Chờ duyệt lần 1'
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
           : 'Chờ duyệt lần 2'}</td></td>
           <td scope="row">${index+1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
         </tr>`
         pendingStatus.innerHTML = html
        })
        getSendMailPersonal()

    }else{
        pendingStatus.innerHTML = '<td colspan="11"><h4>Hiện không có dữ liệu</h4></td>'
    }
   
}
async function getCTSDoanhNghiep(){
    try{
        const urlList = url + `api/digital-certificate/organization/getPendingByUserId`
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
            html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
            <td>${(cts.trangThai == 0) ? 'Dự thảo' 
            : (cts.trangThai == 1 ) ? 'Chờ duyệt lần 1'
            : (cts.trangThai == 2) ? `<button type="button" class="btn btn-action btn-primary btn-sendMailOrg" 
                                    data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                        Gửi thông tin thuê bao
                                    </button>`
            : (cts.trangThai == 3) ? `<p style="color:tomato;font-size:13px;line-height: 15px;
                                        padding-bottom: 9px;">Đã gửi thông tin thuê bao </p>
                                        <button type="button" class="btn btn-action btn-primary btn-sendMailOrg" 
                                        data-id="${cts._id}">
                                            Gửi lại
                                        </button>`
            : 'Chờ duyệt lần 2'}</td></td>
            <td scope="row">${index+1}</td>
            <td><p>${cts._id}</p></td>
            <td>${cts.tenGD}</td>
            <td>${cts.giayPhepDKKD}</td>
            <td>${cts.MST}</td>
            <td>${cts.tenGoiDichVu}</td>
            <td>${cts.thoiHan}</td>
            <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
            <td>${cts.nguoiThucHien}</td>
           
            <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
     
          </tr>`
          pendingStatusDN.innerHTML = html
    
         })    
        getSendMailOrganization()
    }else{
        pendingStatusDN.innerHTML = '<td colspan="11"><h4>Hiện không có dữ liệu</h4></td>'
    }
} 

async function getCTSCaNhanApproved(){
    try{
        const urlList = url + `api/digital-certificate/personal/getApprovedByUserId`
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
            <td><button class="btn btn-action btn-info btn-handle-personal" data-id="${cts._id}">Xem</button></td>
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
async function getCTSDoanhNghiepApproved(){
    try{
        const urlList = url + `api/digital-certificate/organization/getApprovedByUserId`
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
            <td><button class="btn btn-action btn-info btn-handle-personal" data-id="${cts._id}">Xem</button></td>
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
        const res = await fetch('http://localhost:3000/api/services')
        const services = await res.json()
        return services
    }catch(err){
        console.log(err)
    }
}

