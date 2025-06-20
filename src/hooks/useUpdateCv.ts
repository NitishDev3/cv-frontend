import type { ICVData } from "../types/cv";


function useRemoveId(cvData: ICVData){

    const updatedCvData = {
        ...cvData,
        education: cvData?.education.map((item) => {
            delete item.id;
            return item;
        }),
        experience: cvData?.experience.map((item) => {
            delete item.id;
            return item;
        }),
        projects: cvData?.projects.map((item) => {
            delete item.id;
            return item;
        }),
        skills: cvData?.skills.map((item) => {
            delete item.id;
            return item;
        }),
        socialProfiles: cvData?.socialProfiles.map((item) => {
            delete item.id;
            return item;
        }),
    }
    

    return updatedCvData;
}


export default useRemoveId;