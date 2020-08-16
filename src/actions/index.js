import {
   FETCH_EMPLOYEES, 
  FETCH_EMPLOYEE, 
  DELETE_IN_ACTIVE, 
  FETCH_HERO_IMAGES } from './actionTypes';
import { db } from '../Firebase/Firebase';
import firebase from 'firebase/app';
import history from '../history';
import moment from 'moment';
import { cookies } from '../actions/auth-actions';

const currentDate = firebase.firestore.Timestamp.now()
const userUid =  cookies.get('userUid');
export const fetchEmployees = () => async dispatch => {
  await db.collection('heroSection').onSnapshot(snap => {
    const data = snap.docs.map(doc => (
      {
        ...doc.data(),
        createdAt: moment(new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1000000)).format('LLL'),
        uid: doc.id,
        //userId:userUid
      }
    ));
    dispatch({ type:FETCH_EMPLOYEES , payload: data });

  });
};


export const fetchEmployee = uid => async dispatch => {
  await db.collection('heroSection').doc(`${uid}`).onSnapshot(snap => {
    let data = {
      ...snap.data(), createdAt: moment(new Date(snap.data().createdAt.seconds * 1000 + snap.data().createdAt.nanoseconds / 1000000)).format('LLL'),
      uid: snap.id,
    }

    dispatch({ type: FETCH_EMPLOYEE, payload: data });
  })
}

export const createEmployee = (formValues) => async dispatch => {
  let ts = firebase.firestore.Timestamp.now()
  await db.collection('heroSection').add({ ...formValues, createdAt: ts, active: false,  userId:userUid });
  history.push('/');
}

export const editEmployee = (uid, formValues) => async dispatch => {
  await db.collection('heroSection').doc(`${uid}`).update({ ...formValues, createdAt: currentDate,  userId:userUid });
  history.push('/');
}

export const updateActive = (uid) => async dispatch => {
  await db.collection('heroSection').doc(`${uid}`).update({ active: true, createdAt: currentDate, userId:userUid })
}

export const updateInActive = (uid) => async dispatch => {
  await db.collection('heroSection').doc(`${uid}`).update({ active: false, createdAt: currentDate, userId:userUid })
}

export const deleteInActive = (uid) => async dispatch => {
  await db.collection('heroSection').doc(`${uid}`).delete();
  dispatch({ type: DELETE_IN_ACTIVE, payload: uid });
}

export const uploadHeroImages = (imagesPayload) => async dispatch => {
  await db.collection('heroImages').add({ ...imagesPayload, createdAt: currentDate, active: false, userId:userUid });
  history.push('/');
}

export const fetchHeroImages = () => async dispatch => {
  await db.collection('heroImages').onSnapshot(snap => {
    let data = snap.docs.map(doc => (
      {
        ...doc.data(),
        createdAt: moment(new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds / 1000000)).format('LLL'),
        uid: doc.id,
        // userId:userUid
      }
    ));
    dispatch({ type: FETCH_HERO_IMAGES, payload: data });
     console.log("data",data)
  });
};
    // export const fetchEmployeeActive = ()  => async dispatch => {
    //   await db.collection('heroSection').where('active',true).onSnapshot(snap  => {
    //     let   data = snap.docs.map(doc => (
    //    {
    //      ...doc.data(),
    //     createdAt:moment(new Date(doc.data().createdAt.seconds * 1000 + doc.data().createdAt.nanoseconds/1000000)).format('LLL') , 
    //     uid: doc.id,}
    //       ));

    //     dispatch({ type: FETCH_EMPLOYEE_ACTIVE, payload: data}); 
    //     }); 
    // }
// let checkinsmonth = (await firebaseService.firestore()
// .collection(`/checkins/${currentUser.uid}/log`)
// .where("timestamp",">=",timestamp)
// .orderBy("timestamp","desc").get()).docs.map(doc => doc.data());