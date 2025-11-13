export interface ISubject {
  id: number;
  name: string;
}

export interface IExamType {
  code: string;
  name: string;
}

export interface IEmployee {
  id: number;
  name: string;
}

export interface IStudentAttempt {
  attemptLimit: number;
  attemptsLeft: number;
  attemptsUsed: number;
  correct: number;
  finishedAt: number;
  id: number;
  mark: number;
  maxBall: number;
  percent: number;
  startedAt: number;
  timeSpent: number;
}

export interface IExam {
  id: number;
  name: string;
  comment?: string | null;
  subject: ISubject;
  examType: IExamType;
  employee?: IEmployee | null;
  questionCount: number;
  durationMinutes: number;
  maxBall: number;
  attemptLimit: number;
  attemptsUsed: number;
  attemptsLeft: number;
  random: boolean;
  canJoin: boolean;
  startAt: number; // unix timestamp (seconds)
  finishAt: number; // unix timestamp (seconds)
  studentAttempt: null | IStudentAttempt;
}

export interface IExamOption {
  index: number;
  code: string;
  label: string;
}

export interface IExamQuestion {
  id: number;
  order: number;
  title: string;
  content: string;
  multiple: boolean;
  options: IExamOption[];
  selected: number[];
}

export interface IStartExamRes {
  exam: IExam;
  timeLeft: number;
  questions: IExamQuestion[];
}

export interface IExamAnswer {
  questionId: 1968;
  selected: number[];
  answers: IAnswers;
}

export interface IAnswers {
  [key: string]: number;
}

export interface IExamResult {
  result: {
    id: number;
    percent: number;
    mark: number;
    correct: number;
    attemptsUsed: number;
    timeSpent: number;
    startedAt: number;
    finishedAt: number;
    attemptLimit: number;
    attemptsLeft: number;
    maxBall: number;
  };
}
