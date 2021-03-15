import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { UsersService } from 'src/app/services/users-service/users.service';
import { initialAppState } from 'src/app/store/reducers';
import userMock from 'src/mocks/user.mock';
import userFormMock from 'src/mocks/userForm.mock';
import { EditUserFormComponent } from './edit-user-form.component';

describe('EditUserFormComponent', () => {
  let component: EditUserFormComponent;
  let fixture: ComponentFixture<EditUserFormComponent>;
  let usersService: UsersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserFormComponent],
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
    fixture = TestBed.createComponent(EditUserFormComponent);
    component = fixture.componentInstance;
    component.user = userMock;
    fixture.detectChanges();
  });

  it('should create Edit User Form component', () => {
    expect(component).toBeTruthy();
  });

  it('should set form on init', () => {
    spyOn(component as any, 'setForm');
    component.ngOnInit();
    expect((component as any).setForm).toHaveBeenCalled();
  });

  it('should update user with trimmed content on submit', () => {
    const userForm = userFormMock;
    component.form = new FormGroup({
      firstname: new FormControl('John   '),
      lastname: new FormControl('Smith'),
      username: new FormControl('jsmith'),
      email: new FormControl('jsmith@test.com'),
    });
    spyOn(usersService, 'updateUser');
    component.onSubmit();
    expect(usersService.updateUser).toHaveBeenCalledWith(
      userForm,
      component.user.id
    );
  });

  it('should remove user', () => {
    spyOn(usersService, 'deleteUser');
    component.removeUser();
    expect(usersService.deleteUser).toHaveBeenCalledWith(component.user.id);
  });

  it('should toggle delete confirmation', () => {
    component.isAttemptingDelete = true;
    component.toggleDeleteConfirmation();
    expect(component.isAttemptingDelete).toBe(false);
  });
});
