import React, { useState } from 'react';
import axios from 'axios';



const App = () => {


  const [username, setUsername] = useState([]);
  const [results, setResults] = useState([]);
  const [resultsDecOrder, setResultsDecOrder] = useState([]);
  const [forked, setForked] = useState([]);
  const [check, setCheck] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    let username = document.getElementById("inputField").value
    //  setUsername(username)
    axios.get(`https://api.github.com/users/${username}/repos`)
      .then((res) => {
        console.log(res.data)
        //  .then((res) => {
        let decOrder = res.data.sort((a, b) => {
          return b.size - a.size;
        })


        setResultsDecOrder(decOrder)
      })
  }




  const handleChangeCheck = (e) => {
    let checked = !e.target.checked;
    setCheck(checked)
    // console.log(checked);
    let fork = [];
    resultsDecOrder.map((el) => {
      if (el.fork) {
        fork.push(el)
      }
      setForked(fork)
    })
  }


  const hanldeInputChange = (e) => {
    setUsername(e.target.value)
  }




  var dataToDisplay = !check ? resultsDecOrder : forked;
  // var dataToDisplay = !check ? resultsDecOrder : forked;


  var disabled = !document.getElementById("inputField")?.value?.length;


  return (

    <div className="App">


      <form onSubmit={handleSubmit}>


        <div>
          <label>Github username:</label>
          <input
            type="text"
            id="inputField"
            onChange={(e) => hanldeInputChange(e)}
          />
          <label>include Fork:
            <input
              id="chb"
              type="checkbox"
              onChange={(e) => handleChangeCheck(e)}
            />
          </label>
          <button type="submit" disabled={disabled}>submit</button>
        </div>


      </form>

      {dataToDisplay.length > 0 ?


        <table className="customTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Language</th>
              <th>Description</th>
              <th>Size</th>
            </tr>
          </thead>

          <tbody>
            {dataToDisplay.map((el) => {
              return <tr>
                <td>{el.name}</td>
                <td>{el.language}</td>
                <td>{el.description}</td>
                <td>{el.size}</td>
              </tr>
            })
            }
          </tbody>
        </table>
        : <span></span>
      }

    </div>
  );
}


export default App;

