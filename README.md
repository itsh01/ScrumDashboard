# ScrumDashboard

Scrum dashboard web application

## Installation

```
npm install
grunt build
```

At development time use watch
```
grunt watch:dev
```

## Conventions

### Stylesheets

Components stylesheets should be place in a specific folder,
and be loaded after the main style sheets:

```
* stylesheets
|-- main.css
|-- my-component
  |-- layout.css
```

### Paths

* Folder names should be kebab-cased
* Component names should be PascalCased

```
src/js/components/my-component/SubComponent.jsx
```

