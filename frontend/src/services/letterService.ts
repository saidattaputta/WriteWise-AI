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

export async function generateLetter(
    data: LetterRequest
): Promise<LetterResponse> {

    const response = await api.post(
        "/letters/generate",
        data
    );

    return response.data;
}