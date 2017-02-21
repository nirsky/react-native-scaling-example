<h1>Make your React-Native app sexy on every size</h1>

Did it ever happen to you that your designer handed you a cool design, 
you developed it on, let's say, an iPhone 7, 
and when you run it on an a Tablet everything looked like you left it too long at the dryer?
<br/>
That's probably because the design was created using dp (density pixels). 
To keep things simple - the bigger your device the more dp it'll have.
<br/>When working with React-Native iPhone 7 has **375dp** width and **667dp** height and a Galaxy Tab A 8.0" Tablet (the one I'm using) 
has **768dp** width and **1024dp** height.<br/>
So while a `<View style={{width: 300, height: 450}}/>` will cover most of your iPhone screen 
it will cover less than half of your tablet screen.

<h3>So how can I make my app sexy on the tablet as well?</h3>
Oh! I'm glad you asked. On this blog post I'll show several methods to scale your components among 
different screen sizes, and which one I found best.  
For this purpose I created a small example app, and on every scaling method I'll attach the component's 
code along with a screenshot an a tablet and an iPhone.

<h3>No scaling example</h3>

So this is the component:
```javascript
import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { loremIpsum } from './contants';
const { width, height } = Dimensions.get('window');

const AwesomeComponent = () =>
    <View style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.title}>Awesome Blog Post Page</Text>
            <Text style={styles.text}>{loremIpsum + '\nwidth: ' + width + '\nheight: ' + height}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>;

export default AwesomeComponent;
```

And this is the StyleSheet:
```javascript
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F0D6FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 300,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        },
        elevation: 2
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    text: {
        fontSize: 14,
        color: 'black'
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    button: {
        width: 150,
        height: 45,
        borderRadius: 100,
        marginBottom: 10,
        backgroundColor: '#66E8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black'
    }
});
```

As you can see all my StyleSheet sizes are in dp units on no scaling was done.  
This will end up looking like this:

<div>
    <img src="images/iphone1.png" height="450" hspace="20"/>
    <img src="images/tablet1.png" height="450" hspace="20"/>
</div>

<br/>That's obviously not how we want our component to look like on the tablet..
 
<h3>Method 1: Flex</h3>

If you're not familiar with flex I urge to read about it online. 
[Here's a simple blog post you can start with](http://browniefed.com/blog/react-native-layout-examples/).  
When designing scalable component with flex you need to convert your View's size **and it's margins** with 
proportion the the parent component. So if for example our container's width is 375 and our box's width is 300 - 
the box's width is 80% of the parent (300/375) and the margins are what left - 10% on the left and 10% on the right.  
<br/>Here's an example how I *flexed* my component, I only flexed the white box and skipped flexing the buttons because I'm lazy,
 but you get the point (StyleSheet is the same except width and height was removed from `box`):
 
 ```javascript
const FlexExample = () =>
    <View style={styles.container}>
        <View style={{flex: 16}}/>
        <View style={{flexDirection: 'row', flex: 68}}>
            <View style={{flex: 1}}/>
            <View style={[styles.box, {flex: 8}]}>
                <Text style={styles.title}>Awesome Blog Post Page</Text>
                <Text style={styles.text}>{loremIpsum}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1}}/>
        </View>
        <View style={{flex: 16}}/>
    </View>;
```

<div>
    <img src="images/iphoneflex.png" height="450" hspace="20"/>
    <img src="images/tabletflex.png" height="450" hspace="20"/>
</div>
<br/>