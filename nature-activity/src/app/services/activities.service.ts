import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivitiesService {

  activitiesCollection: AngularFirestoreCollection<Activity>;
  activityroutes: Observable<Activity[]>;
  actDataCollection: AngularFirestoreCollection<Activity>;
  actRouteData: Observable<Activity[]>;
  item: Activity;
  docDataField: Activity[];
  docData = [];
  activitydoc: AngularFirestoreDocument<Activity>;

  constructor(public db: AngularFirestore) {
    this.activitiesCollection = this.db.collection('activityroute', ref => ref.orderBy('title', 'asc'));
    this.activityroutes = this.activitiesCollection.valueChanges();

    // this.activityroutes = db.collection('activityroute').valueChanges();
    /*
    this.activityroute = db.collection('activityroute').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Activity;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    */
  }

  getActivities() {
    return this.activityroutes;
  }

  getRouteData(id) {
    this.actDataCollection = this.db.collection('activityroute', ref => ref.orderBy('id', 'asc'));
    this.actRouteData = this.activitiesCollection.valueChanges();

    return this.actRouteData;
  }

  getActivity(id) {
    this.db.doc('activityroute/' + id).ref.get().then(function (doc) {
      if (doc.exists) {
        console.log('doc exists!');
        doc.data();
        const data = doc.data() as any;
        console.log(data);
        return {id, ...data};
      } else {
        console.log('No such document');
      }
    }).catch(function(err){
      console.log('Error getting document: ', err)
    }).then(result => {
      this.item = result;
    }).catch(err => {
      console.log('error: ' + err);
    });
    return this.item;
  }
  addactivity(activity: Activity) {
    // const docdata = this.getActivity(activity.id);
    console.log('activity is - : ' + activity);
    this.db.collection('activityroute').doc(activity.id).set(activity).then();
     // this.activitiesCollection.add(activity);
    // console.log('Activity !!! ', activity);
  }
}

/*
interface DocumentChangeAction {

  type: DocumentChangeType;
  payload: DocumentChange;
}

interface DocumentChange {
  type: DocumentChangeType;
  doc: DocumentSnapshot;
  oldIndex: number;
  newIndex: number;
}

interface DocumentSnapshot {
  exists: boolean;
  ref: DocumentReference;
  id: string;
  metadata: SnapshotMetadata;
  data(): DocumentData;
  get(fieldPath: string): any;
}


*/
