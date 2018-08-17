import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { DevicesService } from './core/services/devices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
  devices;

  constructor(private devicesService: DevicesService) { }

  ngOnInit(): void {
    this.devicesService.devices.subscribe(devices => {
      this.devices = devices;
    })
  }

  getDevices() {
    this.devicesService.discaveryDevices();
  }
  
}
