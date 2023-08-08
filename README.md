# Bugly

Bugly is a full stack blog application I developed to track the problem-solving process by cataloging projects and their corresponding "bugs" as posts. Main functionality is confined to a single page application that corresponds to a user. Secondary page displays a list of the most recent posts and which project they belong to.

## Features

- Tracks and catalogs projects and related bugs as posts.
- Currently supports one active user but the possibility of opening up the application to more users depends on public interest.
- Authenticated user UI is not hidden from public view. However, these actions are protected. Eg. actions that interact with data: create, update, delete.
  - This was done to showcase what the application is capable of to guests w/o having to create an account. 
- Actions that interact with any data are protected using client-side JWT auth and additional server-side auth.

## Getting Started
Setup up the backend to avoid any errors for missing data. Otherwise, just refresh the browser once backend is running. 
### Backend built with Flask
1. Create a PSQL database
2. Connect to database in app.py or create an .env file to hold all sensitive information including database url
3. Create a virtual environment 
```
python3 -m venv venv
```
4. Access virtual environment
```
source venv/bin/activate
```
5. Start up local server 
```
flask run or python3 -m flask run
```
### Fronted built with React TypeScript
1. Install dependencies 
```
npm install
```
2. 
```
npm start
```

## Usage


## Upcoming features

- Search for projects and posts.
- Section for project technical details and short blurb.