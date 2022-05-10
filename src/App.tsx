import './App.css';
import { Route, Routes } from 'react-router';
import { ROUTE_PATH_TRASHPAGE, ROUTE_PATH_LANDINGPAGE, ROUTE_PATH_LABELPAGE, ROUTE_PATH_Mockman, ROUTE_PATH_ARCHIVEPAGE, ROUTE_PATH_PROFILEPAGE } from './utils/Route';
import Main from './Main';
import React, { Suspense } from 'react';
import Mockman from 'mockman-js';
import RequiredAuth from './components/common/PrivateRoutes/RequiredAuth';
import Skeleton from './components/common/Skeleton/Skeleton';

const ProfilePage = React.lazy(() => import( './pages/ProfilePage/ProfilePage'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const TrashPage = React.lazy(() => import('./pages/TrashPage/TrashPage'));
const ArchivePage = React.lazy(() => import('./pages/ArchivePage/ArchivePage'));
const LabelPage = React.lazy(() => import('./pages/LabelPage/LabelPage'));

function App() {

  return (
    <div className="App">

      <Routes >
        <Route element={<Main />}>
          <Route path={ROUTE_PATH_LANDINGPAGE} element={
            <Suspense fallback={<Skeleton />}>
              <HomePage />
            </Suspense>}
          />
          <Route path={ROUTE_PATH_TRASHPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Skeleton />}>
                <TrashPage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTE_PATH_ARCHIVEPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Skeleton />}>
                <ArchivePage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTE_PATH_LABELPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Skeleton />}>
                <LabelPage />
              </Suspense>
            </RequiredAuth>}
          />
         <Route path={ROUTE_PATH_PROFILEPAGE} element={
            <RequiredAuth>
              <Suspense fallback="Loading">
                <ProfilePage />
              </Suspense>
            </RequiredAuth>}
          />
        </Route>
        <Route path={ROUTE_PATH_Mockman} element={<div className='MockAPI'><Mockman /></div>} />
      </Routes>
    </div>
  );
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJmNTg4Y2NmOC1jYjhkLTRjMzAtYjg2MC1lNmM3ZjQwZmNmYjIiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.AMka3wzV3nXZA2OEKejEdL546VHpTIrP1GszqcbCbO8
export default App;
