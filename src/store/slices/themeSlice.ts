import {
  getLocalStorage,
  localStorageNames,
  setLocalStorage,
} from '@/utils/storageFunc';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  color: 'dark' | 'light';
  isAudioPlaying: boolean;
}
const initialState: IState = {
  color: getLocalStorage(localStorageNames.theme)
    ? (getLocalStorage(localStorageNames.theme) as IState).color
    : 'light',
  isAudioPlaying: false,
};

const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: initialState,
  reducers: {
    toggleThemeColor: state => {
      state.color = state.color === 'light' ? 'dark' : 'light';
      setLocalStorage(localStorageNames.theme, state);
    },

    setIsAudioPlaying: (state, action: PayloadAction<boolean>) => {
      state.isAudioPlaying = action.payload;
    },
  },
});

export const { toggleThemeColor, setIsAudioPlaying } = themeSlice.actions;
export default themeSlice.reducer;
