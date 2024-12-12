// get total
//create item
//save localstorage
//clear data after save it
// read
//create mutliple items
//delete
// update
//search
//clean data

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
let deleteAll = document.getElementById('btn_deleteAll') ;
let products_arr ;
let temp ;

if (localStorage.product != null){
    products_arr = JSON.parse(localStorage.product);
}else {
    products_arr = [] ;
}

let mode = 'create' ;

deleteAllProduct()

function getTotal (){

    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result
        total.style.background = 'green'
    }else {
        total.innerText ='';
        total.style.background = 'red'
    }
}




    
submit.onclick = function(){
    
    let product = {
        p_title : title.value.toLowerCase() ,
        p_price : price.value,
        p_taxes : taxes.value,
        p_ads : ads.value ,
        p_discount : discount.value,
        p_total : total.innerHTML,
        p_category : category.value.toLowerCase() ,
        p_count : count.value,
    }
    if(title.value != '' 
        && price.value != '' 
        && category.value!= ''
        && product.p_count <100
    ){
        if(mode === 'create'){
            if(count.value > 1 ){
                for (let i = 0 ; i < count.value ; i++){
                    products_arr.push(product); 
                }
            }else {
                products_arr.push(product);
            }            
        }else{
            products_arr[temp] = product;
            submit.innerHTML ='Create';
            count.style.display = 'block'
            mode ='create'
            clearData();
            total.style.background = 'red'
        }
        clearData();
    }
    localStorage.setItem('product' , JSON.stringify(products_arr))
    
    showData();
}
 





function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '' ;
    ads.value = '';
    discount.value  = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}




function showData(){

    let table = '' ;
        products_arr.forEach(element => {
            let id = products_arr.indexOf(element);
            table  +=`
            <tr>
                <td>${id+=1}</td>
                <td>${element.p_title}</td>
                <td>${element.p_price}</td>
                <td>${element.p_taxes}</td>
                <td>${element.p_ads}</td>
                <td>${element.p_discount}</td>
                <td>${element.p_total}</td>
                <td>${element.p_category}</td>
                <td><button onclick="updateItem(${products_arr.indexOf(element)})" id="update">Update</button></td> 
                <td><button onclick="deleteItem(${products_arr.indexOf(element)})" id="delete">Delete</button></td> 
            `
        });
    

    document.getElementById('tbody').innerHTML = table ;

    deleteAllProduct()
}


showData();


function deleteItem(index){
    console.log('here')
    if(products_arr.length ==1){
        products_arr.splice(index ,1)
        deleteAll.style.display = 'none'
    }
    else {

        products_arr.splice(index,1)
    }
    localStorage.product = JSON.stringify(products_arr);

    showData();
}


function deleteAllProduct(){
    if(products_arr.length >0){
        deleteAll.style.display ='block'
    }

    deleteAll.onclick = function(){
        products_arr.splice(0);
        localStorage.clear();
        deleteAll.style.display ='none'

        showData();
    }
}

deleteAllProduct()

let searchMode = '';
function searchItemBy(id){
    let search = document.getElementById('search');
    if(id == 'seachByTitle'){
        searchMode = 'title';
    }else {
        searchMode = 'category'
    }
    search.placeholder = id;

    search.focus();
    search.value = '';
}

function search(value){
    let table = '';
    
        products_arr.forEach(element => {
            if(searchMode == 'title'){
                if(element.p_title.includes(value.toLowerCase())){
                let id = products_arr.indexOf(element);
                table  +=`
                <tr>
                    <td>${id}</td>
                    <td>${element.p_title}</td>
                    <td>${element.p_price}</td>
                    <td>${element.p_taxes}</td>
                    <td>${element.p_ads}</td>
                    <td>${element.p_discount}</td>
                    <td>${element.p_total}</td>
                    <td>${element.p_category}</td>
                    <td><button id="update">Update</button></td> 
                    <td><button onclick="deleteItem(${id})" id="delete">Delete</button></td> 
                `
                }
            }else{
                if(element.p_category.includes(value.toLowerCase())){
                    let id = products_arr.indexOf(element);
                    table  +=`
                    <tr>
                        <td>${id}</td>
                        <td>${element.p_title}</td>
                        <td>${element.p_price}</td>
                        <td>${element.p_taxes}</td>
                        <td>${element.p_ads}</td>
                        <td>${element.p_discount}</td>
                        <td>${element.p_total}</td>
                        <td>${element.p_category}</td>
                        <td><button id="update">Update</button></td> 
                        <td><button onclick="deleteItem(${id})" id="delete">Delete</button></td> 
                    `
                    }
            }
        });    
    document.getElementById('tbody').innerHTML = table ;
}


function updateItem(id){

    temp= id ;
    title.value = products_arr[id].p_title
    price.value = products_arr[id].p_price
    taxes.value = products_arr[id].p_taxes
    ads.value = products_arr[id].p_ads
    discount.value = products_arr[id].p_discount
    total.value = getTotal();
    category.value = products_arr[id].p_category

    count.style.display = 'none'
    mode = 'update';
    

    submit.innerHTML = 'Update'
    
    window.scroll(0,0)

}