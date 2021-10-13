window.addEventListener("DOMContentLoaded", () => {

 const createBtn = document.querySelector('.submit-create'),
       clearBtn = document.querySelector('.submit-clear'),
       inputFile = document.querySelector('.file'),
       app = document.querySelector('.app');

 let file,
     data,
     label,
     textarea,
     input;

 
 //ЗАГРУЗКА ФАЙЛА
 inputFile.addEventListener('change', () => {
  file = inputFile.files[0]

  if ((file.type !== "text/javascript") && (file.type !== "application/x-javascript")) {
   console.log("Вы загрузили не JSON файл. Попробуйте заново!")
  } 
  
  upload(file)

  inputFile.disabled = true;

 });

//КЛИК ПО КНОПКЕ СОЗДАТЬ
  createBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    app.innerHTML= '';
    let title,
        fields,
        btns,
        ref,
        value,
        keys;

    if (typeof(data) === 'object') {
      createBtn.disabled = true;

      Object.keys(data).forEach(key => {
        switch (key) {
        case "name":
         title = data[key];
         createTitle(title)
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

      iterateObj()
    } else {
      app.innerHTML ='вы не загрузили файл';
    }
 
  });

//КЛИК ПО КНОПКЕ ОЧИСТИТЬ
  clearBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    app.innerHTML= 'Данные очищены. Выберите новый файл';
    file = '';
    createBtn.disabled = false;
    inputFile.disabled = false;

  });

//ФУНКЦИИ

//ПАРСИНГ ФАЙЛА 
  function upload(file) {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      data = JSON.parse(reader.result);
    }

  }

  //ПЕРЕБОР ЭЛЕМЕНТОВ ФАЙЛА
  function iterateObj(obj, value) {

    const keys = Object.keys(data);
    data[keys[1]].forEach((elem, i) => {
    const fieldsKeys = Object.keys(elem);
    fieldsKeys.forEach((el, i) => {
     switch (el) {
      case "label":
      createLabel(elem, el)
       break;
      case "input":
      createInput(elem, el)
       break;
      default:
      console.log('ошибка')
       break;
     }
    });
   });

   //  data[keys[2]].forEach((elem, i) => {
   //  const refKeys = Object.keys(elem);
   //  refKeys.forEach(el => {
   //     switch (el) {
   //      case "input":
   //      createInput(elem, el)
   //       break;
   //     }
   //   createLink(elem, el)
   //  });
   // });

    data[keys[3]].forEach((elem, i) => {
    const btnKeys = Object.keys(elem);
    btnKeys.forEach(el => {
     switch (el) {
      case "text":
      createButtons(elem, el)
       break;
      default:
       console.log('ошибка')
       break;
     }
    });
   });
  }

//СОЗДАЕМ ИМЯ ФОРМЫ 
  function createTitle(title) {
    const h2 = document.createElement('H2');
    h2.innerHTML = `${title}`;
    app.prepend(h2)
  }

//CОЗДАЕМ ЛЕЙБЛ
  function createLabel(elem, el) {
    label = document.createElement('label');
    label.innerHTML = `${elem[el]}`;
    app.append(label)
  }

//СОЗДАЕМ ИНПУТ
  function createInput(elem, el) {
    input = document.createElement('input');
    app.append(input);

    if(typeof(elem[el]) === 'object') {
      let key = Object.keys(elem[el]);

      key.forEach(i => {
        switch (i) {
        case "type":
         let id = createId()
         if(elem[el][i] === 'textarea') {
            textarea = document.createElement('textarea');
            app.removeChild(input)
            let value = Object.values(elem[el])
            textarea.setAttribute(`${key[1]}`, `${value[1]}`)
            app.append(textarea)
         } else {
           input.setAttribute(`${i}`, `${elem[el][i]}`) 
           input.setAttribute('id', `${id}`)
           if(label === true) {
             label.setAttribute('for', `${id}`)      
           } 
        }
        break;
        case "required":
         input.setAttribute(`${i}`, `${elem[el][i]}`)     
        break;
        case "checked":
         input.setAttribute(`${i}`, `${elem[el][i]}`)
        break;
        case "placeholder":
         input.setAttribute(`${i}`, `${elem[el][i]}`)
        break;
        case "filetype":
         createFileType(i, elem[el][i])
        break;
        case "technologies":
         createTechnology(i, elem[el][i])
        break;
        case "multiple":
         input.setAttribute(`${i}`, `${elem[el][i]}`)
        break;
        default:
         console.log('ошибка')
        break;
       } 
      });
    } 

  }

//СОЗДАЕМ КНОПКУ
  function createButtons(elem, el) {
    let button = document.createElement('button');
    button.innerHTML = `${elem[el]}`;
    app.append(button)
  }


//СОЗДАЕМ АТРИБУТ TYPEFILE 
  function createFileType(i, type) {

   let fileType = type.join('/');
   input.setAttribute('accept', `${fileType}`);
  }


//СОЗДАЕМ ТЕХНОЛОГИИ
  function createTechnology(i, technologies) {

    let tech = technologies;
    let formTech = document.createElement('form');
    formTech.className = 'formTech';
    app.removeChild(input);
    app.append(formTech);
    tech.forEach(i => {
      let id = createId()
      let checkboxTech = document.createElement('div');
      checkboxTech.className = 'technology';
      let inputTech = document.createElement('input');
      let labelTech = document.createElement('label');
      inputTech.setAttribute('type', 'checkbox');
      inputTech.setAttribute('name', 'technologies');
      inputTech.setAttribute('id', `${id}`);
      labelTech.setAttribute('for', `${id}`);
      labelTech.innerHTML = `${i}`;
      formTech.append(checkboxTech);
      checkboxTech.append(inputTech);
      checkboxTech.append(labelTech);
    })
  }

//СОЗДАЕМ ID ДЛЯ ИНПУТОВ И ЛЕЙБЛОВ
  function createId() {
    let random_start = 1;
    let random_end = 1000;
    allСycles = 20;
    let array= []
    for(i=random_start;i<=random_end;i++){
       array.push(i)
    }
    for(countCycles=1;countCycles<=allСycles;countCycles++){
        return(array.splice(Math.random()*array.length,1)[0])
    }

  }

});