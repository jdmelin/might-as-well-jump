import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectoryComponent } from './directory.component';

describe('DirectoryComponent', () => {
  let component: DirectoryComponent;
  let fixture: ComponentFixture<DirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directory component', () => {
    expect(component).toBeTruthy();
  });
});
