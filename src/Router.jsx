import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chatpage" element={<ChatPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
