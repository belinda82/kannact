# React + TypeScript + Vite

//// Project Setup ////

1. Install dependencies:
    npm install

2. Start the development server:
    npm run dev
    App runs on http://localhost:5173

//// Data Persistence Notice /////

Data is stored in-memory using MSW mock handlers.

Data resets on browser reload (no persistence).


////// Testing Approach ////////

1. To prevent regressions and ensure the stability of the application over time, I would implement a combination of unit testing and integration testing:

- Unit Testing: SearchBar, PatientForm, and NoteForm, ensuring they render correctly, handle user input, and call the right callbacks (onSubmit, onChange).

- Integration Testing: For pages like PatientsPage and PatientDetailPage, testing how components interact together (adding a patient, editing notes, deleting a patient).

- E2E tests:  using Cypress to cover the entire process flow, but the initial focus would be on component and integration tests.


2. Components and Features to Prioritize for Testing

      PatientForm: Ensure validate input fields, onSubmit with valid payload.

      NoteForm: Notes can be added correctly.

      SearchBar: is updating the parent state.

      PatientsPage: list of patients is rendered based on search input, adding and deleting, view details are updating the UI correctly.

      PatientDetailPage: editing a patient updates their details, adding and deleting notes works properly.


3. Priority:  

      1 Forms.
      
      2 Actions (Create, Read, Update, Delete).

      3 Search functionality.


4. Testing Tools:

React testing library, Jest, Mock Service Worker, Cypress.