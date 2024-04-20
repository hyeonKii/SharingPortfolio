interface UserProps {
    id: string;
    email: string;
    name: string;
    password: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    profileImageFilename: string;
}

interface IUserState {
    user: Partial<UserProps> | null;
}

interface IAction {
    type: string;
    payload: Partial<UserProps> | null;
}

interface OwnerProps {
    userId: string;
    isEditable: boolean;
}

interface UserDetailProps {
    user: Partial<UserProps> | null;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<Partial<UserProps>>>;
    isEditable: boolean;
}

interface AwardContentsProps {
    awardId?: string;
    awardTitle: string;
    awardDetail: string;
}

interface AwardDetailProps {
    userId: string;
    award: AwardContentsProps;
    setAwards: React.Dispatch<React.SetStateAction<AwardContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

interface EducationContentsProps {
    eduId?: string;
    school: string;
    major: string;
    degree: string;
}

interface EducationProps {
    edu: EducationContentsProps;
    setEdu: React.Dispatch<React.SetStateAction<EducationContentsProps[]>>;
    isEditable: boolean;
}

interface CertiContentsProps {
    certiId?: string;
    certiTitle: string;
    certiDetail: string;
    certiDate: string;
}

interface CertificationProps {
    certificate: CertiContentsProps;
    setCertificates: React.Dispatch<React.SetStateAction<CertiContentsProps[]>>;
    isEditable: boolean;
}

interface ProjectContentsProps {
    projId?: string;
    projTitle: string;
    projDetail: string;
    fromDate: string;
    toDate: string;
}

interface ProjectProps {
    project: ProjectContentsProps;
    setProjects: React.Dispatch<React.SetStateAction<ProjectContentsProps[]>>;
    isEditable: boolean;
}
