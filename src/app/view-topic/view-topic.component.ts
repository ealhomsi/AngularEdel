import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces';

@Component( {
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: [ './view-topic.component.css' ],
  providers: [ DatabaseService ]
})
export class ViewTopicComponent implements OnInit {

  topicId: string;
  topicName: string;
  posts: Array<Post>;

  constructor( private databaseService: DatabaseService, private router: ActivatedRoute ) { }

  ngOnInit() {
    this.topicId = this.router.snapshot.params[ 'id' ];

    this.posts = [];

    this.databaseService.getTopicById( this.topicId )
      .subscribe(
        res => this.posts = JSON.parse( res._body ).posts,
        err => console.error( err ));
  }
}
