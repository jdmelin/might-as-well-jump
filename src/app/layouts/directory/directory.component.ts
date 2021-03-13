import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
})
export class DirectoryComponent implements OnInit {
  @Input() loading = true;
  @Input() noUsers = false;
  @Input() users: User[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  selectUser(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
