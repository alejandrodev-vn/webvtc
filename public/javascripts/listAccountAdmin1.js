import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
const url = 'http://localhost:3000/'

async function getListAccountAdmin(){
    try{
        const urlList = url + `api/users/admin`
        const options = {
            method: 'GET'
        }
        const users = await fetchAndShowData(urlList, options, showListAccountAdmin)
        return users
       
    }catch(err){
        console.log(err)
    }
}
async function getListAccountAgency(){
    try{
        const urlList = url + `api/users/agency`
        const options = {
            method: 'GET'
        }
        const users = await fetchAndShowData(urlList, options, showListAccountAgency)
        return users
       
    }catch(err){
        console.log(err)
    }
}
getListAccountAdmin()
getListAccountAgency()
async function showListAccountAdmin(data){
    let html = ''
    const urlProvinces = url + 'api/provinces'
    const options = {
        method: "GET"
    }
    const provinces = await fetchAPI(urlProvinces, options)
    data.forEach((user, index)=> {
        provinces.forEach(province => {
            if(user.tinhThanhId == province._id){
                user.TenTinhThanh = province.TenTinhThanh
            }
        })   
        html+=`
        <tr>
        <th scope="col">${index+1}</th>
        <th scope="col"><input type="radio" name="selectItem" value="${user._id}"></th>
        <th scope="col">${user.username}</th>
        <th scope="col">${user.hoTen}</th>
        <th scope="col">${user.TenTinhThanh}</th>
        <th scope="col">
        ${(user.role==0) ? 'Admin cấp 1' : 'Admin cấp 2' }
        </th>
        <th scope="col">${(user.isActive) ? 'Hoạt động' : 'Không hoạt động'}</th>    
      </tr>`
    })
    document.querySelector('#listAccountAdmin').innerHTML = html

}
async function showListAccountAgency(data){
    let html = ''
    const urlProvinces = url + 'api/provinces'
    const options = {
        method: "GET"
    }
    const provinces = await fetchAPI(urlProvinces, options)
    data.forEach((user, index)=> {
        provinces.forEach(province => {
            if(user.tinhThanhId == province._id){
                user.TenTinhThanh = province.TenTinhThanh
            }
        })   
        html+=`
        <tr>
        <th scope="col">${index+1}</th>
        <th scope="col"><input type="radio" name="selectItem" value="${user._id}"></th>
        <th scope="col">${user.username}</th>
        <th scope="col">${user.hoTen}</th>
        <th scope="col">${user.TenTinhThanh}</th>
        <th scope="col">
        ${(user.role==2) ? 'Đại lý cấp 1' : 'Đại lý cấp 2'}
        </th>
        <th scope="col">${(user.isActive) ? 'Hoạt động' : 'Không hoạt động'}</th>    
      </tr>`
    })
    document.querySelector('#listAccountAgency').innerHTML = html

}