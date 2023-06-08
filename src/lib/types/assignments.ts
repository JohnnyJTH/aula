import type { DateTime } from "luxon";

export type Assignment = {
    title: string;
    description: string;
    date: DateTime;
    status: "Afleveret" | "Afventer" | "Mangler";
    hold: string;
    link: string;
};

export type RawAssignment = {
    afventer: "Elev" | "Lærer" | "";
    "elev-tid": string;
    elevnote: string;
    exerciseid: string;
    "fravær": string;
    frist: string;
    hold: string;
    karakter: string;
    opgavenote: string;
    opgavetitel: string;
    status: "Afleveret" | "Afventer" | "Mangler";
    uge: string;
}