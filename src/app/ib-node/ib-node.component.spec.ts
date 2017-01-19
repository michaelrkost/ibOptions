/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IbNodeComponent } from './ib-node.component';

describe('IbNodeComponent', () => {
  let component: IbNodeComponent;
  let fixture: ComponentFixture<IbNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
