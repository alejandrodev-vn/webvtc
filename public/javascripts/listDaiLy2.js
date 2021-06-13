import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
import { getSendMailPersonal } from './sendMail.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')

const url = 'http://localhost:3000/'

async function getCTSCaNhan(){
    try{
        const urlList = url + `api/digital-certificate/personal/byUserId`
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
           <td scope="row">${index+1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
            : (cts.trangThai == 1 ) ? 'Chờ duyệt lần 1'
            : (cts.trangThai == 2) ? `<button type="button" class="btn btn-primary btn-sendMail" 
                                    data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                        Gửi thông tin thuê bao
                                    </button>`
            : (cts.trangThai == 3) ? `<p style="color:tomato;font-size:13px;line-height: 15px;
                                        padding-bottom: 9px;">Đã gửi thông tin thuê bao </p><button type="button" class="btn btn-primary btn-sendMail" 
                                        data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;width:60px">
                                            Gửi lại
                                        </button>`
            : 'Chờ duyệt lần 2'}</td></td>
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
        const urlList = url + `api/digital-certificate/organization/byUserId`
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
    const services = await getServices()
    if(data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
           <td scope="row">${index+1}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.tenGD}</td>
           <td>${cts.giayPhepDKKD}</td>
           <td>${cts.MST}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
                : (cts.trangThai == 1 ) ? 'Chờ duyệt lần 1'
                : (cts.trangThai == 2) ? `<button type="button" class="btn btn-primary btn-sendMail" 
                                        data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;">
                                            Gửi thông tin thuê bao
                                        </button>`
                : 'Chờ duyệt lần 2'}</td></td>
               <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
    
         </tr>`
         pendingStatusDN.innerHTML = html
         
        })
        
    }else{
        pendingStatusDN.innerHTML = '<td colspan="11"><h4>Hiện không có dữ liệu</h4></td>'

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

