import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface Language {
  countryCode: string;
  language: string;
  flag: string;
}

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})

export class TranslatorComponent implements OnInit{
  languages!: Language[];
  sourceLanguage: string = 'en-GB';
  targetLanguage: string = 'en-GB';

  async ngOnInit(): Promise<void> {
    const response = await axios.get('https://api-sandbox.translated.com/v2/symbol/languages')
    if(response.data){
      console.log(response.data)
      this.languages = response.data.map((l: any) => {
        return {
          countryCode: l.key,
          language: l.value,
          flag: getFlag(l.key)
        };
      });      
    }
  }
}

function getFlag(countryCode: string): string {
  const lastTwoChars = countryCode.slice(-2);
  const codePoints: number[] = lastTwoChars
    .toUpperCase()
    .split('')
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
