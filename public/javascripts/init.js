const tinhThanhEl = document.querySelector('#tinhThanh')
const quanHuyenEl = document.querySelector('#quanHuyen')
const servicesEl = document.querySelector('#services')
const thoiHanEl = document.querySelector('#thoiHan')
const giaEl = document.querySelector('#gia')
async function getTinhThanh(){
    try{
        await fetch('http://localhost:3000/api/provinces')
        .then(res=>res.json())
        .then(provinces=>{
            let provinceHtml = ''
            provinces.forEach(province=>{
                provinceHtml +=  `
                <option value="${province._id}">${province.TenTinhThanh}</option>`
            })
            tinhThanhEl.innerHTML = provinceHtml
        })
    }catch(err){
        console.log(err)
    }
}
getTinhThanh()
async function getQuanHuyen(id){
    try{
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
async function getServices(){
    try{
        const services = await fetch('http://localhost:3000/api/services')
        .then(res=>res.json())
        .then(services=>services)
        let serviceHtml = ''
        services.forEach(service=>{
            serviceHtml +=  `
            <option value="${service._id}">${service.tenGoiDichVu}</option>`
        })
        servicesEl.innerHTML = serviceHtml
    }catch(err){
        console.log(err)
    }
}
getServices()
async function chooseService(id){
    try{
        const res = await fetch('http://localhost:3000/api/services/'+ id)
        const service = await res.json()
        thoiHanEl.value = service.thoiHan
        giaEl.value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(service.gia)
    }catch(err){
        console.log(err)
    }
  
}