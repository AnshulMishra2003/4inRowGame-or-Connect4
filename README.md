# Connect4 Game - Full Stack Application

A real-time multiplayer Connect4 game built with React.js frontend and Node.js backend, featuring bot gameplay, live leaderboards, and modern UI design.

## 🎮 Features

- **Real-time Multiplayer**: Play against other players in real-time using Socket.IO
- **Bot Gameplay**: Play against an intelligent bot when no human opponents are available
- **Live Leaderboard**: Track top 5 players with real-time updates
- **Modern UI**: Dark theme with responsive design and smooth animations
- **Game Rules**: Built-in tutorial explaining how to win (4 in a row: horizontal, vertical, diagonal)
- **Analytics**: Game events tracked via Kafka for performance monitoring

## 🚀 Live Demo

🌐 **Frontend URL**: https://4in-row-game-or-connect4-itwkty1xo.vercel.app/
🌐 **Backend API**:  https://connect4-backend-ka4c.onrender.com

## 📁 Project Structure

```
connect4-game/
├── connect4-backend/          # Node.js Backend
│   ├── controllers/           # Game logic controllers
│   ├── services/             # Game services
│   ├── routes/               # API routes
│   ├── db/                   # Database configuration
│   ├── kafka/                # Kafka producer/consumer
│   ├── bot/                  # Bot logic
│   ├── analytics/            # Analytics consumer
│   └── utils/                # Utility functions
├── connect4-frontend2/        # React.js Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Landing.jsx   # Home page
│   │   │   ├── Lobby.jsx     # Name entry & game rules
│   │   │   ├── GameBoard.jsx # Main game interface
│   │   │   └── Leaderboard.jsx # Top players table
│   │   ├── socket.js         # Socket.IO client
│   │   └── App.jsx           # Main app component
│   └── public/               # Static assets
└── README.md                 # This file
```

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Framework
- **React Router** - Navigation
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP requests
- **CSS-in-JS** - Inline styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **PostgreSQL** - Database
- **Kafka** - Event streaming
- **UUID** - Unique game IDs

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Kafka** (optional for analytics)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AnshulMishra2003/4inRowGame-or-Connect4.git
cd connect4-game
```

### 2. Backend Setup

```bash
cd connect4-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=connect4
# DB_USER=your_username
# DB_PASSWORD=your_password
# PORT=5000

# Set up PostgreSQL database
createdb connect4

# Create required tables
psql -d connect4 -c "
CREATE TABLE games (
    id VARCHAR(255) PRIMARY KEY,
    player1 VARCHAR(255) NOT NULL,
    player2 VARCHAR(255) NOT NULL,
    winner VARCHAR(255),
    is_draw BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../connect4-frontend2

# Install dependencies
npm install

# Update socket connection in src/socket.js if needed
# const socket = io("http://localhost:5000");

# Start the frontend development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 How to Play

1. **Enter Your Name**: Start by entering your name in the lobby
2. **Game Rules**: Learn the objective - get 4 pieces in a row (horizontal, vertical, or diagonal)
3. **Find Opponent**: Wait for another player or play against the bot after 10 seconds
4. **Make Moves**: Click on any column to drop your piece
5. **Win Condition**: First to get 4 in a row wins!
6. **Leaderboard**: Check your ranking among the top 5 players

## 🎮 Game Features

### Real-time Gameplay
- Instant move updates via WebSockets
- Turn-based gameplay with visual indicators
- Automatic opponent matching

### Bot Intelligence
- Smart bot that analyzes board state
- Fallback opponent when no human players available
- Challenging gameplay experience

### Modern UI/UX
- Dark theme with green accents
- Responsive design for all screen sizes
- Smooth animations and hover effects
- Clean table-based leaderboard

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

1. **Environment Variables**:
   ```
   DATABASE_URL=your_postgres_url
   PORT=5000
   ```

2. **Build Command**: `npm install`
3. **Start Command**: `npm start`

### Frontend Deployment (Netlify/Vercel)

1. **Build Command**: `npm run build`
2. **Publish Directory**: `build`
3. **Environment Variables**: Update socket URL to your deployed backend

## 📊 Database Schema

### Games Table
```sql
CREATE TABLE games (
    id VARCHAR(255) PRIMARY KEY,
    player1 VARCHAR(255) NOT NULL,
    player2 VARCHAR(255) NOT NULL,
    winner VARCHAR(255),
    is_draw BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 API Endpoints

### Game Endpoints
- `GET /leaderboard` - Get top 5 players

### Socket Events
- `joinGame` - Join game queue
- `makeMove` - Make a move
- `gameStarted` - Game initialization
- `moveMade` - Move broadcast
- `gameOver` - Game completion

## 🐛 Troubleshooting

### Common Issues

1. **Connection Issues**:
   - Check if backend is running on port 5000
   - Verify database connection
   - Ensure frontend socket URL matches backend

2. **Database Errors**:
   - Verify PostgreSQL is running
   - Check database credentials in .env
   - Ensure tables are created

3. **Build Errors**:
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

## 👥 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For any questions or issues, please contact:
- **Email**: [anshul8032@gmail.com]
- **GitHub**: [https://github.com/AnshulMishra2003]

---

**Made with ❤️ using React.js and Node.js**
