import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Board } from '../interfaces';

@Component( {
  selector: 'app-board-index',
  templateUrl: './board-index.component.html',
  styleUrls: [ './board-index.component.css' ],
  providers: [ DatabaseService ]
})
export class BoardIndexComponent implements OnInit {

  boardList: Array<Board>;

  constructor( private databaseService: DatabaseService ) { }

  ngOnInit() {
    this.boardList = this.databaseService.getBoards();
  }
}
