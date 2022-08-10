import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import {Button} from "@mui/material";

function App() {
  const [singerName, setsingerName] = useState("");
  const [singerInfo, setsingerInfo] = useState<{[key: string]: any}[]>([]);
  const BASE_API_URL = "https://itunes.apple.com/search?term=";
  return (
    <div>
      <div className="search-field">
        <h1>Search Singer</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={singerName}
            onChange={(prop) => {
              setsingerName(prop.target.value);
            }}
            label="Enter a singer Name..."
            variant="outlined"
            placeholder="Search..."
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>
      {singerInfo.length == 0 ? <div></div> : <div>{singerInfo[0].collectionName}</div>}  


    </div>
  );

  function search() {
    var url;
    if (singerName === undefined || singerName === "") {
      return;
    }
    else if(singerName.split(" ").length == 1){
      url = BASE_API_URL + singerName.toLowerCase();
    }
    else{
      url = BASE_API_URL + singerName.toLowerCase().split(" ").join("+");
    }
    console.log(url)

    axios
      .get(url)
      .then((res) => {
        setsingerInfo(res.data.results);
      })
      .catch((e) => {
        console.log(e)
      });
  }
}

export default App;
