import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    
  devices = [];

  constructor(private electronService: ElectronService) { }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('asynchronous-reply', (event, arg) => {
      if (this.devices.filter(dev => dev.id = arg.id).length === 0) {
        this.devices.push(arg);
      }
      console.log(this.devices);
    });
  }

  ngAfterViewInit(): void {
    this.getDevices();
  }

  getDevices() {
    this.electronService
      .ipcRenderer.send('discavery-devices');
  }
  
}
