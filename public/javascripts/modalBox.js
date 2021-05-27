    // Get the modal
    const modal = document.getElementById("myModal");

    // Get the button that opens the modal
    const btn = document.querySelector(".btn-modal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
        btn.onclick = function(e) {
            e.preventDefault()
            modal.style.opacity = "1";
            modal.style.display = "block"


        }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.opacity = "0"
        setTimeout(()=>{modal.style.display = "none";
            },450)
        }
    }
