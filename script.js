window.addEventListener("DOMContentLoaded", () => {

 const createBtn = document.querySelector('.submit-create'),
       clearBtn = document.querySelector('.submit-clear'),
       inputFile = document.querySelector('.file'),
       app = document.querySelector('.app');


 let file,
     data;

 
 //ЗАГРУЗКА ФАЙЛА
 inputFile.addEventListener('change', () => {
  file = inputFile.files[0]

  if ((file.type !== "text/javascript") && (file.type !== "application/x-javascript")) {
   console.log("Вы загрузили не JSON файл. Попробуйте заново!")
  } 
  
  upload(file)

 });

//КЛИК ПО КНОПКЕ СГЕНЕРИРОВАТЬ
 createBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
 
  let title = '',
      fields = '',
      btns = '',
      ref = '',
      value = '';

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
    app.innerHTML= ''
  });

//ФУНКЦИИ

//ПАРСИНГ ФАЙЛА 
  function upload(file) {
    const reader = new FileReader()

    reader.readAsText(file)

    reader.onload = () => {
      data = JSON.parse(reader.result)
    }

  }

  //ПЕРЕБОР ЭЛЕМЕНТОВ ФАЙЛА
  function iterateObj(obj, value) {

    const keys = Object.keys(data)
    data[keys[1]].forEach((elem, i) => {
    const fieldsKeys = Object.keys(elem);
    fieldsKeys.forEach(el => {
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
      console.log(el)
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


    // РАБОТАЕТ !!!!!!
  //   for(let i = 0; i < obj.length; i++) {

  //     for(let key in obj[i]) {

  //       let value = obj[i][key];
      
  //       if(typeof(value) === 'object') {
  //         iterateObj(value)     
  //       } else if(typeof(value) === 'array') {
  //         for(let key in value) {
  //           console.log(key)  
  //       }
  //       } else {
  //         console.log (value)
  //     switch(key) {
  //       case "label": 
  //       case "input":

  //     }
  //       }
  //     }
  //   }
  // }

//ИМЯ ФОРМЫ 
  function createTitle(title) {
    const h2 = document.createElement('H2');
    h2.innerHTML = `${title}`
    app.prepend(h2)
  }

//ЛЕЙБЛ
  function createLabel(elem, el) {
    const label = document.createElement('label');
    label.innerHTML = `${elem[el]}`
    label.setAttribute('for', 'input')
    app.append(label)
  }

//ИНПУТ
  function createInput(elem, el) {
    let input = document.createElement('input')
    input.setAttribute('id', 'input')
    app.append(input)

      if(typeof(elem[el]) === 'object') {
      const value = Object.keys(elem[el]);
      value.forEach(i => {
      // console.log(i)
      // console.log(elem[el][i])
      switch (i) {
      case "type":
       input.setAttribute(`${i}`, `${elem[el][i]}`)
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
      // case "filetype":

       break;
      default:
      console.log('ошибка')
       break;
     } 
     })
    } 

  }

// function createLink(elem, el) {
//   let link = document.createElement('a');
//   let span = document.createElement('span');
//   let twh = link.innerHTML;

//         switch (el) {
//           case "text":
//           span.innerHTML = `${elem[el]}`
//          break;
//         case "ref":
//         link.setAttribute('href', `${'#' + elem[el]}`)
//          break;
//         case "text without ref":
//         thw = `${elem[el]}`
//          break;
//         default:
//          console.log(elem[el])
//          break;
//        }
//   app.append(link)
//   link.append(span)
// }

  function createButtons(elem, el) {
    let button = document.createElement('button');
    button.innerHTML = `${elem[el]}`
    app.append(button)
  }

})