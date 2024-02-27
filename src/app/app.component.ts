import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameOfAddition';
  num1: number = 0;
  num2: number = 0;
  correctAnswer: number = 0;
  startTime: number = 0;
  endTime: number = 0;  
  userAnswer: number | null = null; // Declare userAnswer as a number or null
  averageTime: number = 0;
  attempts: number = 0;
constructor(private snackBar:MatSnackBar){}
  ngOnInit(): void {
    this.generateQuestion();
  }

  generateQuestion(): void {
    this.num1 = Math.floor(Math.random() * 10);
    this.num2 = Math.floor(Math.random() * 10);
    this.correctAnswer = this.num1 + this.num2;
    this.userAnswer = null; // Clear user input
    this.startTime = Date.now(); // Start time for average calculation
  }

  checkAnswer(): void {
    if (this.userAnswer === null) {
      // alert('Please enter your answer.');
      this.snackBar.open('Please enter your answer.','Close', {    
        duration: 3000,    
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'failed-style',
      })
      return;
    }

    this.endTime = Date.now(); // End time for average calculation
    this.calculateAverageTime();

    if (this.userAnswer === this.correctAnswer) {
      this.snackBar.open('Correct!','Close', {    
        duration: 3000,    
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'custom-style',
      })
      this.generateQuestion();
    } else {
      this.snackBar.open('Wrong! Try again.','Close', {    
        duration: 3000,    
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'failed-style',
      })
      this.userAnswer = null; // Clear user input on wrong answer
    }
  }

  calculateAverageTime(): void {
    const timeTaken = (this.endTime - this.startTime) / 1000; // Time in seconds
    this.attempts++;
    this.averageTime = (this.averageTime * (this.attempts - 1) + timeTaken) / this.attempts;
  }

}
