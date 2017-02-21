import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Example from './pages/Example/Example';

const BlogPost = () => <Example/>;
export default BlogPost;

AppRegistry.registerComponent('BlogPost', () => BlogPost);
