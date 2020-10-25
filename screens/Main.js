import React from 'react';
import { Container, Text, Content, Icon } from 'native-base';
import { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTab from './tabs/HomeTab';
import ProfileTab from './tabs/ProfileTab';
import ChannelTab from './tabs/ChannelTab';

const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='home' style={{ fontSize: 30, color: color }} />
                ),
            }} />
            <Tab.Screen name="Channel" component={ChannelTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='tv' style={{ fontSize: 30, color: color }} />
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfileTab} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name='person-circle' style={{ fontSize: 30, color: color }} />
                ),
            }} />
        </Tab.Navigator>
    );
}
export default class Main extends Component {
    static navigationOptions = {

    }
    render() {
        return <Container>
            <MyTabs />
        </Container>
    }
}
