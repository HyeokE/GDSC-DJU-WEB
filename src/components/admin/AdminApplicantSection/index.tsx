import React, { useEffect, useState } from 'react';
import ApplicantCard from '../ApplicantCard';
import {
  ApplicantCardSection,
  ApplicantCardWrapper,
  ApplicantSection,
} from './styled';
import {
  ApplicantsStatus,
  ApplicantsStatusWrapper,
  Handle,
  InformationHeader,
  Switch,
  ToggleButton,
} from '../../../pages/Admin/AdminApplicants/styled';
import { useRecoilState } from 'recoil';
import { recruitmentState } from '../../../store/recruitHandler';
import { useSearchParams } from 'react-router-dom';
import { dbService } from '../../../firebase/firebase';
import { IApplicantType, IApplicantTypeWithID } from '../../../types/applicant';
import { position } from '../AdminApplicantsSidebar';
import StatusBadge from '../Statusbadge';

const AdminApplicantSection = () => {
  const [applicants, setApplicants] = useState<IApplicantTypeWithID[]>();
  const [applicantCount, setApplicantCount] = useState({
    isDOCS: 0,
    isINTERVIEW: 0,
    isREJECTED: 0,
    isHIRED: 0,
  });
  const [searchParams] = useSearchParams();

  const currentParam = searchParams.get('type') as string;
  useEffect(() => {
    dbService
      .collection('applicants')
      .get()
      .then((querySnapshot) => {
        const tempDoc: IApplicantTypeWithID[] = querySnapshot.docs.map(
          (doc) => {
            return { id: doc.id, ...(doc.data() as IApplicantType) };
          },
        );
        const filteredApplicants =
          currentParam !== 'home'
            ? tempDoc.filter((data) =>
                data.position
                  .toLowerCase()
                  .includes(
                    position[
                      currentParam as keyof typeof position
                    ].toLowerCase(),
                  ),
              )
            : tempDoc;
        tempDoc && setApplicants(filteredApplicants);
        countApplicantsHandler(filteredApplicants);
      });
  }, [currentParam]);
  const countApplicantsHandler = (
    filteredApplicants: IApplicantTypeWithID[],
  ) => {
    const DOCS = filteredApplicants.filter((data) => data.status === 'DOCS');
    const INTERVIEW = filteredApplicants.filter(
      (data) => data.status === 'INTERVIEW',
    );
    const REJECTED = filteredApplicants.filter(
      (data) => data.status === 'REJECTED',
    );
    const HIRED = filteredApplicants.filter((data) => data.status === 'HIRED');
    setApplicantCount({
      isDOCS: DOCS.length,
      isINTERVIEW: INTERVIEW.length,
      isREJECTED: REJECTED.length,
      isHIRED: HIRED.length,
    });
  };

  return (
    <ApplicantSection>
      <InformationHeader>
        <AnnouncementToggle currentParam={currentParam} />
        <ApplicantsStatus>
          <ApplicantsStatusWrapper>
            <StatusBadge status={'DOCS'} /> {applicantCount.isDOCS}
          </ApplicantsStatusWrapper>
          <ApplicantsStatusWrapper>
            <StatusBadge status={'INTERVIEW'} /> {applicantCount.isINTERVIEW}
          </ApplicantsStatusWrapper>
          <ApplicantsStatusWrapper>
            <StatusBadge status={'REJECTED'} /> {applicantCount.isREJECTED}
          </ApplicantsStatusWrapper>
          <ApplicantsStatusWrapper>
            <StatusBadge status={'HIRED'} /> {applicantCount.isHIRED}
          </ApplicantsStatusWrapper>
        </ApplicantsStatus>
      </InformationHeader>
      {applicants && (
        <ApplicantCardSection>
          {applicants.map((applicant) => (
            <ApplicantCardWrapper key={applicant.id}>
              <ApplicantCard {...applicant} />
            </ApplicantCardWrapper>
          ))}
        </ApplicantCardSection>
      )}
    </ApplicantSection>
  );
};

const AnnouncementToggle = ({ currentParam }: { currentParam: string }) => {
  const [recruit, setRecruit] = useRecoilState(recruitmentState);

  const switchHandler = (key: keyof typeof recruit) => {
    return setRecruit({ ...recruit, [key]: !recruit[key] });
  };
  const isOn = (key: keyof typeof recruit) => {
    return recruit[key];
  };
  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };
  return (
    <ToggleButton>
      <Switch
        data-ison={isOn(currentParam as keyof typeof recruit)}
        onClick={() => switchHandler(currentParam as keyof typeof recruit)}
      >
        <Handle layout transition={spring} />
      </Switch>
    </ToggleButton>
  );
};

export default AdminApplicantSection;
