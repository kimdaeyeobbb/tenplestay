import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/error/NotFound';
import MainLayout from '../layouts/MainLayout';
import Landing from '../pages/landing/Landing';

function CommonRouter() {
  return (
    <Routes>
      <Route>
        {/* <Route path="/" element={<Navigate replace to="/home" />}></Route> */}
        {/* <Route path="/home" element={<Home />}></Route>
        <Route path="/enteringurl" element={<EnteringUrl />}></Route> */}
        <Route path="/landing" element={<Landing />}></Route>
      </Route>
      {/* <Route element={<SubLayout />}>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/character/:id" element={<CharacterInfo />}></Route>
      </Route> */}
      {/* <Route Component={NotFound}></Route> */}
    </Routes>
  );
}

export default CommonRouter;
