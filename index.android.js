import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Example from './pages/Example';
import FlexExample from './pages/FlexExample';
import ViewPortExample from './pages/ViewPortExample';
import ScalingExample from './pages/ScalingExample';

const BlogPost = () => <ScalingExample/>;
export default BlogPost;

AppRegistry.registerComponent('BlogPost', () => BlogPost);
