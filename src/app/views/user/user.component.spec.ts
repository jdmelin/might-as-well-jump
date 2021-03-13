import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialAppState } from 'src/app/store/reducers';
import { UserComponent } from './user.component';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState: initialAppState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create User component', () => {
    expect(component).toBeTruthy();
  });
});
