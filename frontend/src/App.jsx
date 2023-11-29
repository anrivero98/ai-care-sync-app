import React from 'react';
import Modal from './components/modal'
import MainComponent from './components/mainComponent';
import MainHeader from './components/MainHeader';
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
            {/* <header className="App-header"> */}
            <MainHeader/>
            <MainComponent/>
            {/* </header> */}
        </div>
    );
}

export default App;
