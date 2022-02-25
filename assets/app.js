let inputName = document.querySelector('.input_name');
let inputDate = document.querySelector('.input_date');
let inputStatus = document.querySelector('.filter-todo');
let table = document.querySelector('table');
let submitButton = document.querySelector('.todo-button');
let filterSelect = document.querySelector('.filter-todo2');
let sortBtn = document.querySelector('.sort');

let edit_mode = false; //indicates if we add or edit toDo on click
let edit_row;
let AllToDos = [];
submitButton.addEventListener('click', addEditTodo);

class ToDo {
	constructor(_name, _date, _status) {
		this.name = _name;
		this.date = _date;
		this.status = _status;
	}
}

function addEditTodo(e) {
	e.preventDefault();
	if (edit_mode === false) {
		let toDo = new ToDo(inputName.value, inputDate.value, inputStatus.value);
		inputName.value = '';
		inputDate.value = '';
		inputStatus.value = '';
		console.log(toDo);
		AllToDos.push(toDo);
		let tr = table.insertRow();
		tr.classList.add('todo');
		console.log(tr.rowIndex);

		let td1 = tr.insertCell(0);
		let td2 = tr.insertCell(1);
		let td3 = tr.insertCell(2);
		let td4 = tr.insertCell(3);
		let td5 = tr.insertCell(4);
		td1.innerHTML = `Name:<br> ${toDo.name}`;
		td2.innerHTML = `Date:<br> ${toDo.date}`;
		td3.innerHTML = `Status:<br> ${toDo.status}`;
		let btn = document.createElement('button');
		td4.appendChild(btn);
		btn.innerHTML = `<i class="fas fa-trash">`;
		btn.classList.add('trash-btn');
		btn.addEventListener('click', deleteToDo);
		let editBtn = document.createElement('button');
		editBtn.innerHTML = `<i class="fas fa-edit"></i> edit`;
		editBtn.classList.add('edit-btn');
		td5.appendChild(editBtn);
		editBtn.addEventListener('click', editToDo);

		// inputStatus.addEventListener('change', () => {
		// 	AllToDos.map((el) => {
		// 		if ((el.textContent = 'completed'.toLocaleUpperCase())) {
		// 		//	console.log('ok');
		// 			editBtn.innerHTML = `<i class="fas fa-check"></i>`;
		// 			editBtn.style.backgroundColor = 'green';
		// 		}else{
		//       editBtn.innerHTML = `<i class="fas fa-edit"></i> edit`;
		//     }
		// 	});
		// });
		//_________________
		filterSelect.addEventListener('change', () => {
			AllToDos.map((el) => {
				if (filterSelect.value === el.status) {
					console.log('ednakvo');
					tr.style.display = 'block'
				}else if(filterSelect.value !== el.status){
         tr.style.display = 'none'
          console.log('ne e ednakvo')
        }else{
          console.log('ova e all')
          tr.style.display = 'block'
        }
			});
		});

    
		//___________________________________-
		function sortByDate() {
		 
		  function dynamicSort(property) {
       // table.remove()
		    var sortOrder = 1;
		    if(property[0] === "-") {
		        sortOrder = -1;
		        property = property.substr(1);
		    }
		    return function (a,b) {		       
		        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		        return result * sortOrder;
		    }
		}
		let sortTodo = AllToDos.sort(dynamicSort('-name'))
	
		   sortTodo.forEach(el=>{
		    let td1 = tr.insertCell(0);
				let td2 = tr.insertCell(1);
				let td3 = tr.insertCell(2);
				let td4 = tr.insertCell(3);
				let td5 = tr.insertCell(4);
				td1.innerHTML = `Name:<br> ${el.name}`;
				td2.innerHTML = `Date:<br> ${el.date}`;
				td3.innerHTML = `Status:<br> ${el.status}`;
				let btn = document.createElement('button');
				td4.appendChild(btn);
				btn.innerHTML = `<i class="fas fa-trash">`;
				btn.classList.add('trash-btn');
				btn.addEventListener('click', deleteToDo);
				let editBtn = document.createElement('button');
				editBtn.innerHTML = `<i class="fas fa-edit"></i> edit`;
				editBtn.classList.add('edit-btn');
				td5.appendChild(editBtn);
				editBtn.addEventListener('click', editToDo);
		    td1.innerHTML = `Name:<br> ${el.name}`;
				td2.innerHTML = `Date:<br> ${el.date}`;
				td3.innerHTML = `Status:<br> ${el.status}`
		   })

		// debugger;
		  console.log('ok')
		  console.log(AllToDos)
		}
		sortBtn.addEventListener('click',sortByDate)

		//console.log(toDo.status)
	} else {
		AllToDos[edit_row - 1].name = inputName.value;
		AllToDos[edit_row - 1].date = inputDate.value;
		AllToDos[edit_row - 1].status = inputStatus.value;
		let allTr = table.querySelectorAll('tr');
		let tr = allTr[edit_row];
		let allTd = tr.querySelectorAll('td');
		allTd[0].innerText = inputName.value;
		allTd[1].innerText = inputDate.value;
		allTd[2].innerText = inputStatus.value;
		edit_mode = false;
		submitButton.innerHTML = `<i class="fas fa-plus-square"></i>`;
		inputName.value = '';
		inputDate.value = '';
		inputStatus.value = '';
		//btn.classList.add('.todo-button')
	}
}

function editToDo(e) {
	edit_mode = true;
	submitButton.innerHTML = `save edit <i class="far fa-save"></i>`;
	let tr = e.currentTarget.parentNode.parentNode;
	edit_row = tr.rowIndex;
	inputName.value = AllToDos[tr.rowIndex - 1].name; 
	inputDate.value = AllToDos[tr.rowIndex - 1].date;
	inputStatus.value = AllToDos[tr.rowIndex - 1].status;
}

function deleteToDo(e) {
	let tr = e.currentTarget.parentNode.parentNode;
	let index = tr.rowIndex;
	AllToDos.splice(index - 1, 1);
	console.log(AllToDos);

	tr.remove();
}


