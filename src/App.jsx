import React, { useState, useEffect } from 'react';

const App = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  // El ID 2000 corresponde a la Copa del Mundo en Football-Data.org
  const API_URL = '/api/competitions/WC/standings';
  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

  useEffect(() => {
    const fetchWorldCupData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { 'X-Auth-Token': API_KEY }
        });
        const data = await response.json();
        setStandings(data.standings || []);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando el Mundial:", error);
        setLoading(false);
      }
    };

    fetchWorldCupData();
  }, []);

  if (loading) return <div className="loader">Cargando Grupos del Mundial 2026...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Mundial FIFA 2026 - Grupos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {standings.map((group) => (
          <div key={group.group} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
            <h2 style={{ color: '#2c3e50' }}>{group.group.replace('_', ' ')}</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {group.table.map((entry) => (
                <li key={entry.team.id} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                  <img src={entry.team.crest} alt={entry.team.name} width="30" style={{ marginRight: '10px' }} />
                  {entry.team.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;