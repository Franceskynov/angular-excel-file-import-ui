/**
 * @author franceskynov@gmail.com | franceskynov@yandex.com
 * 
 */

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

    this.reset();
    //console.log('content', content)
    this.enbld = false;
     if ( content ) {
      this.toaster.success(environment.MESSAGES.UPLOAD_SUCCESS, 'OK');
      this.files = content;
      
      this.finalData = this.prepare(content.data)
      console.log('prepare', this.finalData);
     }
  }

  public lomtik (data, position) {
      
    var s = []
    for (var i = 0; i < data.length; i++) {
        
      if (typeof data[i][position] != 'undefined') {
        s.push(data[i][position])    
      }
    }
    
    return s
  }

  /**
   * 
   * @param data 
   */
  public prepare(data): any {

    data.forEach((element, j) => { if (j > 0 ) this.contents.push(element) });
    data.forEach((element, i) => { if (i == 0 ) this.titles.push(...element) });
    let tmp = []
    this.titles.forEach((e, i) => {
      tmp.push(this.lomtik(this.contents, i))
    })

    return {
      columnNames: this.titles,
      rows: tmp
    }
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
    this.enbld     = true;
    this.files     = [];
    this.contents  = [];
    this.titles    = [];
    this.finalData = [];
  }
  
  /**
   * 
   * @param table 
   */
  public print(table): void {
    printJS.default({printable: table.id, type: 'html', header: 'Invoice', documentTitle: 'Invoice', targetStyles: ['*']})
  }
  

}
