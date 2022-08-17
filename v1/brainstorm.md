<!-- theodinproject.com/lessons/node-path-javascript-todo-list

Objects: Dashboard -> project card -> todo list
  -- i.e. dashboard contains view of project cards, open up a project card which contains to-dos for the project

- Dashboard:
  -- Shows default list with tabs on edges to switch between different project cards

- Todo item factory generates:
  -- each to-do item properties: title, description, dueDate, priority, notes, and optionally a checklist,
  -- potentially a hidden attribute category: helps to filter by project card or all project cards for combined view

- Project card factory generates:
  -- each project card: Title, Category, Color

- Organize lists of to-dos in separate "projects"
  -- have a default list view
  -- ability to create new projects
  -- designate which project their to-dos go into


User Actions
 - Create a todo item
 - Edit todo item (change / delete)
 - Mark item completed / archive process

 - Create a project card
 - Edit project card (change / delete)

User Features
 - View all projects
 - View all to-dos in each project (title and due date)
 - Color-coded for priority
 - Expand single todo to see/edit its details
 - Delete a todo


Priority Options
 - High, medium, low
 - Important and due soon, non important and due soon, important and due later, non-important and due later


Storing Data / UI:
 - Each to-do will be an object
 - RenderDOM to fetch data from object to render UI
 - Figure out how to localCache











 -->
