import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import userMock from 'src/mocks/user.mock';
import { DirectoryComponent } from './directory.component';

describe('DirectoryComponent', () => {
  let component: DirectoryComponent;
  let fixture: ComponentFixture<DirectoryComponent>;
  let route: ActivatedRoute;
  let router: Router;

  const activatedRouteStub = {
    paramMap: {
      subscribe(): Observable<any> {
        return of();
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
    }).compileComponents();
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Directory component', () => {
    expect(component).toBeTruthy();
  });

  it('should fire router navigation with id on selectUser', () => {
    const id = userMock.id;
    spyOn(router, 'navigate');
    component.selectUser(id);
    expect(router.navigate).toHaveBeenCalledWith([id], { relativeTo: route });
  });
});
