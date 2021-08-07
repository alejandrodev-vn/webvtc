import { convertToDDMMYYYY, convertToYYYYMMDD } from './convert.js'
import { fetchAPI,
    fetchAndShowData    
} from './fetch.js'
const resultPersonal = document.querySelector('#resultPersonal')
const resultOrganization = document.querySelector('#resultOrganization')
const resultHistory = document.querySelector('#history')
const ctsEl = document.querySelector('#CTSWrapper')
const historyEl = document.querySelector('#historyWrapper')
import { url } from './constants.js'
async function processServices(){
    const servicesEl = document.querySelector('#goiCTSId')
    if(!servicesEl){
        return
    }
    const services = await fetch('http://localhost:3000/api/services')
    .then(res=>res.json())
    .then(services=>services)
    let serviceHtml = ''
    services.forEach(service=>{
        serviceHtml +=  `
        <option value="${service._id}">${service.tenGoiDichVu}</option>`
    })
    if(servicesEl){
        servicesEl.innerHTML += serviceHtml
    }

}
processServices()
async function getServices(){
    try{
        const res = await fetch('http://localhost:3000/api/services')
        const services = await res.json()
        return services
    }catch(err){
        console.log(err)
    }
}

async function getListAccount(){
    try{
        const urlList = url + `api/users/agency`
        const options = {
            method: 'GET'
        }
        const users = await fetchAPI(urlList, options)
        let userHtml = ''
        users.forEach(user=>{
            userHtml +=  `
            <option value="${user._id}">${user.username}</option>`
        })
        const userEl = document.querySelector('#agency')
        if(userEl){
            userEl.innerHTML += userHtml
        }       
    }catch(err){
        console.log(err)
    }
}
getListAccount()
async function getFind() {
    try{
     const btn = document.getElementById("getFind")
     btn.addEventListener('click', async (e)=>{
         e.preventDefault()
        const mst = document.getElementById('mst').value
        const typeReport = document.getElementById('typeReport').value
           const dateBegin = document.getElementById('dateBegin').value
            const dateEnd = document.getElementById('dateEnd').value
            const services = document.getElementById('goiCTSId').value
            const agency = document.getElementById('agency').value
            const tokenId = document.getElementById('tokenId').value
            const serialNumber = document.getElementById('serialNumber').value
            const status = document.getElementById('trangThai').value
        if(typeReport == '1'){
            if(mst){
                var urlFind = url + `api/report?typeReport=${typeReport}&mst=${mst}`
                var options = {
                    method: 'GET'
                }
            }else if(tokenId){
                var urlFind = url + `api/report?typeReport=${typeReport}&tokenId=${tokenId}`
                var options = {
                    method: 'GET'
                }
               
            }else if(serialNumber){
                var urlFind = url + `api/report?typeReport=${typeReport}&serialNumber=${serialNumber}`
                var options = {
                    method: 'GET'
                }
               
            }else{
                return alert('Vui lòng chọn điều kiện xuất lịch sử')
            } 
            const data = await fetchAPI(urlFind, options)
            if(data && data.length!=0){
                $('#paginHistory').pagination({
                    dataSource: data,
                    callback: function(data, pagination) {
                        // template method of yourself
                        showFindByMST(data);
                    },
                    pageSize: 5    
                })
                }else{
                    showFindByMST(data)
                }
            
        }else {
         
            if(dateBegin.length==0 && dateEnd.length==0 && services.length==0 
                && agency.length==0 && status.length==0){
                    return
                }
            const urlFind = url + `api/report?typeReport=${typeReport}&agency=${agency}&services=${services}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&status=${status}`
            const options = {
                method: 'GET'
            }
            const data = await fetchAPI(urlFind, options)
      
            //canhan
            if(data.canhan && data.canhan.length!=0){
                $('#paginPersonal').pagination({
                    dataSource: data.canhan,
                    callback: function(data, pagination) {
                        // template method of yourself
                        showFindCTSCaNhan(data);
                    },
                    pageSize: 5    
                })
            }else{
                showFindCTSCaNhan([])
            }
            //doanh nghiep
            if(data.doanhnghiep && data.doanhnghiep.length!=0){
                $('#paginOrganization').pagination({
                    dataSource: data.doanhnghiep,
                    callback: function(data, pagination) {
                        // template method of yourself
                        showFindCTSDoanhNghiep(data);
                    },
                    pageSize: 5    
                })
            }else{
                showFindCTSDoanhNghiep([])
            }
        }
  
        
     })
    }
    catch(err){
        console.log(err)
    }
}
getFind()
async function showFindByMST(data){
    let html = ''
    if(data.length!=0){
       
        const cts = data[0]
        const services = await getServices()
        services.forEach(service => {
            if(cts.goiCTSId == service._id){
                return cts.tenGoiDichVu = service.tenGoiDichVu
            }
        })
        if(cts.trangThai>=0){
            html+=`
            <tr style="background:#cfebff"}>
                <td>1</td>
                <td>${cts.nguoiThucHien}</td>
                <td>0</td>
                <td>Tạo yêu cầu mới</td>
                <td>${cts.ngayTao}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=1){
            html+=`
            <tr style="background:#cfebff"}>
                <td>2</td>
                <td>${(cts.action1By) ? cts.action1By : ''}</td>
                <td>1</td>
                <td>Gửi YC duyệt lần 1</td>
                <td>${cts.action1}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=2){
            html+=`
            <tr style="background:#cfebff"}>
                <td>3</td>
                <td>${(cts.action2By) ? cts.action2By : ''}</td>
                <td>2</td>
                <td>Phê duyệt lần 1</td>
                <td>${cts.action2}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=3){
            html+=`
            <tr style="background:#cfebff"}>
                <td>4</td>
                <td>${(cts.action3By) ? cts.action3By : ''}</td>
                <td>3</td>
                <td>Gửi thông tin thuê bao</td>
                <td>${cts.action3}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=4){
            html+=`
            </tr>
            <tr style="background:#cfebff"}>
                <td>5</td>
                <td>${(cts.action4By) ? cts.action4By : ''}</td>
                <td>4</td>
                <td>Người dùng xác nhận</td>
                <td>${cts.action4}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=5){
            html+=`
            <tr style="background:#cfebff"}>
                <td>6</td>
                <td>${(cts.action5By) ? cts.action5By : ''}</td>
                <td>5</td>
                <td>Phê duyệt lần 2</td>
                <td>${cts.action5}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai>=6){
            html+=`
            <tr style="background:#cfebff"}>
                <td>7</td>
                <td>${(cts.action6By) ? cts.action6By : ''}</td>
                <td>6</td>
                <td>Đã ký HĐ</td>
                <td>${cts.action6}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td></td>
                <td></td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>`
        }
        if(cts.trangThai==7){
            html+=`
            <tr style="background:#cfebff"}>
                <td>8</td>
                <td>${(cts.action7By) ? cts.action7By : ''}</td>
                <td>7</td>
                <td>Đã tạo chứng thư số</td>
                <td>${cts.action7}</td>
                ${(cts.MSTCaNhan) ? `<td>${cts.MSTCaNhan}</td>` : `<td>${cts.MST}</td>`}
                <td>${cts.tokenId}</td>
                <td>${cts.serialNumber}</td>
                <td>${cts.tenGoiDichVu}</td>
            </tr>
          `
        }
            
          resultHistory.innerHTML = html
          historyEl.style.display = 'block'
          ctsEl.style.display = "none"
     }else {
        resultHistory.innerHTML = '<td colspan="9"><h4>Không tìm thấy</h4></td>'
        historyEl.style.display = 'block'
        ctsEl.style.display = "none"
    }
    

}
async function showFindCTSCaNhan(data){
    let html = ''
    const services = await getServices()
    if(data && data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr ${(index % 2 == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
           <td scope="row">${index+1}</td>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
           : (cts.trangThai == 1) ? 'Chờ duyệt lần 1' 
           : (cts.trangThai == 2) ? `Đã duyệt lần 1`
           : (cts.trangThai == 3) ? `Đã gửi thông tin thuê bao`
           : (cts.trangThai == 4) ? 'Chờ duyệt lần 2' 
           : (cts.trangThai == 5) ? 'Đã duyệt lần 2' 
           : (cts.trangThai == 6) ? 'Đã ký HĐ' 
           : (cts.trangThai == 7) ? 'Đã cấp CTS' 
           : (cts.trangThai == 8) ? 'Đã hủy' 
           : (cts.trangThai == 9) ? 'Đã từ chối' 
           : ''}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.loaiCTS}</td>
           <td>${cts.hoTenNguoiDK}</td>
           <td>${cts.MSTCaNhan}</td>
           <td>${cts.soCMT}</td>
           <td>${cts.diaChi}</td>
           <td>${cts.email}</td>
           <td>${cts.soDienThoai}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.gia}</td>
           <td>${(cts.tokenId) ? cts.tokenId : ''}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.thoiHan}</td>
           <td>${(cts.serialNumber) ? cts.serialNumber : ''}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
    
         </tr>`
         resultPersonal.innerHTML = html
         historyEl.style.display = "none"
         ctsEl.style.display = "block"
         
        })

    }else {
        resultPersonal.innerHTML = '<td colspan="18"><h4>Không tìm thấy</h4></td>'
        historyEl.style.display = "none"
        ctsEl.style.display = "block"
    }
    

}
async function showFindCTSDoanhNghiep(data){
    let html = ''
    const services = await getServices()
    if(data && data.length!=0){
        data.forEach((cts, index)=> {   
            services.forEach(service => {
                if(cts.goiCTSId == service._id){
                    cts = { ...service, ...cts }
                }
            })
           html+=`<tr ${(cts.trangThai == 0) ? `style="background:#cfebff"` : 'style="background:cornsilk"'}>
           <td scope="row">${index+1}</td>
           <td>${(cts.trangThai == 0) ? 'Dự thảo' 
           : (cts.trangThai == 1) ? 'Chờ duyệt lần 1' 
           : (cts.trangThai == 2) ? `Đã duyệt lần 1`
           : (cts.trangThai == 3) ? `Đã gửi thông tin thuê bao`
           : (cts.trangThai == 4) ? 'Chờ duyệt lần 2' 
           : (cts.trangThai == 5) ? 'Đã duyệt lần 2' 
           : (cts.trangThai == 6) ? 'Đã ký HĐ' 
           : (cts.trangThai == 7) ? 'Đã cấp CTS' 
           : (cts.trangThai == 8) ? 'Đã hủy' 
           : (cts.trangThai == 9) ? 'Đã từ chối' 
           : ''}</td>
           <td><p>${cts._id}</p></td>
           <td>${cts.loaiCTS}</td>
           <td>${cts.tenGD}</td>
           <td>${cts.MST}</td>
           <td>${cts.giayPhepDKKD}</td>
           <td>${cts.diaChi}</td>
           <td>${cts.emailGD}</td>
           <td>${cts.soDienThoaiCongTy}</td>
           <td>${cts.tenGoiDichVu}</td>
           <td>${cts.gia}</td>
           <td>${(cts.tokenId) ? cts.tokenId : ''}</td>
           <td>${cts.nguoiThucHien}</td>
           <td>${convertToDDMMYYYY(cts.ngayTao)}</td>
           <td>${cts.thoiHan}</td>
           <td>${(cts.serialNumber) ? cts.serialNumber : ''}</td>
           <td>${(cts.fileHoSo.length == 0) ? 'Chưa đủ' : 'Đủ'}</td>
         </tr>`
         resultOrganization.innerHTML = html
         historyEl.style.display = "none"
         ctsEl.style.display = "block"
         
        })

    }else {
        resultOrganization.innerHTML = '<td colspan="18"><h4>Không tìm thấy</h4></td>'
        historyEl.style.display = "none"
        ctsEl.style.display = "block"
    }
    

}
