import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from '@shared/config/config.service';

@Component({
  selector: 'app-snackbar-with-link',
  templateUrl: './snackbar-with-link.component.html',
  styleUrls: ['./snackbar-with-link.component.scss']
})
export class SnackbarWithLinkComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; urlFragment: string; redirectButtonText: string },
    public snackBar: MatSnackBar,
    public config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

}
