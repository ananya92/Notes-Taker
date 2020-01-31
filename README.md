# Notes-Taker
Application that can be used to write, save, and delete notes.

## Description

This application uses an express backend and saves and retrieves note data from a JSON file.

* The following are the exposed HTML routes:

  * GET `/notes` - Returns the `notes.html` file.

  * GET `/` - Returns the `index.html` file

* The application has a `db.json` file on the backend that is used to store and retrieve notes using the `fs` module.

* The following API routes are created:

  * GET `/api/notes` - Reads the `db.json` file and returns all saved notes as JSON.

  * POST `/api/notes` - Recieves a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` - Recieves a query paramter containing the id of a note to delete, deletes the note and then rewrites the notes to the `db.json` file.

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Business Context

For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.

## Acceptance Criteria

Application should allow users to create and save notes.

Application should allow users to view previously saved notes.

Application should allow users to delete previously saved notes.

## Deployed Application URL
https://notes-taker-express.herokuapp.com