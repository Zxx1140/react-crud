import NavBar from './NavBar'
import UserList from './UserList';
import Create from './Create'
import Update from './Update';
import ItemList from './ItemList';
import CreatItem from './CreateItem';
import {
  Routes, Route
} from "react-router-dom";



function App() {
  return (
  <div>
    <NavBar/>
    <Routes>
    <Route path ="/" element={ <UserList />   } />
    <Route path ="/create" element={ <Create />   } />
    <Route path="/update/:user_id" element={<Update />} />
    <Route path="/item/:user_id" element={<ItemList/>} />
    <Route path="item/:user_id/create/:user_id" element={<CreatItem/>} />
    </Routes>
  </div>
  );
}

export default App;
