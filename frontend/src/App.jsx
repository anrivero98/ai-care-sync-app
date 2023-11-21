import React from 'react';
import Modal from './components/modal'
import MainComponent from './components/mainComponent';
// import Modal from './Modal'; // Import your Modal component or any other component

// Main App component
function App() {
    // State to control the visibility of the Modal (if you're using it)
    const [isModalOpen, setModalOpen] = React.useState(false);

    // Function to toggle the modal's visibility
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div className="App">
            <header className="App-header">
            
            <MainComponent/>
                {/* Your App content here */}
                {/* <h1>Welcome to My App</h1>
                
                {/* Example button to open the modal */}
                {/* <button onClick={toggleModal}>Open Modal</button> */}
                
                {/* Render the Modal component */}
                {/* <Modal open={isModalOpen} /> */}
            </header>
        </div>
    );
}

export default App;
