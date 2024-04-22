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

type UserState = Partial<UserProps> | null;

interface IUserState {
    user: UserState;
}

interface IAction {
    type: string;
    payload: UserState;
}

interface OwnerProps {
    userId: string;
    isEditable: boolean;
}

interface UserDetailProps {
    user: UserState;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
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

interface EduContentsProps {
    eduId?: string;
    school: string;
    major: string;
    degree: string;
}

interface EduDetailProps {
    userId: string;
    edu: EducationContentsProps;
    setEdu: React.Dispatch<React.SetStateAction<EducationContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

interface CertiContentsProps {
    certiId?: string;
    certiTitle: string;
    certiDetail: string;
    certiDate: string;
}

interface CertiDetailProps {
    userId: string;
    certificate: CertiContentsProps;
    setCertificates: React.Dispatch<React.SetStateAction<CertiContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}

interface ProjectContentsProps {
    projId?: string;
    projTitle: string;
    projDetail: string;
    fromDate: string;
    toDate: string;
}

interface ProjectDetailProps {
    userId: string;
    project: ProjectContentsProps;
    setProjects: React.Dispatch<React.SetStateAction<ProjectContentsProps[]>>;
    setIsAdd: Dispatch<SetStateAction<boolean>>;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    isEditable: boolean;
}
