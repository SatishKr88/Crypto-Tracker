#  Crypto Tracker (MERN Stack)
A full-stack real-time cryptocurrency dashboard to monitor top 10 coins using CoinGecko API, auto-save history to MongoDB, and visualize historical price trends.

## 🔧 Tech Stack
- **Frontend**: React, Tailwind CSS, Chart.js
- **Backend**: Express, MongoDB, Node.js
- **API**: CoinGecko
- **Scheduler**: node-cron

## ⚙️ Setup Instructions
## 1. Clone the Repo
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

## 2. Setup Backend
```bash
cd backend
npm install
node index.js
```

## 3. Setup Frontend
```bash
cd client
npm install
npm start
```

##  Deployment
### Render (Backend) + Netlify (Frontend)
- Set `MONGO_URI` in Render
- Use `npm run build` and `client/build` in Render

##  Features
- Real-time top 10 coins
- Auto-refresh, historical tracking
- Responsive UI with Tailwind


