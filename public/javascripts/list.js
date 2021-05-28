import { convertToDDMMYYYY } from './convert.js'
const pendingStatus = document.querySelector('#pendingStatus')
const url = 'http://localhost:3000/'

async function fetchAPI(url, options, cb){
    try{
        const res = await fetch(url, options)
        const data = await res.json()
        cb(data)
    }catch(err){
        console.log(err)
    }
}
async function getPendingStatus(){
    try{
        const urlList = url + `api/digital-certificate/personal`
        const options = {
            method: 'GET'
        }
        fetchAPI(urlList, options, showPending)

       
    }catch(err){
        console.log(err)
    }
}
getPendingStatus()
async function showPending(data){
    let html = ''
    const services = await getServices()
    data.forEach((cts, index)=> {   
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                cts = { ...cts, ...service }
            }
        })
       html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
       <th scope="row">${index+1}</th>
       ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="select" id="${cts._id}"></td>` : '<td></td>'}
       ${(cts.trangThai == 0) ? `<td><button class="btn btn-info">Sửa</button></td>` : '<td></td>'}
       <td>${cts._id}</td>
       <td>${cts.hoTenNguoiDK}</td>
       <td>${cts.soCMT}</td>
       <td>${cts.MSTCaNhan}</td>
       <td>${cts.tenGoiDichVu}</td>
       <td>${cts.thoiHan}</td>
       <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
       <td>${cts.nguoiThucHien}</td>
       <td>${(cts.trangThai == 0) ? 'Dự thảo' : 'Chờ duyệt lần 1'}</td>

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