# Volto Light Theme by kitconcept 🚀

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-light-theme.svg)](https://www.npmjs.com/package/@kitconcept/volto-light-theme)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)
[![Build Status](https://github.com/kitconcept/volto-light-theme/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-light-theme/actions)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://kitconcept.com/kitconcept-white.svg">
  <img width="300" alt="kitconcept, GmbH" src="https://kitconcept.com/kitconcept-black.svg">
</picture>

## Vision

The main vision of the Volto Light Theme (VLT) is to serve as a foundation for kitconcept's future projects, following the release of Plone 6.
It incorporates feedback from the company's clients and Plone community from the last few years of projects and the success stories in the UI/UX side.
It aims to be future-proof, keeping it aligned with the upcoming Volto and Plone 7 vision in terms of theming strategy decided by the Plone community.

## Quick Start 🏁

### Prerequisites ✅

Ensure you have the following installed:

- **UV** 🐍 (Python dependency manager)
- **Node.js 22** 🟩
- **pnpm** 🧶 (JavaScript package manager)
- **Docker** 🐳 (Containerized environment)

### Installation 🔧

1. Clone the repository:

````sh
git clone git@github.com:kitconcept/volto-light-theme.git
cd volto-light-theme
````

2. Install dependencies for both Backend and Frontend:

````sh
make install
````

### Fire Up the Servers 🔥

1. Start the **Backend** (Plone) at [http://localhost:8080/](http://localhost:8080/):

````sh
make backend-start
````

2. In a new terminal, start the **Frontend** (Volto) at [http://localhost:3000/](http://localhost:3000/):

````sh
make frontend-start
````

🎉 Your Plone development environment is now live!

## Running with Docker 📦

This setup includes:

- **Prebuilt Docker images** for Backend and Frontend 🖼️
- **A complete stack** with a Traefik router and a Postgres database 🗃️
- **Accessible at** [http://voltolighttheme.localhost](http://voltolighttheme.localhost) 🌐

To start the Docker-based environment, simply run:

````sh
docker compose up -d
````

Once the backend image is running, create a Plone site with:

````sh
docker compose exec backend './docker-entrypoint.sh create-site'
````

🚀 Your Plone site is now up and running locally!

## Project Structure 🏗️

This monorepo hosts two packages:

- **backend/**: Python package `kitconcept.voltolighttheme` providing Dexterity behaviors and example content.
- **frontend/**: React package `@kitconcept/volto-light-theme` providing the theme.

## Contributing 🤝

Contributions are welcome! If you find any issues or want to suggest improvements, please check out:

- [Source Code](https://github.com/kitconcept/volto-light-theme/) 💻
- [Issue Tracker](https://github.com/kitconcept/volto-light-theme/issues) 🐛

Every pull request requires a [Change log entry](https://6.docs.plone.org/contributing/index.html#change-log-entry). The location of the `news` folder is the following:

- **backend**: `backend/news`
- **frontend**: `frontend/packages/volto-light-theme/news`

### Code Quality Assurance 🧐

Ensure your code follows best practices by running the following commands:

- **Format the codebase**:

````sh
make format
````

- **Lint the code for errors and adherence to Plone standards**:

````sh
make lint
````

You can also run these commands separately in the `backend` or `frontend` folders.

### Internationalization 🌐

Easily generate translation files for both Plone and Volto:

````sh
make i18n
````

## Credits & Acknowledgements 🙏

This package is developed and maintained by the [kitconcept GmbH](https://kitconcept.com) ❤️.
