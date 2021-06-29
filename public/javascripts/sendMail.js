function getSendMailPersonal(){
    const formSendMailPersonal = document.querySelector('#formSendMailPersonal')
    const btnsSendMail = document.querySelectorAll('.btn-sendMail')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailPersonal.action = `/digital-certificate/personal/send-mail/${btn.dataset.id}`
            formSendMailPersonal.submit()
            setTimeout(()=>{
                alert('Gửi thành công')
            },5000)
        }
    })
}
function getSendMailOrganization(){
    const formSendMailOrganization = document.querySelector('#formSendMailOrganization')
    const btnsSendMail = document.querySelectorAll('.btn-sendMailOrg')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailOrganization.action = `/digital-certificate/organization/send-mailOrg/${btn.dataset.id}`
            formSendMailOrganization.submit()
            setTimeout(()=>{
                alert('Gửi thành công')
            },5000)
        }
    })
}
   
export { 
    getSendMailPersonal,
    getSendMailOrganization,
}