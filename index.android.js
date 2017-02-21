import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Example from './pages/Example/Example';
import FlexExample from './pages/Example/FlexExample';

const BlogPost = () => <FlexExample/>;
export default BlogPost;

AppRegistry.registerComponent('BlogPost', () => BlogPost);
