// its make a favourites meal array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// its fetch meals from api and return it
async function fetchMealsFromApi(url,value) {
    const response=await fetch(`${url+value}`);
    const meals=await response.json();
    return meals;
}





const closeIt= document.querySelector("#closing1");
const cl1=document.querySelector('#cl-btn');
const cl2=document.querySelector('#cl-btn2');





// its show's all meals card in main acording to search input value
function showMealList(){
    let inputValue = document.getElementById("my-search").value;
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals=fetchMealsFromApi(url,inputValue);

     
    
    meals.then(data=>{
        if (data.meals) {

           

            data.meals.forEach((element) => {
                let isFav=false;
                for (let index = 0; index < arr.length; index++) {
                    if(arr[index]==element.idMeal){
                        isFav=true;
                    }
                }
                if (isFav) {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-4">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                } else {
                    html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
                }  
            });

      


        } else {
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        document.getElementById("main").innerHTML = html;
    });


    }
 




//its shows full meal details in main
async function showMealDetails(id) {
    


    
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html="";
    await fetchMealsFromApi(url,id).then(data=>{
        html += `
          <div id="meal-details" class="mb-5" style="background-color: #d7ecdc; color: #0b0b0b; width: auto; ">
            <div id="closing1" class="closing"> &#10005; </div>
            <div id="meal-header" class="d-flex justify-content-around ">
              <div id="meal-thumbail" style="margin-top:5%">
                <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
              </div>
              <div id="details" style="justify-content: center;
              text-align: center;
              margin-top: 5%; margin-left:5%; ">
                <h3>${data.meals[0].strMeal}</h3><br>
                <h6>Category : ${data.meals[0].strCategory}</h6>
                <h6>Area : ${data.meals[0].strArea}</h6><br>
                <h4 style="font-style:normal; font-weight: 700;"> Ingredients </h4><br>
                <ol> ${data.meals[0].strIngredient1} ~ ${data.meals[0].strMeasure1} </ol>
                <ol> ${data.meals[0].strIngredient2} ~ ${data.meals[0].strMeasure2} </ol>
                <ol> ${data.meals[0].strIngredient3} ~ ${data.meals[0].strMeasure3} </ol>
                <ol> ${data.meals[0].strIngredient4} ~ ${data.meals[0].strMeasure4} </ol>
                <ol> ${data.meals[0].strIngredient5} ~ ${data.meals[0].strMeasure5} </ol>
                <ol> ${data.meals[0].strIngredient6} ~ ${data.meals[0].strMeasure6} </ol>
                <ol> ${data.meals[0].strIngredient7} ~ ${data.meals[0].strMeasure7} </ol>
                <ol> ${data.meals[0].strIngredient8} ~ ${data.meals[0].strMeasure8} </ol>
              </div>
            </div>
            <div id="meal-instruction" class="mt-3">
              <h5 class="text-center" style="font-size: 18px;">Instruction :</h5>
              <p>${data.meals[0].strInstructions}</p>
            </div>
            

          </div>
          <div class="text-center">
              <a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-outline-light mt-3" style="font-size: 14px; background: red;"> <i class="fa fa-youtube-play" aria-hidden="true"></i>
               Watch Video</a>
            </div>

          <div class="pr">  <a href="javascript:void(0);" onclick="printPageArea('printM')" class="btn btn-outline-light mt-3" style="font-size: 14px; background: green;"> <i class="fa fa-print" aria-hidden="true"></i> Print</a>
            </div>
        `;

       
    });

   

    // document.getElementById("main").innerHTML=html;


     
        document.getElementById("main").innerHTML=html;
   
     

    // document.querySelector('#closing1').onclick = () =>{
    //     document.querySelector('#cl-btn').classList.add('hidden2');
    // }



    document.querySelector("#closing1").addEventListener("click", function(){
        document.querySelector('#cl-btn').classList.add('hidden2');
        document.location.reload(true); 

     });
    //     
    //     //.
    //      screen.main.classList.remove("hidden");
    //     //  screen.recipe.querySelector(".thumbnail img").src = "";
    //     // screen.recipe.querySelector(".details h2").innerText = "";
    //     // screen.recipe.querySelector(".details ul").innerHTML = "";
    //     // screen.recipe.querySelector(".details ol").innerHTML = "";
    //     cl1.classList.remove('hidden2');
       
    //     }
    //     else{
    //         cl1.classList.add('hidden2');
           
    //     }
// });
     
    
}




// its shows all favourites meals in favourites body
async function showFavMealList() {
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html="";
    if (arr.length==0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">Sorry!</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            await fetchMealsFromApi(url,arr[index]).then(data=>{
                html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <button type="button" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                            <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" style="border-radius:50%"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                `;
            });   
        }
    }
    document.getElementById("favourites-body").innerHTML=html;
}






//its adds and remove meals to favourites list
function addRemoveToFavList(id) {
    let arr=JSON.parse(localStorage.getItem("favouritesList"));
    let contain=false;
    for (let index = 0; index < arr.length; index++) {
        if (id==arr[index]) {
            contain=true;
        }
    }
    if (contain) {
        let number = arr.indexOf(id);
        arr.splice(number, 1);
        // alert("You removed the meal from the list.");
        swal("Removed!", "You removed the meal from the list!", "success");
    } else {
        arr.push(id);
        // alert("Meal added to favourites list.");
        swal("Added!", "Meal added to favourites list!", "success");

    }
    localStorage.setItem("favouritesList",JSON.stringify(arr));
    showMealList();
    showFavMealList();
}


