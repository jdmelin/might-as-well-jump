import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'directory',
  templateUrl: './directory.component.html',
})
export class DirectoryComponent implements OnInit {
  @Input() users: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  selectUser(id: string) {
    console.log(id);
    this.router.navigate([id], { relativeTo: this.route });
  }
}
