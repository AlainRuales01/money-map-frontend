export interface ResponseDto<T> {
    success: number;
    message: string;
    data: T;
    errors : string[];
}