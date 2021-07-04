// Danh sách yêu cầu
const selectAll         = document.querySelector('#selectAll')
const btnSubmit         = document.querySelector('.btn-submit')
const btnDelete         = document.querySelector('.btn-delete')
const selectAllOrg      = document.querySelector('#selectAllOrg')
const btnSubmitOrg      = document.querySelector('.btn-submit-Org')
const btnDeleteOrg      = document.querySelector('.btn-delete-Org')
// Danh sách tìm kiêm
const selectAllFind     = document.querySelector('#selectAllFind')
const btnSubmitFind     = document.querySelector('.btn-submit-Find')
const btnDeleteFind     = document.querySelector('.btn-delete-Find')
const selectAllOrgFind  = document.querySelector('#selectAllOrgFind')
const btnSubmitOrgFind  = document.querySelector('.btn-submit-Org-Find')
const btnDeleteOrgFind  = document.querySelector('.btn-delete-Org-Find')

// Personal
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
// Organization
function checkAllOrg(){
    const selectItem = document.querySelectorAll('.select-smart-sign-Org')
    let isSelectAll = selectAllOrg.checked
    for(let i = 0; i < selectItem.length; i++) {   
        selectItem[i].checked = isSelectAll;   
    }
    validateSendRequestOrg()
}
function checkSelectAllOrg() {  
    const selectItem = document.querySelectorAll('.select-smart-sign-Org')
    let isCheckAll = selectItem.length === document.querySelectorAll('input[name="selectItemOrg"]:checked').length
    selectAllOrg.checked = isCheckAll;   
    validateSendRequestOrg()
}

function validateSendRequestOrg(){
    const countItem = document.querySelectorAll('input[name="selectItemOrg"]:checked').length
    if(countItem==0){
        btnSubmitOrg.setAttribute('disabled',true)
        btnDeleteOrg.setAttribute('disabled',true)
    }else{
        btnSubmitOrg.removeAttribute('disabled')
        btnDeleteOrg.removeAttribute('disabled')
    }
}
// Find Personal
function checkAllFind(){
    const selectItem = document.querySelectorAll('.select-smart-sign-Find')
    let isSelectAll = selectAllFind.checked
    for(let i = 0; i < selectItem.length; i++) {   
        selectItem[i].checked = isSelectAll;   
    }
    validateSendRequestFind()
}
function checkSelectAllFind() {  
    const selectItem = document.querySelectorAll('.select-smart-sign-Find')
    let isCheckAll = selectItem.length === document.querySelectorAll('input[name="selectItem"]:checked').length
    selectAllFind.checked = isCheckAll;   
    validateSendRequestFind()
}

function validateSendRequestFind(){
    const countItem = document.querySelectorAll('input[name="selectItem"]:checked').length
    if(countItem==0){
        btnSubmitFind.setAttribute('disabled',true)
        btnDeleteFind.setAttribute('disabled',true)
    }else{
        btnSubmitFind.removeAttribute('disabled')
        btnDeleteFind.removeAttribute('disabled')
    }
}
// Find Org
function checkAllOrgFind(){
    const selectItem = document.querySelectorAll('.select-smart-sign-Org-Find')
    let isSelectAll = selectAllOrgFind.checked
    for(let i = 0; i < selectItem.length; i++) {   
        selectItem[i].checked = isSelectAll;   
    }
    validateSendRequestOrgFind()
}
function checkSelectAllOrgFind() {  
    const selectItem = document.querySelectorAll('.select-smart-sign-Org-Find')
    let isCheckAll = selectItem.length === document.querySelectorAll('input[name="selectItemOrg"]:checked').length
    selectAllOrgFind.checked = isCheckAll;   
    validateSendRequestOrgFind()
}

function validateSendRequestOrgFind(){
    const countItem = document.querySelectorAll('input[name="selectItemOrg"]:checked').length
    if(countItem==0){
        btnSubmitOrgFind.setAttribute('disabled',true)
        btnDeleteOrgFind.setAttribute('disabled',true)
    }else{
        btnSubmitOrgFind.removeAttribute('disabled')
        btnDeleteOrgFind.removeAttribute('disabled')
    }
}
