import React, { useEffect, useState } from 'react';
import FastAPIChecker from './api/FastAPIChecker';  // Import the FastAPIChecker component
import ServerStatusChecker from './api/ServerStatusChecker';

interface DataObject {
  name: string;
}

type DataType = DataObject[] | DataObject | null;

function Index() {
  const [data, setData] = useState<DataType>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/api/hello');
        // const result = await response.json();
        // setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Optional cleanup
    };
  }, []);

  return (
    <div>
      <h1>Main Component</h1>
      {data ? (
        Array.isArray(data) ? (
          data.map(item => <div key={item.name}>Name: {item.name}</div>)
        ) : (
          <div>Name: {data.name}</div>
        )
      ) : (
        <p>Loading...</p>
      )}
      <hr />
      <h2>Server Status</h2>
      <ServerStatusChecker />
    </div>
  );
}

export default Index;