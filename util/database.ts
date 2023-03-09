import { IPlace } from './../types/index';
import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        lat REAL NOT NULL,
        lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place: Place) => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const items = result.rows._array as IPlace[];
          const places = [];
          for (const item of items) {
            places.push(
              new Place(
                item.title,
                item.imageUri,
                item.address,
                { lat: item.lat, lng: item.lng },
                item.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = (id: number) => {
  const promise = new Promise<Place>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          const item = result.rows._array[0] as IPlace;
          const place = new Place(
            item.title,
            item.imageUri,
            item.address,
            { lat: item.lat, lng: item.lng },
            item.id
          );

          resolve(place);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
