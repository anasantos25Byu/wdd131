const products = [

{
id: "fc1888",
name: "Flux Capacitor"
},

{
id: "fc2050",
name: "Power Laces"
},

{
id: "fs1987",
name: "Time Circuits"
},

{
id: "ac2000",
name: "Low Voltage Reactor"
},

{
id: "jj1969",
name: "Warp Equalizer"
}

];

const select = document.querySelector("#produto");

products.forEach(produto => {

const option = document.createElement("option");

option.value = produto.id;

option.textContent = produto.name;

select.appendChild(option);

});

document.querySelector("#ano").textContent =
new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
`Última Modificação: ${document.lastModified}`;