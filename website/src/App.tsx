import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './users';
import { loadStorage, getFriends, saveStorage, register, login } from './util';
import useCacheState from './useServerState';

const App: React.FC<{}> = () => {
  const [allow_cookie, setAllow_cookie] = useState(false);
  const [state, setState, updateCache] = useCacheState(true, (state) => {
    setName(state?.username)
  });
  const [name, setName] = useState("")
  const [friends, setFriends] = useState(undefined as unknown as User[])
  const [url, setUrl] = useState("http://localhost:5002")
  //check cookie
  useEffect(() => {
    setAllow_cookie(_ => {
      let val = loadStorage(true, { key: "allow_cookie" });
      return val === "true" ? true : false
    });
    return () => {
      updateCache(state, allow_cookie);
    }
  }, [])
  // get Friends
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
      <div className="header">
        <span>Cookies
        <button key={0} className={allow_cookie === true ? "active" : undefined} onClick={
          e => {
            e.preventDefault();
            saveStorage(true, { key: "allow_cookie", value: new String(true).toString() })
            updateCache(state, true)
            setAllow_cookie(true);
          }
        }>Allow</button><button key={1} className={allow_cookie === false ? "active" : undefined} onClick={e => {
          e.preventDefault();
          localStorage.clear();
          setAllow_cookie(false);
        }}>Deny</button>
        </span>
      <label> Server:
      <input value={url} onChange={e => {
          e.preventDefault();
          setUrl(_ => {
            return e.target.value.trim()
          })
        }} />
      </label>
      <label> Name:
      <input value={name} onChange={e => {
          e.preventDefault();
          setName(_ => {
            return e.target.value.trim()
          })
        }} />
        <button onClick={e => {
          register(name, url, (response) => {
            setState(response, allow_cookie);
          }).catch(_ => { })
        }}>
          Register
        </button>
        <button onClick={e => {
          login(name, url, (response) => {
            setState(response, allow_cookie);
          }).catch(_ => { })
        }}>
          Login
        </button>
      </label>
      </div>
      <br />
      {
        state && <h2>
          {`Hello ${state.username}`}
        </h2>
      }
      <br />
      {
        friends && <div><label> User list:</label>
       <div>
            {friends.map((friend, idx) =>
              <button className={`user ${idx}`} id={`${idx}`} key={`${idx} + ${(Math.random() * 100)}`} onClick={e => {
                e.preventDefault();
                console.log(friend)

              }}><span key={idx}>{`Connect to \n ${friend.username}`}</span></button>
            )}
          </div>
        </div>
      }
    </div>
  );
}

export default App;
