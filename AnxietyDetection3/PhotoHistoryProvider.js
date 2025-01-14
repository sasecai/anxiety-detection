import React, { createContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { evaluateAllPhotos } from './EvaluatePhotos';
import { parseDate } from './utils';

export const PhotoContext = createContext();

export const PhotoHistoryProvider = ({ children }) => {
  const [photoHistory, setPhotoHistory] = useState([]);
  const [db, setDb] = useState(null);


  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await SQLite.openDatabaseAsync('photoHistory.db');
        setDb(database);

        // Create table if it doesn't exist
        await database.execAsync(`
          CREATE TABLE IF NOT EXISTS photos (
            id TEXT PRIMARY KEY,
            date TEXT NOT NULL,
            status TEXT NOT NULL,
            photoUri TEXT NOT NULL
          );
        `);

        await fetchPhotos(database);
      } catch (err) {
        console.error('Error initializing database:', err);
      }
    };

    initializeDatabase();
  }, []);

   useEffect(() => {
    const intervalId = setInterval(() => {
      const evaluateAllPhotosAsync = async () => {
        await evaluateAllPhotos(photoHistory, updatePhoto);
        // await db.runAsync(`DELETE FROM photos WHERE date LIKE '14%'`);
        // await fetchPhotos();
      };
      evaluateAllPhotosAsync();
    }, 5000); 

    return () => clearInterval(intervalId);
  }, [photoHistory]);

  const fetchPhotos = async (database) => {
    try {
      const result = await database.getAllAsync('SELECT * FROM photos;');
      const sortedPhotos = result.sort((a, b) => {
        // Convert "dd.mm.yyyy at hh:mm" to a Date object
  
        return parseDate(b.date) - parseDate(a.date); // Sort descending
      });
      setPhotoHistory(sortedPhotos);
    } catch (err) {
      console.error('Failed to fetch photos:', err);
    }
  };

  const addPhoto = async (photo) => {
    const { id, date, status, photoUri } = photo;
    try {
      await db.runAsync(
        'INSERT INTO photos (id, date, status, photoUri) VALUES (?, ?, ?, ?);',
        [id, date, status, photoUri]
      );
      await fetchPhotos(db);
    } catch (err) {
      console.error('Failed to add photo:', err);
    }
  };

  const updatePhoto = async (updatedPhoto) => {
    const { id, date, status, photoUri } = updatedPhoto;
    try {
      await db.runAsync(
        'UPDATE photos SET date = ?, status = ?, photoUri = ? WHERE id = ?;',
        [date, status, photoUri, id]
      );
      await fetchPhotos(db);
    } catch (err) {
      console.error('Failed to update photo:', err);
    }
  };

  return (
    <PhotoContext.Provider value={{ photoHistory, addPhoto, updatePhoto }}>
      {children}
    </PhotoContext.Provider>
  );
};
