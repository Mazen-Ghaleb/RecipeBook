# Recipe Book Project

This project is developed as part of the
[Angular - The Complete Guide (2024 Edition)](https://www.udemy.com/course/the-complete-guide-to-angular-2) course on Udemy, taught by Maximilian Schwarzmüller. The course provides comprehensive instruction on Angular, guiding through the creation of a fully functional recipe book application.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Course Information](#course-information)
- [Running the Application](#running-the-application)

## Project Overview

The Recipe Book project is a single-page application (SPA) built with Angular. It allows users to create, manage, and share recipes. The application demonstrates core Angular concepts including components, services, routing, forms, and HTTP requests.

## Features

- Recipe Management: Create, edit, delete, and view recipes.
- Ingredient Management: Add ingredients to recipes and a shopping list.
- User Authentication: Secure user registration and login functionality.
- Routing: Navigate between different views within the application.
- Reactive Forms: Utilize Angular's powerful form handling capabilities.
- State Management: Manage application state using services and observables.
- HTTP Integration: Fetch and store data using HTTP requests.

## Course Information

- Course Title: Angular - The Complete Guide (2024 Edition)
- Instructor: Maximilian Schwarzmüller
- Platform: Udemy
- Course Link: [Udemy Course Link](https://www.udemy.com/course/the-complete-guide-to-angular-2)

## Running the Application

There are multiple ways to run the applications

1. **View on GitHub Pages:**  
   Check the application deployed on [GitHub Pages](https://mazen-ghaleb.github.io/RecipeBook/browser). Please note that some functionality, such as service workers and HTTP requests, may not work as expected.

2. **Run Locally:**  
   Clone the repository and start the development server by running the following command in the project directory:

   ```bash
   ng serve --configuration "production" --open
   ```

3. **Build and Deploy:**  
   Build the application by running the following command in the project directory:

   ```bash
    ng build --configuration "production"
   ```

   The build artifacts will be stored in the dist/ directory. To deploy, navigate to the dist/recipe-book/browser directory and run the following command:

   ```bash
   http-server --gzip --proxy http://localhost:8080?
   ```

   The application will be available at [localhost:8080](http://localhost:8080).
