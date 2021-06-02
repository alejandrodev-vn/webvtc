import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')

const url = 'http://localhost:3000/'

async function getCTSCaNhan(){
    try{
        const urlList = url + `api/digital-certificate/personal/byUserId`
        const options = {
            method: 'GET'
        }
        await fetchAndShowData(urlList, options, showPending)

       
    }catch(err){
        console.log(err)
    }
}
getCTSCaNhan()
async function showPending(data){
    let html = ''
    const services = await getServices()
    data.forEach((cts, index)=> {   
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                cts = { ...service, ...cts }
            }
        })
       html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
       <td scope="row">${index+1}</td>
       ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItem" class="select-smart-sign" value="${cts._id}" onchange="checkSelectAll()"></td>` : '<td></td>'}
       ${(cts.trangThai == 0) ? `<td><button class="btn btn-info">Sửa</button></td>` : '<td></td>'}
       <td><p>${cts._id}</p></td>
       <td>${cts.hoTenNguoiDK}</td>
       <td>${cts.soCMT}</td>
       <td>${cts.MSTCaNhan}</td>
       <td>${cts.tenGoiDichVu}</td>
       <td>${cts.thoiHan}</td>
       <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
       <td>${cts.nguoiThucHien}</td>
       <td>${(cts.trangThai == 0) ? 'Dự thảo' : 'Chờ duyệt lần 1'}</td>
       <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>

     </tr>`
     pendingStatus.innerHTML = html
     
    })
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

async function getCTSDoanhNghiep(){
    try{
        const urlList = url + `api/digital-certificate/organization/byUserId`
        const options = {
            method: 'GET'
        }
        await fetchAndShowData(urlList, options, showPendingDN)

       
    }catch(err){
        console.log(err)
    }
}
getCTSDoanhNghiep()
async function showPendingDN(data){
    let html = ''
    const services = await getServices()
    data.forEach((cts, index)=> {   
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                cts = { ...service, ...cts }
            }
        })
       html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
       <td scope="row">${index+1}</td>
       ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItem1" class="select-smart-sign-DN" value="${cts._id}" onchange="checkSelectAllDN()"></td>` : '<td></td>'}
       ${(cts.trangThai == 0) ? `<td><button class="btn btn-info">Sửa</button></td>` : '<td></td>'}
       <td><p>${cts._id}</p></td>
       <td>${cts.tenGD}</td>
       <td>${cts.giayPhepDKKD}</td>
       <td>${cts.MST}</td>
       <td>${cts.tenGoiDichVu}</td>
       <td>${cts.thoiHan}</td>
       <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
       <td>${cts.nguoiThucHien}</td>
       <td>${(cts.trangThai == 0) ? 'Dự thảo' : 'Chờ duyệt lần 1'}</td>
       <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>

     </tr>`
     pendingStatusDN.innerHTML = html
     
    })
}

