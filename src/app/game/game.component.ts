import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  animations: [
    trigger('block_click', [
      state('click_start', style({ opacity: 0.4, })),
      state('click_end', style({ opacity: 0.4, })),
      transition('* <=> *', [
        animate('500ms', keyframes([
          style({opacity: 0.4}),
          style({opacity: 0.6}),
          style({opacity: 1}),
          style({opacity: 0.6}),
          style({opacity: 0.4})
        ]))
      ]),
    ])
       
  ]
})
export class GameComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
  redClick = true;
  yellowClick = true;
  greenClick = true;
  blueClick = true;
  gameStarted = false;
  lastSequence: any[] = [];
  level = 0;
  click_number = 0;
  startButton: any = null;
  score: number = 0;
  lastScore: number = 0;

  validateClick(clickNumber:number){
    this.click_number++;
    const sequence = this.lastSequence.filter(seq =>{
      return seq.level == this.level;
    })
    if(clickNumber != sequence[this.click_number-1].sequence){
      this.startButton.innerText = "NooP"
      this.level = 0;
      this.lastScore = this.score;
      this.score = 0;
      this.startButton.innerText = "Start"
      return;
    } else {
      this.startButton.innerText = "OK"
      this.score += 5;
    }
    
    if(this.click_number == sequence.length){
      this.startButton.innerText = "Me";
      this.startGame(null);
      this.click_number = 0;
    }

  }


  yellow_click(validate?:boolean){
    this.yellowClick = !this.yellowClick;
    if(validate)
      this.validateClick(1);
  }
  red_click(validate?:boolean){
    this.redClick = !this.redClick;
    if(validate)
      this.validateClick(2);
  }
  green_click(validate?:boolean){
    this.greenClick = !this.greenClick;
    if(validate)
      this.validateClick(3);
  }
  blue_click(validate?:boolean){
    this.blueClick = !this.blueClick;
    if(validate)
      this.validateClick(4);
  }

  async startGame(event: any){
    this.gameStarted = true;
    if(event != null){
      this.startButton = event;
    }
    
    this.level++;
    const delay = (ms:any) => new Promise(res => setTimeout(res, ms));

    this.startButton.innerText = "3";
    await delay(600); 
    this.startButton.innerText = "2";
    await delay(600); 
    this.startButton.innerText = "1";
    await delay(600); 
    this.startButton.innerText = "GO";
    
    for (let step = 0; step < this.level+3; step++) {
      const randon_selection:any = Math.floor(  Math.random() * (5-1) + 1 );
      if(randon_selection == 1)
        this.yellow_click();

      if(randon_selection == 2)
        this.red_click();

      if(randon_selection == 3)
        this.green_click();

      if(randon_selection == 4)
        this.blue_click();

      this.lastSequence.push({level: this.level, sequence: randon_selection});
      await delay(600); 
      
    }
    
    this.startButton.innerText = "You";

  }

}
