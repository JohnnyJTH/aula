export type RawLesson = {
    navn: string | null;
    tidspunkt: string | null;
    hold: string | null;
    hold_id: string | null;
    lærer: string | null;
    lokale: string | null;
    status: string | "normal" | "aflyst" | "eksamen" | "ændret";
    absid: string;
    andet: string | null;
};

export type Lesson = {
    id: string;
    name: string;
    class: string;
}