/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IBNodeSocketComponent } from './ibnode-socket.component';

describe('IBNodeSocketComponent', () => {
  let component: IBNodeSocketComponent;
  let fixture: ComponentFixture<IBNodeSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IBNodeSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IBNodeSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
