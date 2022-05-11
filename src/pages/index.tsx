import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import ScrollTop from '../components/common/ScrollTop';
import { useRecoilState } from 'recoil';
import { recruitmentSelector } from '../store/recruitHandler';
import GoogleSpinner from '../components/Lottie/GoogleSpinner';
const Home = lazy(() =>
  import('./Home').then((module) => ({
    default: module.default,
  })),
);
const Recruit = lazy(() =>
  import('./Recruit').then((module) => ({
    default: module.default,
  })),
);
const Introduce = lazy(() =>
  import('./Introduce').then((module) => ({
    default: module.default,
  })),
);
const CodeOfConduct = lazy(() =>
  import('./CodeOfConduct').then((module) => ({
    default: module.default,
  })),
);
const Faq = lazy(() =>
  import('./Faq').then((module) => ({
    default: module.default,
  })),
);

const Pages = () => {
  const [selector, setSelector] = useRecoilState(recruitmentSelector);

  useEffect(() => {
    setSelector(selector);
  }, []);
  return (
    <>
      <ScrollTop />
      <Suspense fallback={<GoogleSpinner />}>
        <Routes>
          <Route path={'/*'} element={<Home />} />
          <Route path={'/introduce'} element={<Introduce />} />
          <Route path={'/recruit/*'} element={<Recruit />} />
          <Route path={'/conduct'} element={<CodeOfConduct />} />
          <Route path={'/faq/*'} element={<Faq />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default Pages;
