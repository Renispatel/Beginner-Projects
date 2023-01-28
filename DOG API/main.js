let timer
let  deleteFirstPhotoDelay

async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();
  createBreedList(data.message);
}

start()

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
    <select onchange= "loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</option>`
        }).join("")}
    </select>`
}

async function loadByBreed(breed) { 
    if(breed != "Choose a dog breed"){
       const img = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
       const data = await img.json();
       createSlideShow(data.message);
    }
}

function createSlideShow(images){
    let currentposition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    
    if(images.length > 1){
        document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    `
    currentposition += 2
    if (images.length == 2) currentposition = 0;
    timer = setInterval(nextSlide, 3000);
    } else {
    document.getElementById("slideshow").innerHTML = `
    <div class="slide"></div>
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    `
    }

    function nextSlide() {
        document.getElementById("slideshow").insertAdjacentHTML("beforeend" ,`<div class="slide" style="background-image: url('${images[currentposition]}');"></div>`);
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        }, 1000);

        console.log(currentposition)

        if(currentposition + 1>= images.length) {
            currentposition = 0;
        }
        else{
            currentposition++
        }
    }
}

//Edge cases


