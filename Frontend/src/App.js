// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change import to remove unused component
import RegisterPage from './components/register';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} /> {/* Change component to element */}
      </Routes>
    </Router>
  );
};

export default App;



// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import LoginPage from './components/login';

// const App = () => {
//   return (
//    <div>
//     <LoginPage/>
//    </div>
//   );
// };

// export default App;