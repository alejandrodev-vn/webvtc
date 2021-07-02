import { convertToDDMMYYYY, convertToYYYYMMDD } from './convert.js'
import { fetchAPI,
    fetchAndShowData    
} from './fetch.js'

const url = 'http://localhost:3000/'
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
        const urlList = url + `api/users/byBelongTo`
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
        if(mst && typeReport == '1'){
            const urlFind = url + `api/report?typeReport=${typeReport}&mst=${mst}`
            const options = {
                method: 'GET'
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
            const dateBegin = document.getElementById('dateBegin').value
            const dateEnd = document.getElementById('dateEnd').value
            const services = document.getElementById('goiCTSId').value
            const agency = document.getElementById('agency').value
            const actionBy = document.getElementById('actionBy').value
            const tokenId = document.getElementById('tokenId').value
            const serialNumber = document.getElementById('serialNumber').value
            const status = document.getElementById('trangThai').value
            if(dateBegin.length==0 && dateEnd.length==0 && services.length==0 
                && agency.length==0 && tokenId.length==0 && serialNumber.length==0 && status.length==0){
                    return
                }
            const urlFind = url + `api/report?typeReport=&agency=${agency}&actionBy=${actionBy}&services=${services}&dateBegin=${dateBegin}&dateEnd=${dateEnd}&tokenId=${tokenId}&serialNumber=${serialNumber}&status=${status}`
            const options = {
                method: 'GET'
            }
            const data = await fetchAPI(urlFind, options)
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
                showFindCTSCaNhan(data.canhan)
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
            
          document.querySelector('#history').innerHTML = html
          document.querySelector('#historyWrapper').style.display = 'block'
     }else {
        document.querySelector('#history').innerHTML = '<td colspan="9"><h4>Không tìm thấy</h4></td>'
         document.querySelector('#historyWrapper').style.display = 'block'
    }
    

}
