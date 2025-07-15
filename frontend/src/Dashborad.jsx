import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingCoins, setLoadingCoins] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoins = async () => {
    setLoadingCoins(true);
    try {
      const res = await axios.get('http://localhost:5000/api/coins');
      setCoins(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch coin data.');
    } finally {
      setLoadingCoins(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 1800000); 
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-800 tracking-tight drop-shadow-md">
        Crypto Dashboard
      </h1>

      <div className="relative max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search coin..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {error && (
        <p className="text-red-600 text-center mb-6 font-semibold text-lg">{error}</p>
      )}

      {loadingCoins ? (
        <p className="text-center mt-8 text-gray-500 text-lg font-medium animate-pulse">
          Loading coins...
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-xl ring-1 ring-gray-200">
          <table className="min-w-full text-sm text-gray-700 table-auto">
            <thead className="bg-blue-100 text-xs uppercase text-blue-700 tracking-wide font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Price (USD)</th>
                <th className="px-6 py-4">Market Cap</th>
                <th className="px-6 py-4">% Change (24h)</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No coins match your search.
                  </td>
                </tr>
              ) : (
                filteredCoins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    className={`text-center border-b border-gray-200 transition duration-300
                      ${
                        index % 2 === 0
                          ? 'bg-white hover:bg-blue-50'
                          : 'bg-gray-50 hover:bg-blue-50'
                      }
                    `}
                  >
                    <td className="px-6 py-4 flex items-center gap-3 justify-start">
                      {coin.image && (
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-7 h-7 rounded-full border border-gray-300"
                        />
                      )}
                      <span>{coin.name}</span>
                    </td>
                    <td className="px-6 py-4 uppercase font-semibold tracking-wide">
                      {coin.symbol}
                    </td>
                    <td className="px-6 py-4 font-mono">${coin.current_price.toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono">${coin.market_cap.toLocaleString()}</td>
                    <td
                      className={`px-6 py-4 font-bold ${
                        coin.price_change_percentage_24h >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(coin.last_updated).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
