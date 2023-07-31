import { Button, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const myUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmitButton = async () => {
    const toastId = toast.loading("Generating...");
    try {
      const result = await axios.post(`${myUrl}/`, { url });
      setShortId(result.data.shortId);
      setUrl("");
    } catch (e) {
      console.error(e);
    }
    toast.dismiss(toastId);
  };

  const handleCopy = () => {
    const textToCopy = `${import.meta.env.VITE_BASE_URL}/${shortId}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success("Text copied successfully");
      })
      .catch((error) => {
        toast.error("Failed to copy text");
      });
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="heaing-container">
          <h1 className="heading">URL Shortener</h1>
        </div>

        <div className="input-container">
          <TextField
            id="outlined-basic"
            label="Input URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            fullWidth
          />
        </div>

        <div>
          <Button variant="contained" onClick={handleSubmitButton}>
            Submit
          </Button>
        </div>

        {
          shortId && (

            <div>
              <p className="output">
                {
                  `${import.meta.env.VITE_BASE_URL}/${shortId}`
                }
              </p>
              <Button variant="contained" onClick={handleCopy}>
                Copy
              </Button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default App;
