function getSendMailPersonal(){
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
function getSendMailOrganization(){
    const formSendMailOrganization = document.querySelector('#formSendMailOrganization')
    const btnsSendMail = document.querySelectorAll('.btn-sendMail')
    btnsSendMail.forEach(btn=>{
        btn.onclick = (e) => {
            e.preventDefault()
            formSendMailOrganization.action = `/digital-certificate/organization/send-mail/${btn.dataset.id}`
            formSendMailOrganization.submit()
        }
    })
}
export { 
    getSendMailPersonal,
    getSendMailOrganization
}