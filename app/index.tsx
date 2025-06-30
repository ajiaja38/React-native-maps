import { useCallback, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  Polygon,
  UrlTile,
} from 'react-native-maps';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface polygon {
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<polygon[]>([]);

  const setPolygone = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setCoordinates((prev) => [
      ...prev,
      {
        latitude,
        longitude,
      },
    ]);
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setCoordinates([]);
      setRefresh(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 16,
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <Text
          style={{
            marginBottom: 10,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        >
          React Native Maps
        </Text>
        <View style={style.container}>
          <View style={style.containerMap}>
            <MapView
              style={style.map}
              initialRegion={{
                latitude: -6.2,
                longitude: 106.816666,
                latitudeDelta: 1,
                longitudeDelta: 1,
              }}
              onPress={setPolygone}
              zoomControlEnabled
            >
              <UrlTile
                urlTemplate='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                maximumZ={19}
                flipY={false}
              />
              <Marker
                coordinate={{ latitude: -6.2, longitude: 106.816666 }}
                title='Jakarta'
                description='Marker in Jakarta'
              />
              {coordinates.map((coor, index: number) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: coor.latitude,
                    longitude: coor.longitude,
                  }}
                  title='Jakarta'
                  description={`Marker in here ${index + 1}`}
                />
              ))}
              {coordinates.length ? (
                <Polygon
                  coordinates={coordinates}
                  strokeColor='#0000ff'
                  fillColor='rgba(0,0,255,0.3)'
                  strokeWidth={2}
                />
              ) : null}
            </MapView>
          </View>
        </View>
        <Button
          icon='marker'
          mode='contained'
          onPress={() => setCoordinates([])}
          style={{
            backgroundColor: '#00CAFF',
            borderRadius: 16,
          }}
        >
          Reset Polygon
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 16,
    height: 500,
    borderRadius: 30,
    backgroundColor: 'white',
    marginBottom: 20,
    elevation: 1,
  },
  containerMap: {
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
