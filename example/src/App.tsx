import * as React from 'react';

import { Button, StyleSheet, View } from 'react-native';
import {
  initialize,
  insertRecords,
  isAvailable,
  readRecords,
  requestPermission,
  revokeAllPermissions,
} from 'react-native-health-connect';

export default function App() {
  const onInitialize = async () => {
    const result = await initialize();
    console.log({ result });
  };
  const checkAvailability = async () => {
    const available = await isAvailable();
    console.log({ available });
  };

  const insertSampleData = () => {
    insertRecords([
      {
        recordType: 'activeCaloriesBurned',
        energy: { unit: 'kilocalories', value: 15000 },
        startTime: '2023-01-09T12:00:00.405Z',
        endTime: '2023-01-09T23:53:15.405Z',
      },
    ]).then((ids) => {
      console.log('Records inserted ', { ids });
    });
  };

  const readSampleData = () => {
    readRecords('activeCaloriesBurned', {
      startTime: '2023-01-09T12:00:00.405Z',
      endTime: '2023-01-09T23:53:15.405Z',
    }).then((result) => {
      console.log('Retrieved records: ', JSON.stringify({ result }, null, 2));
    });
  };

  const requestSamplePermissions = () => {
    requestPermission([
      {
        accessType: 'read',
        recordType: 'activeCaloriesBurned',
      },
      {
        accessType: 'write',
        recordType: 'activeCaloriesBurned',
      },
    ]).then((permissions) => {
      console.log('Granted permissions ', { permissions });
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Initialize" onPress={onInitialize} />
      <View style={styles.spacer} />
      <Button title="Check availability" onPress={checkAvailability} />
      <View style={styles.spacer} />
      <Button
        title="Request sample permissions"
        onPress={requestSamplePermissions}
      />
      <View style={styles.spacer} />
      <Button title="Revoke all permissions" onPress={revokeAllPermissions} />
      <View style={styles.spacer} />
      <Button title="Insert sample data" onPress={insertSampleData} />
      <View style={styles.spacer} />
      <Button title="Read sample data" onPress={readSampleData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  spacer: {
    marginVertical: 16,
  },
});
