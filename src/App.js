import Header from "./components/Header";
import Cards from "./components/Cards";
import AddBook from "./components/AddBook";
import { Routes,Route } from "react-router-dom";
import Detail from "./components/Detail";
import { createContext, useEffect, useState,   } from "react";
import Login from './components/Login';
import Signup from './components/Signup';
const AppState = createContext();
function App() {
  const [login,setLogin] = useState(false);
  const [userName,setUserName] = useState("");

  // useEffect()

  return (
    <AppState.Provider value={{login,userName,setLogin,setUserName}}>
    <div className="App relative">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState};