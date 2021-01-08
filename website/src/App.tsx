import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './users';

const App: React.FC<{}> = () => {
  const [state, setState] = useState(undefined as unknown as User)
  const [name, setName] = useState("")
  const [friends, setFriends] = useState(new Array<User>())
  const [url, setUrl] = useState("http://localhost:5002")
  useEffect(() => {
    if (state?.token !== undefined) {
      getFriends(state.token, url, (response) => {
        console.log(response)
        try {
          setFriends(response)
        } catch (error) {

        }
      }).catch(_ => { })
    }
  }, [state])
  return (
    <div className="App">
      <label> Server:
      <input value={url} onChange={e => {
          e.preventDefault();
          setUrl(_ => {
            return e.target.value
          })
        }} />
      </label>
      <label> Name:
      <input value={name} onChange={e => {
          e.preventDefault();
          setName(_ => {
            return e.target.value
          })
        }} />
        <button onClick={e => {
          register(name, url, (response) => {
            setState(response);
          }).catch(_ => { })
        }}>
          Register
        </button>
        <button onClick={e => {
          login(name, url, (response) => {
            setState(response);
          }).catch(_ => { })
        }}>
          Login
        </button>
      </label>

      <br></br>
      <label> Connect to peer:
       <div>
          {friends.map((friend, idx) =>
            <button key={idx} onClick={e => {
              e.preventDefault();
              console.log(friend)
            }}>{`Connect to ${friend.username}`}</button>
          )}
        </div>
      </label>
      <div>
        Chat
      </div>
    </div>
  );
}
const register = async (name: string, url: string, callback: (response: User) => void) => {
  const response = await fetch(`${url}/register`, {
    method: 'PUT',
    body: JSON.stringify({
      username: name
    } as User), // string or object
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const json = await response.json(); //extract JSON from the http response
  callback(json);
  // do something with myJson
}
const login = async (name: string, url: string, callback: (response: User) => void) => {
  const response = await fetch(`${url}/login`, {
    method: 'PUT',
    body: JSON.stringify({
      username: name
    } as User), // string or object
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const json = await response.json(); //extract JSON from the http response
  callback(json);
  // do something with myJson
}
const getFriends = async (token: string, url: string, callback: (response: Array<User>) => void) => {
  const response = await fetch(`${url}/users`, {
    method: 'PUT',
    body: JSON.stringify({
      token: token
    }), // string or object
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const json = await response.json(); //extract JSON from the http response
  callback(json);
  // do something with myJson
}
export default App;
