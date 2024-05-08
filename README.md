# icebreakers_frontend_v2

![Icebreakers Logo](https://user-images.githubusercontent.com/60520496/91582308-3d48fd00-e915-11ea-9c97-45a667b72a0c.png)

Icebreakers is a social party game web app designed for quick and easy play with a group. It's a fun way to get to know the people at your next party even better.

[Video Demo](https://www.youtube.com/watch?v=qW0Sl7JjD7Y&t=1s)
This video demo is from the original version, but apart from some UX/UI changes, is a very similiar experience.

## Future Updates
- Incorporating Tailwind to handle the CSS
- Deploying Icebreakers
- Creating a voting feature where users can vote on the next question
- Allowing the host to remove questions from the game

## Project Links
- [Rails API GitHub Repository](https://github.com/DavidWolff218/icebreakers_backend)

## Installation

**Note:** The CSS is being refactored for better responsiveness across different screen sizes. It is currently optimized for mobile screens. To view on mobile, press `shift + command + c` to open the console, and click the mobile screen icon in the upper left corner.

![Mobile View](https://user-images.githubusercontent.com/60520496/91590398-f8c35e80-e920-11ea-8c88-81c5cbfa948a.png)

### Prerequisites
- Node.js: Version 14.4.0 
- npm: Version 10.3.0 
- React: Version 18.2.0 
- TypeScript: Version 4.9.5 
- Ruby: Version 2.6.1. 
- Rails: Version 6.0.3

### Steps
1. Fork and clone the [backend repository](https://github.com/DavidWolff218/icebreakers_backend).

2. Install Ruby dependencies:
    Navigate to the cloned backend directory and run:
    ```bash
    cd icebreakers_backend
    bundle install
    ```

3. Fork and clone this repository.

4. Install dependencies:

    ```bash
    cd icebreakers_frontend_v2
    npm install
    ```

5. Start the Rails API server from the backend directory:

    ```bash
    rails s
    ```

    Ensure that the API server is running on localhost:3000.

6. Start the frontend server from the frontend directory:

    ```bash
    npm start
    ```

    The frontend server will likely run on localhost:3001. Approve the port when prompted or open a new browser window in incognito/private mode and go to localhost:3001 to join the room as another player.

## Contact

You can reach the project creator, David Wolff, on [LinkedIn](https://www.linkedin.com/in/davidwolff218/) or by email at dcwolff218@gmail.com.
