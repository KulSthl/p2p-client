import React, { useEffect, useState } from 'react';
import User from '../users';
import { loadStorage, getFriends, saveStorage, register, login } from '../util';
import useCacheState from '../costumHooks/useCacheState';
import { Context, AppContext } from '../context/context';
import { Header } from './Header';
import { setupMaster } from 'cluster';
import { Cookie } from './Cookie';
import { Room, IRoom } from './Room'
import { Login } from './Login';

const App: React.FC<{}> = () => {
  const [allow_cookie, set_allow_cookie, set_cache_allow_cookie] = useCacheState('allow_cookie', false);
  const [user, setUser, updateCache] = useCacheState('user', undefined as unknown as User, allow_cookie);
  const [url, setUrl] = useState("http://localhost:5002")
  const [friends, setFriends] = useState(undefined as unknown as User[])
  const [mobile, setMobile] = useState(true);
  const [room, setRoom] = useState(undefined as unknown as IRoom)
  const [step, setStep] = useState(0)
  //check cookie
  useEffect(() => {
    let val = loadStorage(true, { key: "allow_cookie" }) === true ? true : false;
    set_allow_cookie(val);
  }, []);
  return (
    <AppContext.Provider value={{ step, setStep, user, setUser, url, setUrl, allow_cookie, mobile, setMobile, set_allow_cookie, room: room, setRoom: setRoom }}>
      <div className="App">
        <Header allow_cookie={allow_cookie} />
        <div className="scrollable">


        <div className='content'>
          {
              user === undefined ? <Login />
                :
                <div className='inner-content'>
                  <h2>
              {`Hello ${user.username}`}
                  </h2>
          
                  <Room />
                </div>
            }
            <div className={'footer'}>
              <Cookie
              />
            </div>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
