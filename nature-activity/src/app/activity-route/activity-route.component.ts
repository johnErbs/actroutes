import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../services/activities.service';
import { Activity } from '../models/activity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-route',
  templateUrl: './activity-route.component.html',
  styleUrls: ['./activity-route.component.css'],
  providers: [ActivitiesService]
})
export class ActivityRouteComponent implements OnInit {

  activityroute: Activity[];
  specActRoute: Activity[];
  item: Activity;
  name: string;
  description: string;
  lat: number;
  lng: number;

  constructor(private activityService: ActivitiesService, private router: Router) { }

  ngOnInit() {
    this.item = {
      id: '',
      title: '',
      markpoints: ['']
    };

    this.activityService.getActivities().subscribe(firestoreRoute => {
      this.activityroute = firestoreRoute;
      /*console.log(activityroute);
      for (let i = 0; i < activityroute.length; i++) {
        if (activityroute[i].id === 'StoraaRute') {
          const newRoute = activityroute[i];
          console.log(newRoute);
          this.activityroute = newRoute[0];
        }
      }*/
    });
  }

  GetRouteinfo(id) {
    console.log(id);
    this.item = this.activityService.getActivity(id);
    console.log(this.item);
    this.specActRoute.push(this.item);

      for (let i = 0; i < this.specActRoute.length; i++) {
        if (this.specActRoute[i].id === 'StoraaRute') {
          const newRoute = this.activityroute[i];
          console.log(newRoute);
          this.activityroute = newRoute[0];
        }
      }

    /*
    let j = 0;
    for (let i = 0; i < this.item.markpoints.length; i++) {
      j = i;

      if ( j === 3) { j = 0; }
    }
    */
  }

  onSubmit() {
    if (this.item.title !== '') {
      this.activityService.addactivity(this.item);
    }
  }


}
