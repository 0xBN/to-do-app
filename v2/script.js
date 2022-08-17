console.log("Project: ToDo List v2");

// Categories
const categoryBtns = document.querySelectorAll("[data-category-button]");
const categoryTitle = document.querySelector("[data-current-list]");

// Form Elements
const newToDoBtn = document.querySelector("[data-new-todo-button]");
const newToDoForm = document.querySelector(".new-todo-area");
const collapseFormBtn = document.querySelector(
  "[data-collapse-new-todo-button]"
);
const submitToDoBtn = document.querySelector("[data-submit-new-todo]");
const clearFormBtn = document.querySelector("[data-clear-new-todo]");
const alertMsg = document.querySelector("[data-alert-message]");

// Form fields
const formTitle = document.getElementById("new-title");
const formDescription = document.getElementById("new-description");
const formDueDate = document.getElementById("new-due-date");
const formPriority = document.getElementById("new-priority");
const formNotes = document.getElementById("new-notes");
const formCategory = document.getElementById("new-category");

// Main To Do list
const toDoList = document.querySelector("[data-todo-list]");

// To do card buttons
const toggleExpansionBtns = document.querySelectorAll(".todo-container");
const editToDoBtns = document.querySelectorAll(".todo-container");
const deleteToDoBtns = document.querySelectorAll(".todo-container");

// Edit form
const editFormDueDate = document.querySelector(".edit-due-date");
const editTitle = document.querySelector(".edit-title");
const editDescription = document.querySelector(".edit-description");
const editPriority = document.querySelector(".edit-priority");
const editNotes = document.querySelector(".edit-notes");
const editCategory = document.querySelector(".edit-category");
const editToDoForm = document.querySelector("[data-edit-todo-area]");
const cancelEditBtns = document.querySelector("[data-cancel-edit]");
const submitEditBtn = document.querySelector("[data-submit-edit-todo]");

// Class: toDoCard
class ToDoCard {
  // Validations
  static priorityValidation = ["low", "medium", "high"];
  static categoryValidation = ["main", "home", "work", "chores"];

  constructor(dueDate, title, description, priority, notes, category) {
    this.dueDate = dueDate;
    this.title = title;
    this.description = description;
    !ToDoCard.priorityValidation.includes(priority)
      ? (this.priority = "low")
      : (this.priority = priority);
    this.notes = notes;
    !ToDoCard.categoryValidation.includes(category)
      ? (this.category = "main")
      : (this.category = category);
    this.localStorageIndex = localStorage.length + 1;
  }
}

// Class: UI to render
class UI {
  static cancelEditForm(event) {
    let itemIndex = event.target.dataset.cancelEditButton;
    console.log(itemIndex);
    // return;
    let editFields = document.querySelectorAll(
      `[data-form-field="${itemIndex}"]`
    );

    editFields.forEach((editField) => editField.classList.add("hidden"));

    // Make cancel button invisible
    const cancelBtn = document.querySelector(
      `[data-cancel-edit-button="${itemIndex}"]`
    );
    cancelBtn.classList.add("hidden");

    // make confirm button invisible
    const confirmBtn = document.querySelector(
      `[data-form-edit-button="${itemIndex}"]`
    );
    confirmBtn.classList.add("hidden");

    // make pencil button visible
    const pencilBtn = document.querySelector(
      `[data-edit-button="${itemIndex}"]`
    );
    pencilBtn.classList.remove("hidden");

    // make delete button visible
    const deleteBtn = document.querySelector(
      `[data-delete-button="${itemIndex}"]`
    );
    deleteBtn.classList.remove("hidden");
  }
  static expandForm() {
    // make new to do form visible
    newToDoForm.classList.remove("hidden");
    collapseFormBtn.classList.remove("hidden");

    // Hide new to do button
    newToDoBtn.classList.add("hidden");
  }

  static deleteToDo(event) {
    let deleteBtn = event.target;
    if (deleteBtn.hasAttribute("data-red-button")) {
      let toDoCard = deleteBtn.parentElement.parentElement.parentElement;
      toDoCard.remove();
    }
  }

  static expandEditForm(event) {
    const itemIndex = event.target.dataset.editButton;
    // Make visible all edit fields
    const editFormFields = document.querySelectorAll(
      `[data-form-edit="${itemIndex}"]`
    );
    editFormFields.forEach((editFormField) =>
      editFormField.classList.remove("hidden")
    );

    // Make visible confirm
    const confirmBtn = document.querySelector(
      `[data-form-edit-button="${itemIndex}"]`
    );
    confirmBtn.classList.remove("hidden");

    // Make visible cancel button
    const cancelBtn = document.querySelector(
      `[data-cancel-edit-button="${itemIndex}"]`
    );
    cancelBtn.classList.remove("hidden");

    // Hide edit pencil button
    const pencilBtn = document.querySelector(
      `[data-edit-button="${itemIndex}"]`
    );
    pencilBtn.classList.add("hidden");

    // Hide delete button
    const deleteBtn = document.querySelector(
      `[data-delete-button="${itemIndex}"]`
    );
    deleteBtn.classList.add("hidden");
  }

  static editToDo2(event) {
    // refactoring editToDo
    console.log("clicked confirm");
    let itemIndex = event.target.dataset.formEdit;

    let toDoItem = JSON.parse(localStorage.getItem(itemIndex));

    console.log(toDoItem);

    // refactor submitEditForm(event)

    const formDueDate = document.querySelector(
      `[data-form-field-due-date="${itemIndex}"]`
    );
    const formTitle = document.querySelector(
      `[data-form-field-title="${itemIndex}"]`
    );
    const formDescription = document.querySelector(
      `[data-form-field-description="${itemIndex}"]`
    );
    const formPriority = document.querySelector(
      `[data-form-field-priority="${itemIndex}"]`
    );
    const formNotes = document.querySelector(
      `[data-form-field-notes="${itemIndex}"]`
    );
    const formCategory = document.querySelector(
      `[data-form-field-category="${itemIndex}"]`
    );
    toDoItem.dueDate = formDueDate.value;
    toDoItem.title = formTitle.value;
    toDoItem.description = formDescription.value;
    toDoItem.priority = formPriority.value;
    toDoItem.notes = formNotes.value;
    toDoItem.category = formCategory.value;

    let toDoCard = JSON.stringify(toDoItem);
    console.log(toDoCard);
    localStorage.setItem(itemIndex, toDoCard);

    UI.generateAllHTMLcards();
  }

  static handleToDoCardClick(event) {
    console.log("editing version 2!!");

    let clickCancel = event.target.hasAttribute("data-cancel-edit-button");
    let clickConfirm = event.target.hasAttribute("data-form-edit-button");
    let clickEdit = event.target.classList.contains("edit");

    if (clickEdit) {
      this.expandEditForm(event);
    }

    if (clickConfirm) {
      this.editToDo2(event);
    }

    if (clickCancel) {
      this.cancelEditForm(event);
    }
  }

  static clickExpansionToggle(event) {
    let expBtn = event.target;
    if (!expBtn.classList.contains("expand-button")) return;
    let expandArea = expBtn.parentElement.nextSibling.nextSibling;
    if (expandArea.classList.contains("hidden")) {
      expandArea.classList.remove("hidden");
      expBtn.textContent = "-";
      expBtn.classList.add("red-button");
    } else {
      expandArea.classList.add("hidden");
      expBtn.textContent = "+";
      expBtn.classList.remove("red-button");
    }
  }

  static showAlert(message) {
    alertMsg.classList.remove("hidden");
    alertMsg.textContent = message;
    setTimeout(() => {
      alertMsg.classList.add("hidden");
    }, 3000);
  }

  static collapseForm() {
    newToDoForm.classList.add("hidden");
    collapseFormBtn.classList.add("hidden");
    newToDoBtn.classList.remove("hidden");
  }

  static clearForm() {
    formTitle.value = "";
    formDescription.value = "";
    formDueDate.value = "";
    formPriority.value = "";
    formNotes.value = "";
    formCategory.value = "";
  }
  static clickCategory(event) {
    const category = event.target.textContent;
    if (category === "All") {
      UI.showAllCards();
      return;
    }
    UI.hideAllCards();
    UI.filterByCategory(category);
  }

  static filterByCategory(category) {
    categoryTitle.textContent = category;
    const filterCards = document.querySelectorAll(
      `.category-${category.toLowerCase()}`
    );
    filterCards.forEach((card) => {
      card.classList.remove("hidden");
    });
  }

  static generateToDoCardHTML(toDoCard) {
    // convert each toDoCard into HTML
    const toDo_div = document.createElement("div");
    if (toDoCard.category !== "main") {
      toDo_div.classList.add("hidden");
    }
    toDo_div.classList.add(
      "generated-html",
      "todo-card",
      `category-${toDoCard.category}`
    );

    const navBar_div = document.createElement("div");
    navBar_div.classList.add("nav-bar");

    const expand_btn = document.createElement("button");
    expand_btn.classList.add("expand-button");
    expand_btn.textContent = "+";

    navBar_div.append(expand_btn);

    const cardShown_div = document.createElement("div");
    cardShown_div.classList.add("card-shown");

    const title_div = document.createElement("div");
    title_div.classList.add("title");

    // edit form
    const editTitle_div = document.createElement("input");
    editTitle_div.value = toDoCard.title;
    editTitle_div.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    editTitle_div.setAttribute(`data-form-field`, toDoCard.localStorageIndex);
    editTitle_div.setAttribute(
      `data-form-field-title`,
      toDoCard.localStorageIndex
    );
    editTitle_div.classList.add("hidden");

    const dueDate_div = document.createElement("div");
    dueDate_div.classList.add(
      "label",
      "due-date",
      `priority-${toDoCard.priority.toLowerCase()}`
    );
    dueDate_div.textContent = `Due ${toDoCard.dueDate}`;

    // edit form
    const editDueDate_div = document.createElement("input");
    editDueDate_div.value = toDoCard.dueDate;
    editDueDate_div.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    editDueDate_div.setAttribute(`data-form-field`, toDoCard.localStorageIndex);
    editDueDate_div.setAttribute(
      `data-form-field-due-date`,
      toDoCard.localStorageIndex
    );
    editDueDate_div.classList.add("hidden");

    const valueTitle_div = document.createElement("div");
    valueTitle_div.classList.add("value");
    valueTitle_div.textContent = toDoCard.title;

    title_div.append(
      dueDate_div,
      editDueDate_div,
      valueTitle_div,
      editTitle_div
    );
    cardShown_div.append(title_div);

    const cardDetails_div = document.createElement("div");
    cardDetails_div.classList.add("card-details", "hidden");

    const description_div = document.createElement("div");
    description_div.classList.add("description");
    const labelDescription_div = document.createElement("div");
    labelDescription_div.classList.add("label");
    labelDescription_div.textContent = "Description";
    const valueDescription_div = document.createElement("div");
    valueDescription_div.classList.add("value");
    valueDescription_div.textContent = toDoCard.description;

    // edit form
    const editDescription_div = document.createElement("input");
    editDescription_div.value = toDoCard.description;
    editDescription_div.setAttribute(
      `data-form-edit`,
      toDoCard.localStorageIndex
    );
    editDescription_div.setAttribute(
      `data-form-field`,
      toDoCard.localStorageIndex
    );
    editDescription_div.setAttribute(
      `data-form-field-description`,
      toDoCard.localStorageIndex
    );
    editDescription_div.classList.add("hidden");

    description_div.append(
      labelDescription_div,
      valueDescription_div,
      editDescription_div
    );

    const priority_div = document.createElement("div");
    priority_div.classList.add("priority");
    const labelPriority_div = document.createElement("div");
    labelPriority_div.classList.add("label");
    labelPriority_div.textContent = "Priority";
    const valuePriority_div = document.createElement("div");
    valuePriority_div.classList.add("value");
    valuePriority_div.textContent = toDoCard.priority;

    // edit form
    const editPriority_div = document.createElement("input");
    editPriority_div.value = toDoCard.priority;
    editPriority_div.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    editPriority_div.setAttribute(
      `data-form-field`,
      toDoCard.localStorageIndex
    );
    editPriority_div.setAttribute(
      `data-form-field-priority`,
      toDoCard.localStorageIndex
    );
    editPriority_div.classList.add("hidden");

    priority_div.append(labelPriority_div, valuePriority_div, editPriority_div);

    const notes_div = document.createElement("div");
    notes_div.classList.add("notes");
    const labelNotes_div = document.createElement("div");
    labelNotes_div.classList.add("label");
    labelNotes_div.textContent = "Notes";
    const valueNotes_div = document.createElement("div");
    valueNotes_div.classList.add("value");
    valueNotes_div.textContent = toDoCard.notes;

    // edit form
    const editNotes_div = document.createElement("input");
    editNotes_div.value = toDoCard.notes;
    editNotes_div.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    editNotes_div.setAttribute(`data-form-field`, toDoCard.localStorageIndex);
    editNotes_div.setAttribute(
      `data-form-field-notes`,
      toDoCard.localStorageIndex
    );
    editNotes_div.classList.add("hidden");

    notes_div.append(labelNotes_div, valueNotes_div, editNotes_div);

    const category_div = document.createElement("div");
    category_div.classList.add("category");
    const labelCategory_div = document.createElement("div");
    labelCategory_div.classList.add("label");
    labelCategory_div.textContent = "Category";
    const valueCategory_div = document.createElement("div");
    valueCategory_div.classList.add("value");
    valueCategory_div.textContent = toDoCard.category.toLowerCase();

    // edit form
    const editCategory_div = document.createElement("input");
    editCategory_div.value = toDoCard.category;
    editCategory_div.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    editCategory_div.setAttribute(
      `data-form-field`,
      toDoCard.localStorageIndex
    );
    editCategory_div.setAttribute(
      `data-form-field-category`,
      toDoCard.localStorageIndex
    );
    editCategory_div.classList.add("hidden");

    category_div.append(labelCategory_div, valueCategory_div, editCategory_div);

    const spacedButton_div = document.createElement("div");
    spacedButton_div.classList.add("spaced-buttons");

    const edit_btn = document.createElement("button");
    edit_btn.classList.add("edit");
    edit_btn.textContent = "✏️";
    edit_btn.setAttribute("data-edit-button", toDoCard.localStorageIndex);
    const delete_btn = document.createElement("button");
    delete_btn.classList.add("red-button");
    delete_btn.setAttribute("data-red-button", "");
    delete_btn.setAttribute(
      "data-local-storage-index",
      toDoCard.localStorageIndex
    );
    delete_btn.setAttribute(`data-delete-button`, toDoCard.localStorageIndex);
    delete_btn.textContent = "Delete";

    // edit form
    const confirmEdit_btn = document.createElement("button");
    confirmEdit_btn.textContent = "Confirm";
    confirmEdit_btn.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    confirmEdit_btn.setAttribute(
      `data-form-edit-button`,
      toDoCard.localStorageIndex
    );
    confirmEdit_btn.classList.add("hidden");

    const cancelEdit_btn = document.createElement("button");
    cancelEdit_btn.textContent = "Cancel";
    cancelEdit_btn.setAttribute(`data-form-edit`, toDoCard.localStorageIndex);
    cancelEdit_btn.setAttribute(
      `data-cancel-edit-button`,
      toDoCard.localStorageIndex
    );
    cancelEdit_btn.classList.add("hidden", "red-button");

    spacedButton_div.append(
      edit_btn,
      confirmEdit_btn,
      cancelEdit_btn,
      delete_btn
    );

    cardDetails_div.append(
      description_div,
      priority_div,
      notes_div,
      category_div,
      spacedButton_div
    );

    toDo_div.append(navBar_div, cardShown_div, cardDetails_div);

    return toDo_div;
  }
  static generateAllHTMLcards() {
    toDoList.textContent = "";

    let keys = Object.keys(localStorage);

    keys.forEach((key) => {
      let toDoCard = JSON.parse(localStorage.getItem(key));
      let toDoCard_div = UI.generateToDoCardHTML(toDoCard);
      UI.addToList(toDoCard_div);
    });
  }

  static addToDo(toDoCard) {
    console.log("creating div");
    UI.generateToDoCardHTML(toDoCard);
    toDoCard = UI.generateToDoCardHTML(toDoCard);
    UI.addToList(toDoCard);
  }

  static addToList(toDoCard) {
    toDoList.append(toDoCard);
  }

  static showAllCards() {
    const allCards = document.querySelectorAll(".todo-card");
    allCards.forEach((card) => {
      console.log("running function showAllCards()");
      card.classList.remove("hidden");
    });
  }

  static hideAllCards() {
    const allCards = document.querySelectorAll(".todo-card");
    allCards.forEach((card) => card.classList.add("hidden"));
  }
}

// Class: Store use this to store to localStorage
class Store {
  static addToDo(toDoCard) {
    let itemIndex = localStorage.length + 1;
    toDoCard.localStorageIndex = itemIndex;
    toDoCard = JSON.stringify(toDoCard);
    localStorage.setItem(itemIndex, toDoCard);
  }

  static deleteToDo(event) {
    let deleteBtn = event.target;
    if (deleteBtn.hasAttribute("data-red-button")) {
      let localStorageIndex = event.target.dataset.localStorageIndex;
      localStorage.removeItem(localStorageIndex);
    }
  }

  static submitNewToDo() {
    const dueDate = formDueDate.value;
    const title = formTitle.value;
    const description = formDescription.value;
    const priority = formPriority.value.toLowerCase();
    const notes = formNotes.value;
    const category = formCategory.value.toLowerCase();

    if (title === "" || dueDate == "") {
      UI.showAlert("Fill in: Title, Due Date");
      return;
    }

    const toDoCard = new ToDoCard(
      dueDate,
      title,
      description,
      priority,
      notes,
      category
    );

    UI.addToDo(toDoCard);
    Store.addToDo(toDoCard);
    UI.clearForm();
    UI.collapseForm();
    UI.showAlert("Submitted To Do!");
  }
}

// Event: Start up -> Generate all HTML, then display main only
document.addEventListener("DOMContentLoaded", UI.generateAllHTMLcards);
document.addEventListener("DOMContentLoaded", UI.filterByCategory("Main"));

// Event: New Form listening for expand, collapse, submit, or clear
newToDoBtn.addEventListener("click", UI.expandForm);
collapseFormBtn.addEventListener("click", UI.collapseForm);
submitToDoBtn.addEventListener("click", Store.submitNewToDo);
clearFormBtn.addEventListener("click", UI.clearForm);

// Event: Filter Category
categoryBtns.forEach((categoryBtn) =>
  categoryBtn.addEventListener("click", UI.clickCategory)
);

// Event: Individual ToDo Card Events
editToDoBtns.forEach((editToDoBtn) => {
  editToDoBtn.addEventListener("click", (e) => {
    UI.handleToDoCardClick(e);
  });
});

toggleExpansionBtns.forEach((toggleExpansionBtn) => {
  toggleExpansionBtn.addEventListener("click", (e) => {
    UI.clickExpansionToggle(e);
  });
});

deleteToDoBtns.forEach((deleteToDoBtn) => {
  deleteToDoBtn.addEventListener("click", (e) => {
    UI.deleteToDo(e);
    Store.deleteToDo(e);
  });
});

cancelEditBtns.addEventListener("click", UI.cancelEditForm);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// ARCHIVE
// //
// //
// //
// //
// //
// //
// //
// //

// // Finish creating classes and events labeled above.

// // Card
// // Edit each card
// // Handle dates

// // Category
// // Add new Categories
// // Remove categories
// // temporary to do card data
// const storedToDoList = [
//   {
//     dueDate: "8/1/22",
//     title: "Take out the trash",
//     description: "Upstairs, downstairs, living room",
//     priority: "High",
//     notes: "Done before 8pm or else",
//     category: "chores",
//   },
//   {
//     dueDate: "9/1/22",
//     title: "Work project",
//     description: "Need this programmed",
//     priority: "Medium",
//     notes: "Start drafting, refactored due in 3 days",
//     category: "work",
//   },
//   {
//     dueDate: "8/1/22",
//     title: "Take out the trash",
//     description: "Upstairs, downstairs, living room",
//     priority: "High",
//     notes: "Done before 8pm or else",
//     category: "home",
//   },
//   {
//     dueDate: "8/1/22",
//     title: "Take out the trash",
//     description: "Upstairs, downstairs, living room",
//     priority: "High",
//     notes: "Done before 8pm or else",
//     category: "main",
//   },
//   {
//     dueDate: "8/1/22",
//     title: "Take out the trash",
//     description: "Upstairs, downstairs, living room",
//     priority: "Low",
//     notes: "Done before 8pm or else",
//     category: "main",
//   },
// ];

// function submitEditForm(event) {
//     console.log("submitting edit!");
//     console.log(event.target.dataset.localStorageIndex);
//     indexEdit = event.target.dataset.localStorageIndex;

//     let toDo = JSON.parse(localStorage.getItem(indexEdit));
//     console.log(toDo);
//     toDo.dueDate = editFormDueDate.value;
//     toDo.title = editTitle.value;
//     toDo.description = editDescription.value;
//     toDo.priority = editPriority.value;
//     toDo.notes = editNotes.value;
//     toDo.category = editCategory.value;

//     let toDoCard = JSON.stringify(toDo);
//     console.log(toDo);
//     localStorage.setItem(indexEdit, toDoCard);
//     UI.generateAllHTMLcards();

//     UI.cancelEditForm();
//   }

// submitEditBtn.addEventListener("click", (e) => submitEditForm(e));

// static editToDo(event) {
//     let editBtn = event.target;
//     if (editBtn.classList.contains("edit")) {
//       console.log("editing!");

//       //   Toggle edit form
//       if (editToDoForm.classList.contains("hidden")) {
//         editToDoForm.classList.remove("hidden");
//       } else {
//         editToDoForm.classList.add("hidden");
//       }

//       //   Pull from local storage; Parse Data; Edit Data; Stringify and Put back into local storage
//       let localStorageId = editBtn.nextSibling.dataset.localStorageIndex;
//       //   console.log(editBtn.parentElement);

//       let toDoItem = JSON.parse(localStorage.getItem(localStorageId));

//       const dueDate = toDoItem.dueDate;
//       const title = toDoItem.title;
//       const description = toDoItem.description;
//       const priority = toDoItem.priority;
//       const notes = toDoItem.notes;
//       const category = toDoItem.category;
//       const localStorageIndex = toDoItem.localStorageIndex;
//       submitEditBtn.setAttribute("data-local-storage-index", localStorageIndex);

//       editFormDueDate.value = dueDate;
//       editTitle.value = title;
//       editDescription.value = description;
//       editPriority.value = priority;
//       editCategory.value = category;
//       editNotes.value = notes;

//       // Edit the UI also
//     }
//   }

//
//
//
//
//
//
//
// //
// //
// function submitNewToDo() {
//     const dueDate = formDueDate.value;
//     const title = formTitle.value;
//     const description = formDescription.value;
//     const priority = formPriority.value.toLowerCase();
//     const notes = formNotes.value;
//     const category = formCategory.value.toLowerCase();

//     if (title === "" || dueDate == "") {
//       UI.showAlert("Fill in: Title, Due Date");
//       return;
//     }

//     const toDoCard = new ToDoCard(
//       dueDate,
//       title,
//       description,
//       priority,
//       notes,
//       category
//     );

//     UI.addToDo(toDoCard);
//     Store.addToDo(toDoCard);
//     UI.clearForm();
//     UI.collapseForm();
//     UI.showAlert("Submitted To Do!");
//   }
