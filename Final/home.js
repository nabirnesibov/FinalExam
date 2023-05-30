let BASE_URL = "http://localhost:8000/cards";
let FAVS_URL = "  http://localhost:8000/favs";

let row =document.querySelector(".products")
let search =document.querySelector("#search")
let sort =document.querySelector(".sort")
let loadbtn =document.querySelector(".loadmore")
let header =document.querySelector("header")
let menuIcon = document.querySelector(".menu");
let nav = document.querySelector("nav");

menuIcon.addEventListener("click", function () {
  nav.classList.toggle("show");

  this.classList.contains("fa-bars")
    ? (this.classList = "fa-solid fa-xmark")
    : (this.classList = "fa-solid fa-bars");
});



let allData=[];
let filtered=[];
let arr=[];
let max=3;


async function getAllData(){
    row.innerHTML='';
    let res= await axios(BASE_URL)
    let data = await res.data;
    allData=data;
    filtered= filtered.length || search.value ? filtered :data;
    filtered.slice(0,max).forEach(element => {
        row.innerHTML += `
        <div class="col col-md-6 col-lg-4 product-card mt -5">
            <div class="product-card-div">
                <div class="img-div">
                  <img src="${element.photo}" alt="" />
                  <div class="featured">
                     FEATURED
                  </div>
                  <h2 class="text-center">${element.title}</h2>
                  <p class="text-center">
                  ${element.content}</p>
                </div>
                <div class="img">
                   <div class="img-pictures">
                     <div>
                        <strong>Bedroom</strong><br>
                        <img src="./assets/img/bedroom.png"  alt= "" class="text-center" >
                        <span>4</span>
                    </div>
                    <div>
                        <strong>Bathrooms</strong><br>
                        <img src="./assets/img/shower.png" alt="" class="text-center" >
                        <span>3</span>
                    </div>
                    <div>
                        <strong>Area</strong><br>
                        <img src="./assets/img/area.png" alt="" class="text-center" >
                        <span>7100 </span>
                    </div>
                   </div>
                   <div class="d-flex">
                    <div>
                        <strong>Patio</strong><br>
                        <img src="./assets/img/patio.png" alt="" class="text-center" >
                        <span>1</span>
                   </div>
                   <div >
                        <strong>Garage</strong><br>
                        <img src="./assets/img/garage.png" alt="" class="text-center" >
                        <span>2</span>
                   </div>
                   </div>
                </div>
                <div class="actions">
                  <a href="addvsedit.html?id=${element.id}"><i class="fa-regular fa-pen-to-square"></i></a>
                  <i class="fa-regular fa-trash-can" onclick=${element.id}></i>
                  <i class="fa-regular fa-heart" onclick=addFav(${element.id})></i>
                       <a href="details.html?id=${element.id}"><i class="fa-solid fa-circle-info"></i></a>
                </div>
               <div class="money mt-4">
                   <div class="row ">
                    <div class="col-6 d-flex justify-content-center">
                        <img src="./assets/img/tag.svg" alt="" width="50px">
                    </div>
                    <div class="col-6">
                        <p class="text-light">For Sale</p>
                        <h3 class="text-light">$${element.price}</h3>
                    </div>
                   </div>
               </div>
              </div>

          </div>
        
        `;
    });
}

getAllData()


async function deleteEl(id,btn){
    await axios.delete(`${BASE_URL}/${id}`)
    btn.parentElemenet().parentElemenet().parentElemenet().parentElemenet().remove()
    deleteFavEl(id)
}

async function deleteFavEl(id){
   let res= await axios(FAVS_URL)
   let data =res.data
   let check = data.find(item=>item.id==id)
   if(check){
     await axios.delete(`${FAVS_URL}/${id}`)
   }

}


search.addEventListener("input", (e) => {
    console.log("ssssss")
  filtered = allData.slice(0, max).filter((item) => {
    return item.title
      .trim()
      .toLocaleLowerCase()
      .includes(e.target.value.trim().toLocaleLowerCase());
  });
  arr = filtered;
  getAllData();
});

sort.addEventListener("click", (e) => {
  e.preventDefault();
  if (sort.innerHTML == "Ascending") {
    sort.innerHTML = "Descending";
    filtered = filtered.slice(0, max).sort((a, b) => a.price - b.price);
  } else if (sort.innerHTML == "Descending") {
    sort.innerHTML = "Default";
    filtered = filtered.slice(0, max).sort((a, b) => b.price - a.price);
  } else {
    filtered = arr;
    sort.innerHTML = "Ascending";
  }
  getAllData();
});

loadbtn.addEventListener("click", () => {
  max += 4;
  filtered = allData.slice(0, max).filter((item) => {
    return item.title
      .trim()
      .toLocaleLowerCase()
      .includes(search.value.trim().toLocaleLowerCase());
  });
  arr = filtered;
  if (allData.length <= max) {
    loadbtn.disabled = true;
    loadbtn.style.opacity = 0.5;
  }
  getAllData();
});



  async function addFav(id) {
    const res = await axios(`${BASE_URL}/${id}`);
    const data = await res.data;
    const res2 = await axios(FAVS_URL);
    const data2 = await res2.data;
    let check = data2.find((item) => item.id == id);
    if (!check) {
      await axios.post(FAVS_URL, data);
    } else {
      alert("O bir defe olur qaqa!");
    }
  }


  function scrollFunc() {
    if (
      document.body.scrollTop >700||
      document.documentElement.scrollTop > 700
    ) {
      header.style.backgroundColor = "rgb(6, 6, 72)";
      header.style.position = "fixed";
      header.style.width = "100%";
      header.style.zIndex = 55;
    } else {
      header.style.backgroundColor = "";
      header.style.position = "fixed";
    }
  }

  window.onscroll = function () {
    scrollFunc();
  };