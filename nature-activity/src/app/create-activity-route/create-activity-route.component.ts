import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity';
import { ActivitiesService } from '../services/activities.service';

@Component({
  selector: 'app-create-activity-route',
  templateUrl: './create-activity-route.component.html',
  styleUrls: ['./create-activity-route.component.css']
})
export class CreateActivityRouteComponent implements OnInit {
  fireBaseitem: Activity;
  public markerName: string;
  public markerDesc: string;
 // public txtLat: number;
 // public txtLng: number;
  public title = 'Aktivitets guiden';
  public titleDesciption = 'for naturoplevelses-ruter i Danmark';
  // set the zoomlevel
  public zoomLevel = 10;
  // startpositions
  public latStartPos = 56.357068;
  public lngStartPos = 8.618926;
  // Marker-objects
  public markers: Marker[] = [];

  constructor(private activityService: ActivitiesService) { }

  ngOnInit() {
    this.fireBaseitem = {
      id: '',
      title: '',
      markpoints: ['']
    };
  }
  clickedMarker(marker: Marker, index: number) {
    console.log( 'clicked marker ' + marker.name + ' at index ' + index );
  }

  mapClicked($event: any) {
    console.log('Map clicked!', $event);
    const newMarker = {
      name: 'Navn: ',
      description: 'Beskrivelse: ',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };

    this.markers.push(newMarker);
  }

  markerDraggEnd(marker: Marker, index: number, $event: any) {
    console.log('dragg end:::Marker is:  ' + marker +  ' Index is: ' + index + ' latitude is: ' + $event.coords.lat);
    const newMarker = {
      name: '',
      description: '',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };


    for (let i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      if (index === i) {
        this.markers.splice(i, 1, newMarker);
      }
    }
  }

  Upload() {
    const routes = [];
    for (let i = 0; i < this.markers.length; i++) {
      routes.push(this.markers[i].name,  this.markers[i].description, this.markers[i].lat, this.markers[i].lng);
    }

    this.fireBaseitem.id = this.fireBaseitem.title;
    this.fireBaseitem.markpoints = routes;

    if (this.fireBaseitem.title !== '') {
      console.log(this.fireBaseitem);
      this.activityService.addactivity(this.fireBaseitem);
    }
  }

}

interface Marker {
  name: string;
  description: string;
  lat: number;
  lng: number;
  draggable: boolean;
}





