//costanti
const row = document.querySelector(".row");

const arrOfLibrary = () => {
  fetch(" https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      //risposta
      //   console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        if (response.status) {
          throw new Error(response.status + response.statusText);
        }

        throw new Error("Generic Error");
      }
    })
    .then((dataLibrary) => {
      //ricevo array
      //   console.log(dataLibrary); //array di oggetti
      const generateCard = function () {
        localStorage.setItem("dataLibrary", JSON.stringify(dataLibrary));
        
        dataLibrary.forEach((book) => {
          const col = document.createElement("div");
          col.classList.add("col");

          col.innerHTML = `<div class="card mb-4">
           <img src=${book.img} class="card-img-top" alt="img-library">
           <div class="card-body">
             <h5 class="card-title ">${book.title}</h5>
             <p class="card-text">${book.price}</p>
             <a href="#" class="btn  btn-primary">Scarta</a>
             <a href="#" class="btn btn2  btn-primary">Carrello</a>
           </div>
         </div>`;

          row.appendChild(col);
        });
      };
      generateCard();
      const btn = document.querySelectorAll(".btn");
      btn.forEach((el) => {
        el.addEventListener("click", function (e) {
          const card = this.parentNode.parentNode.parentNode;
          const title = this.parentNode.firstElementChild.innerHTML;
          const objStorageSring = localStorage.getItem("dataLibrary");
          const objStorage = JSON.parse(objStorageSring);
          //   console.log(objStorageSring);
          console.log(objStorage);
          //   console.log(title);

          const indexObjStorage = objStorage.findIndex(
            (obj) => obj.title === title
          );
          console.log(indexObjStorage);

          if (indexObjStorage !== -1) {
            objStorage.splice(indexObjStorage, 1);
            // localStorage.removeItem("dataLibrary")
            localStorage.setItem("dataLibrary2", JSON.stringify(objStorage));
          }
          setTimeout(() => {
            card.remove();
          }, 200);
        });
      });
      window.addEventListener("DOMContentLoaded", () => {
        const libraryStorage = localStorage.getItem("dataLibrary2");

        const libraryStorage2 = JSON.parse(libraryStorage);

        console.log(libraryStorage2);

        console.log("ciao");
        generateCard(libraryStorage2);
      });
    })
    .catch((error) => console.log(error));
};
window.onload = () => {
  arrOfLibrary();
};
