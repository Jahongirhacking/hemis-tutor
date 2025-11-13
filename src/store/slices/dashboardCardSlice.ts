import {
  getExistedOne,
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDashboardCard {
  id: string;
  isAdded: boolean;
}

const INITIAL_CARDS: IDashboardCard[] = [
  {
    id: 'tasks',
    isAdded: true,
  },
  {
    id: 'schedules',
    isAdded: true,
  },
  {
    id: 'appropriation',
    isAdded: true,
  },
  {
    id: 'attendance',
    isAdded: true,
  },
  {
    id: 'gpa-scores',
    isAdded: true,
  },
];

const savedCards = getLocalStorage(localStorageNames.dashboardCards);

const initialState: IDashboardCard[] = getExistedOne(
  savedCards &&
    INITIAL_CARDS.length === (savedCards as IDashboardCard[])?.length
    ? savedCards
    : INITIAL_CARDS.map(card => {
        const foundCard = (savedCards as IDashboardCard[])?.find(
          savedCard => savedCard?.id === card?.id
        );
        return foundCard ?? card;
      }),
  INITIAL_CARDS
);

const dashboardCardSlice = createSlice({
  name: 'dashboard-control',
  initialState,
  reducers: {
    setDashboardCard: (_, action: PayloadAction<IDashboardCard[]>) => {
      setLocalStorage(localStorageNames.dashboardCards, action.payload);
      return action.payload;
    },
  },
});

export const { setDashboardCard } = dashboardCardSlice.actions;

export default dashboardCardSlice.reducer;
