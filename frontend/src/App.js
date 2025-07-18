import React from "react";
import { Routes,Route } from "react-router-dom";
import FormList from "./pages/FormList";
import FormCreate from "./pages/FormCreate";
import FormViewer from "./pages/FormViewer";
import FormEdit from "./pages/FormEdit";

export default function App(){
  return (
    <Routes>
      <Route path ="/" element={<FormList/>}/>
      <Route path="/form/create" element={<FormCreate/>}/>
      <Route path="/form/:id" element={<FormViewer/>}/>
      <Route path="/form/:id/edit" element={<FormEdit/>}/>
    </Routes>
  );
}