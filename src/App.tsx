import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ApplicationForm from './pages/ApplicationForm';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 font-sans">
        <Navigation />
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/sucesso" element={<SuccessPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
