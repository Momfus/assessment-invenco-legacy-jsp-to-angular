# AssessmentInvencoLegacyJspToAngular

# Task Details

## Context

You are working on a legacy J2EE project that uses Struts, JSP, and Spring. We’re gradually migrating parts of the UI to Angular. Your task is to rewrite a JSP-based user search page in Angular while maintaining the original functionality and integrating with a REST API.

## Part 1: Legacy Reference Code (What We’re Replacing)

### searchUser.jsp
``` html
  <%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %> <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

  <html>

  <head><title>User Search</title></head><body>

  <h2>Search Users</h2>

  <html:form action="/searchUser">

  Name: <html:text property="name" />

  Email: <html:text property="email" />

  <html:submit value="Search" />

  </html:form>

  <c:if test="${not empty users}">

  <table border="1">

  <tr><th>ID</th><th>Name</th><th>Email</th></tr>

  <c:forEach var="user" items="${users}">

  <tr>

  <td>${user.id}</td>

  <td>${user.name}</td>

  <td>${user.email}</td>

  </tr>

  </c:forEach>

  </table>

  </c:if>

  </body>

  </html>
```
### Backend Flow

* Form submits to /searchUser.do
* SearchUserAction invokes UserService.searchUsers(name, email)
* Sets list of users in request scope: request.setAttribute("users", resultList)

## Parte 2: Task - Rebuild in Angular

### Goal

Rebuild this page as an Angular component with form inputs and table, consuming a REST API: 

``` bash
GET /api/users?name=John&email=john@example.com
```

### Expected Angular Delivarables
* user-search.component.ts/.html/.scss
* user.service.ts
* (Optional) user-search.component.spec.ts
* Use Reactive Forms (preferred) or Template-driven forms

## Requeriments

1. Form Fields

  * Name (text input)

  * Email (text input)

  * Search button

2. Table Output

  *  Display: ID, Name, Email

3. Behavior

  *  Show spinner while loading

  * Handle empty results

  * Show error message on API failure

4. Optional Enhancements

  * Unit test the component and service

  * Add pagination if comfortable

5. Use a UI library of your preference for styling

## Parte 3: API Reference (Mocked)
You can mock this using JSON Server, Angular In-Memory Web API, or provide fake data in a UserService.

``` bash
GET /api/users?name=John&email=john@example.com
```

Response:
``` json
[ 
  { "id": 1, "name": "John Doe", "email": "john@example.com" }, 
  { "id": 2, "name": "Johnny Bravo", "email": "johnny@example.com" }
]
```

# Commands
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.


# API Setup with JSON Server

## Overview

This project uses JSON Server to simulate a REST API for user search functionality.

## Current Setup

### JSON Server Configuration

- **Port**: 3001
- **Base URL**: `http://localhost:3001`
- **Endpoint**: `GET /users`

### Files

- `db.json` - Mock data for users
- `routes.json` - Route mapping for JSON Server

## Running the Application

### Option 1: Run both servers simultaneously
```bash
npm run dev
```
This will start both the Angular dev server (port 4200) and JSON Server (port 3001).

### Option 2: Run servers separately
```bash
# Terminal 1: Start JSON Server
npm run api

# Terminal 2: Start Angular app
npm start
```

## API Endpoints

### Search Users
```
GET /users
```

### Get All Users
```
GET /api/users
```


