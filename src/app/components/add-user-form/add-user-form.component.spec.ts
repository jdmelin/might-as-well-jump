import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UsersService } from 'src/app/services/users-service/users.service';
import { initialAppState } from 'src/app/store/reducers';
import userFormMock from 'src/mocks/userForm.mock';
import { AddUserFormComponent } from './add-user-form.component';

describe('AddUserFormComponent', () => {
  let component: AddUserFormComponent;
  let fixture: ComponentFixture<AddUserFormComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore({ initialState: initialAppState })],
    }).compileComponents();
    usersService = TestBed.inject(UsersService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Add User component', () => {
    expect(component).toBeTruthy();
  });

  it('should create user with trimmed content on submit', () => {
    const user = userFormMock;
    component.form = new FormGroup({
      firstname: new FormControl('John   '),
      lastname: new FormControl('Smith'),
      username: new FormControl('jsmith'),
      email: new FormControl('jsmith@test.com'),
    });
    spyOn(usersService, 'createUser');
    component.onSubmit();
    expect(usersService.createUser).toHaveBeenCalledWith(user);
  });
});
