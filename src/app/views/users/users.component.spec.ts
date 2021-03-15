import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, Subject } from 'rxjs';
import { DirectoryComponent } from 'src/app/layouts/directory/directory.component';
import { StateService } from 'src/app/services/state-service/state.service';
import { UsersService } from 'src/app/services/users-service/users.service';
import { initialAppState } from 'src/app/store/reducers';
import usersMock from 'src/mocks/users.mock';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let stateService: StateService;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryComponent, UsersComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState: initialAppState })],
    }).compileComponents();
    stateService = TestBed.inject(StateService);
    usersService = TestBed.inject(UsersService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Users component', () => {
    expect(component).toBeTruthy();
  });

  it('should set users on init if there are users in state', () => {
    spyOn(stateService, 'getUsers').and.returnValue(of(usersMock));
    component.ngOnInit();
    expect(component.users).toEqual(usersMock);
  });

  it('should fetch users on init if there are no users in state', () => {
    spyOn(stateService, 'getUsers').and.returnValue(of([]));
    spyOn(usersService, 'fetchUsers');
    component.ngOnInit();
    expect(usersService.fetchUsers).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    component.unsubscribe$ = new Subject();
    spyOn(component.unsubscribe$, 'next');
    spyOn(component.unsubscribe$, 'complete');
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});
