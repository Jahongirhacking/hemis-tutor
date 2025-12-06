export enum ChatRoleEnum {
  User = 1,
  Model = 2,
}

export interface IChatContent {
  role: ChatRoleEnum;
  parts: IChatPart[];
}

export interface IChatPart {
  text: string;
}

export interface IChatReqBody {
  token: string;
  question: string;
}

export interface IChatMessage {
  id: number;
  user_id?: number;
  content: string;
  type: number;
}

export interface IChatHistoryRes {
  offset: number;
  size: number;
  messages: IChatMessage[];
}

export interface ITtsRequest {
  text: string;
}

export interface IPlagiarismResponse {
  similarityScore: number;
  highlightedText: string;
  sources: IPlagiarismSource[];
}

export interface IPlagiarismSource {
  title: string;
  uri: string;
  snippet: string;
}

export interface IRent {
  studentName: string;
  pinfl: string;
  monthName: string;
  rentAddress: string;
  rentContractId: number;
  renterPinfl: string;
  renterName: string;
  address: string;
  plasticCardType: string | null;
  plasticCardCode: string | null;
  amount: number;
  paymentDate: string;
}

export interface IScholarship {
  studentId: number;
  personId: number;
  person: string;
  eduYear: string;
  eduYearId: number;
  stipendTypes: IStipendType[];
}

export interface IStipendType {
  statusId: number;
  status: string;
  stipendTypeId: number;
  stipendType: string;
  starOn: string;
  endOn: string;
  totalCreditSum: number;
  tables: IStipendTable[];
}

export interface IStipendTable {
  monthOn: string;
  month: string;
  creditSum: number;
  creditStatusId: number;
  creditStatus: string;
}
