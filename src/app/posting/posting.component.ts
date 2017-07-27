import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component( {
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: [ './posting.component.css' ],
  providers: [ DatabaseService ]
})

export class PostingComponent implements OnInit {
  // New post parameters.
  parentForumId: number;
  parentForumName: string;
  subjectText: string;

  // Replying parameters.
  parentTopicId: string;
  parentTopicSubject: string;

  // Shared parameters.
  bodyText: string;
  postingMode: string;
  postResponseEvent: boolean;
  postResponseEventText: string;

  // Inject GetPostsService, GetBoardsService, and ActivatedRoute into the component.
  constructor( private activatedRoute: ActivatedRoute,
    private databaseService: DatabaseService ) { }

  ngOnInit() {
    // Check if we are going to be replying to a post, or creating a new one.
    if ( this.activatedRoute.snapshot.params[ 'parentTopicId' ] !== undefined ) {
      // Replying to a post.
      this.postingMode = 'reply';
      this.parentTopicId = this.activatedRoute.snapshot.params[ 'parentTopicId' ];
      this.parentTopicSubject = this.getParentTopicName();

    } else if ( this.activatedRoute.snapshot.params[ 'parentForumId' ] !== undefined ) {
      // Creating a new post:
      this.postingMode = 'post';
      this.parentForumId = parseInt( this.activatedRoute.snapshot.params[ 'parentForumId' ], 10 );
      this.parentForumName = this.databaseService.getBoardById( this.parentForumId ).name;
    }
  }

  // Get the name of the topic that we are replying to.
  private getParentTopicName(): string {
    // let topic = this.__databaseService.getTopicById( this.parentTopicId );
    return '';
  }

  doPost(): boolean {
    let bodyText = ( typeof this.bodyText === 'string' ) ? this.bodyText.trim() : '';
    let subjectText = ( typeof this.subjectText === 'string' ) ? this.subjectText.trim() : '';

    if ( bodyText === '' ) {
      this.postResponseEventText = 'Body cannot be empty!';
      this.postResponseEvent = false;
      return false;
    }

    if ( this.postingMode === 'post' && subjectText === '' ) {
      this.postResponseEventText = 'Subject cannot be empty!';
      this.postResponseEvent = false;
      return false;
    }

    // It's a new topic.
    if ( this.postingMode === 'post' ) {
      
      this.databaseService.createTopic( {
        parentForumId: this.parentForumId,
        subjectText: this.subjectText,
        author: 'Administrator',
        bodyText: this.bodyText
      }).subscribe(
        response => {
          this.postResponseEventText = 'Your post has been submitted!';
          this.postResponseEvent = true;
        },
        error => {
          this.postResponseEventText = 'Could not create post.';
          this.postResponseEvent = false;
          console.error( error );
        });

    // It's a reply.
    } else if ( this.postingMode === 'reply' ) {
      this.databaseService.createReply( {
        parentTopicId: this.parentTopicId,
        author: 'Administrator',
        bodyText: this.bodyText
      }).subscribe(
        response => {
          this.postResponseEventText = 'Your reply has been submitted!';
          this.postResponseEvent = true;
        },
        error => {
          this.postResponseEventText = 'Could not create post.';
          this.postResponseEvent = false;
          console.error( error );
        });
      }
    }
}
