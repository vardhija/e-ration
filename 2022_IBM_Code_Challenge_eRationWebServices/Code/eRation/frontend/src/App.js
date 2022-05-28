import {useState} from 'react' // imporing ract to imply this is a react component
// useEffect is used to take control over the component life cycle
//useState is to manage states
import './App.css';
import Axios from 'axios';



function App() {

  const [name, setName] = useState(""); //sets a null value as current state
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);

  const [title, setTitle]= useState("");
  const [content, setContent]= useState("");

  const addProduct = ()=>{
    console.log("add product is running");
    Axios.post('http://localhost:4000/items', {
      name: name,
      quantity: quantity,
      unit: unit,
      price: price
    }).then(()=>
            {console.log("Item addded successfully");
  });
};



  const addNotification = ()=>{
    Axios.post('http://localhost:4000/notifications',{
      title: title,
      content: content
    }).then(()=>
            {console.log(content);
    });
  }


  return (
    <div className="App">
    <header> Admin Panel </header>
    <section className="itemCreator">
      <h1>Create Item</h1>
        <input className="inputField" type="text" placeholder="Product Name" onChange ={(event)=>{
          setName(event.target.value); //transfering value from placeholder to setfunction
        }}></input>
        <input className="inputField" type="number" placeholder="Total Quantity" onChange ={(event)=>{
          setQuantity(event.target.value);
        }}></input>

        {/*<input className="inputField" type="text" placeholder="Unit" onChange ={(event)=>{
          setUnit(event.target.value); //transfering value from placeholder to setfunction
        }}></input>*/}

        <select className="inputField" name="unit" onChange ={(event)=>{
          setUnit(event.target.value);
        }}>
          <option value="KG">KG</option>
          <option value="liters">liters</option>
          <option value="Pcs">Pcs</option>
        </select>

        <input className="inputField" type="number" placeholder="Price"onChange ={(event)=>{
          setPrice(event.target.value);
        }}></input>
        <button className="submit-btn" onClick={addProduct}>Add</button>
    </section>



    <section className="itemCreator">
      <h1>Send Noticifation</h1>
      <label for="title">Title</label>

      <input className="inputField" name="title" type="text" onChange ={(event)=>{
        setTitle(event.target.value);
      }}></input>

      <label for="content">Content</label>
      <textarea className="inputField" name="content"  onChange ={(event)=>{
        setContent(event.target.value);
      }}></textarea>

      <button className="submit-btn" onClick={addNotification}>Send</button>
    </section>
    <footer></footer>

    </div>
  );
}

export default App;
