import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'app';
  overrides = [];

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.buildTable();
  }

  public overrideChanged(index?: number, item?: Object): void {
      console.log("Change: ", index, item);
      console.log("Overrides: ", this.overrides);
  }

  private getJSON(): Observable<any> {
    return this.http.get('assets/routerConf.json')
      .map(res => res);
  }


  private buildTable(): void {
    this.getJSON()
      .subscribe(data => {
        let dataArray = data.json();
        dataArray.overrides.map(item => {
          this.overrides.push(item);
        });
      });
  }
}
