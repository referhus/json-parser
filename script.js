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
  ev.preventDefault();
  if (typeof(data) === 'object') {
   let fields = data.fields,
       buttons = data.buttons; 

   console.log(buttons);

   app.innerHTML= 'блабла';
   createBtn.disabled = true;

  } else {
   console.log('вы не загрузили файл')
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