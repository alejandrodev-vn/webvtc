const selectAll = document.querySelector('#selectAll')
const selectAllDN = document.querySelector('#selectAllDN')
const btnSubmitDN = document.querySelector('.btn-submit1')
const btnSubmit = document.querySelector('.btn-submit')
const btnDelete = document.querySelector('.btn-delete')
const btnDeleteDN = document.querySelector('.btn-delete1')
function checkAll(){
    const selectItem = document.querySelectorAll('.select-smart-sign')
    let isSelectAll = selectAll.checked
    for(let i = 0; i < selectItem.length; i++) {   
        selectItem[i].checked = isSelectAll;   
    }
    validateSendRequest()
}
function checkSelectAll() {  
    const selectItem = document.querySelectorAll('.select-smart-sign')
    let isCheckAll = selectItem.length === document.querySelectorAll('input[name="selectItem"]:checked').length
    selectAll.checked = isCheckAll;   
    validateSendRequest()
}

function validateSendRequest(){
    const countItem = document.querySelectorAll('input[name="selectItem"]:checked').length
    if(countItem==0){
        btnSubmit.setAttribute('disabled',true)
        btnDelete.setAttribute('disabled',true)
    }else{
        btnSubmit.removeAttribute('disabled')
        btnDelete.removeAttribute('disabled')
    }
}





function checkAllDN(){
    const selectItem = document.querySelectorAll('.select-smart-sign-DN')
    let isSelectAll = selectAllDN.checked
    for(let i = 0; i < selectItem.length; i++) {   
        selectItem[i].checked = isSelectAll;   
    }
    validateSendRequestDN()
}
function checkSelectAllDN() {  
    const selectItem = document.querySelectorAll('.select-smart-sign-DN')
    let isCheckAll = selectItem.length === document.querySelectorAll('input[name="selectItem1"]:checked').length
    selectAllDN.checked = isCheckAll;   
    validateSendRequestDN()
}

function validateSendRequestDN(){
    const countItem = document.querySelectorAll('input[name="selectItem1"]:checked').length
    if(countItem==0){
        btnSubmitDN.setAttribute('disabled',true)
        btnDeleteDN.setAttribute('disabled',true)
    }else{
        btnSubmitDN.removeAttribute('disabled')
        btnDeleteDN.removeAttribute('disabled')
    }
}