import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity';
import { AngularFirestore } from 'angularfire2/firestore';
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'app-getroute',
  templateUrl: './getroute.component.html',
  styleUrls: ['./getroute.component.css'],
  providers: [ActivitiesService]
})
export class GetrouteComponent implements OnInit {

  public id: string;
  public activityroute: Activity[];
  public routeData = [];
  public markerData = [];
  public markerStr: string;
  public result: any;
  public markers: Marker[] = [];
  public zoomLevel = 10;
  public latStartPos: number;
  public lngStartPos: number;
  public StartPosSet: boolean;
  public name: string;
  public descr: string;
  public lat: string;
  public lng: string;
  public routeTitle: string;

  constructor(private actService: ActivitiesService, private router: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit() {
    this.router.paramMap.subscribe(param => {
      this.id = param.get('id');

      this.StartPosSet = false;
      this.activityroute = [ {
        id: '',
        title: '',
        markpoints: ['']
        }
      ];
      this.routeData = [ {
        id: '',
        title: '',
        markpoints: ['']
        }
      ];

      this.actService.getRouteData(this.id).subscribe(firestoreRoute => {
        this.activityroute = firestoreRoute;
        for (let i = 0 ; i < this.activityroute.length; i ++) {
          if (this.activityroute[i].id === this.id) {
            this.routeData[0].id = this.activityroute[i].id;
            this.routeData[0].title = this.activityroute[i].title;
            this.routeTitle = this.activityroute[i].title;
            this.markerData[i] = this.activityroute[i].markpoints;
          }
        }
        for (let i = 0; i < this.markerData.length; i++) {
          this.markerStr = this.markerData[i];
          this.result = this.markerStr;
        }

        let counter = 0;
        for (let i = 0; i < this.result.length; i++) {

          if (counter === 0) {
            // insert markers name.
            console.log('counteris: ' + counter);
            console.log('Result is: ' + this.result[i]);
            this.name = this.result[i];
          }
          if (counter === 1) {
            // insert markers description
            console.log('counteris: ' + counter);
            console.log('Result is: ' + this.result[i]);
            this.descr = this.result[i];
          }
          if (counter === 2) {
            // insert markers latitude
            console.log('counteris: ' + counter);
            console.log('Result is: ' + this.result[i]);
            this.lat = this.result[i];
          }
          if (counter === 3) {
            // insert markers longitude
            console.log('counteris: ' + counter);
            console.log('Result is: ' + this.result[i]);
            this.lng = this.result[i];
          }

          counter++;
          if (counter > 3) {
            counter = 0;
            const tempData = {
              name: this.name, description: this.descr, lat: parseFloat(this.lat), lng: parseFloat(this.lng), draggable: false};
            this.markers.push(tempData);

            if (!this.StartPosSet) {
              this.latStartPos = parseFloat(this.lat);
              this.lngStartPos = parseFloat(this.lng);
              this.StartPosSet = true;
            }

          }
        }
        console.log(this.markers);
      });
    });
  }

  getResult() {
  }
}

interface Marker {
  name: string;
  description: string;
  lat: number;
  lng: number;
  draggable: boolean;
}




