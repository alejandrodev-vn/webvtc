import { fetchAPI } from './fetch.js'
const url = 'http://localhost:3000/'
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});
const prices = document.querySelectorAll('.price')
prices.forEach(price=>{
    let priceFormated = formatter.format(price.textContent)
    price.innerHTML = priceFormated
})
window.onload = () => {
    openEdit()
    confirmDelete()
}
const openEdit = () => {
    // Get the modal
    const modalEdit = document.getElementById("modalEdit");

    // Get the button that opens the modal
    const btnEdit = document.querySelectorAll(".btn-edit-service");

    // Get the <span> element that closes the modal
    const closeEdit = document.getElementsByClassName("closeEdit")[0];
    // When the user clicks the button, open the modal
    btnEdit.forEach(btn=>{
        btn.onclick = async function(e) {
            e.preventDefault()
            const urlCer = url + `api/services/${btn.dataset.id}` 
            const options = {
                method:'GET'
            }
            const cts = await fetchAPI(urlCer, options)
            document.querySelector('#tenGoiDichVu').value = cts.tenGoiDichVu
            document.querySelector('#gia').value = cts.gia
            document.querySelector('#thoiHan').value = cts.thoiHan
            document.querySelector('#id').value = btn.dataset.id

            modalEdit.style.opacity = "1";
            modalEdit.style.display = "block"


        }
    })
    // When the user clicks on <span> (x), close the modal
    closeEdit.onclick = function() {
        modal.style.opacity = "0"
        setTimeout(()=>{modalEdit.style.display = "none";
            },450)
    }
}

const confirmDelete = function(){
    // Get the modal
    const modalDelete = document.getElementById("modalDelete");
    const formDeleteService = document.getElementById("formDeleteService");

    // Get the button that opens the modal
    
    const btnsDestroy = document.querySelectorAll('.btn-delete-service')
  
    const btnDel = document.querySelector('.deletebtn')
    
    // Get the <span> element that closes the modal
    const btnCancel = document.querySelector('.cancelbtn')
    // When the user clicks the button, open the modal 
    if(btnsDestroy.length!=0){
        btnsDestroy.forEach(btn=>{
            btn.onclick = function(e) {
                e.preventDefault()
                modalDelete.style.opacity = "1";
                modalDelete.style.display = "block"
                btnDel.dataset.id = this.dataset.id
                btnDel.onclick = (e) =>{
                    e.preventDefault()
                    formDeleteService.action = `/services/delete/${btnDel.dataset.id}`
                    alert('Xóa thành công')
                    formDeleteService.submit()
                
                }
              
               
            }
            
        })
    
    }
 



    btnCancel.onclick = function() {
       modalDelete.style.opacity = "0"
       setTimeout(()=>{modalDelete.style.display = "none";
           },450)
   }
    
 


}



