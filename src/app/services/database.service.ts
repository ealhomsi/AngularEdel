import { Injectable } from '@angular/core';
import { Post, Board, Topic } from '../interfaces';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DatabaseService {

  private headers = new Headers( { 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions( { headers: this.headers });

  // MOCK DATA
  debugDefaultBoards: Array<Board> = [
    { id: 1, name: 'Cloud Services', description: 'Connect with those using Acme Co. Cloud Services' },
    { id: 2, name: 'International Enterprise', description: 'This forum is intended for customer who need support for their Enterprise systems.' }
  ];

  // MOCK DATA
  debugDefaultPosts: Array<Post> = [
    { id: 1, author: 'Administrator', parentTopic: 1, bodyText: 'Hello world.' },
    { id: 2, author: 'User', parentTopic: 1, bodyText: 'Need to add the database.' },
    { id: 3, author: 'Administrator', parentTopic: 1, bodyText: 'Okay!' },
    { id: 4, author: 'User', parentTopic: 1, bodyText: ':)' }
  ];

  // MOCK DATA
  debugDefaultTopics: Array<Topic> = [
    { id: 1, parent: 1, subject: 'Cloud Services Support Guidelines', author: 'Administrator' }
  ];

  /**
   * Constructor, inject the Http service into this service.
   */
  constructor( private http: Http ) { }

  /**
   * @param topicId Database ID of the topic.
   * @returns       An observable of the http request.
   */
  getTopicById( topicId: string ): Observable<any> {
    return this.http.get( `/api/v1/posts/${topicId}` );
  }

  /**
   * @param forumId Numeric ID of the parent forum.
   * @param offset  NYI - An offset of topics to be used for paging.
   * @param limit   NYI - The amount of topics to be returned.
   * @returns       An observable of topics that meet the requested parameters. 
   */
  getTopicsByForumId( forumId: number, offset = 0, limit = 0 ): Observable<any> {
    return this.http.get( `/api/v1/topics/${forumId}` );
  }

  /**
   * TODO
   * @param parentId  Numeric ID of the parent topic.
   * @param offset    NYI - An offset of posts to be used for paging.
   * @param limit     NYI - The amount of posts to be returned.
   * @returns         The array of posts that meet the requested parameters.
   */
  getPostsByParentId( parentId: number, offset = 0, limit = 0 ): Array<Post> {
    let posts = [];
    for ( let i = 0; i < this.debugDefaultPosts.length; i++ ) {
      if ( this.debugDefaultPosts[ i ].parentTopic === parentId ) {
        posts.push( this.debugDefaultPosts[ i ] );
      }
    }
    return posts;
  }

  /**
   * TODO
   * @returns The array of boards.
   */
  getBoards(): Array<Board> {
    return this.debugDefaultBoards;
  }

  /**
   * TODO
   * @param boardId   The numeric ID of the requested board.
   * @returns         The board object that meets the requested parameters.
   */
  getBoardById( boardId: number ): Board {
    for ( let i = 0; i < this.debugDefaultBoards.length; i++ ) {
      if ( this.debugDefaultBoards[ i ].id === boardId ) {
        return this.debugDefaultBoards[ i ];
      }
    }
    return { id: -1, name: '', description: '' };
  }

  /**
   * @param topic Object of topic post parameters.
   * @returns     An observable of the topic creation.
   */
  createTopic( topicData: Object ): Observable<any> {
    return this.http.post( '/api/v1/create-topic', JSON.stringify( topicData ), this.options );
  }

  /**
   * @param postData  Object of reply paramters.
   * @returns         An observable of the reply.
   */
  createReply( postData: Object ): Observable<any> {
    return this.http.post( '/api/v1/create-reply', JSON.stringify( postData ), this.options );
  }

  getTopicName( topicId: string ) /*: Observable<any> */ {
    // var data = this.http.get( '/api/v1/get-topic' );
  }
}
