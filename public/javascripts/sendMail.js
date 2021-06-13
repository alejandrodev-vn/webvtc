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
export { 
    getSendMailPersonal 
}