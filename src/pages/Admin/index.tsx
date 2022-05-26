import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminHome from './AdminHome';
import AdminApplicants from './AdminApplicants';
import { authService, dbService } from '../../firebase/firebase';
import { useRecoilState } from 'recoil';
import { localUserState } from '../../store/localUser';
import { useLocation } from 'react-router';
import { recruitmentSelector } from '../../store/recruitHandler';
import API from '../../apis/index';
import AdminEmail from './AdminEmail';
import ApplicantModal from '../../components/admin/ApplicantModal';

const Admin = () => {
  const [adminUser, setAdminUser] = useRecoilState(localUserState);
  const [selector, setSelector] = useRecoilState(recruitmentSelector);
  const navigate = useNavigate();
  const getAdminUser = (uid: string) => {
    dbService
      .collection('adminUsers')
      .doc(uid)
      .get()
      .then((doc) => {
        const userData = doc.data();
        setAdminUser({
          ...adminUser,
          uid: uid,
          nickname: userData?.nickname,
          name: userData?.name,
          phoneNumber: userData?.phoneNumber,
        });
      });
  };

  const checkAdminUser = async () => {
    await authService.onAuthStateChanged((user) => {
      if (user) {
        try {
          getAdminUser(user.uid);
        } catch (error) {
          navigate('/');
          error instanceof Error && console.log(error);
        }
      } else {
        navigate('/');
        authService.signOut();
      }
    });
  };

  useEffect(() => {
    setSelector(selector);
    checkAdminUser();
  }, []);

  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path={'/*'} element={<AdminHome />} />
        {/*<Route path={'/member'} element={<AdminMember />} />*/}
        <Route path={'/recruit'} element={<AdminApplicants />} />
        <Route path={'/email'} element={<AdminEmail />} />
      </Routes>
    </>
  );
};

export default Admin;
