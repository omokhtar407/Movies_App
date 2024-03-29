/* Start Side Menu */
let menuBodyWidth = $('#menuBody').innerWidth();
$('#sideMenu').css("left" , -`${menuBodyWidth}`);

$('#bar').click(function () {

    $('#bar').addClass('dis-none').next().removeClass('dis-none');
    $('#sideMenu').animate({left:`0px`},300);
    new WOW().init();

})

$('#close').click(function () {

    let menuBodyWidth = $('#menuBody').innerWidth();
    $('#close').addClass('dis-none').prev().removeClass('dis-none');
    $('#sideMenu').animate({left:-`${menuBodyWidth}`},300);
})


$("a[href^='#']").click(function(e){
    let aHref = e.target.getAttribute('href');
    let ContactOffset = $(aHref).offset()?.top;
    let menuBodyWidth = $('#menuBody').innerWidth();
    $('body,html').animate({scrollTop:ContactOffset },1000);
    $('#sideMenu').animate({left:-`${menuBodyWidth}`},300);
    $('#close').addClass('dis-none').prev().removeClass('dis-none');
})

// To_Top
$('#to_Top').click(function(){
    $('body ,html').animate({scrollTop:0},1000)
})
/* End Side Menu */

/* Start Moveidb Api */

let menuHeadWidth = $('.menu-head').innerWidth();
$('#moveiDb ,#ContactUs').css('marginLeft' , `${menuHeadWidth}`);

/* to get Api */ 
let Results =[];
let Response;

async function GetData(menu = 'now_playing'){

    if( menu == 'now_playing'){
        Response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`);
    }
    else if(menu == 'popular'){
        Response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`);
    }
    else if(menu == 'top_rated'){
        Response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`);
    }
    else if(menu == 'trending'){
        Response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=c0d379e9b2fca29da7e3e39703976bc5`);
    }
    else if(menu == 'upcoming'){
        Response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=c0d379e9b2fca29da7e3e39703976bc5&language=en-US&page=1`);
    }
    else {
        Response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${menu}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`);
    }
    if(Response.ok && Response.status != 400){
        let data = await Response.json() ;
        Results = data.results;
        displayData();  
    }     
}

/* to display Movies */

function displayData(){
    let AllMovies = document.querySelector('#allMovies');
    let movies=``;
    let imgSrc = `https://image.tmdb.org/t/p/w500`;

    for (let i = 0 ; i <Results.length ; i++) {

        movies += `
            <div class=" col-md-3 col-sm-6">
                <div class="moveiImg">
                    <img src="${imgSrc}${Results[i].poster_path}" alt="">
                    <div class="movei-Info">
                        <h2 class="title text-center fw-bold">${Results[i].title?Results[i].title:Results[i].name}</h1>
                        <p class="overview ">${Results[i].overview.slice(0,200)}</p>
                        <span class="rate "><strong>Rate:</strong> ${Results[i].vote_average}</span>
                        <span class="release_date"><strong>Release_Date:</strong> ${Results[i].release_date?Results[i].release_date:Results[i].first_air_date}</span>
                    </div>
                </div>
            </div>
        `
        AllMovies.innerHTML = movies;
    }
}

/* call Api to get data */
GetData();


/* Search By Keyword */

let SearchByWord = document.getElementById('searchByWord');

SearchByWord.addEventListener('keyup',function () {
    GetData(searchByWord.value);
});

/* Search to get movies */

let SearchInViewed = document.getElementById('searchInViewed')

SearchInViewed.addEventListener('keyup',function () {
    let AllMovies = document.querySelector('#allMovies');
    let x =  SearchInViewed.value;
    let imgSrc = `https://image.tmdb.org/t/p/w500`;
    let movies =``;
    for(let i = 0; i<Results.length;i++){
        if(Results[i].title?.toLowerCase().includes(x.toLowerCase()) == true){
            movies += `
                <div class="col-md-3 col-sm-6">
                    <div class="moveiImg">
                        <img src="${imgSrc}${Results[i].poster_path}" alt="">
                        <div class="movei-Info">
                            <h2 class="title text-center fw-bold">${Results[i].title?Results[i].title:Results[i].name}</h1>
                            <p class="overview">${Results[i].overview}</p>
                            <span class="rate "><strong>Rate:</strong> ${Results[i].vote_average}</span>
                            <span class="release_date"><strong>Release_Date:</strong> ${Results[i].release_date?Results[i].release_date:Results[i].first_air_date}</span>
                        </div>
                    </div>
                </div>
                `
        }
    }
    AllMovies.innerHTML = movies;
    
})

/* To Get Movies From Menu */
let TypeOfApi =Array.from(document.getElementsByClassName('Api'));
let  Api;

for( let i = 0 ;i <TypeOfApi.length; i++){

    TypeOfApi[i].addEventListener('click',function(e){
        Api = e.target.getAttribute('id');
        GetData(Api);
    })
}

/* End Moveidb Api */

/* Start Countact Us */

let userNameInput = document.getElementById('userName');
let userEmailInput = document.getElementById('userEmail');
let userPhoneInput = document.getElementById('userPhone');
let userMessageInput = document.getElementById('userMessage');


let alertNameInput = document.getElementById('alertName');
let alertEmailInput = document.getElementById('alertEmail');
let alertPhoneInput = document.getElementById('alertPhone');
let alertMessageInput = document.getElementById('alertMessage');

let Btn = document.getElementById('mainBtn');

// Validation
// User Name
function validateUserName(){
    let regex = /^([A-z ]{3,15})$/;
    
    if(regex.test(userNameInput.value) == true){
        Btn.disabled =!1;
        userNameInput.classList.add('is-valid');
        userNameInput.classList.remove('is-invalid');
        alertNameInput.classList.add('d-none');
        return true;
    }
    else{
        Btn.disabled =!0;
        userNameInput.classList.add('is-invalid');
        userNameInput.classList.remove('is-valid');
        alertNameInput.classList.remove('d-none');
        
        return false;
    }
}
userNameInput.addEventListener('keyup',function () {
    validateUserName();
})

// User Email
function validateUserEmail(){
    let regex = /^([A-z][.A-z]{2,15}[0-9]{0,4}@(gmail|yahoo|outlook).com)$/;
    if(regex.test(userEmailInput.value) == true){
        Btn.disabled =!1;
        userEmailInput.classList.add('is-valid');
        userEmailInput.classList.remove('is-invalid');
        alertEmailInput.classList.add('d-none');
        return true;
    }
    else{
        Btn.disabled =!0;
        userEmailInput.classList.add('is-invalid');
        userEmailInput.classList.remove('is-valid');
        alertEmailInput.classList.remove('d-none');
        
        return false;
    }
}
userEmailInput.addEventListener('keyup',function () {
    validateUserEmail();
})

// User Phone
function validateUserPhone(){
    let regex = /^(010|011|012)[0-9]{8}$/;
    if(regex.test(userPhoneInput.value) == true){
        Btn.disabled =!1;
        userPhoneInput.classList.add('is-valid');
        userPhoneInput.classList.remove('is-invalid');
        alertPhoneInput.classList.add('d-none');
        return true;
    }
    else{
        Btn.disabled =!0;
        userPhoneInput.classList.add('is-invalid');
        userPhoneInput.classList.remove('is-valid');
        alertPhoneInput.classList.remove('d-none');
        
        return false;
    }
}
userPhoneInput.addEventListener('keyup',function () {
    validateUserPhone();
})

// User Message
function validateUserMessage(){
    let regex = /^([A-z ]{3,200})$/;
    if(regex.test(userMessageInput.value) == true){
        Btn.disabled =!1;
        userMessageInput.classList.add('is-valid');
        userMessageInput.classList.remove('is-invalid');
        alertMessageInput.classList.add('d-none');
        return true;
    }
    else{
        Btn.disabled =!0;
        userMessageInput.classList.add('is-invalid');
        userMessageInput.classList.remove('is-valid');
        alertMessageInput.classList.remove('d-none');
        
        return false;
    }
}
userMessageInput.addEventListener('keyup',function () {
    validateUserMessage();
})


// Submit
let Form = document.getElementById('form');

document.getElementById('ContactUs').addEventListener('click',function () {
    Form.addEventListener('submit',function(e){
        e.preventDefault();
    
        if(validateUserName() == true && validateUserEmail() == true && validateUserPhone() == true && validateUserMessage() == true){
            Btn.disabled =!1;
        }
        else{
            Btn.disabled=!0;
        }
    })
});
