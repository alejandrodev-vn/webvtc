import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
import { getSendMail } from './listDaiLy1.js'
const pendingStatusDL2 = document.querySelector('#pendingStatusDL2')
const pendingStatusDN_DL2 = document.querySelector('#pendingStatusDN_DL2')

const url = 'http://localhost:3000/'

async function getCTSCaNhanDL2(){
    try{
        const urlList = url + `api/digital-certificate/personal/byUserId`
        const options = {
            method: 'GET'
        }
        return await fetchAndShowData(urlList, options, showPendingDL2)

       
    }catch(err){
        console.log(err)
    }
}
getCTSCaNhanDL2()
async function showPendingDL2(data){
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
            : 'Chờ duyệt lần 2'}</td></td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
    
         </tr>`
         pendingStatusDL2.innerHTML = html
        })
        getSendMail()

    }else{
        pendingStatusDL2.innerHTML = '<h3>Hiện không có dữ liệu</h3>'
    }
   
}
async function getCTSDoanhNghiepDL2(){
    try{
        const urlList = url + `api/digital-certificate/organization/byUserId`
        const options = {
            method: 'GET'
        }
        await fetchAndShowData(urlList, options, showPendingDN_DL2)

       
    }catch(err){
        console.log(err)
    }
}
getCTSDoanhNghiepDL2()
async function showPendingDN_DL2(data){
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
         pendingStatusDN_DL2.innerHTML = html
         
        })
        
    }else{
        pendingStatusDN_DL2.innerHTML = '<h3>Hiện không có dữ liệu</h3>'

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

