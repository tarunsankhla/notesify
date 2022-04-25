// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import { ROUTE_PATH_ArchivePage, ROUTE_PATH_LandingPage, ROUTE_PATH_Mockman, ROUTE_PATH_TrashPage } from './utils/Route';
// import HomePage from "./pages/HomePage/HomePage";
// import HomePage from './pages/HomePage/HomePage';
// import { TrashPage } from "./pages/HomePage/TrashPage";
// import { ArchivePage } from "./pages/HomePage/ArchivePage";
import Main from './Main';
import React, { Suspense } from 'react';
// const {Mockman} = require("mockman-js");
import Mockman from 'mockman-js';

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const TrashPage = React.lazy(() => import('./pages/TrashPage/TrashPage'));
const ArchivePage = React.lazy(() => import('./pages/ArchivePage/ArchivePage'));

function App() {

  return (
    <div className="App">
  
      <Routes >
        <Route element={<Main />}>
          {/* <Route path='/' element={<HomePage />}></Route> */}
          <Route path={ROUTE_PATH_LandingPage} element={
                <Suspense fallback={<h1>Loading Home...</h1>}>
                  <HomePage />
                </Suspense>} />
          <Route path={ROUTE_PATH_TrashPage} element={
                <Suspense fallback={<h1>Loading Trash...</h1>}>
                  <TrashPage />
                </Suspense>}/>
          <Route path={ROUTE_PATH_ArchivePage} element={
                <Suspense fallback={<h1>Loading Archive...</h1>}>
                  <ArchivePage />
                </Suspense>} />
        </Route>
        <Route path={ROUTE_PATH_Mockman} element={<div className='MockAPI'><Mockman /></div>} />
        </Routes>
    </div>
  );
}
{/* <input onChange={(e) => debounce(()=>update(e.target.value), 500)} /> */ }
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNTg4Y2NmOC1jYjhkLTRjMzAtYjg2MC1lNmM3ZjQwZmNmYjIiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.AMka3wzV3nXZA2OEKejEdL546VHpTIrP1GszqcbCbO8
export default App;
