import { Component, OnInit, OnDestroy } from '@angular/core';
var result = null;

@Component({
  selector: 'abe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  text = '';

  ngOnInit() {this.startTimerInterval();}
  ngOnDestroy() {}

  private startTimerInterval = () => {
    setInterval(() => {
      fetch('https://secret-taiga-31277.herokuapp.com/status/Red')
      .then ((response) => {
        return response.json()
      })
      .then((response) => {
        let name = response.teamName;
        let seconds = response.elapsedTimeInSeconds;
        this.text = `Team ${name} has controlled for ${seconds} seconds!`;
        return name;
      })
    }, 1000);
  };
}