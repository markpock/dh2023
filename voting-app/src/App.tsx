import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Voting from './Voting';

// function App() {
//   return (
//     <Voting></Voting>
//   );
// }

// export default App;

interface DataRow {
  id: number;
  day: string;
  selected: boolean;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([
    { id: 1, day: 'Monday', selected: false },
    { id: 2, day: 'Tuesday', selected: false },
    { id: 3, day: 'Wednesday', selected: false },
    // Add more data rows here...
  ]);

  const handleCheckboxChange = (id: number) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, selected: !row.selected } : row
      )
    );
  };

  const saveSelectedState = () => {
    // Assuming you want to save the selected state in a local variable for now
    const selectedData = data.filter((row) => row.selected);
    console.log(selectedData); // You can save this data or send it to a server.
  };

  return (
    <div>
      <h1>Data Grid with Checkbox Selection</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.day}</td>
              <td>
                <input
                  type="checkbox"
                  checked={row.selected}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveSelectedState}>Save Selected State</button>
    </div>
  );
};

export default App;