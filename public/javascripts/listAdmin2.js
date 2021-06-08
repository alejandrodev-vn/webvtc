import { convertToDDMMYYYY } from './convert.js'
import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
const pendingStatus = document.querySelector('#pendingStatus')
const pendingStatusDN = document.querySelector('#pendingStatusDN')
const url = 'http://localhost:3000/'

async function getCTSCaNhan(){
    try{
        const urlList = url + `api/digital-certificate/personal/byAgency`
        const options = {
            method: 'GET'
        }
        return await fetchAndShowData(urlList, options, showPending)
        
       
    }catch(err){
        console.log(err)
    }
}
getCTSCaNhan()

async function getCTSDoanhNghiep(){
    try{
        const urlList1 = url + `api/digital-certificate/organization/byAgency`
        const options = {
            method: 'GET'
        }
        const CTSDoanhNghiepByAgency = await fetchAndShowData(urlList1, options, showPendingDN)
        return CTSDoanhNghiepByAgency
       
    }catch(err){
        console.log(err)
    }
}
getCTSDoanhNghiep()

async function showPending(data){
    let html = ''
    const services = await getServices()
    data.forEach((cts, index)=> {   
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                cts = { ...service, ...cts }
            }
        })
        html+=`<tr style="background:#cfebff">
        <td scope="row">${index+1}</td>
        <td><button class="btn btn-info btn-handle-personal" data-id="${cts._id}">Xử lý</button></td>
        <td>${cts._id}</td>
        <td>${cts.hoTenNguoiDK}</td>
        <td style="color:firebrick">${cts.tenGoiDichVu}</td>
        <td></td>
        <td style="color:firebrick">${cts.MSTCaNhan}</td>
        <td></td>
        <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
        <td style="color:firebrick">${cts.nguoiThucHien}</td>
        <td style="color:firebrick">${(cts.trangThai == 1) ? 'Chờ duyệt lần 1' : 'Chờ duyệt lần 2'}</td>
        <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
        <td><button class="btn btn-secondary" data-id="${cts.id}"}>Lịch sử</button></td>
     </tr>`
    })
    pendingStatus.innerHTML = html
    handleRequest()
}

async function showPendingDN(data){
    let html = ''
    const services = await getServices()
    data.forEach((cts, index)=> {   
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                cts = { ...service, ...cts }
            }
        })
        html+=`<tr style="background:#cfebff">
        <td scope="row">${index+1}</td>
        <td><button class="btn btn-info btn-handle-organization" data-id="${cts._id}">Xử lý</button></td>
        <td>${cts._id}</td>
        <td>${cts.tenGD}</td>
        <td style="color:firebrick">${cts.tenGoiDichVu}</td>
        <td></td>
        <td style="color:firebrick">${cts.MST}</td>
        <td></td>
        <td style="color:firebrick">${convertToDDMMYYYY(cts.ngayTao)}</td>
        <td style="color:firebrick">${cts.nguoiThucHien}</td>
        <td style="color:firebrick">${(cts.trangThai == 1) ? 'Chờ duyệt lần 1' : 'Chờ duyệt lần 2'}</td>
        <td style="color:firebrick">${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
        <td><button class="btn btn-secondary" data-id="${cts.id}"}>Lịch sử</button></td>
     </tr>`
    })
    pendingStatusDN.innerHTML = html
    handleRequestDN()
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
async function handleRequest(){
    
        // Get the modal
        const modal = document.getElementById("modalCertificatePersonal");

        // Get the button that opens the modal
        const btnHandles = document.querySelectorAll('.btn-handle-personal')
    
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
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

                modal.style.opacity = "1";
                modal.style.display = "block"
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

async function handleRequestDN(){
    
    // Get the modal
    const modal = document.getElementById("modalCertificateOrganization");

    // Get the button that opens the modal
    const btnHandles = document.querySelectorAll('.btn-handle-organization')

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close-1")[0];
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

            console.log(cts)
            modal.style.opacity = "1";
            modal.style.display = "block"
            document.querySelector('#tenGD-DN').value = cts.tenGD
            document.querySelector('#MST-DN').value = cts.MST
            document.querySelector('#giayPhepDKKD-DN').value = cts.giayPhepDKKD
            document.querySelector('#ngayCap-DN').value = cts.ngayCapGiayPhepDKKD
            document.querySelector('#diaChi-DN').value = cts.diaChi
            document.querySelector('#emailGD-DN').value = cts.emailGD
            document.querySelector('#soDienThoai-DN').value = cts.soDienThoaiCongTy
            // document.querySelector('#toChuc-DN').value = cts.diaChi
            document.querySelector('#hoTen-DN').value = cts.hoTenChuDoanhNghiep
            document.querySelector('#chucVu-DN').value = cts.chucVu
            document.querySelector('#soCMTND-DN').value = cts.soCMT 
            document.querySelector('#ngayCapCMTND-DN').value = cts.ngayCapCMT
            document.querySelector('#noicap-DN').value = cts.noiCapCMT
            document.querySelector('#email-DN').value = cts.emailGD
            document.querySelector('#sdt-DN').value = cts.soDienThoaiChuDoanhNghiep
            document.querySelector('#maPhieuYC-DN').value = service._id
            // document.querySelector('#loaiYC').value = service.thoiHan
            document.querySelector('#goiCTS-DN').value = service.tenGoiDichVu
            document.querySelector('#thoiHan-DN').value = service.thoiHan
            document.querySelector('#idOrg').value = cts._id
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