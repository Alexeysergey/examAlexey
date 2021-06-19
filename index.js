const SearchHtml = search;
const PaginationHtml = pagination;

let total = 0;
let page = 1;
let mas = [];
SearchHtml['input_word'].addEventListener('input', (e) => {
  if(e.target.value) {
    unlockControl();
  } else {
    PaginationHtml['prev'].setAttribute('disabled', 'disabled');
    PaginationHtml['next'].setAttribute('disabled', 'disabled');
  }
});

PaginationHtml['per_page'].addEventListener('change', (e) => {
  showImg(0);
});

PaginationHtml['prev'].addEventListener('click', (e) => {
  if(page - 1 === 1) {
    e.target.setAttribute('disabled', 'disabled');
  } 

  PaginationHtml['next'].removeAttribute('disabled');
  showImg(-1);
});

PaginationHtml['next'].addEventListener('click', (e) => {
  const perPage = PaginationHtml['per_page'].value;
  if((page + 1) * perPage >= total) {
    e.target.setAttribute('disabled', 'disabled');
  } 

  PaginationHtml['prev'].removeAttribute('disabled');
  showImg(1);
});

SearchHtml.addEventListener('submit', (e) => {
  e.preventDefault();
  showImg(0);
});

PaginationHtml.addEventListener('submit', (e) => {
  e.preventDefault();
});



function showImg(_page) {
  if(_page > 0) {
    page++;
  } else if(_page < 0) {
    page--;
  } else {
    page = 1;
  }

  const keyWord = SearchHtml['input_word'].value;
  const perPage = PaginationHtml['per_page'].value;


  searchImg(keyWord, perPage, page, (data) => {
    total = data.total;

    unlockControl();

    document.querySelector('span.total').innerText = `page ${page} / ${total / perPage}`;
    console.log(data.hits);
    document.querySelector('.content').innerHTML = data.hits.reduce((html, item) => {
      const str = localStorage.getItem("mas");
      if(str){
          mas = JSON.parse(str);
      
      }
      let o = false;
      for(let i=0; i< mas.length;i++){
        if (mas[i] == item.id){
          o=true;
          
          break;
        }
      }

      
     
      return html + `  
      <div class="img_wrapper">
          
          <a href="${item.largeImageURL}"><img src="${item.previewURL}" data-src="${item.largeImageURL}" id="${item.id}"/></a>
          <div class="buttons"> 
           <button class="view" id="${item.id}" >
         
          view
        </button> 
        <button class="btn_like" id="${item.id}" data-bg="${o}">
           
            like
        </button>
      </div>
  </div>
   `
    }, '');



    console.log(document.querySelectorAll('.btn_like'));
    let btmas = document.querySelectorAll('.btn_like');
    let likeRed = document.querySelectorAll('.like')
  
    btmas.forEach( (e) => {

      console.log(e.getAttribute('data-bg'));
       if(e.getAttribute('data-bg')==='true'){
        e.setAttribute('style', 'background-color:red;');
       }
       if(e.getAttribute('style')){
        console.log(e.getAttribute('style'));

       }
       

      e.addEventListener('click', (e) => {


          if (e.target){
            e.target.setAttribute('style', 'background-color:red;');
            
            console.log(e.target.id);
            mas.push(e.target.id);
            let locstor = JSON.stringify(mas);
            localStorage.setItem('mas', locstor);
          }

          
    })


  });


})
}



function unlockControl() {
  if(page > 1) {
    PaginationHtml['prev'].removeAttribute('disabled');
  } else {
    PaginationHtml['prev'].setAttribute('disabled', 'disabled');
  }

  const perPage = PaginationHtml['per_page'].value;
  if (page * perPage < total) {
    PaginationHtml['next'].removeAttribute('disabled');
  } else {
    PaginationHtml['next'].setAttribute('disabled', 'disabled');
  }
}

    const imgSize = document.querySelector('img');
    // const buttonView = document.querySelector('.view');

