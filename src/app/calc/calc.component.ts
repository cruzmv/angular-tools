import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  tiles: Tile[];
  display:string = '';
  history:string[] = [];


  constructor() { 
    this.tiles = [
      {text: 'C', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '%', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '/', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '7', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '8', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '9', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '*', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '4', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '5', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '6', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '-', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '1', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '2', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '3', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '+', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '0', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '.', cols: 1, rows: 1, color: '#CFCBCB'},
      {text: '=', cols: 1, rows: 1, color: '#CFCBCB'},
    ]; 
  }

  ngOnInit(): void {
  }
  
  btnClick(num: string) {
    this.display += num;
    if(num === '='){
      this.result();
    }
    if(num === 'C'){
      this.clean();
    }
  }

  result(){
    const start = this.display.lastIndexOf('<br>') > -1 ? this.display.lastIndexOf('<br>') +4  : this.display.lastIndexOf('<br>');
    const end = this.display.lastIndexOf('=');
    const calc = this.display.substring(start,end);
    this.history.push(calc);
    const result = eval(calc);
    this.history.push(result);
    this.updateDisplay();

  }

  updateDisplay(){
    this.display = '';
    this.history.map((item,index)=>{
      if( index >= this.history.length - 4 ){
        this.display += item + '<br>';
      }
    });
  }

  clean(){
    this.display = '';
    this.history = [];
  }

}
