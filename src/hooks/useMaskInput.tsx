import { ChangeEvent, useState } from 'react';
import { EMPTY_STRING } from '../utils/constants';

export const useMaskInput = (): {
   value: string;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} => {
   const [value, setValue] = useState<string>(EMPTY_STRING);

   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      let input = e.target,
         inputNumberValue = input.value.replace(/\D/g, ''),
         formatedInput = '',
         selectionStart = input.selectionStart;

      if (input.value.length !== selectionStart) {
         window.requestAnimationFrame(() => {
            input.selectionStart = selectionStart;
            input.selectionEnd = selectionStart;
         });
      }

      if (['7', '8', '9'].includes(inputNumberValue[0])) {
         if (inputNumberValue[0] === '9')
            inputNumberValue = '7' + inputNumberValue;
         const firstSymbol = inputNumberValue[0] === '8' ? '8' : '+7';
         formatedInput = firstSymbol + ' ';

         if (inputNumberValue.length > 1)
            formatedInput += '(' + inputNumberValue.substring(1, 4);
         if (inputNumberValue.length >= 5)
            formatedInput += ') ' + inputNumberValue.substring(4, 7);
         if (inputNumberValue.length >= 7)
            formatedInput += '-' + inputNumberValue.substring(7, 9);
         if (inputNumberValue.length >= 9)
            formatedInput += '-' + inputNumberValue.substring(9, 11);

         setValue(formatedInput);
      } else setValue(EMPTY_STRING);
   };

   return {
      value,
      onChange,
   };
};
