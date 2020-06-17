geAllUFs();
document.querySelector("select[name=uf").addEventListener("change", getCities);

function populateUFsSelect(states){

    const ufSelect = document.querySelector("select[name=uf");
    populateSelect(states, ufSelect);

}

function populateCitiesSelect(cities){

    const citySelect = document.querySelector("select[name=city");
    disabledSelect(citySelect, false);
    populateSelect(cities, citySelect);

}

function populateSelect(itens, select){
    
    for (const item of itens) {
        select.innerHTML += (select.name == 'city') ? `<option value="${item.nome}">${item.nome}</option>` : `<option value="${item.id}">${item.nome}</option>`;
    }
}

function setStateInput(event){
    const stateInput = document.querySelector("[name=state]");
    stateInput.value = event.target.options[event.target.selectedIndex].text;
}


function disabledSelect(select, status){
    select.innerHTML = '<option>Selecione a Cidade</option>';
    select.disabled = status ? true : false;
}

function getCities(event){
    
    const ufId = event.target.value;
    const citySelect = document.querySelector("select[name=city");
    if(ufId){
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+ ufId+"/municipios";
        axios.get(url)
        .then(function (response) {
            populateCitiesSelect(response.data);
            setStateInput(event);
        })
        .catch(function (error) {
            disabledSelect(citySelect, true);
        });
    }else{
        disabledSelect(citySelect, true);
    }
    
}

function geAllUFs(){
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(function (response) {
        populateUFsSelect(response.data);
    })
    .catch(function (error) {
        
    });
}

itemsCollect();
let optionSelectedItemsCollect = [];
function itemsCollect(){
    
    const itemsCollect = document.querySelectorAll(".items-grid li");
    for(const item of itemsCollect){
        item.addEventListener("click", eventItemCollect);
    }
}

function eventItemCollect(event){
    const item = event.target;
    item.classList.toggle("selected");

    const itemDataIdSelect = event.target.dataset.id;
    if(!optionSelectedItemsCollect.includes(itemDataIdSelect)){
        optionSelectedItemsCollect.push(itemDataIdSelect);
    }else{
        optionSelectedItemsCollect.splice(optionSelectedItemsCollect.indexOf(itemDataIdSelect), 1);
    }

    const itemsInput = document.querySelector("[name=items]");
    itemsInput.value = optionSelectedItemsCollect;
    


}

