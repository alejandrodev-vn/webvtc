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
function showPending(data){

    let html = ''
    data.forEach(async (cts, index)=> {
        const service = await getServiceDetail(cts.goiCTSId)
      
       html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
       <th scope="row">${index+1}</th>
       ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="select" id="${cts._id}"></td>` : '<td></td>'}
       ${(cts.trangThai == 0) ? `<td><button class="btn btn-info">Sửa</button></td>` : '<td></td>'}
       <td>${cts._id}</td>
       <td>${cts.hoTenNguoiDK}</td>
       <td>${cts.soCMT}</td>
       <td>${cts.MSTCaNhan}</td>
       <td>${service.tenGoiDichVu}</td>
       <td>${service.thoiHan}</td>
       <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
       <td>${cts.nguoiThucHien}</td>
       <td>${(cts.trangThai == 0) ? 'Dự thảo' : 'Chờ duyệt lần 1'}</td>

     </tr>`
     pendingStatus.innerHTML = html
    })
}
async function getServiceDetail(id){
    try{
        const res = await fetch('http://localhost:3000/api/services/' + id)
        const service = await res.json()
        return service
    }catch(err){
        console.log(err)
    }
}