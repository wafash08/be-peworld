# Peworld - Hire Job App

<div align="center">
  <img src="./assets/peworld-logo-purple.webp">
  <br>
  <br>
  <a href="https://wafash-peworld-react.netlify.app/">View Demo Front End</a>
  <span>|</span>
  <a href="https://fwm17-be-peword.vercel.app/">View Demo Back End</a>
</div>

## Table of Contents

- [About](#about)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Project Repository](#project-repository)
- [Postman Documentation](#postman-documentation)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributions](#contributions)
- [Contact](#contact)
- [Related Projects](#related-projects)

## About

The backend of Peworld is designed to support the functionality of the Peworld. It provides secure and efficient APIs for user authentication, worker list, as well as worker and recruiter profiles. Built with scalability and performance in mind, the backend ensures smooth interactions between the frontend and the database, enabling a seamless user experience for both job seekers and employers.

These RESTful APIs are built by [Muhammad Risano](https://github.com/muhammadrisano). Feel free to explore the code.

Make sure to explore the API by visiting the [Postman documentation](https://documenter.getpostman.com/view/7675329/2s9YysDhDY) and experience its full range of features.

## Technologies Used

The APIs are built with following technologies:

- Express JS
- PostgreSQL
- JSON Web Token (JWT)
- Cloudinary

## Project Structure

```
└── be-peworld
    ├── assets                       # Contains static assets such as images.
    ├── node_modules                 # Contains project dependencies.
    ├── src                          # Contains the source code of the application.
    │   ├── config                   # Contains configuration files for database connections, etc.
    │   ├── controllers              # Contains controllers that handle requests and responses.
    │   ├── helpers                  # Contains helper functions and utilities.
    │   ├── middlewares              # Contains middleware functions for request processing.
    │   ├── models                   # Contains database models and schemas.
    │   ├── routes                   # Contains route definitions and API endpoints.
    │   ├── utils                    # Contains utility functions.
    ├── .gitignore                   # Specifies files and directories that should be ignored by Git.
    ├── index.js                     # The entry point of the application.
    ├── package-lock.json            # Describes the exact dependency tree generated, ensuring reproducible builds.
    ├── package.json                 # Contains project dependencies and scripts.
    ├── README.md                    # The project documentation file.
    ├── vercel.json                  # Configuration file for deployment on Vercel.
    └── yarn.lock                    # Locks the version of dependencies installed via Yarn.
```

## Project Repository

This project consists of both frontend and backend repositories. You can find link of front end repositoy and the postman documentation below:

- Front End Repository: [Peworld Front End](https://github.com/wafash08/fwgo-peworld)

- [Postman Documentation](#postman-documentation)

## Postman Documentation

You can see the list of API and its example usage by clicking the link below

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/7675329/2s9YysDhDY)

## Features

- Authentication and Authorization using JWT
- CRUD Profile Worker
- CRUD Profile Recruiter
- Upload Image
- Job Offering

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. Clone the repository

```sh
git clone https://github.com/muhammadrisano/fwm17-be-peword.git
```

2. Navigate to the project directory:

```sh
cd fwm17-be-peword
```

3. Install the dependencies:

```sh
npm install
```

5. Start the development server:

```sh
npm run dev
```

This will start the development server and open the application in your default web browser. If it doesn't, you can access it at http://localhost:5000.

## Contributions

If you have an idea for a new feature or have found a bug, please follow these steps to contribute:

### How to Contribute

1. Fork the Repository:

Fork the repository to your own GitHub account by clicking the "Fork" button at the top right of [this repository](https://github.com/muhammadrisano/fwm17-be-peword).

2. Clone the Forked Repository:

```sh
git clone https://github.com/your-username/fwgo-peworld.git
```

3. Create a New Branch:

Create a new branch for your feature or bug fix:

```sh
git checkout -b feature/YourFeatureName
```

or

```sh
git checkout -b bugfix/YourBugFixName
```

4. Make Your Changes:

Make the necessary changes in your local development environment.

5. Commit Your Changes:

Commit your changes with a descriptive commit message:

```sh
git add .
git commit -m "Add Your Descriptive Commit Message"
```

6. Push to Your Fork:

Push your changes to your forked repository:

```sh
git push origin feature/YourFeatureName
```

or

```sh
git push origin bugfix/YourBugFixName
```

7. Open a Pull Request:

Open a pull request to the main repository by navigating to the original repository and clicking the "New Pull Request" button. Ensure your pull request includes a clear description of the changes and why they are necessary.

### Issues

If you encounter any issues, please open an issue in the GitHub repository. Provide as much detail as possible to help us resolve the problem quickly.

## Contact

If you have questions, suggestions, or just want to get in touch, feel free to contact the following!

- Muhammad Risano (Creator of Back End Peworld)
  - Github: [muhammadrisano](https://github.com/muhammadrisano)
  - Linkedin: [linkedin.com/in/muhammad-risano](https://www.linkedin.com/in/muhammad-risano-80847b152/?originalSubdomain=id)
- Wafa Saefulhaq (Creator of Front End Peworld)
  - Email: saefulhaqwafa@gmail.com
  - Linkedin: [linkedin.com/in/m-wafa-saeful-haq](https://www.linkedin.com/in/m-wafa-saeful-haq)
  - Twitter: [@saefulhaqwafa](https://x.com/saefulhaqwafa)

## Related Projects

- [Peworld Front End 🏢](https://github.com/wafash08/fwgo-peworld)
- [Mama Recipe 🧑‍🍳](https://github.com/wafash08/mama-recipe-be)
- [Marketplace 🛒](https://github.com/wafash08/fwgo-marketplace)
