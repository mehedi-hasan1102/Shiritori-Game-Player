# Shiritori Game

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://github.com/mehedi-hasan1102/Shiritori-Game-Player/blob/main/LICENSE)

A multiplayer Shiritori game built with React, Vite, and Tailwind CSS. Players take turns entering words, following the last-letter rule, while scoring points for correct words.

**Live Demo:** [https://shiritori-game-player.vercel.app/](https://shiritori-game-player.vercel.app/)

## Project Overview

In Shiritori:

*   Players take turns entering words.
*   Each new word must start with the last letter of the previous word.
*   Words cannot be repeated.
*   Must be valid English words (verified with [DictionaryAPI](https://dictionaryapi.dev/)).
*   Minimum 4 letters per word.
*   Timer: 30 seconds per turn.
*   Correct words earn +1 point; invalid words earn 0 points.

## Features

*   **Turn-based gameplay:** Players take turns to enter words.
*   **Score tracking:** The score of each player is tracked and displayed.
*   **Word history:** A history of the words played is displayed, with correct/incorrect colors.
*   **Countdown timer:** A 30-second countdown timer for each turn.
*   **Responsive UI:** The UI is responsive and works on all screen sizes.
*   **Ready for deployment:** The project is ready to be deployed on Vercel or Netlify.

## Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/mehedi-hasan1102/Shiritori-Game-Player.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd Shiritori-Game-Player
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

### Available Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the project for production.
*   `npm run lint`: Lints the project files.
*   `npm run preview`: Previews the production build.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/mehedi-hasan1102/Shiritori-Game-Player/blob/main/LICENSE) file for details.
