import { supabase } from "../../supabase";

export async function get() {

    // const data = await prisma.art.findMany();
    const { data, error } = await supabase
        .from("Survey Database")
        .select();
    
    if (error) {
        console.error(error);
    }
    
    return {
        body: {
            data
        }
    };
}

export async function post({ request }) {
    const body = await request.json();
    const data = await supabase
        .from("Survey Database")
        .insert(body)

    return {
        body: data
    }
}