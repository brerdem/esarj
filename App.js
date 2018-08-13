/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import MapView, {ProviderPropType, PROVIDER_GOOGLE} from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'


type Props = {};

const ITEM_MARGIN = 5;

const loc1 = {
    latitude: 41.05862164626213,
    longitude: 28.993207588791847,
}
const loc2 = {
    latitude: 41.05786068098638,
    longitude: 28.989745862782,
}


const mapstyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
]


export default class App extends React.Component {
    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
        return fetch('https://api.openchargemap.io/v2/poi/?output=json&countrycode=TR&maxresults=100&compact=true&verbose=false')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.length);
                this.setState({
                    /*  isLoading: false,
                      dataSource: responseJson.movies,*/
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });


    }


    render() {
        return <RootStack/>;
    }
}


class HomeScreen extends Component<Props> {


    constructor(props) {
        super(props);

        this.state = {
            prevPos: null,
            curPos: {latitude: loc1.latitude, longitude: loc1.longitude},
            curAng: 45,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        };
        this.changePosition = this.changePosition.bind(this);
        //this.getRotation = this.getRotation.bind(this);

    }

    changePosition(latlon) {
        console.log(latlon);
        if (this._map) this._map.animateToCoordinate(latlon);
    }

    onPress = (index) => {
        console.log(index);
        if (index % 2 === 0) {
            this.changePosition(loc2);
        } else {
            this.changePosition(loc1);
        }

    }

    getImage = (index) => {
        let str = (index % 2 === 0) ? require('./img/card0.png') : require('./img/card1.png');

        return <Image source={str} style={styles.scroll_item}/>
    }

    createButtons() {
        let arr = [];

        for (let i = 0; i < 10; i++) {

            arr.push(
                <TouchableOpacity key={i} onPress={() => this.onPress(i)}>
                    {this.getImage(i)}
                </TouchableOpacity>
            )
        }
        return arr;
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={(el) => {
                        this._map = el
                    }}
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        ...this.state.curPos,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta,

                    }}
                    onPress={(event) => {
                        console.log(event.nativeEvent.coordinate)
                    }}
                    customMapStyle={mapstyle}
                >
                    <MapView.Marker
                        coordinate={loc1}
                        image={require('./img/pin-default.png')}

                    />

                    <MapView.Marker
                        coordinate={loc2}
                        image={require('./img/pin-selected.png')}

                    />


                </MapView>

                <ScrollView style={styles.scroll}
                            horizontal={true}
                            contentContainerStyle={styles.outer_scroll_view}
                            pagingEnabled={true}
                            snapToAlignment={'center'}
                            decelerationRate={'fast'}
                            snapToInterval={110}
                >

                    <View style={styles.inner_scroll_view}>
                        {this.createButtons()}
                    </View>

                </ScrollView>

            </View>
        );
    }


}

HomeScreen.propTypes = {
    provider: ProviderPropType,
};


const RootStack = createStackNavigator(
    {
        Home: HomeScreen,

    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    scroll: {
        position: 'absolute',
        bottom: 10
    },

    outer_scroll_view: {},

    inner_scroll_view: {
        flex: 1,
        flexDirection: 'row'
    },

    scroll_item: {
        margin: ITEM_MARGIN,
        width: 100,
        height: 133
    }
});
