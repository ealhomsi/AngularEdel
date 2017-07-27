/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTopicComponent } from './view-topic.component';

describe( 'ViewTopicComponent', () => {
  let component: ViewTopicComponent;
  let fixture: ComponentFixture<ViewTopicComponent>;

  beforeEach( async(() => {
    TestBed.configureTestingModule( {
      declarations: [ ViewTopicComponent ]
    })
      .compileComponents();
  }) );

  beforeEach(() => {
    fixture = TestBed.createComponent( ViewTopicComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it( 'should create', () => {
    expect( component ).toBeTruthy();
  });
});
