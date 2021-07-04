function checkSelectAccount(){
    const countItemAccount = document.querySelectorAll('input[name="selectAccount"]:checked').length
    const notActive = document.querySelector('#notActive')
    const isActive = document.querySelector('#isActive')
    if(countItemAccount==0){
        isActive.setAttribute('disabled',true)
        notActive.setAttribute('disabled',true)
    }else{
        isActive.removeAttribute('disabled')
        notActive.removeAttribute('disabled')
    }
}
function checkSelectAccountFind(){
    const countItemAccount = document.querySelectorAll('input[name="selectAccountFind"]:checked').length
    const notActive = document.querySelector('#notActiveFind')
    const isActive = document.querySelector('#isActiveFind')
    if(countItemAccount==0){
        isActive.setAttribute('disabled',true)
        notActive.setAttribute('disabled',true)
    }else{
        isActive.removeAttribute('disabled')
        notActive.removeAttribute('disabled')
    }
}