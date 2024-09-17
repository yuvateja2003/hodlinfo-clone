# HODLINFO Clone

## Project Overview

This project is a full-stack web application that clones the functionality of HODLINFO, providing real-time cryptocurrency data fetched from the WazirX API. It demonstrates proficiency in both frontend and backend development, API integration, and database management.

## Live Demo

[View the live application here](https://hodlinfo-clone-5gj0s12it-yuvateja2003s-projects.vercel.app/)

## Features

- Real-time cryptocurrency data display
- Top 10 cryptocurrencies by volume
- Responsive design for various screen sizes
- Dark/Light mode toggle
- Telegram integration option
- Automatic data refresh every 60 seconds

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **API Integration**: Axios for HTTP requests
- **Deployment**: Vercel

## API Routes

- `GET /api/getTop10`: Fetches and stores the top 10 cryptocurrencies by volume
- `GET /api/stored-data`: Retrieves the stored cryptocurrency data

## Database Structure

SQLite database with the following schema:

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yuvateja2003/hodlinfo-clone.git
   ```
2. Navigate to the project directory:
   
   ```cd hodlinfo-clone```

3. Install dependencies:
   
   ```npm install```

4. Start the server:
   
   ```npm start```

5. Open `http://localhost:3000` in your browser

## Deployment

This project is deployed on Vercel. For deployment instructions, refer to the [Vercel documentation](https://vercel.com/docs).

## Code Structure

- `server.js`: Main server file
- `public/`: Static files (CSS, client-side JavaScript)
- `views/`: HTML templates
- `database.js`: Database operations

## Future Enhancements

- Implement user authentication
- Add more cryptocurrency pairs
- Create a mobile app version

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/yuvateja2003/hodlinfo-clone/issues) if you want to contribute.

## Author

PADDALA YUVATEJA
- GitHub: [@yuvateja2003](https://github.com/yuvateja2003)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- WazirX API for providing cryptocurrency data
- HODLINFO for inspiration

## Challenges Overcome

During the development of this project, several challenges were addressed:

1. Real-time Data Synchronization: Implemented a robust system to fetch and update cryptocurrency data in real-time, ensuring users always have access to the latest information.

2. Responsive Design: Created a fully responsive layout that adapts seamlessly to various screen sizes, from mobile devices to large desktop monitors.

3. Performance Optimization: Optimized database queries and implemented efficient data caching to ensure fast load times even with frequent data updates.

4. API Integration: Successfully integrated with the WazirX API, handling rate limits and potential network issues to ensure reliable data retrieval.

## Learning Outcomes

This project provided valuable experience in:

- Full-stack web development using Node.js and Express.js
- Working with external APIs and handling real-time data
- Database design and management with SQLite
- Implementing responsive and interactive user interfaces
- Deployment and hosting of web applications

## Feedback and Support

For any questions, feedback, or support, please open an issue in the GitHub repository or contact the author directly.
