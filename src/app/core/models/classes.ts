import { Modality } from './modality';
import { Teacher } from './teacher';

export type Classes = {
  id: string;
  name: string;
  modality: Modality;
  teacher: Teacher;
  weekDays: string[];
};

export type ClassRoomForm = {
  id: string;
  name: string;
  modality: string;
  teacher: string;
  weekDays: string[];
};
