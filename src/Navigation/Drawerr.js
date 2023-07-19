import React from 'react';
import { } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "../Screens/Home.js"
import Medication from '../Screens/Medication.js';
import Setting from '../Screens/Setting.js';
import Profile from '../Screens/Profile.js';
import Bottomtab from './Bottomtab.js';

const Drawer = createDrawerNavigator();

export default function Drawerr () {
    return(

        <Drawer.Navigator screenOptions={{headerShown:false}}>
         <Drawer.Screen name="Bottomtab" component={Bottomtab} />
         <Drawer.Screen name="Home" component={Home} />
         <Drawer.Screen name="Medication" component={Medication} />
         <Drawer.Screen name="Setting" component={Setting} />
         <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>

    );
}



