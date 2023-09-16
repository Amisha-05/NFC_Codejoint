import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes




import ProfilePage from './Component1/Profilecard';


const App = () => {
    return (
        <BrowserRouter>
          
                <Routes> {/* Use Routes instead of Switch */}
                    
                    <Route path="/profile" element={<ProfilePage />} />
                   
                    
                </Routes>
            
        </BrowserRouter>
    );
}

export default App;