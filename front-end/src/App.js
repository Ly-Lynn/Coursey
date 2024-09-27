import logo from './logo.svg';
import './App.css';
import MainPage from './screens/Home/homeScreen';
import SearchBar from './components/searchBar';
import Navbar from './components/navbar';

const App = () => {

  return (
    <>
      <div className='header'>
        <img className='logo' alt='logo' src="/logo.png"/>
        <SearchBar />
        <Navbar />
      </div>
      <div>
      </div>
    </>
  );
};

export default App;
