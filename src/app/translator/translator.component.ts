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
  input!:string;
  translation!:string;
  waiting: boolean = false;

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

  swapLanguages(){
    let temp: string = this.sourceLanguage;
    this.sourceLanguage = this.targetLanguage
    this.targetLanguage = temp;

    if(this.translation.length > 0){
      temp = this.input;
      this.input = this.translation
      this.translation = temp;
    }
  }

  async translate(){
    if(this.input.length < 1) return;
    this.waiting = true;
    let url: string = `https://api.mymemory.translated.net/get?q=${this.input}!&langpair=${this.sourceLanguage}|${this.targetLanguage}`;
    const response = await axios.get(url)
    if(response.data){
      this.translation = response.data.responseData.translatedText  
    }
    this.waiting = false;
  }

  async copy(){
    try {
      await navigator.clipboard.writeText(this.translation);
    }
    catch (err) {
      console.error('Could not write to clipboard', err);
    }
  }

  speak(text: string, language: string){
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
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
