import React, {useEffect, useState} from 'react'


interface DataObject {
  name: string;
}

type DataType = DataObject[] | DataObject | null;

function Index() {

  const [data, setData] = useState<DataType>(null); // Add the appropriate type if you know the structure of your data

  // useEffect hook for making the API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/hello');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Optional cleanup
    return () => {
      // Perform cleanup here, if needed
    };
  }, []);

  // Component rendering logic
  return (
    <div>
    {data ? (  // Check if data exists
      Array.isArray(data) ? (  // If data exists, check if it's an array
        data.map(item => <div key={item.name}>Name: {item.name}</div>)
      ) : (
        <div>Name: {data.name}</div>
      )
    ) : (
      <p>Loading...</p>  // Default message if data doesn't exist
    )}
  </div>
  );
}

export default Index