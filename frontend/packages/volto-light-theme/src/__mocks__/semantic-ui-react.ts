import React from 'react';

type GenericProps = {
  children?: React.ReactNode;
} & Record<string, unknown>;

const createComponent =
  (element: keyof JSX.IntrinsicElements = 'div') =>
  ({ children, ...rest }: GenericProps) =>
    React.createElement(element, rest, children);

export const Container = createComponent('div');
export const Segment = createComponent('section');
export const Button = createComponent('button');
export const Form = createComponent('form');
export const Input = createComponent('input');
export const Pagination = createComponent('div');
export const Dimmer = createComponent('div');
export const Loader = createComponent('div');

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Container,
  Segment,
  Button,
  Form,
  Input,
  Pagination,
  Dimmer,
  Loader,
};
