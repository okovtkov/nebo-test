import React from 'react';
import { CharacterData } from './types';

interface HistoryContext {
  checkedCharacters: CharacterData[];
  setCheckedCharacters: (characters: CharacterData[]) => void;
}

export default React.createContext<HistoryContext>({
  checkedCharacters: [],
  setCheckedCharacters: () => undefined,
});
