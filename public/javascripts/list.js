const pendingStatus = document.querySelector('#pendingStatus')
const url = 'http://localhost:3000/'
function convertToYYYYMMDD (d){
    date = new Date(d);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return (year+'-' + month + '-'+dt);
}
function convertToDDMMYYYY(d){
    date = new Date(d);
    year = date.getFullYear();
    month = date.getMonth()+1;
    dt = date.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return (dt+'/' + month + '/'+year);
}
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
      
       html+=`<tr>
       <th scope="row">${index}</th>
       <td><input type="checkbox" name="select" id="${cts._id}"></td>
       <td><button class="btn btn-primary">Sửa</button></td>
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