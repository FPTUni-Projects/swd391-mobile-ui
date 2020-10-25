import React, { Component } from 'react';
import { Container, Text, Content } from 'native-base';
import Icon  from 'react-native-vector-icons/Ionicons';

export default class HomeTab extends Component {
    // static tabBarOptions = {
    //     tabBarIcon: ({ tintColor }) => {
    //         return <Icon name='home' style={{ color: tintColor }} />
    //     }
    // }
    render() {
        return (
            <Container>
                <Content>
                <Icon  name='home' size={30}/>
                    <Text>
                        This is homeTab
                    </Text>
                </Content>
            </Container >
        );
    }
}