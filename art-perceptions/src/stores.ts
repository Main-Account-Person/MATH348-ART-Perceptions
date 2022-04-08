import { writable } from "svelte/store";
import { supabase } from "./supabase";

export const galleryResults = writable([]);
export const surveyDatabase = writable([]);

export async function loadSurveyDB() {
    const { data, error } = await supabase
        .from("Test")
        .select();
    
    if (error) {
        return console.error(error)
    }

    surveyDatabase.set(data);
}

// loadSurveyDB();