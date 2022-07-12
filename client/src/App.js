import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { UidContext } from "./components/appContext";
import SignIn from "./components/Authentication/SignIn";
import Routing from "./Pages/Routes";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No Token"));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <>
        {uid ? (
          <div className="App">
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </div>
        ) : (
          <div>
            <SignIn />+
          </div>
        )}
      </>
    </UidContext.Provider>
  );
}

export default App;
