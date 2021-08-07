const tinhThanhEl = document.querySelectorAll('.tinhThanh')
const quanHuyenEl = document.querySelector('#quanHuyen')
const tinhThanhDNEl = document.querySelectorAll('.tinhThanhDN')
const quanHuyenDNEl = document.querySelector('#quanHuyenDN')
const servicesEl = document.querySelector('#services')
const servicesFindEl = document.querySelectorAll('.serviecesFind')
const thoiHanEl = document.querySelector('#thoiHan')
const giaEl = document.querySelector('#gia')
const servicesDNEl = document.querySelector('#servicesDN')
const thoiHanDNEl = document.querySelector('#thoiHanDN')
const giaDNEl = document.querySelector('#giaDN')
import { url } from './constants'

async function getTinhThanh(){
    try{
        if(!tinhThanhEl){
            return
        }
        await fetch(`${url}api/provinces`)
        .then(res=>res.json())
        .then(provinces=>{
            let provinceHtml = ''
            provinces.forEach(province=>{
                provinceHtml +=  `
                <option value="${province._id}">${province.TenTinhThanh}</option>`
            })
            tinhThanhEl.forEach(e=>{
                e.innerHTML += provinceHtml
            })
        })
    }catch(err){
        console.log(err)
    }
}
getTinhThanh()
async function getQuanHuyen(id){
    try{
        if(!quanHuyenEl){
            return
        }
        const res = await fetch(`${url}api/districts`)
        const data = await res.json()
        let quanHuyenHtml = ''
        data.forEach(district => { if(district.tinhThanhID == id){
            quanHuyenHtml +=`<option value="${district._id}">${district.TenQuanHuyen}</option>`
        }})
        if(quanHuyenEl){
            quanHuyenEl.innerHTML = quanHuyenHtml

        }
        if(quanHuyenDNEl){
            quanHuyenDNEl.innerHTML = quanHuyenHtml
        }
    }catch(err){
        console.log(err)
    }
  
}
async function getServices(){
    try{
        if(!servicesEl){
            return
        }
        const services = await fetch(`${url}api/services`)
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
        if(servicesDNEl){
            servicesDNEl.innerHTML += serviceHtml
        }
    }catch(err){
        console.log(err)
    }
}
getServices()
async function getServicesfind(){
    try{
        if(!servicesFindEl){
            return
        }
        await fetch(`${url}api/services`)
        .then(res=>res.json())
        .then(services=>{
            let serviceHtml = ''
            services.forEach(services=>{
                serviceHtml +=  `
                <option value="${services._id}">${services.tenGoiDichVu}</option>`
            })
            servicesFindEl.forEach(e=>{
                e.innerHTML += serviceHtml
            })
        })
    }catch(err){
        console.log(err)
    }
}
getServicesfind()
async function chooseService(id){
    try{
        const res = await fetch(`${url}api/services/`+ id)
        const service = await res.json()
        thoiHanEl.value = service.thoiHan
        giaEl.value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(service.gia)
        thoiHanDNEl.value = service.thoiHan
        giaDNEl.value = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(service.gia)
        
    }catch(err){
        console.log(err)
    }
  
}
const checkbox = document.getElementById("camKet")
function checkCamKet(){
    (checkbox.checked) ? checkbox.setAttribute('value', true) : checkbox.setAttribute('value', false)  
}
function popupAlert(){
    const message = document.getElementById('status')
    const urlRedirect = document.getElementById('redirect')
    if(message){
        if(message.textContent.trim().length!=0 && message.textContent) {
            alert(message.textContent)
            if(urlRedirect){
                if(urlRedirect.textContent.trim().length!=0 && urlRedirect.textContent) window.location.href=`/${urlRedirect.textContent}`
            }
        }
    }
}
popupAlert()
