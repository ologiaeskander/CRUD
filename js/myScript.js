var nameInput=document.getElementById("productName");
var categoryInput=document.getElementById("productCategory");
var priceInput=document.getElementById("productPrice");
var descriptionInput=document.getElementById("productDescription");
var tbody=document.getElementById("tbody");
var searchInput=document.getElementById("searchInput");
var i="";

if(localStorage.getItem("ProductsStorage")==null){
    var products=[];
}else{
    var products=JSON.parse(localStorage.getItem("ProductsStorage"));
    console.log(products)
}

function addProducts(){
    var product = {
        pname : nameInput.value,
        pcat : categoryInput.value,
        pprice : Number(priceInput.value),
        pdesc: descriptionInput.value,
    }
    console.log(product);
    products.push(product);
    localStorage.setItem("ProductsStorage",JSON.stringify(products));
    displayproduct();
    clearproduct();
}

function clearproduct(){
    nameInput.value="";
    categoryInput.value="";
    priceInput.value="";
    descriptionInput.value="";
}

function displayproduct(){
    console.log("test");
    var str="";
    console.log(products.length)
    for(var i=0; i<products.length; i++){
         str +=`<tr>
          <td>${i}</td>
          <td>${products[i].pname}</td>
          <td>${products[i].pcat}</td>
          <td>${products[i].pprice}</td>
          <td>${products[i].pdesc}</td>
          <td>
          <button class="btn btn-outline-primary shadow rounded" onclick="updateproduct(${i})"> update</button>
          </td>
          <td>
          <button class="btn btn-outline-danger shadow rounded" onclick="deleteproduct(${i})"> delete</button>
          </td>
         </tr>`
    }
    tbody.innerHTML=str;
}

function deleteproduct(k){
    products=JSON.parse(localStorage.getItem("ProductsStorage"));
    if(confirm("Are you sure you want to delete this") == true){
        if(products.length==1)
        {
            products=[];
        }
        else{
            products.splice(k,1);
            console.log(products);
        }
    }else{
  
    }
    localStorage.setItem("ProductsStorage",JSON.stringify(products));
    displayproduct();
}

displayproduct();

var button = document.getElementById("update");
function updateproduct(k){
    nameInput.value=products[k].pname;
    categoryInput.value=products[k].pcat;
    priceInput.value=products[k].pprice;
    descriptionInput.value=products[k].pdesc;
    button.innerHTML="update product";
    button.classList.add("btn-primary" , "text-white");
    button.onclick=function(){
        products=JSON.parse(localStorage.getItem("ProductsStorage"));
        products[k].pname=nameInput.value;
        products[k].pcat=categoryInput.value;
        products[k].pprice= priceInput.value;
        products[k].pdesc=descriptionInput.value;
        localStorage.setItem("ProductsStorage",JSON.stringify(products));
        displayproduct();
        clearproduct();
        button.innerHTML="add product";
        button.classList.remove("btn-primary" , "text-white");
        button.onclick=function(){
            addProducts();
        }
    }
}

function search(){
    var check,flag,tds, tr, td, i,j;
    check = searchInput.value.toUpperCase();
    tr = tbody.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        tds = tr[i].getElementsByTagName("td");
        flag = false;
        for(j = 0; j < tds.length; j++){
            td = tds[j];
            if (td.innerHTML.toUpperCase().indexOf(check) > -1) {
                flag = true;
            } 
        }
        if(flag){
            tr[i].style.display = "";
        }
        else {
            tr[i].style.display = "none";
        }
    }
}
