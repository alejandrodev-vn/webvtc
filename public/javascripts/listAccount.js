import { fetchAPI,
    fetchAndShowData 
} from './fetch.js'
import { validateNewAccount } from './validate.js'
import { url } from './constants.js'

const getListAccount = async () => {
    try{
        const urlList = url + `api/users/byBelongTo`
        const options = {
            method: 'GET'
        }
        const users = await fetchAPI(urlList, options)
        if(users && users.length!=0){
            $('#paginUsers').pagination({
                dataSource: users,
                callback: function(data, pagination) {
                    // template method of yourself
                    showListAccount(data);
                },
                pageSize: 5    
            })
        }else{
            showListAccount(data)
        }
       
    }catch(err){
        console.log(err)
    }
}
getListAccount()
async function showListAccount(data){
    let html = ''
    const urlProvinces = url + 'api/provinces'
    const options = {
        method: "GET"
    }
    const provinces = await fetchAPI(urlProvinces, options)
    data.forEach((user, index)=> {
        provinces.forEach(province => {
            if(user.tinhThanhID == province._id){
                user.TenTinhThanh = province.TenTinhThanh
            }
        })   
        html+=`
        <tr>
        <th scope="col">${index+1}</th>
        <th scope="col"><input type="radio" name="selectAccount" onchange="checkSelectAccount()" value="${user._id}"></th>
        <th scope="col">${user.username}</th>
        <th scope="col">${user.hoTen}</th>
        <th scope="col">${user.TenTinhThanh}</th>
        <th scope="col">${(user.role==2) ? 'Đại lý cấp 1' : 'Đại lý cấp 2'}</th>
        <th scope="col">${(user.isActive) ? 'Hoạt động' : 'Không hoạt động'}</th>    
      </tr>`
    })
    document.querySelector('#listAccount').innerHTML = html
    validateNewAccount()
}
async function findUser(){

    const btnFindUser = document.querySelector('#btnFindUser')
    btnFindUser.onclick = async (e) =>{
        e.preventDefault()
        const username = document.querySelector('#usernameFind').value
        if(username.length==0) return alert('Vui lòng nhập username muốn tìm')
        let urlFind = url + `api/manage-account/find-by-username?username=${username}`
        let options = {
            method: 'GET'
        }
        const user = await fetchAPI(urlFind, options)
        const urlProvinces = url + 'api/provinces'
        const provinces = await fetchAPI(urlProvinces, options)
        if(user.length!=0){
            provinces.forEach(province => {
                if(user[0].tinhThanhID == province._id){
                    user[0].TenTinhThanh = province.TenTinhThanh
                }
            })  
            document.querySelector('#resultFindUser').innerHTML = 
            `<tr>
                <td>1</td>
                <th scope="col"><input type="radio" name="selectAccountFind" onchange="checkSelectAccountFind()" value="${user[0]._id}"></th>
                <th scope="col">${user[0].username}</th>
                <th scope="col">${user[0].hoTen}</th>
                <th scope="col">${user[0].TenTinhThanh}</th>
                <th scope="col">${(user[0].role==2) ? 'Đại lý cấp 1' : 'Đại lý cấp 2'}</th>
                <th scope="col">${(user[0].isActive) ? 'Hoạt động' : 'Không hoạt động'}</th>    
            </tr>
            `
            document.querySelector('#findUserWrapper').style.display =" block"

        }else{
            document.querySelector('#resultFindUser').innerHTML = `
            <th colspan="7"><h4>Không tìm thấy</h4></th>    
            `
            document.querySelector('#findUserWrapper').style.display="block"

        }
    }
}
findUser()
