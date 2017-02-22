<h1>Make your React-Native App Sexy on Every Size</h1>

*Every example on this post can be found [here](https://github.com/Nirsky/react-native-scaling-example).*

Has it ever happened to you that your designer handed you a cool design for your React-Native app, 
you developed it on, let's say, an iPhone 7, 
and when you run it on an a tablet everything looks like you left it too long in the dryer?
<br/>
That's probably because the design was created using dp (density pixels). 
To keep things simple - the bigger your device is, the more dp it'll have.
<br/>When working with React-Native, iPhone 7 has **375dp** width and **667dp** height and a Galaxy Tab A 8.0" Tablet (the one I'm using) has **768dp** width and **1024dp** height.<br/>
So while a `<View style={{width: 300, height: 450}}/>` will cover most of your iPhone screen, 
it will cover less than half of your tablet screen.

<h3>So how can I make my app sexy on the tablet as well?</h3>
Oh! I'm glad you asked. On this blog post I'll show several methods to scale your components for 
different screen sizes, and which one I found best.  
For the purpose of this I created a small example app, and after every scaling method I'll attach the 
code along with screenshots for both a tablet and an iPhone.

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
    </View>;

export default AwesomeComponent;
```

And this is the StyleSheet:
```javascript
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#E0E0E0',
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
        backgroundColor: '#41B6E6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
    }
});
```

As you can see, all my StyleSheet sizes are in dp units and no scaling was done.  
This will end up looking like this (Obviously I'm not a designer):

<div>
    <img src="images/iphone1.png" height="450" hspace="20"/>
    <img src="images/tablet1.png" height="450" hspace="20"/>
</div>

<br/>That's definitely not how we want our component to look like on a tablet (did I say dryer already?).
 
<h3>Method 1: Flex</h3>

If you're not familiar with flex I urge you to read about it online. 
[Here's a simple blog post you can start with](http://browniefed.com/blog/react-native-layout-examples/).  
When developing a scalable component with flex you need to convert your View's size **and its margins** with 
proportion the the parent component. If for example your container's width is 375 and your box's width is 300 - 
the box's width is 80% of the parent (300/375) and the margins are what left - 10% on the left and 10% on the right.  
<br/>Here's an example how I *flexed* my component. I only flexed the white box and skipped flexing the buttons because I'm lazy,
 but you get the point (StyleSheet stayed the same except `width` and `height` were removed from `box`):
 
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

And the result:
<div>
    <img src="images/iphoneflex.png" height="450" hspace="20"/>
    <img src="images/tabletflex.png" height="450" hspace="20"/>
</div>
<br/>

Even though the box's size looks good on the tablet, I personally don't recommend flexing your components for scaling.  
Flex can be an amazing solution for a lot of stuff, but not for scaling, because..

* The resulting code is messy with a lot of empty Views.
* You can only flex properties like width, height, margin and padding. Stuff like font-size or shadow-radius can't be flexed.
* Calculating everything with flex takes time, and as we know, time is money.

That being said, we can now continue to our second method.
 
 <h3>Method 2: Viewport Units</h3>
With this method you basically convert every number you'd like to scale in your StyleSheet to 
a percentage of the device's width or height.  
If your device's width is 375dp then 300dp will become `deviceWidth * 0.8` (since 300/375 = 0.8), 
and you can also do it with smaller numbers, for example `fontSize: 14` will become `fontSize: deviceWidth * 0.037`.  
A nice and straight-forward library that can simplify this method is [react-native-viewport-units](https://github.com/jmstout/react-native-viewport-units).  
<br/>
This is the StyleSheet after *viewporting* stuff around (Irrelevant parts were removed, component is exactly the same as the first example):  

```javascript
import {vw, vh} from 'react-native-viewport-units';

const styles = StyleSheet.create({
    container: {
        ...
    },
    box: {
        width: 80 * vw,
        height: 67 * vh,
        padding: 2.6 * vw,
        ...
    },
    title: {
        fontSize: 5.3 * vw,
        marginBottom: 2.6 * vw,
        fontWeight: 'bold',
        color: 'black'
    },
    text: {
        fontSize: 3.6 * vw,
        color: 'black'
    },
    buttonsContainer: {
        ...
    },
    button: {
        width: 40 * vw,
        height: 10.7 * vw,
        borderRadius: 27 * vw,
        marginBottom: 2.6 * vw,
        ...
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 3.6 * vw,
        color: 'white'
    }
});
```
 
And of course, what you have all been waiting for... the result:
<div>
    <img src="images/iphoneviewport.png" height="450" hspace="20"/>
    <img src="images/tabletviewport.png" height="450" hspace="20"/>
</div>
<br/>
Besides needing to do some calculation and having weird numbers around, pretty neat and easy, right?  
But little did you know.. You show your designer how it looks on the tablet and he thinks the buttons are too big and the box's
width should be reduced. What can you do? If you reduce the viewports it will affect the iPhone as well.<br/>
     
One option is to do something like HTML's `media-query` using [PixelRatio](https://facebook.github.io/react-native/docs/pixelratio.html).
But as I said, I'm lazy and I don't want to write everything 2 or more times, what can I do?

<p align="center">
    <img src="images/meme.jpg" height="250"/>
</p>

 <h3>Method 3: Scaling Utils</h3>
 Here at Soluto, we wrote these 3 simple functions that make our scaling so much easier:
  ```javascript
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const scale = size => width / 350 * size;
const verticalScale = size => height / 680 * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {scale, verticalScale, moderateScale};
```

`scale` function is pretty straight forward and will return the same linear result as using viewport.<br/>
`verticalScale` is like scale, but based on height instead of width, which can be useful.<br/>
The real magic happens at `moderateScale`. You can check the formula, but long story short, 
it won't 'exaggerate' when scaling for a big screen. You can also control the resize factor,
passing `1` as the resize factor will be like regular `scale`, and passing `0` will be like no scaling at all.<br/>

Anyway, enough talking, here are the results after combining `scale` and `moderateScale` until your designer is pleased.

StyleSheet:
```javascript
import { scale, moderateScale, verticalScale} from './scaling';

const styles = StyleSheet.create({
    ...
    box: {
        width: moderateScale(300),
        height: verticalScale(450),
        padding: scale(10),
        ...
    },
    title: {
        fontSize: moderateScale(20, 0.4),
        marginBottom: scale(10),
        ...
    },
    text: {
        fontSize: moderateScale(14),
        ...
    },
    button: {
        width: moderateScale(150, 0.3),
        height: moderateScale(45, 0.3),
        marginBottom: moderateScale(10, 0.6),
        ...
    },
    buttonText: {
        fontSize: moderateScale(14),
        ...
    }
});
```

Result:
<div>
    <img src="images/iphonescaling.png" height="450" hspace="20"/>
    <img src="images/tabletscaling.png" height="450" hspace="20"/>
</div>
<br/>
Like Morpheus said - a walk in the park :)<br/><br/>
What I didn't cover is scaling images (SVGs ftw) and handling orientation change. We'll keep that for a different post.
<br/>I hope you found this post useful. Scaling is super important, even if your app is not released on tablet. 
Friends don't let friends skip scaling!
