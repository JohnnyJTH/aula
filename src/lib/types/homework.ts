import type { DateTime } from "luxon";
import type { Lesson, RawLesson } from "./lesson";

export type RawHomework = {
    dato: string;
    aktivitet: RawLesson;
    note: string;
    lektier: {
        beskrivelse: string;
        link: string;
    };
};

export type Homework = {
    date: DateTime;
    lesson: Lesson;
    homework: string;
};