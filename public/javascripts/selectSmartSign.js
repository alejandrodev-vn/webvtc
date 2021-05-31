const selectAll = document.querySelector('#selectAll')
const btnSubmit = document.querySelector('.btn-submit')
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
function getCheckboxValue(){
    const select = document.querySelectorAll('.select-smart-sign')
    for (let i = 0; i < select.length; i++) {   
        if(select[i].checked){
            console.log(select[i].value)
        }
    } 
}
function validateSendRequest(){
    const countItem = document.querySelectorAll('input[name="selectItem"]:checked').length
    if(countItem==0){
        btnSubmit.setAttribute('disabled',true)
    }else{
        btnSubmit.removeAttribute('disabled')
    }
}