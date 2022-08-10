import React, { useEffect } from "react";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import InputPage from "./pages/InputPage/InputPage";
import PostList from "./pages/postlist/PostList";
import Detail from "./pages/detailpage/Detail";

function App() {

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posting" element={<InputPage />} />
          <Route path="/detail/:id" element={<Detail />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
