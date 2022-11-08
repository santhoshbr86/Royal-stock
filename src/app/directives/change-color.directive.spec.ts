import { ChangeColorDirective } from './change-color.directive';
import {TestBed } from '@angular/core/testing';

describe('ChangeColorDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeColorDirective]
    });
  });
  it('should create an instance', () => {
    const directive = TestBed.createComponent(ChangeColorDirective);
    expect(directive).toBeTruthy();
  });
});
