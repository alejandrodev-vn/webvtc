import { convertToDDMMYYYY, convertToYYYYMMDD } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')

const url = 'http://localhost:3000/'

async function getCTSCaNhan(){
    try{
        //get cts from daily1
        const urlList1 = url + `api/digital-certificate/personal/agency1`
        //get cts from self
        const urlList2 = url + `api/digital-certificate/personal/byUserId`
        const options = {
            method: 'GET'
        }
        const CTSCaNhanByAgency = await fetchAPI(urlList1, options)
        const CTSCaNhanBySelf = await fetchAPI(urlList2, options)
        const data = [ ...CTSCaNhanByAgency, ...CTSCaNhanBySelf ]
        return showPending(data)
       
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
           ${(cts.trangThai == 0) ? `<td><input type="checkbox" name="selectItem" class="select-smart-sign" value="${cts._id}" onchange="checkSelectAll()"></td>` : '<td></td>'}
           ${(cts.trangThai == 0) ? `<td><button type="button" data-id="${cts._id}" class="btn btn-info btn-edit-personal">Sửa</button></td>` : '<td></td>'}
           <td><p>${cts._id}</p></td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.thoiHan}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
            : (cts.trangThai == 1) ? 'Chờ duyệt lần 1' 
            : (cts.trangThai == 2) ? `<button type="button" class="btn btn-primary btn-sendMail" 
                                    data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;width:60px">
                                        Gửi thông tin thuê bao
                                    </button>`
            : (cts.trangThai == 3) ? `<p style="color:tomato;font-size:13px;line-height: 15px;
                padding-bottom: 9px;">Đã gửi thông tin thuê bao </p><button type="button" class="btn btn-primary btn-sendMail" 
                data-id="${cts._id}" style="font-size: 10px;padding: 5px 2px;width:60px">
                    Gửi lại
                </button>`
            : (cts.trangThai == 4) ? 'Chờ duyệt lần 2' : ''}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
    
         </tr>`
         pendingStatus.innerHTML = html
         
        })
        openEdit()
        getSendMail()
    }else {
        pendingStatus.innerHtml = '<h3>Hiện không có dữ liệu</h3>'
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
async function openEdit(){
    
    // Get the modal
    const modal = document.getElementById("modalEditCertificatePersonal");

    // Get the button that opens the modal
    const btns = document.querySelectorAll('.btn-edit-personal')

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    btns.forEach(btn=>{
        btn.addEventListener('click', async (e)=>{
            e.preventDefault()
            const urlCer = url + `api/digital-certificate/personal/${btn.dataset.id}` 
            const options = {
                method:'GET'
            }
            const cts = await fetchAPI(urlCer, options)
            modal.style.opacity = "1";
            modal.style.display = "block"
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
            document.querySelector('#tinhThanh').childNodes.forEach(province=>{
                if(cts.tinhThanh == province.value) {
                    province.setAttribute('selected',true)
                }
            })
            await getQuanHuyen(cts.tinhThanh)
            document.querySelector('#quanHuyen').childNodes.forEach(district=>{
                if(cts.quanHuyen == district.value) {
                    district.setAttribute('selected',true)
                }
            })
            document.querySelector('#services').childNodes.forEach(service=>{
                if(cts.goiCTSId == service.value) {
                    service.setAttribute('selected',true)
                }
            })
            document.querySelector('#thoiHan').value = cts.thoiHan
            document.querySelector('#gia').value = cts.gia
            document.querySelector('#id').value = cts._id

        })
    })
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
        }
    }    

}
function getSendMail(){
    const formSendMailPersonal = document.querySelector('#formSendMailPersonal')
    const btnsSendMail = document.querySelectorAll('.btn-sendMail')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailPersonal.action = `/digital-certificate/personal/send-mail/${btn.dataset.id}`
            formSendMailPersonal.submit()
        }
    })
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
    if(data.length!=0){
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
    }else {
        pendingStatusDN.innerHTML = '<h3>Hiện không có dữ liệu</h3>'
    }
   
}
async function getQuanHuyen(id){
    try{
        if(!quanHuyenEl){
            return
        }
        const res = await fetch('http://localhost:3000/api/districts')
        const data = await res.json()
        let quanHuyenHtml = ''
        data.forEach(district => { if(district.tinhThanhId == id){
            quanHuyenHtml +=`<option value="${district._id}">${district.TenQuanHuyen}</option>`
        }})
        quanHuyenEl.innerHTML = quanHuyenHtml
    }catch(err){
        console.log(err)
    }
  
}
export { 
    getSendMail 
}

