import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, Subject } from 'rxjs';
import { EditUserFormComponent } from 'src/app/components/edit-user-form/edit-user-form.component';
import { StateService } from 'src/app/services/state-service/state.service';
import { UsersService } from 'src/app/services/users-service/users.service';
import { initialAppState } from 'src/app/store/reducers';
import { initialSelectedUser } from 'src/app/store/reducers/selectedUser.reducer';
import usersMock from 'src/mocks/users.mock';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let stateService: StateService;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent, EditUserFormComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        provideMockStore({ initialState: initialAppState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: usersMock[0].id }),
            },
          },
        },
      ],
    }).compileComponents();
    stateService = TestBed.inject(StateService);
    usersService = TestBed.inject(UsersService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create User component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user on init if there is no selected user in state', () => {
    spyOn(stateService, 'getSelectedUser').and.returnValue(
      of(initialSelectedUser)
    );
    spyOn(usersService, 'fetchUserById');
    component.ngOnInit();
    expect(usersService.fetchUserById).toHaveBeenCalledWith(usersMock[0].id);
  });

  it('should get user from state users if current selected user id does not match the route id', () => {
    const differentId = usersMock[0].id;
    spyOn(stateService, 'getSelectedUser').and.returnValue(of(usersMock[1]));
    spyOn(usersService, 'getUserFromStateUsers');
    component.ngOnInit();
    expect(usersService.getUserFromStateUsers).toHaveBeenCalledWith(
      differentId
    );
  });

  it('should set user to the currentn selected user in state', () => {
    spyOn(stateService, 'getSelectedUser').and.returnValue(of(usersMock[0]));
    component.ngOnInit();
    expect(component.user).toEqual(usersMock[0]);
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
