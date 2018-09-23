/**
 * @author franceskynov@gmail.com | franceskynov@yandex.com
 * 
 */

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import * as printJS from 'print-js';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.scss']
})
export class ReaderComponent implements OnInit {

  public enbld: boolean;
  public files: any;
  public viewOptions: boolean;
  public titles: Array<string>;
  public contents: Array<string>;
  public finalData: Array<any>;


  constructor(
      private toaster: ToastrService,
      private storageService: StorageService
  ) {
    this.viewOptions = true;
    this.enbld       = true;
    this.files       = {name: '', size: 0, lastModifiedDate: '', mimetype: ''};
    this.titles      = [];
    this.contents    = [];
    this.finalData   = [];
  }

  ngOnInit() {
    //console.log()
  }

  /**
   * 
   * @param content 
   */
  public upload(content): void {
    this.enbld = false;
     if ( content ) {
      this.toaster.success(environment.MESSAGES.UPLOAD_SUCCESS, 'OK');
      this.files = content;
      console.log(this.prepare(content.data));
     }
  }

  /**
   * 
   * @param data 
   */
  public prepare(data): any {
    _.object = (list, values) => {
      if (list == null) return {};
      var result = {};
      for (var i = 0, l = list.length; i < l; i++) {
        if (values) {
          result[list[i]] = values[i];
        } else {
          result[list[i][0]] = list[i][1];
        }
      }
      return result;
    };

    data.forEach((element, i) => { if (i == 0 ) this.titles.push(element) });
    data.forEach((element, j) => { if (j > 0 ) this.contents.push(element) });
    this.titles.forEach((element, i) => {
      this.finalData.push({
        title:element,
        content: _.object(element, this.contents)
      })
    });

    return this.finalData;
  }

  /**
   * 
   */
  public save(): void {
    this.storageService.save(this.finalData).subscribe(
      data => {
        console.log('from web service');
        console.log(data);
      },
      error => {
        this.toaster.error(environment.MESSAGES.SERVER_ERROR, 'Error');
      }
    )
  }

  /**
   * 
   */
  public reset(): void {
    this.enbld = true;
    this.files.data = [];
  }
  
  /**
   * 
   * @param table 
   */
  public print(table): void {
    printJS.default({printable: table.id, type: 'html', header: 'Invoice', documentTitle: 'Invoice', targetStyles: ['*']})
  }
  

}
