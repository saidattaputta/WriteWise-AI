import api from "./api";


export interface LetterRequest {
    recipient: string;
    purpose: string;
    tone: string;
    content: string;
}


export interface LetterResponse {
    message: string;
    letter: string;
}


export interface LetterHistoryItem {
    id: number;
    user_id: number;
    recipient: string;
    purpose: string;
    tone: string;
    content: string;
    generated_content: string;
    created_at: string;
    updated_at: string;
}


/**
 * Generate a new AI letter.
 */
export async function generateLetter(
    data: LetterRequest
): Promise<LetterResponse> {

    const response = await api.post(
        "/letters/generate",
        data
    );

    return response.data;
}


/**
 * Get the authenticated user's letter history.
 */
export async function getLetterHistory(): Promise<LetterHistoryItem[]> {

    const response = await api.get(
        "/letters"
    );

    return response.data;
}


/**
 * Get a single letter belonging to the authenticated user.
 */
export async function getLetter(
    letterId: number
): Promise<LetterHistoryItem> {

    const response = await api.get(
        `/letters/${letterId}`
    );

    return response.data;
}