interface SurveyData {
    url: string;
    AuthedUser: string,
    profile:string,
    available_surv: {
        uri: string,
        current_ix: number,
        question_cnt: number,
        survId : string
    }
}
interface Agent {
    agent: {
        id:string,
        name: string,
        email: string,
        phone:string,
        gender:string,
        age: number,
        completes: number
    },
    pending: number
}

interface Client {
    clients:{
        id:string,
        name: string,
        email: string,
        phone:string,
        company: string,
        packagetype: string,
        surveys: number
    }
}

export type { SurveyData, Agent, Client}