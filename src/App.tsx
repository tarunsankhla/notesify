import './App.css';
import { Route, Routes } from 'react-router';
import { ROUTE_PATH_TRASHPAGE, ROUTE_PATH_LANDINGPAGE, ROUTE_PATH_LABELPAGE, ROUTE_PATH_Mockman, ROUTE_PATH_ARCHIVEPAGE, ROUTE_PATH_PROFILEPAGE, ROUTE_PATH_HOMEPAGE, ROUTE_PATH_Unknown } from './utils/Route';
import Main from './Main';
import React, { Suspense } from 'react';
import Mockman from 'mockman-js';
import RequiredAuth from './components/common/PrivateRoutes/RequiredAuth';
import Skeleton from './components/common/Skeleton/Skeleton';
import LandingPage from './pages/LandingPage/LandingPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Loader from "./components/common/Loader/Loader";

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
        
          <Route path={ROUTE_PATH_HOMEPAGE} element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>}
          />
          <Route path={ROUTE_PATH_TRASHPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Loader />}>
                <TrashPage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTE_PATH_ARCHIVEPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Loader />}>
                <ArchivePage />
              </Suspense>
            </RequiredAuth>}
          />
          <Route path={ROUTE_PATH_LABELPAGE} element={
            <RequiredAuth>
              <Suspense fallback={<Loader />}>
                <LabelPage />
              </Suspense>
            </RequiredAuth>}
          />
         <Route path={ROUTE_PATH_PROFILEPAGE} element={
            <RequiredAuth>
              <Suspense fallback=".....Loading">
                <ProfilePage />
              </Suspense>
            </RequiredAuth>}
          />

          
        </Route>
        <Route path={ROUTE_PATH_LANDINGPAGE} element={ <LandingPage />}/>
        <Route path={ROUTE_PATH_Mockman} element={<div className='MockAPI'><Mockman /></div>} />
        <Route path={ROUTE_PATH_Unknown} element={ <NotFoundPage/>}/>
      </Routes>
    </div>
  );
}
export default App;
