# Book Store

A simple book store application with a React frontend and a Node.js/Express backend.

## Project Structure

- `Backend/` - Express API, MongoDB data model, authentication middleware.
- `Frontend/` - Vite + React UI with book listing, create/edit/delete, and detail pages.

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB server available locally or via connection string

## Backend Setup

1. Open a terminal in `Backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

The backend runs on `http://localhost:5555` by default.

## Frontend Setup

1. Open a terminal in `Frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

The frontend runs on a Vite dev server, usually `http://localhost:5173`.

## Features

- List books in table or card view
- View book details
- Create new books
- Edit existing books
- Delete books

## Notes

- The backend uses a MongoDB model for book data.
- If you add environment variables, put them in a `.env` file inside `Backend/`.
- There is currently no book image upload support in the app.
