import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './users';

const App: React.FC<{}> = () => {
  const [state, setState] = useState(undefined as unknown as User)
  const [name, setName] = useState("")
  const [friends, setFriends] = useState(new Array<User>())
  useEffect(() => {
    getFriends(name, (response) => {
      console.log(response)
      try {
        setFriends(response)
      } catch (error) {

      }
    })
  }, [state])
  return (
    <div className="App">
      <label> Name:
      <input value={name} onChange={e => {
          e.preventDefault();
          setName(old => {
            return e.target.value
          })
        }} />
        <button onClick={e => {
          register(name, (response) => {
            setState(response);
          })
        }}>
          Register
        </button>
      </label>

      <br></br>
      <label> Connect to peer:
       <div>
          {friends.map(friend =>
            <button onClick={e => {
              e.preventDefault();
              console.log(friend)
            }}>{`Connect to ${friend.name}`}</button>
          )}
        </div>
      </label>
      <div>
        Chat
      </div>
    </div>
  );
}
const register = async (name: string, callback: (response: User) => void) => {
  const response = await fetch('http://localhost:5001/register', {
    method: 'PUT',
    body: JSON.stringify({
      name: name,
      date: 0,
      id: 0,
      payload: "",
      status: true,
    } as User), // string or object
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const json = await response.json(); //extract JSON from the http response
  callback(json);
  // do something with myJson
}
const getFriends = async (name: string, callback: (response: Array<User>) => void) => {
  const response = await fetch('http://localhost:5001/users', {
    method: 'GET',
    headers: {

    },
    credentials: 'include'
  });
  const json = await response.json(); //extract JSON from the http response
  callback(json);
  // do something with myJson
}
export default App;
