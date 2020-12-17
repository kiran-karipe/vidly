import './App.css';
import { getSideBarData } from './services/sideBarDataService';
import { useState, useEffect } from 'react';
import SideBar from './components/SideBar';

const App = () => {
  const [sideBarData, setSideBarData] = useState([]);

  useEffect(() => {
    const data = getSideBarData();
    setSideBarData(data);
  }, []);

  return (
    <div className="App">
      {sideBarData.map((item, id) =>
        (<SideBar key={id} item={item}/>)
      )}
    </div>
  );
};

export default App;
