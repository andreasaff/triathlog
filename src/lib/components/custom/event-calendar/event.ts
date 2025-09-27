export interface Event {
    id?: string;
    title?: string;
    date: Date
    startMin: number;
    durationMin: number;
    description?: string;
}