let row = document.querySelector(".row");
let FAVS_URL = "  http://localhost:8000/favs";

async function getfavData() {
  row.innerHTML = "";
  const res = await axios(FAVS_URL);
  const data = res.data;
  data.forEach((element) => {
    row.innerHTML += `
       <div class="col col-md-6 col-lg-4 product-card">
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
                 
                  <i class="fa-regular fa-trash-can" onclick=deleteElement(${element.id})></i>
                
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

getfavData();

async function deleteElement(id, btn) {
  await axios.delete(`${FAVS_URL}/${id}`);
  btn
    .parentElemenet()
    .parentElemenet()
    .parentElemenet()
    .parentElemenet()
    .remove();
}
