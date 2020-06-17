const buttonCloseModal = document.querySelector('#modal .header a');
buttonCloseModal.addEventListener("click", modal);

function modal(event){
    const modal = document.querySelector("#modal");
    modal.classList.toggle("hide");
}

const buttonSearchPointCollect = document.querySelector("#home-page main a");
buttonSearchPointCollect.addEventListener("click", modal);