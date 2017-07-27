import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: [ './view-forum.component.css' ],
  providers: [ DatabaseService ]
})

export class ViewForumComponent implements OnInit {

  topicList: Array<Object>; // An array of topics within this board.
  forumId: number; // The numeric identifier for this board.

  // Inject GetPostsService and ActivatedRoute into the component.
  constructor( private databaseService: DatabaseService, private route: ActivatedRoute ) { }

  ngOnInit() {
    // Grab parameters from the URL and provide them to the component.
    this.forumId = parseInt( this.route.snapshot.params[ 'id' ], 10 );

    this.topicList = [];

    // Grab the list of topics in the current forum.
    this.databaseService.getTopicsByForumId( this.forumId )
      .subscribe(
      res => this.topicList = JSON.parse( res._body ),
      error => console.error( error )
      );
  }
}
