import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Navi from "./components/Navi";
import Characters from "./components/Characters";

function gotoTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const themeeCss = {
  dark: {
    color: "#fff",
    backgroundColor: "#111315",
  },
  light: {
    backgroundColor: "#fff",
    color: "#111315",
  },
};
export const Themee = React.createContext(themeeCss.dark);

function App() {
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState();
  const [showTopButton, setShowTopButton] = useState(false);
  const [view, setView] = useState(themeeCss.dark);
  const getData = async (url) => {
    if (!url) {
      url = "https://rickandmortyapi.com/api/character";
    }
    await axios.get(url).then((res) => {
      setData(() => data.concat(res.data.results));
      setDataInfo(res.data.info);
    });
  };
  const changeView = () => {
    themeeCss.dark === view ? setView(themeeCss.light) : setView(themeeCss.dark);
  };
  useEffect(() => {
    document.title = "The Rick and Morty | Serdar Göleli ";
    window.addEventListener("scroll", () => {
      window.scrollY > 400 ? setShowTopButton(true) : setShowTopButton(false);
    });
    if (data.length <= 0) {
      getData();
    }
  }, [data]);

  return (
    <div className={`App ${themeeCss.dark === view ? "dark" : "light"}`} style={view}>
      <Navi>
        <FormGroup switch>
          <Input type="switch" role="switch" defaultChecked={themeeCss.dark === view} onInput={changeView} />
          <Label check> {themeeCss.dark === view ? "Dark" : "Light"} </Label>
        </FormGroup>
      </Navi>
      <Routes>
        <Route path="/" element={<Characters getData={getData} dataInfo={dataInfo} data={data} />} />
      </Routes>

      {showTopButton && (
        <Button className="goto-top-button" color="warning" onClick={() => gotoTop()}>
          <span>&#8673;</span>
        </Button>
      )}
    </div>
  );
}

export default App;
