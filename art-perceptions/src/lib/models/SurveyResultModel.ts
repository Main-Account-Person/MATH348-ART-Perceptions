export interface SurveyResults {
    data: Result[]
}

interface Result {
    survey_id: number,
    created_at: string,
    email: string,
    in_person: boolean,
}


