// Have not found a way to avoid importing React
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./component/App.js";

// This is the element ID from you index.html you want the app to use
const container = document.getElementById('root');
const root = createRoot(container)

root.render(<App />);
