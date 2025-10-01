export interface Event {
    id?: string;
    title?: string;
    date: Date
    startMin: number;
    durationMin: number;
    description?: string;
    isCompleted?: boolean;
    background?: string;
    border?: string;
}