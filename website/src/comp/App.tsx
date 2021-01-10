import React, { useEffect, useState } from 'react';
import User from '../users';
import { loadStorage, getFriends, saveStorage, register, login } from '../util';
import useCacheState from '../costumHooks/useServerState';
import { Context, AppContext } from '../context/context';
import { Header } from './Header';
import { setupMaster } from 'cluster';

const App: React.FC<{}> = () => {
  const [allow_cookie, setAllow_cookie] = useState(false);
  const [user, setUser, updateCache] = useCacheState(true);
  const [url, setUrl] = useState("http://localhost:5002")
  const [friends, setFriends] = useState(undefined as unknown as User[])
  const [mobile, setMobile] = useState(true);

  //check cookie
  useEffect(() => {
    setAllow_cookie(_ => {
      let val = loadStorage(true, { key: "allow_cookie" });
      return val === "true" ? true : false
    });
    return () => {
      updateCache(user, allow_cookie);
    }
  }, [])
  // get Friends
  useEffect(() => {
    if (user?.token !== undefined) {
      getFriends(user.token, url, (response) => {
        console.log(response)
        try {
          setFriends(response)
        } catch (error) {

        }
      }).catch(_ => { })
    }
  }, [user])
  return (
    <AppContext.Provider value={{ user, setUser, url, setUrl, allow_cookie, mobile, setMobile }}>
      <div className="App">
        <Header allow_cookie={allow_cookie} />
        <div className='content'>
          {
            user && <h2>
              {`Hello ${user.username}`}
            </h2>
          }
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
        <div className={'footer'}>
          <span>Cookies
        <button key={0} className={allow_cookie === true ? "active" : undefined} onClick={
              e => {
                e.preventDefault();
                saveStorage(true, { key: "allow_cookie", value: new String(true).toString() })
                updateCache(user, true)
                setAllow_cookie(true);
              }
            }>Allow</button><button key={1} className={allow_cookie === false ? "active" : undefined} onClick={e => {
              e.preventDefault();
              localStorage.clear();
              setAllow_cookie(false);
            }}>Deny</button>
          </span>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
