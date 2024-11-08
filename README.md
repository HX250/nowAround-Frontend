# NowAroundFrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Table of Contents

- [Folder Management](#folder-management)

## Folder Management

The project structure is organized as follows:

```plaintext
src/
├── app/
│   ├── components/            # Core components of the application
        ├── authFeature/       # UI componenets used for handling authentication, for example login and register
        ├── userFeature/       # UI components for user itself
        ├── Utils/             # UI components used for guiding through pages
│   ├── services/              # All the services used in the application
        ├── cookieService/
        ├── loginService/
        ├── registerService/
        ├── guards/
│   ├── shared/                # Shared components, folders, and utilities across the web app
│   │   ├── components/        # Shared components like header, footer, etc.
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── ...
├── assets/              # Static assets like images, fonts, etc.
├── environments/        # Environment configuration files
```
