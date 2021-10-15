window.addEventListener("DOMContentLoaded", () => {

 const createBtn = document.querySelector('.submit-create'),
       clearBtn = document.querySelector('.submit-clear'),
       inputFile = document.querySelector('.file'),
       app = document.querySelector('.app');

 let file,
     data,
     label,
     textarea,
     input,
     form;

 
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
    form = document.createElement('form')
    form.className = "formFile"
    app.append(form)

    if (typeof(data) === 'object') {
      createBtn.disabled = true;

      Object.keys(data).forEach(key => {
        switch (key) {
        case "name":
         nameTitle = data[key];
         createTitle(nameTitle)
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
    app.innerHTML = ''
    let h2 = document.createElement('H2')
    h2.innerHTML = 'Форма очищена. Выберите новый файл'
    app.prepend(h2)
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
//FIELDS
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

//REFERENCES
    let twh = document.createElement('span');
    let link = document.createElement('a');
    form.append(twh)
    twh.after(link)

    data[keys[2]].forEach((elem, i) => {
    const refKeys = Object.keys(elem);
    refKeys.forEach((el, i) => {
       switch(el) {
        case 'input':
        createInput(elem, el)
        break;
        default:   
        createLink(elem[el], el, link, twh)
        break
       }

    });
   });

//BUTTONS
    data[keys[3]].forEach((elem, i) => {
    const btnKeys = Object.keys(elem);
    btnKeys.forEach(el => {
     switch (el) {
      case "text":
      createButtons(elem, el)
       break;
      default:
      return
       break;      
     }
    });
   });
}
//СОЗДАЕМ ИМЯ ФОРМЫ 
  function createTitle(nameTitle) {
    const h2 = document.createElement('H2');
    let title = nameTitle.replaceAll('_', ' ')
    h2.innerHTML = title;
    app.prepend(h2)
  }

//CОЗДАЕМ ЛЕЙБЛ
  function createLabel(elem, el) {
    label = document.createElement('label');
    label.innerHTML = `${elem[el]}`;
    form.append(label)
  }

//СОЗДАЕМ ИНПУТ
  function createInput(elem, el) {
    input = document.createElement('input');
    form.append(input);

    if(typeof(elem[el]) === 'object') {
      let key = Object.keys(elem[el]);

      key.forEach(i => {
        let value;
        let id = createId()
        switch (i) {
        case "type":
         switch (elem[el][i]) {
         case "textarea": 
            textarea = document.createElement('textarea');
            form.removeChild(input)
            value = Object.values(elem[el])
            textarea.setAttribute(`${key[1]}`, '')
            form.append(textarea)
          break
         case "color": 
          form.removeChild(input)
          value = Object.values(elem[el])
          createColors(key, value) 
          break 
         case "number": 
           input.setAttribute('id', `${id}`)
         default:
           input.setAttribute(`${i}`, `${elem[el][i]}`) 
          break;
           }
        break;  
        case "required":
        if (elem[el][i] === true) {
         input.setAttribute(`${i}`, '')
        }
        break;
        case "checked":
        if (elem[el][i] === true) {
         input.setAttribute(`${i}`, '')
        }
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
        if (elem[el][i] === true) {
         input.setAttribute(`${i}`, '')
        }
        break;
        case "mask":
        input.setAttribute('type', 'text')
        input.setAttribute('id', id)
        $(`#${id}`).mask(`${elem[el][i]}`);
        default:
        break;
       } 
      });
    } 

  }

//СОЗДАЕМ КНОПКУ
  function createButtons(elem, el) {
    let button = document.createElement('button');
    button.innerHTML = `${elem[el]}`;
    form.append(button)
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
    form.removeChild(input);
    form.append(formTech);
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

//СОЗДАЕМ ЦВЕТА
function createColors(key, value) {
  let select = document.createElement('select')
  form.append(select)
  let option = document.createElement('option')
  option.style.background = '#191919'
  option.setAttribute('hidden', '')
  option.setAttribute('disabled', '')
  option.setAttribute('selected', '')
  option.innerHTML = 'Выберите цветовую схему';
  select.append(option)
  let colors = Object.values(value[1])
  colors.forEach(i => {
    let color = document.createElement('option')
    color.style.background = `${i}`
    color.innerHTML = i;
    select.append(color)
  })

}

//СОЗДАЕМ ССЫЛКУ 
  function createLink(key, value, link, twh) {

    switch (value) {
      case "text":
      link.innerHTML = `${key}`
      break;
      case "ref":
      link.setAttribute('href', `${'#' + key}`)
      break;
      case "text without ref":
      twh.innerHTML = `${key}`
      break;
      default:
      break;
     }
  }

//СОЗДАЕМ ID ДЛЯ ИНПУТОВ И ЛЕЙБЛОВ
  function createId() {
    let random_start = 1;
    let random_end = 500;
    allСycles = 10;
    let array= []
    for(i=random_start;i<=random_end;i++){
       array.push(i)
    }
    for(countCycles=1;countCycles<=allСycles;countCycles++){
        return(array.splice(Math.random()*array.length,1)[0])
    }

  }

});