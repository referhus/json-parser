window.addEventListener("DOMContentLoaded", () => {

 const createBtn = document.querySelector('.submit-create'),
       clearBtn = document.querySelector('.submit-clear'),
       inputFile = document.querySelector('.file'),
       app = document.querySelector('.app');

 let file,
     data;
 
 inputFile.addEventListener('change', () => {
  file = inputFile.files[0]

  if ((file.type !== "text/javascript") && (file.type !== "application/x-javascript")) {
   console.log("Вы загрузили не JSON файл. Попробуйте заново!")
  } 
  
  upload(file)

 });

 createBtn.addEventListener('click', (ev) => {
  let title = '',
      fields = '',
      btns = '',
      ref = ''; 
      
  ev.preventDefault();

  if (typeof(data) === 'object') {
   createBtn.disabled = true;

   Object.keys(data).forEach(key => {
    switch (key) {
    case "name":
      title = data[key];
      break
    case "fields":
      fields = data[key];
      break

    case "references":
      ref = data[key];
      break

    case "buttons":
      btns = data[key];
      break

    }
   })
  
   iterateObj(fields);

   function iterateObj(obj) {
     for(let key in obj) {
      console.log(key)
    } 
   }

  } else {
   app.innerHTML ='вы не загрузили файл';
  }
 
 }, {once: true});

 clearBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  app.innerHTML= ''
  clearBtn.disabled = true;
 }, {once: true});

 function upload(file) {
  const reader = new FileReader()

  reader.readAsText(file)

  reader.onload = () => {
  data = JSON.parse(reader.result)

  }

 }

})